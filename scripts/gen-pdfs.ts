import fs from 'node:fs/promises';
import { PDFDocument, rgb, StandardFonts } from '@cantoo/pdf-lib';
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
	await draw(
		pdfDoc,
		'ÄÖÜäöüß in Times-Roman.',
		StandardFonts.TimesRomanItalic,
	);
	await draw(pdfDoc, 'ΑαΒβΓγΔδ', StandardFonts.Symbol);
	await draw(pdfDoc, '✂✈✉☎✔✘★', StandardFonts.ZapfDingbats);

	const bytes = await pdfDoc.save();
	const filename = './assets/pdfs/type1-fonts-missing.pdf';
	await fs.writeFile(filename, bytes);
	console.log(`written ${filename}`);
}

async function genType1FontsEmbedded(): Promise<void> {
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
	pdfDoc.registerFontkit(fontkit);

	const sansBytes = await fs.readFile('./assets/fonts/noto/NotoSans-Regular.ttf');
	await draw(pdfDoc, 'This page uses Helvetica.', sansBytes);

	const serifBytes = await fs.readFile('./assets/fonts/noto/NotoSans-Regular.ttf');
	await draw(
		pdfDoc,
		'ÄÖÜäöüß in Times-Roman.',
		serifBytes,
	);
	const symbolBytes = await fs.readFile('./assets/fonts/noto/NotoSansSymbols-Regular.ttf');
	await draw(pdfDoc, 'ΑαΒβΓγΔδ', symbolBytes);
	// FIXME! This produces garbage.
	await draw(pdfDoc, '✂✈✉☎✔✘★', symbolBytes);

	const bytes = await pdfDoc.save();
	const filename = './assets/pdfs/type1-fonts-embedded.pdf';
	await fs.writeFile(filename, bytes);
	console.log(`written ${filename}`);
}

async function genAll() {
	await genStandardFonts();
	await genType1FontsMissing();
	await genType1FontsEmbedded();
}

genAll().catch((e) => {
	console.error(e);
	process.exitCode = 1;
});
