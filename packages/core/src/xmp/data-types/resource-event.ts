import * as v from 'valibot';
import { xmpAgentName } from './agent-name.js';
import { xmpDate } from './date.js';
import { xmpOpenChoice } from './open-choice.js';
import { xmpText } from './text.js';

/**
 * ResourceEvent
 *
 * A structure denoting a high-level event that occurred in the processing of a
 * resource.
 *
 * * The field namespace URI shall be "http://ns.adobe.com/xap/1.0/sType/ResourceEvent#".
 * * The preferred field namespace prefix is `stEvt`.
 *
 * The structure shall include the `stEvt:action` and `stEvt:when` fields;
 * other fields need not be present. The fields, if used, shall be of the
 * specified types. The field content should be as described.
 */
export const xmpResourceEvent = v.strictObject({
	/**
	 * Type: Open choice of {@link xmpText}.
	 *
	 * The referenced resource’s fallback file paths or URLs. The sequence
	 * order is the recommended order in attempting to locate the resource.
	 */
	action: xmpOpenChoice,

	/**
	 * Type: {@link xmpText}.
	 *
	 * A semicolon-delimited list of the parts of the resource that
	 * were changed since the previous event history.
	 *
	 * If not present, presumed to be undefined. When tracking changes and the
	 * scope of the changed components is unknown, it should be assumed that
	 * anything might have changed.
	 */
	changed: xmpText,

	/**
	 * Type: {@link xmpGUID}.
	 *
	 * The value of the `xmpMM:InstanceID` property for the modified (output)
	 * resource.
	 */
	instanceID: xmpText,

	/**
	 * Type: {@link xmpText}.
	 *
	 * Additional description of the action.
	 */
	parameters: xmpText,

	/**
	 * Type: {@link xmpAgentName}.
	 *
	 * Additional description of the action.
	 */
	softwareAgent: xmpAgentName,

	/**
	 * Type: {@link xmpDate}.
	 *
	 * Timestamp of when the action occurred.
	 *
	 * For events that create or write to a file, this should be the
	 * approximate modification time of the file.
	 */
	when: xmpDate,
});

export type XmpResourceEvent = v.InferOutput<typeof xmpResourceEvent>;
