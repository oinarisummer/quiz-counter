import { Rule } from '$lib/definitions/rules';
import { writable } from 'svelte/store';

export const rule = writable<Rule>(Rule.simple);
export const whenCorrect = writable(1);
export const whenIncorrect = writable(-1);
export const inicialPoint = writable(0);

export const nByMParameters = writable<{
	n: number;
	m: number;
}>({
	n: 10,
	m: 10
});