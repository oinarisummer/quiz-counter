export const Rule = {
    undefined: 0,
    simple: 1,
    mn: 2
} as const

export type Rule = (typeof Rule)[keyof typeof Rule]