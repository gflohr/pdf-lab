import * as v from 'valibot';
import { xmpDate } from './date.js';
import { xmpProperName } from './proper-name.js';
import { xmpResourceEvent } from './resource-event.js';
import { xmpText } from './text.js';

/**
 * Version
 *
 * Describes one version of a document.
 *
 * * The field namespace URI is http://ns.adobe.com/xap/1.0/sType/Version#
 * * The preferred field namespace prefix is `stVer`
 */
export const xmpVersion = v.strictObject({
	/**
	 * Type: {@link xmpText}.
	 *
	 * Comments concerning what was changed.
	 */
	comments: xmpText,

	/**
	 * Type: {@link xmpResourceEvent}.
	 *
	 * High-level, formal description of what operation the user performed.
	 */
	event: xmpResourceEvent,

	/**
	 * Type: {@link xmpProperName}.
	 *
	 * The person who modified this version.
	 */
	modifier: xmpProperName,

	/**
	 * Type: {@link xmpDate}.
	 *
	 * The date on which this version was checked in.
	 */
	modifyDate: xmpDate,

	/**
	 * Type: {@link xmpText}.
	 *
	 * The new version number.
	 */
	version: xmpText,
});

export type XmpVersion = v.InferOutput<typeof xmpVersion>;
