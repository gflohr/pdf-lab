import * as r from 'restructure';

export namespace DSIGTable {
	export interface Signature {
		format: number;
		length: number;
		offset: number;
	}

	export interface SignatureBlock {
		cbSignature: number;
		signature: Buffer;
	}

	export interface DSIG {
		/** Version number of the DSIG table (0x00000001). */
		ulVersion: number;

		/** Number of signatures in the table. */
		usNumSigs: number;

		/** Permission flags. */
		usFlag: number;

		signatures: Signature[];
		signatureBlocks: SignatureBlock[];
	}
}

const signatureFields = {
	format: r.uint32,
	length: r.uint32,
	offset: r.uint32,
};
const signature = new r.Struct<DSIGTable.Signature>(signatureFields);

const signatureBlockFields = {
	reserved: new r.Reserved(r.uint16, 2),
	cbSignature: r.uint32, // Length (in bytes) of the PKCS#7 packet in pbSignature
	signature: new r.Buffer('cbSignature'),
};
const signatureBlock = new r.Struct<DSIGTable.SignatureBlock>(
	signatureBlockFields,
);

const dsigStructFields = {
	ulVersion: r.uint32,
	usNumSigs: r.uint16,
	usFlag: r.uint16,
	signatures: new r.Array(signature, 'usNumSigs'),
	signatureBlocks: new r.Array(signatureBlock, 'usNumSigs'),
};
/** @internal */
export const DSIG = new r.Struct<DSIGTable.DSIG>(dsigStructFields);
