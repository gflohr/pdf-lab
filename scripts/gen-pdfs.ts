import fs from 'node:fs/promises';
import {
	PDFArray,
	PDFDict,
	PDFDocument,
	PDFName,
	type PDFPage,
	type PDFRef,
	PDFStream,
	rgb,
	StandardFonts,
} from '@cantoo/pdf-lib';
import fontkit from '@pdf-lib/fontkit';

async function genStandardFonts(): Promise<void> {
	const pdfDoc = await PDFDocument.create();
	pdfDoc.registerFontkit(fontkit);

	const page = pdfDoc.addPage();
	const { height } = page.getSize();

	let y = height - 50;

	const draw = async (
		label: string,
		font: StandardFonts | ArrayBuffer | Uint8Array<ArrayBufferLike>,
	): Promise<void> => {
		const f = await pdfDoc.embedFont(font);

		page.drawText(label, {
			x: 50,
			y,
			size: 14,
			font: f,
			color: rgb(0, 0, 0),
		});

		y -= 25;
	};

	await draw('Helvetica', StandardFonts.Helvetica);
	await draw('Helvetica Bold', StandardFonts.HelveticaBold);
	await draw('Helvetica Oblique', StandardFonts.HelveticaOblique);
	await draw('Helvetica Bold Oblique', StandardFonts.HelveticaBoldOblique);

	await draw('Times Roman', StandardFonts.TimesRoman);
	await draw('Times Roman Italic', StandardFonts.TimesRomanItalic);
	await draw('Times Roman Bold', StandardFonts.TimesRomanBold);
	await draw('Times Roman Bold Italic', StandardFonts.TimesRomanBoldItalic);

	await draw('Courier', StandardFonts.Courier);
	await draw('Courier Bold', StandardFonts.CourierBold);
	await draw('Courier Oblique', StandardFonts.CourierOblique);
	await draw('Courier Bold Oblique', StandardFonts.CourierBoldOblique);

	await draw('Σψμβολ', StandardFonts.Symbol);
	await draw('✂✈✉☎✔✘★', StandardFonts.ZapfDingbats);

	const bytes = await pdfDoc.save();
	const filename = './assets/pdfs/standard-fonts.pdf';
	await fs.writeFile(filename, bytes);
	console.log(`written ${filename}`);
}

async function genType1FontsMissing(): Promise<void> {
	const draw = async (
		pdfDoc: PDFDocument,
		label: string,
		font: StandardFonts | Uint8Array<ArrayBufferLike>,
	): Promise<void> => {
		const page = pdfDoc.addPage();

		const f = await pdfDoc.embedFont(font);

		page.drawText(label, {
			x: 50,
			y: page.getSize().height - 50,
			size: 14,
			font: f,
			color: rgb(0, 0, 0),
		});
	};

	const pdfDoc = await PDFDocument.create();

	await draw(pdfDoc, 'This page uses Helvetica.', StandardFonts.Helvetica);
	await draw(pdfDoc, 'ÄÖÜäöüß in Times-Roman.', StandardFonts.TimesRomanItalic);
	await draw(pdfDoc, 'ΑαΒβΓγΔδ', StandardFonts.Symbol);
	await draw(pdfDoc, '✂✈✉☎✔✘★', StandardFonts.ZapfDingbats);

	const bytes = await pdfDoc.save();
	const filename = './assets/pdfs/type1-fonts-missing.pdf';
	await fs.writeFile(filename, bytes);
	console.log(`written ${filename}`);
}

const encodingTest = `q
BT
0 0 0 rg
/{helvetica} 12 Tf
24 TL
1 0 0 1 50 791.89 Tm
% When this text gets copied and pasted, it will "magically" change.
(price: $5) Tj
T*
(What about characters that are missing in the CMap?) Tj
T*
/{times} 12 Tf
% This text will be converted to uppercase by a /Differences table.
% Additionally, the currency symbol is mapped to the Euro sign.
(caps lock \\333) Tj
T*
ET
Q
`;

