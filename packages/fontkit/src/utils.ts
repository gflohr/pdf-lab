/**
 * Find an item in a sorted array. The comparison function receives an item
 * from the array and should return:
 * - A positive value if the current item is less than the searched item
 *   (search right)
 * - A negative value if the current item is greater than the searched item
 *   (search left)
 * - 0 if the current item equals the searched item
 *
 * @internal
 *
 * @template [T] The type of the elements in the array
 * @param arr the array to search
 * @param cmp a comparison function
 * @returns the index of the item or -1 if it cannot be found
 */
export function binarySearch<T = unknown>(
	arr: T[],
	cmp: (item: T) => number,
): number {
	let min = 0;
	let max = arr.length - 1;
	while (min <= max) {
		const mid = (min + max) >> 1;
		const res = cmp(arr[mid]);

		if (res < 0) {
			max = mid - 1;
		} else if (res > 0) {
			min = mid + 1;
		} else {
			return mid;
		}
	}

	return -1;
}

/**
 * Create a range of consecutive integers, starting with `index` (inclusive)
 * and ending with `end` (exclusive).
 *
 * @internal
 *
 * @param index the start index
 * @param end the end index
 * @returns an array of consecutive integers
 */
export function range(index: number, end: number): number[] {
	const range = [];
	while (index < end) {
		range.push(index++);
	}
	return range;
}
