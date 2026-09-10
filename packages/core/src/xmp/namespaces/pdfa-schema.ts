import * as v from 'valibot';
import { xmpLiteral } from '../xmp-namespace.js';

export const pdfaSchemaNamespace = v.strictObject({
	schema: xmpLiteral(v.regex(/./)),
	namespaceURI: xmpLiteral(v.regex(/./)),
	prefix: xmpLiteral(v.regex(/./)),
	// property ...
});

export type PDFASchema = v.InferOutput<typeof pdfaSchemaNamespace>;
