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

export const signs: any = {
	commentHashbang: {
		token: '#!',
		directory: 'code',
		file: 'commentHashbang',
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
	commentLine: {
		token: '//',
		directory: 'code',
		file: 'commentLine',
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
	reservedArguments: {
		token: 'arguments',
		directory: 'code',
		file: 'arguments',
		info: 'arguments',
		examples: [
			'',
		],
	},
	reservedAsync: {
		token: 'async',
		directory: 'code',
		file: 'async',
		info: 'async',
		examples: [
			'',
		],
	},
	reservedAwait: {
		token: 'await',
		directory: 'code',
		file: 'await',
		info: 'await',
		examples: [
			'',
		],
	},
	reservedBreak: {
		token: 'break',
		directory: 'code',
		file: 'break',
		info: 'break',
		examples: [
			'',
		],
	},
	reservedCase: {
		token: 'case',
		directory: 'code',
		file: 'case',
		info: 'case',
		examples: [
			'',
		],
	},
	reservedCatch: {
		token: 'catch',
		directory: 'code',
		file: 'catch',
		info: 'catch',
		examples: [
			'',
		],
	},
	reservedClass: {
		token: 'class',
		directory: 'code',
		file: 'class',
		info: 'class',
		examples: [
			'',
		],
	},
	reservedConstructor: {
		token: 'constructor',
		directory: 'code',
		file: 'constructor',
		info: 'constructor',
		examples: [
			'',
		],
	},
	reservedContinue: {
		token: 'continue',
		directory: 'code',
		file: 'continue',
		info: 'continue',
		examples: [
			'',
		],
	},
	reservedDebugger: {
		token: 'debugger',
		directory: 'code',
		file: 'debugger',
		info: 'debugger',
		examples: [
			'',
		],
	},
	reservedDefault: {
		token: 'default',
		directory: 'code',
		file: 'default',
		info: 'default',
		examples: [
			'',
		],
	},
	reservedDelete: {
		token: 'delete',
		directory: 'code',
		file: 'delete',
		info: 'delete',
		examples: [
			'',
		],
	},
	reservedDo: {
		token: 'do',
		directory: 'code',
		file: 'do',
		info: 'do',
		examples: [
			'',
		],
	},
	reservedElse: {
		token: 'else',
		directory: 'code',
		file: 'else',
		info: 'else',
		examples: [
			'',
		],
	},
	reservedExport: {
		token: 'export',
		directory: 'code',
		file: 'export',
		info: 'export',
		examples: [
			'',
		],
	},
	reservedExtends: {
		token: 'extends',
		directory: 'code',
		file: 'extends',
		info: 'extends',
		examples: [
			'',
		],
	},
	reservedFalse: {
		token: 'false',
		directory: 'code',
		file: 'false',
		info: 'false',
		examples: [
			'',
		],
	},
	reservedFinally: {
		token: 'finally',
		directory: 'code',
		file: 'finally',
		info: 'finally',
		examples: [
			'',
		],
	},
	reservedFor: {
		token: 'for',
		directory: 'code',
		file: 'for',
		info: 'for',
		examples: [
			'',
		],
	},
	reservedFrom: {
		token: 'from',
		directory: 'code',
		file: 'from',
		info: 'from',
		examples: [
			'',
		],
	},
	reservedFunction: {
		token: 'function',
		directory: 'code',
		file: 'function',
		info: 'function',
		examples: [
			'',
		],
	},
	reservedFunctionGenerator: {
		token: 'function *',
		directory: 'code',
		file: 'functionGenerator',
		info: 'functionGenerator',
		examples: [
			'',
		],
	},
	reservedGet: {
		token: 'get',
		directory: 'code',
		file: 'get',
		info: 'get',
		examples: [
			'',
		],
	},
	reservedIf: {
		token: 'if',
		directory: 'code',
		file: 'if',
		info: 'if',
		examples: [
			'',
		],
	},
	reservedImport: {
		token: 'import',
		directory: 'code',
		file: 'import',
		info: 'import',
		examples: [
			'',
		],
	},
	reservedInstanceof: {
		token: 'instanceof',
		directory: 'code',
		file: 'instanceof',
		info: 'instanceof',
		examples: [
			'',
		],
	},
	reservedNew: {
		token: 'new',
		directory: 'code',
		file: 'new',
		info: 'new',
		examples: [
			'',
		],
	},
	reservedNull: {
		token: 'null',
		directory: 'code',
		file: 'null',
		info: 'null',
		examples: [
			'',
		],
	},
	reservedReturn: {
		token: 'return',
		directory: 'code',
		file: 'return',
		info: 'return',
		examples: [
			'',
		],
	},
	reservedSet: {
		token: 'set',
		directory: 'code',
		file: 'set',
		info: 'set',
		examples: [
			'',
		],
	},
	reservedStatic: {
		token: 'static',
		directory: 'code',
		file: 'static',
		info: 'static',
		examples: [
			'',
		],
	},
	reservedSuper: {
		token: 'super',
		directory: 'code',
		file: 'super',
		info: 'super',
		examples: [
			'',
		],
	},
	reservedSwitch: {
		token: 'switch',
		directory: 'code',
		file: 'switch',
		info: 'switch',
		examples: [
			'',
		],
	},
	reservedThis: {
		token: 'this',
		directory: 'code',
		file: 'this',
		info: 'this',
		examples: [
			'',
		],
	},
	reservedThrow: {
		token: 'throw',
		directory: 'code',
		file: 'throw',
		info: 'throw',
		examples: [
			'',
		],
	},
	reservedTrue: {
		token: 'true',
		directory: 'code',
		file: 'true',
		info: 'true',
		examples: [
			'',
		],
	},
	reservedTry: {
		token: 'try',
		directory: 'code',
		file: 'try',
		info: 'try',
		examples: [
			'',
		],
	},
	reservedTypeof: {
		token: 'typeof',
		directory: 'code',
		file: 'typeof',
		info: 'typeof',
		examples: [
			'',
		],
	},
	reservedUndefined: {
		token: 'undefined',
		directory: 'code',
		file: 'undefined',
		info: 'undefined',
		examples: [
			'',
		],
	},
	reservedVar: {
		token: 'var',
		directory: 'code',
		file: 'var',
		info: 'var',
		examples: [
			'',
		],
	},
	reservedVoid: {
		token: 'void',
		directory: 'code',
		file: 'void',
		info: 'void',
		examples: [
			'',
		],
	},
	reservedWhile: {
		token: 'while',
		directory: 'code',
		file: 'while',
		info: 'while',
		examples: [
			'',
		],
	},
	reservedYield: {
		token: 'yield',
		directory: 'code',
		file: 'yield',
		info: 'yield',
		examples: [
			'',
		],
	},
	reservedYieldGenerator: {
		token: 'yield *',
		directory: 'code',
		file: 'yieldGenerator',
		info: 'yieldGenerator',
		examples: [
			'',
		],
	},
	reservedAs: {
		token: 'as',
		directory: 'code',
		file: 'as',
		info: 'as',
		examples: [
			'',
		],
	},
	reservedConst: {
		token: 'const',
		directory: 'code',
		file: 'const',
		info: 'const',
		examples: [
			'',
		],
	},
	reservedIn: {
		token: 'in',
		directory: 'code',
		file: 'in',
		info: 'in',
		examples: [
			'',
		],
	},
	reservedLet: {
		token: 'let',
		directory: 'code',
		file: 'let',
		info: 'let',
		examples: [
			'',
		],
	},
	reservedOn: {
		token: 'on',
		directory: 'code',
		file: 'on',
		info: 'on',
		examples: [
			'',
		],
	},
};