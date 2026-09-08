/**
 * biome-ignore-all lint/suspicious/noExplicitAny: getting rid of the explicit
 * any creates an unreasonable effort without improving usability.
 */
import * as v from 'valibot';

export type XmpContainerType = 'Bag' | 'Seq' | 'Alt' | 'Literal';

export type XmpSchema<TSchema extends v.GenericSchema = v.GenericSchema> =
	TSchema & {
		xmpContainer: XmpContainerType;
	};

export function xmpRequiredLiteral<
	TActions extends v.PipeItem<string, any, any>[],
>(...actions: TActions) {
	const schema =
		actions.length > 0 ? v.pipe(v.string(), ...actions) : v.string();

	return Object.assign(schema, { xmpContainer: 'Literal' as const });
}

export function xmpRequiredAlt<
	TActions extends v.PipeItem<Record<string, string>, any, any>[],
>(...actions: TActions) {
	const baseSchema = v.record(v.string(), v.string());
	const schema =
		actions.length > 0 ? v.pipe(baseSchema, ...actions) : baseSchema;

	return Object.assign(schema, { xmpContainer: 'Alt' as const });
}

export function xmpRequiredBag<
	TItem extends v.GenericSchema = v.StringSchema<undefined>,
	TActions extends v.PipeItem<
		v.InferOutput<v.ArraySchema<TItem, undefined>>,
		any,
		any
	>[] = [],
>(itemSchema: TItem = v.string() as unknown as TItem, ...actions: TActions) {
	const baseSchema = v.array(itemSchema);
	const schema =
		actions.length > 0 ? v.pipe(baseSchema, ...actions) : baseSchema;

	return Object.assign(schema, { xmpContainer: 'Bag' as const });
}

export function xmpRequiredSeq<
	TItem extends v.GenericSchema = v.StringSchema<undefined>,
	TActions extends v.PipeItem<
		v.InferOutput<v.ArraySchema<TItem, undefined>>,
		any,
		any
	>[] = [],
>(itemSchema: TItem = v.string() as unknown as TItem, ...actions: TActions) {
	const baseSchema = v.array(itemSchema);
	const schema =
		actions.length > 0 ? v.pipe(baseSchema, ...actions) : baseSchema;

	return Object.assign(schema, { xmpContainer: 'Seq' as const });
}

// ==========================================
// 2. Default Optional Factory Helpers
// ==========================================

export function xmpLiteral<TActions extends v.PipeItem<string, any, any>[]>(
	...actions: TActions
) {
	return Object.assign(v.optional(xmpRequiredLiteral(...actions)), {
		xmpContainer: 'Literal' as const,
	});
}

export function xmpAlt<
	TActions extends v.PipeItem<Record<string, string>, any, any>[],
>(...actions: TActions) {
	return Object.assign(v.optional(xmpRequiredAlt(...actions)), {
		xmpContainer: 'Alt' as const,
	});
}

export function xmpBag<
	TItem extends v.GenericSchema = v.StringSchema<undefined>,
	TActions extends v.PipeItem<
		v.InferOutput<v.ArraySchema<TItem, undefined>>,
		any,
		any
	>[] = [],
>(itemSchema?: TItem, ...actions: TActions) {
	return Object.assign(v.optional(xmpRequiredBag(itemSchema, ...actions)), {
		xmpContainer: 'Bag' as const,
	});
}

export function xmpSeq<
	TItem extends v.GenericSchema = v.StringSchema<undefined>,
	TActions extends v.PipeItem<
		v.InferOutput<v.ArraySchema<TItem, undefined>>,
		any,
		any
	>[] = [],
>(itemSchema?: TItem, ...actions: TActions) {
	return Object.assign(v.optional(xmpRequiredSeq(itemSchema, ...actions)), {
		xmpContainer: 'Seq' as const,
	});
}

export type XmpNamespaceSchema =
	| v.ObjectSchema<v.ObjectEntries, any>
	| v.StrictObjectSchema<v.ObjectEntries, any>
	| v.ObjectSchemaAsync<v.ObjectEntries, any>
	| v.StrictObjectSchemaAsync<v.ObjectEntries, any>;
