import * as v from 'valibot';
import { xmpLiteral, xmpRequiredLiteral } from '../xmp-namespace.js';

const dateRegex =
	/^\d{4}(?:-(?:0[1-9]|1[0-2])(?:-(?:0[1-9]|[12]\d|3[01])(?:T(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z|[+-](?:[01]\d|2[0-3]):[0-5]\d)?)?)?)?$/;

/**
 * A date-time value is represented using a subset of the formats as defined in
 * Date and Time Formats:
 *
 * * YYYY
 * * YYYY-MM
 * * YYYY-MM-DD
 * * YYYY-MM-DDThh:mmTZD
 * * YYYY-MM-DDThh:mm:ssTZD
 * * YYYY-MM-DDThh:mm:ss.sTZD
 *
 * In which:
 * * YYYY = four-digit year
 * * MM = two-digit month (01=January)
 * * DD = two-digit day of month (01 to 31)
 * * hh = two digits of hour (00 to 23)
 * * mm = two digits of minute (00 to 59)
 * * ss = two digits of second (00 to 59)
 * * s = one or more digits representing a decimal fraction of a second
 * * TZD = time zone designator (Z or +hh:mm or -hh:mm
 *
 * The time zone designator need not be present in XMP. When not present, the
 * time zone is unknown, and an XMP processor should not assume anything about
 * the missing time zone.
 *
 * Local time-zone designators +hh:mm or -hh:mm should be used when possible
 * instead of converting to UTC.
 *
 * NOTE : If a file was saved at noon on October 23, a timestamp of
 * 2004-10-23T12:00:00-06:00 conveys more information than 2004-10-23T18:00:00Z.
 */
export const xmpDate = xmpLiteral(v.regex(dateRegex));

/**
 * Like {@link xmpDate} but required.
 */
export const xmpRequiredDate = xmpRequiredLiteral(v.regex(dateRegex));
