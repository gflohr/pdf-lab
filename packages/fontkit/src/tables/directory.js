import r from '@pdf-lib/restructure';
import Tables from './index.js';

const TableEntry = new r.Struct({
	tag: new r.String(4),
	checkSum: r.uint32,
	offset: new r.Pointer(r.uint32, 'void', { type: 'global' }),
	length: r.uint32,
});

const Directory = new r.Struct({
	tag: new r.String(4),
	numTables: r.uint16,
	searchRange: r.uint16,
	entrySelector: r.uint16,
	rangeShift: r.uint16,
	tables: new r.Array(TableEntry, 'numTables'),
});

Directory.process = function () {
	const tables = {};
	for (const table of this.tables) {
		tables[table.tag] = table;
	}

	this.tables = tables;
};

Directory.preEncode = function () {
	const tables = [];
	for (const tag in this.tables) {
		const table = this.tables[tag];
		if (table) {
			tables.push({
				tag: tag,
				checkSum: 0,
				offset: new r.VoidPointer(Tables[tag], table),
				length: Tables[tag].size(table),
			});
		}
	}

	this.tag = 'true';
	this.numTables = tables.length;
	this.tables = tables;

	const maxExponentFor2 = Math.floor(Math.log(this.numTables) / Math.LN2);
	const maxPowerOf2 = 2 ** maxExponentFor2;

	this.searchRange = maxPowerOf2 * 16;
	this.entrySelector = Math.log(maxPowerOf2) / Math.LN2;
	this.rangeShift = this.numTables * 16 - this.searchRange;
};

export default Directory;
