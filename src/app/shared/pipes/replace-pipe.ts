import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'replace'
})
export class ReplacePipe implements PipeTransform {

	/**
	 * Transforms a given string by searching for a pattern and replacing it with a specified string.
	 *
	 * @param {string} value - The input string to be transformed.
	 * @param {string} pattern - The pattern to search for in the input string. This should be a valid regular expression.
	 * @param {string} replaceWith - The string to replace the matched pattern with.
	 * @param {string} [flags] - Optional flags to customize the behavior of the regular expression (e.g., 'g' for global match).
	 * @return {string} The transformed string after replacing the specified pattern.
	 */
	transform(value: string, pattern: string, replaceWith: string, flags?: string): string {
		if (!value || !pattern) return value;
		const regex = new RegExp(pattern, flags || 'g');
		return value.replace(regex, replaceWith);
	}
}
