export const RuleType = {
	undefined: 0,
	simple: 1,
	mn: 2,
	by: 3,
	updown: 4,
	swedish: 5,
	divide: 6,
	backstream: 7
} as const;

export type RuleType = (typeof RuleType)[keyof typeof RuleType];

export const ruleName = (rule: RuleType): string => {
	switch (rule) {
		case 0:
			return 'undefined';
		case 1:
			return 'Simple';
		case 2:
			return '+m/-n';
		case 3:
			return 'n by m';
		case 4:
			return 'UpDown';
		case 5:
			return 'Swedish';
		case 6:
			return 'Divide by n';
		case 7:
			return 'Backstream';
	}
};

export const CounterType = {
	undefined: 0,
	simple: 1,
	score: 2
} as const;

export type CounterType = (typeof CounterType)[keyof typeof CounterType];

export const counterType = (rule: RuleType): CounterType => {
	switch (rule) {
		case 2:
		case 3:
		case 6:
		case 7:
			return CounterType.score;
		default:
			return CounterType.simple;
	}
};
