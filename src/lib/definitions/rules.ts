export const Rule = {
    undefined: 0,
    simple: 1,
    mn: 2,
    by: 3,
    updown: 4,
    swedish: 5,
    divide: 6,
} as const

export type Rule = (typeof Rule)[keyof typeof Rule]

export const ruleName = (rule: Rule): string => {
    switch(rule) {
        case 0:
            return 'undefined'
        case 1:
            return 'Simple'
        case 2:
            return '+m/-n'
        case 3:
            return 'n by m'
        case 4:
            return 'UpDown'
        case 5:
            return 'Swedish'
        case 6:
            return 'Divide by n'
    }
}