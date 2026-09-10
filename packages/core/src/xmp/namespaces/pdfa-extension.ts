import * as v from 'valibot';
import { xmpBag } from '../xmp-namespace.js';
import { pdfaSchemaNamespace } from './pdfa-schema.js';

export const pdfaExtensionNamespace = v.strictObject({
	schemas: xmpBag(pdfaSchemaNamespace),
});

export type PDFAExtension = v.InferOutput<typeof pdfaExtensionNamespace>;
