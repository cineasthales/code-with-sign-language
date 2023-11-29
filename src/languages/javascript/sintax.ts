export const reservedWords: string[] = [
	'arguments',
	'async',
	'await',
	'break',
	'case',
	'catch',
	'class',
	'constructor',
	'continue',
	'debugger',
	'default',
	'delete',
	'do',
	'else',
	'export',
	'extends',
	'false',
	'finally',
	'for',
	'from',
	'function',
	'get',
	'if',
	'import',
	'instanceof',
	'new',
	'null',
	'return',
	'set',
	'static',
	'super',
	'switch',
	'this',
	'throw',
	'true',
	'try',
	'typeof',
	'undefined',
	'var',
	'void',
	'while',
	'with',
	'yield',
    // substrings of other reserved words
	'as',
	'const',
	'in',
	'let',
	'of',
];

export const signs: Object = {
	commentHashbangBegin: {
		token: '#!',
		directory: 'code',
		file: 'commentHashbangBegin',
		info: 'commentHashbang',
		examples: [
			'',
		],
	},
	commentHashbangEnd: {
		token: '',
		directory: 'code',
		file: 'commentHashbangEnd',
		info: 'commentHashbang',
		examples: [
			'',
		],
	},
	stringQuotationBegin: {
		token: '"',
		directory: 'code',
		file: 'stringQuotationBegin',
		info: 'string',
		examples: [
			'',
		],
	},
	stringQuotationEnd: {
		token: '"',
		directory: 'code',
		file: 'stringQuotationEnd',
		info: 'string',
		examples: [
			'',
		],
	},
	stringApostropheBegin: {
		token: '\'',
		directory: 'code',
		file: 'stringApostropheBegin',
		info: 'string',
		examples: [
			'',
		],
	},
	stringApostropheEnd: {
		token: '\'',
		directory: 'code',
		file: 'stringApostropheEnd',
		info: 'string',
		examples: [
			'',
		],
	},
	stringTemplateBegin: {
		token: '`',
		directory: 'code',
		file: 'stringTemplateBegin',
		info: 'string',
		examples: [
			'',
		],
	},
	stringTemplateEnd: {
		token: '`',
		directory: 'code',
		file: 'stringTemplateEnd',
		info: 'string',
		examples: [
			'',
		],
	},
	commentLineBegin: {
		token: '//',
		directory: 'code',
		file: 'commentLineBegin',
		info: 'commentLine',
		examples: [
			'',
		],
	},
	commentLineEnd: {
		token: '',
		directory: 'code',
		file: 'commentLineEnd',
		info: 'commentLine',
		examples: [
			'',
		],
	},
	commentBlockBegin: {
		token: '/*',
		directory: 'code',
		file: 'commentBlockBegin',
		info: 'commentBlock',
		examples: [
			'',
		],
	},
	commentBlockEnd: {
		token: '*/',
		directory: 'code',
		file: 'commentBlockEnd',
		info: 'commentBlock',
		examples: [
			'',
		],
	},
	blockOrObjectBegin: {
		token: '{',
		directory: 'code',
		file: 'blockOrObjectBegin',
		info: 'blockOrObject',
		examples: [
			'',
		],
	},
	blockOrObjectEnd: {
		token: '}',
		directory: 'code',
		file: 'blockOrObjectEnd',
		info: 'blockOrObject',
		examples: [
			'',
		],
	},
	groupBegin: {
		token: '(',
		directory: 'code',
		file: 'groupBegin',
		info: 'group',
		examples: [
			'',
		],
	},
	groupEnd: {
		token: ')',
		directory: 'code',
		file: 'groupEnd',
		info: 'group',
		examples: [
			'',
		],
	},
	comma: {
		token: ',',
		directory: 'code',
		file: 'comma',
		info: 'comma',
		examples: [
			'',
		],
	},
	semicolon: {
		token: ';',
		directory: 'code',
		file: 'semicolon',
		info: 'semicolon',
		examples: [
			'',
		],
	},
	arrayBegin: {
		token: '[',
		directory: 'code',
		file: 'arrayBegin',
		info: 'array',
		examples: [
			'',
		],
	},
	arrayEnd: {
		token: ']',
		directory: 'code',
		file: 'arrayEnd',
		info: 'array',
		examples: [
			'',
		],
	},
	increment: {
		token: '++',
		directory: 'code',
		file: 'increment',
		info: 'increment',
		examples: [
			'',
		],
	},
	plusOrConcat: {
		token: '+',
		directory: 'code',
		file: 'plusOrConcat',
		info: 'plusOrConcat',
		examples: [
			'',
		],
	},
	decrement: {
		token: '--',
		directory: 'code',
		file: 'decrement',
		info: 'decrement',
		examples: [
			'',
		],
	},
	minus: {
		token: '-',
		directory: 'code',
		file: 'minus',
		info: 'minus',
		examples: [
			'',
		],
	},
	power: {
		token: '**',
		directory: 'code',
		file: 'power',
		info: 'power',
		examples: [
			'',
		],
	},
	times: {
		token: '*',
		directory: 'code',
		file: 'times',
		info: 'times',
		examples: [
			'',
		],
	},
	divisionOrRegex: {
		token: '/',
		directory: 'code',
		file: 'divisionOrRegex',
		info: 'divisionOrRegex',
		examples: [
			'',
		],
	},
	modulus: {
		token: '%',
		directory: 'code',
		file: 'modulus',
		info: 'modulus',
		examples: [
			'',
		],
	},
	equalStrict: {
		token: '===',
		directory: 'code',
		file: 'equalStrict',
		info: 'equalStrict',
		examples: [
			'',
		],
	},
	equal: {
		token: '==',
		directory: 'code',
		file: 'equal',
		info: 'equal',
		examples: [
			'',
		],
	},
	functionArrow: {
		token: '=>',
		directory: 'code',
		file: 'functionArrow',
		info: 'functionArrow',
		examples: [
			'',
		],
	},
	assignment: {
		token: '=',
		directory: 'code',
		file: 'assignment',
		info: 'assignment',
		examples: [
			'',
		],
	},
	differentStrict: {
		token: '!==',
		directory: 'code',
		file: 'differentStrict',
		info: 'differentStrict',
		examples: [
			'',
		],
	},
	different: {
		token: '!=',
		directory: 'code',
		file: 'different',
		info: 'different',
		examples: [
			'',
		],
	},
	not: {
		token: '!',
		directory: 'code',
		file: 'not',
		info: 'not',
		examples: [
			'',
		],
	},
	and: {
		token: '&&',
		directory: 'code',
		file: 'and',
		info: 'and',
		examples: [
			'',
		],
	},
	bitwiseAnd: {
		token: '&',
		directory: 'code',
		file: 'bitwiseAnd',
		info: 'bitwiseAnd',
		examples: [
			'',
		],
	},
	or: {
		token: '||',
		directory: 'code',
		file: 'or',
		info: 'or',
		examples: [
			'',
		],
	},
	bitwiseOr: {
		token: '|',
		directory: 'code',
		file: 'bitwiseOr',
		info: 'bitwiseOr',
		examples: [
			'',
		],
	},
	bitwiseNot: {
		token: '~',
		directory: 'code',
		file: 'bitwiseNot',
		info: 'bitwiseNot',
		examples: [
			'',
		],
	},
	bitwiseXor: {
		token: '^',
		directory: 'code',
		file: 'bitwiseXor',
		info: 'bitwiseXor',
		examples: [
			'',
		],
	},
	bitwiseShiftUnsigned: {
		token: '>>>',
		directory: 'code',
		file: 'bitwiseShiftUnsigned',
		info: 'bitwiseShiftUnsigned',
		examples: [
			'',
		],
	},
	bitwiseShiftRight: {
		token: '>>',
		directory: 'code',
		file: 'bitwiseShiftRight',
		info: 'bitwiseShiftRight',
		examples: [
			'',
		],
	},
	greaterEqual: {
		token: '>=',
		directory: 'code',
		file: 'greaterEqual',
		info: 'greaterEqual',
		examples: [
			'',
		],
	},
	greater: {
		token: '>',
		directory: 'code',
		file: 'greater',
		info: 'greater',
		examples: [
			'',
		],
	},
	bitwiseShiftLeft: {
		token: '<<',
		directory: 'code',
		file: 'bitwiseShiftLeft',
		info: 'bitwiseShiftLeft',
		examples: [
			'',
		],
	},
	lesserEqual: {
		token: '<=',
		directory: 'code',
		file: 'lesserEqual',
		info: 'lesserEqual',
		examples: [
			'',
		],
	},
	lesser: {
		token: '<',
		directory: 'code',
		file: 'lesser',
		info: 'lesser',
		examples: [
			'',
		],
	},
	nullCoalesc: {
		token: '??',
		directory: 'code',
		file: 'nullCoalesc',
		info: 'nullCoalesc',
		examples: [
			'',
		],
	},
	chainOptional: {
		token: '?.',
		directory: 'code',
		file: 'chainOptional',
		info: 'chainOptional',
		examples: [
			'',
		],
	},
	ternaryIf: {
		token: '?',
		directory: 'code',
		file: 'ternaryIf',
		info: 'ternaryIf',
		examples: [
			'',
		],
	},
	ternaryElseOrPropertyValue: {
		token: ':',
		directory: 'code',
		file: 'ternaryElseOrPropertyValue',
		info: 'ternaryElseOrPropertyValue',
		examples: [
			'',
		],
	},
	spreadOrRest: {
		token: '...',
		directory: 'code',
		file: 'spreadOrRest',
		info: 'spreadOrRest',
		examples: [
			'',
		],
	},
	chain: {
		token: '.',
		directory: 'code',
		file: 'chain',
		info: 'chain',
		examples: [
			'',
		],
	},
};
