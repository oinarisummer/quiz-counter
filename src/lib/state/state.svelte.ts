import { RuleType } from '$lib/definitions/rules';

export const ruleSet: {
	rule: RuleType;
	whenCorrect: number;
	whenIncorrect: number;
	inicialPoint: number;
} = $state({
	rule: RuleType.simple,
	whenCorrect: 1,
	whenIncorrect: -1,
	inicialPoint: 10,
});

export const nByMParameters: {
	n: number;
	m: number;
} = $state({
	n: 10,
	m: 10
});

const _nByMGoalScore = $derived(nByMParameters.n * nByMParameters.m)

export const nByMGoalScore = () => _nByMGoalScore