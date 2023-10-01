import type { Rule } from "./rules";

export type GameParameters = {
	rule: Rule
    whenCorrect: number
    whenIncorrect: number
	inicialPoint: number
}

export type CounterParameters = {
	correct: number
	incorrect: number
	score: number
}

export type NbyMParameters = {
    n: number
    m: number
}