const fakeCMap = `CIDInit /ProcSet findresource begin
12 dict begin
begincmap
/CIDSystemInfo <<
  /Registry (Adobe)
  /Ordering (UCS)
  /Supplement 0
>> def
/CMapName /Adobe-Identity-UCS def
/CMapType 2 def
1 begincodespacerange
<00><ff>
endcodespacerange
% Fake CMAp that turns "price: $5" into "Preis: [Euro sign] 2".
8 beginbfchar
<70> <0050> % p -> P
<72> <0072> % r -> r
<69> <0065> % i -> e
<63> <0069> % c -> i
<65> <0073> % e -> s
<20> <0020> % space
<24> <20ac> % $ -> Euro sign
<35> <0032> % 5 -> 2
endbfchar
endcmap
CMapName currentdict /CMap defineresource pop
end
`;

async function genEncodingTest() {
	const pdfDoc = await PDFDocument.create();
	const context = pdfDoc.context;
	const page = pdfDoc.addPage();

	const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
	const times = await pdfDoc.embedFont(StandardFonts.TimesRoman);

	await pdfDoc.save();

	const y = page.getSize().height - 50;
	page.drawText('dummy', {
		x: 50,
		y,
		size: 12,
		font: helvetica,
		color: rgb(0, 0, 0),
	});
	page.drawText('dummy', {
		x: 50,
		y,
		size: 12,
		font: times,
		color: rgb(0, 0, 0),
	});

	const helveticaName = getFontNameByRef(page, helvetica.ref).decodeText();
	const timesName = getFontNameByRef(page, times.ref).decodeText();

	const newContent = encodingTest
		.replace('{helvetica}', helveticaName)
		.replace('{times}', timesName);

	const contentStream = getContentStream(page);
	contentStream.updateContents(new TextEncoder().encode(newContent));
	contentStream.dict.delete(PDFName.of('Filter'));

	const cmapStream = context.flateStream(fakeCMap);
	const cmapRef = context.register(cmapStream);
	const helveticaDict = context.lookupMaybe(helvetica.ref, PDFDict)!;
	helveticaDict.set(PDFName.of('ToUnicode'), cmapRef);

	const differences: (number | string)[] = [97];
	for (let c = 'A'.codePointAt(0); c! <= 'Z'.codePointAt(0)!; ++c!) {
		differences.push(String.fromCharCode(c!));
	}
	differences.push(0xdb, 'Euro');
	const encodingDict = context.obj({
		Type: PDFName.of('Encoding'),
		BaseEncoding: PDFName.of('MacRomanEncoding'),
		Differences: differences,
	});
	const encodingRef = context.register(encodingDict);
	const timesDict = context.lookupMaybe(times.ref, PDFDict)!;
	timesDict.set(PDFName.of('Encoding'), encodingRef);

	const bytes = await pdfDoc.save();
	const filename = './assets/pdfs/encoding-test.pdf';
	await fs.writeFile(filename, bytes);
	console.log(`written ${filename}`);
}

function getFontNameByRef(page: PDFPage, ref: PDFRef) {
	const { Font } = page.node.normalizedEntries();
	const refString = ref.toString();
	const entries = Font.entries();

	for (let i = 0; i < entries.length; ++i) {
		const [fontName, fontRef] = entries[i];
		if (fontRef.toString() === refString) {
			return fontName;
		}
	}

	throw new Error(`no font resource '${ref}'`);
}

function getContentStream(page: PDFPage): PDFStream {
	const { Contents } = page.node.normalizedEntries();
	if (!(Contents instanceof PDFArray)) throw new Error('no contents array');

	for (let j = 0; j < Contents.size(); ++j) {
		const item = Contents.get(j);
		const resolved = page.doc.context.lookup(item);

		if (resolved instanceof PDFStream) {
			return resolved;
		}
	}

	throw new Error('no contents stream');
}

async function genAll() {
	await genStandardFonts();
	await genType1FontsMissing();
	await genEncodingTest();
}

genAll().catch((e) => {
	console.error(e);
	process.exitCode = 1;
});
