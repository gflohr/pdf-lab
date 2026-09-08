import * as v from 'valibot';

/**
 * A value chosen from a vocabulary of values. Vocabularies provide a means of
 * specifying a limited and possibly extensible set of values for a property.
 *
 * A choice can be open or closed:
 *
 * * An open choice has one or more lists of preferred values, but other values can be used freely.
 * * A closed choice has one or more lists of allowed values, other values shall not be used.
 *
 * **NOTE:** An XMP reader would be more robust if it tolerated unexpected
 * values for closed choice types when the set of allowed values can be
 * expected to grow over time.
 */
// @__NO_SIDE_EFFECTS__
export function xmpClosedChoice(choices: string[]) {
	const schema = v.picklist(choices);

	return Object.assign(schema, { xmpContainer: 'Literal' as const });
}
