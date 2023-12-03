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
		isCode: true,
		file: 'commentHashbang',
		info: 'commentHashbang',
		examples: [
			'',
		],
	},
	stringQuotationBegin: {
		token: '"',
		isCode: true,
		file: 'stringQuotationBegin',
		info: 'string',
		examples: [
			'',
		],
	},
	stringQuotationEnd: {
		token: '"',
		isCode: true,
		file: 'stringQuotationEnd',
		info: 'string',
		examples: [
			'',
		],
	},
	stringApostropheBegin: {
		token: '\'',
		isCode: true,
		file: 'stringApostropheBegin',
		info: 'string',
		examples: [
			'',
		],
	},
	stringApostropheEnd: {
		token: '\'',
		isCode: true,
		file: 'stringApostropheEnd',
		info: 'string',
		examples: [
			'',
		],
	},
	stringTemplateBegin: {
		token: '`',
		isCode: true,
		file: 'stringTemplateBegin',
		info: 'string',
		examples: [
			'',
		],
	},
	stringTemplateEnd: {
		token: '`',
		isCode: true,
		file: 'stringTemplateEnd',
		info: 'string',
		examples: [
			'',
		],
	},
	commentLine: {
		token: '//',
		isCode: true,
		file: 'commentLine',
		info: 'commentLine',
		examples: [
			'',
		],
	},
	commentBlockBegin: {
		token: '/*',
		isCode: true,
		file: 'commentBlockBegin',
		info: 'commentBlock',
		examples: [
			'',
		],
	},
	commentBlockEnd: {
		token: '*/',
		isCode: true,
		file: 'commentBlockEnd',
		info: 'commentBlock',
		examples: [
			'',
		],
	},
	blockOrObjectBegin: {
		token: '{',
		isCode: true,
		file: 'blockOrObjectBegin',
		info: 'blockOrObject',
		examples: [
			'',
		],
	},
	blockOrObjectEnd: {
		token: '}',
		isCode: true,
		file: 'blockOrObjectEnd',
		info: 'blockOrObject',
		examples: [
			'',
		],
	},
	groupBegin: {
		token: '(',
		isCode: true,
		file: 'groupBegin',
		info: 'group',
		examples: [
			'',
		],
	},
	groupEnd: {
		token: ')',
		isCode: true,
		file: 'groupEnd',
		info: 'group',
		examples: [
			'',
		],
	},
	comma: {
		token: ',',
		isCode: true,
		file: 'comma',
		info: 'comma',
		examples: [
			'',
		],
	},
	semicolon: {
		token: ';',
		isCode: true,
		file: 'semicolon',
		info: 'semicolon',
		examples: [
			'',
		],
	},
	arrayBegin: {
		token: '[',
		isCode: true,
		file: 'arrayBegin',
		info: 'array',
		examples: [
			'',
		],
	},
	arrayEnd: {
		token: ']',
		isCode: true,
		file: 'arrayEnd',
		info: 'array',
		examples: [
			'',
		],
	},
	increment: {
		token: '++',
		isCode: true,
		file: 'increment',
		info: 'increment',
		examples: [
			'',
		],
	},
	plusOrConcat: {
		token: '+',
		isCode: true,
		file: 'plusOrConcat',
		info: 'plusOrConcat',
		examples: [
			'',
		],
	},
	decrement: {
		token: '--',
		isCode: true,
		file: 'decrement',
		info: 'decrement',
		examples: [
			'',
		],
	},
	minus: {
		token: '-',
		isCode: true,
		file: 'minus',
		info: 'minus',
		examples: [
			'',
		],
	},
	power: {
		token: '**',
		isCode: true,
		file: 'power',
		info: 'power',
		examples: [
			'',
		],
	},
	times: {
		token: '*',
		isCode: true,
		file: 'times',
		info: 'times',
		examples: [
			'',
		],
	},
	divisionOrRegex: {
		token: '/',
		isCode: true,
		file: 'divisionOrRegex',
		info: 'divisionOrRegex',
		examples: [
			'',
		],
	},
	modulus: {
		token: '%',
		isCode: true,
		file: 'modulus',
		info: 'modulus',
		examples: [
			'',
		],
	},
	equalStrict: {
		token: '===',
		isCode: true,
		file: 'equalStrict',
		info: 'equalStrict',
		examples: [
			'',
		],
	},
	equal: {
		token: '==',
		isCode: true,
		file: 'equal',
		info: 'equal',
		examples: [
			'',
		],
	},
	functionArrow: {
		token: '=>',
		isCode: true,
		file: 'functionArrow',
		info: 'functionArrow',
		examples: [
			'',
		],
	},
	assignment: {
		token: '=',
		isCode: true,
		file: 'assignment',
		info: 'assignment',
		examples: [
			'',
		],
	},
	differentStrict: {
		token: '!==',
		isCode: true,
		file: 'differentStrict',
		info: 'differentStrict',
		examples: [
			'',
		],
	},
	different: {
		token: '!=',
		isCode: true,
		file: 'different',
		info: 'different',
		examples: [
			'',
		],
	},
	not: {
		token: '!',
		isCode: true,
		file: 'not',
		info: 'not',
		examples: [
			'',
		],
	},
	and: {
		token: '&&',
		isCode: true,
		file: 'and',
		info: 'and',
		examples: [
			'',
		],
	},
	bitwiseAnd: {
		token: '&',
		isCode: true,
		file: 'bitwiseAnd',
		info: 'bitwiseAnd',
		examples: [
			'',
		],
	},
	or: {
		token: '||',
		isCode: true,
		file: 'or',
		info: 'or',
		examples: [
			'',
		],
	},
	bitwiseOr: {
		token: '|',
		isCode: true,
		file: 'bitwiseOr',
		info: 'bitwiseOr',
		examples: [
			'',
		],
	},
	bitwiseNot: {
		token: '~',
		isCode: true,
		file: 'bitwiseNot',
		info: 'bitwiseNot',
		examples: [
			'',
		],
	},
	bitwiseXor: {
		token: '^',
		isCode: true,
		file: 'bitwiseXor',
		info: 'bitwiseXor',
		examples: [
			'',
		],
	},
	bitwiseShiftUnsigned: {
		token: '>>>',
		isCode: true,
		file: 'bitwiseShiftUnsigned',
		info: 'bitwiseShiftUnsigned',
		examples: [
			'',
		],
	},
	bitwiseShiftRight: {
		token: '>>',
		isCode: true,
		file: 'bitwiseShiftRight',
		info: 'bitwiseShiftRight',
		examples: [
			'',
		],
	},
	greaterEqual: {
		token: '>=',
		isCode: true,
		file: 'greaterEqual',
		info: 'greaterEqual',
		examples: [
			'',
		],
	},
	greater: {
		token: '>',
		isCode: true,
		file: 'greater',
		info: 'greater',
		examples: [
			'',
		],
	},
	bitwiseShiftLeft: {
		token: '<<',
		isCode: true,
		file: 'bitwiseShiftLeft',
		info: 'bitwiseShiftLeft',
		examples: [
			'',
		],
	},
	lesserEqual: {
		token: '<=',
		isCode: true,
		file: 'lesserEqual',
		info: 'lesserEqual',
		examples: [
			'',
		],
	},
	lesser: {
		token: '<',
		isCode: true,
		file: 'lesser',
		info: 'lesser',
		examples: [
			'',
		],
	},
	nullCoalesc: {
		token: '??',
		isCode: true,
		file: 'nullCoalesc',
		info: 'nullCoalesc',
		examples: [
			'',
		],
	},
	chainOptional: {
		token: '?.',
		isCode: true,
		file: 'chainOptional',
		info: 'chainOptional',
		examples: [
			'',
		],
	},
	ternaryIf: {
		token: '?',
		isCode: true,
		file: 'ternaryIf',
		info: 'ternaryIf',
		examples: [
			'',
		],
	},
	ternaryElseOrPropertyValue: {
		token: ':',
		isCode: true,
		file: 'ternaryElseOrPropertyValue',
		info: 'ternaryElseOrPropertyValue',
		examples: [
			'',
		],
	},
	spreadOrRest: {
		token: '...',
		isCode: true,
		file: 'spreadOrRest',
		info: 'spreadOrRest',
		examples: [
			'',
		],
	},
	chain: {
		token: '.',
		isCode: true,
		file: 'chain',
		info: 'chain',
		examples: [
			'',
		],
	},
	reservedArguments: {
		token: 'arguments',
		isCode: true,
		file: 'arguments',
		info: 'arguments',
		examples: [
			'',
		],
	},
	reservedAsync: {
		token: 'async',
		isCode: true,
		file: 'async',
		info: 'async',
		examples: [
			'',
		],
	},
	reservedAwait: {
		token: 'await',
		isCode: true,
		file: 'await',
		info: 'await',
		examples: [
			'',
		],
	},
	reservedBreak: {
		token: 'break',
		isCode: true,
		file: 'break',
		info: 'break',
		examples: [
			'',
		],
	},
	reservedCase: {
		token: 'case',
		isCode: true,
		file: 'case',
		info: 'case',
		examples: [
			'',
		],
	},
	reservedCatch: {
		token: 'catch',
		isCode: true,
		file: 'catch',
		info: 'catch',
		examples: [
			'',
		],
	},
	reservedClass: {
		token: 'class',
		isCode: true,
		file: 'class',
		info: 'class',
		examples: [
			'',
		],
	},
	reservedConstructor: {
		token: 'constructor',
		isCode: true,
		file: 'constructor',
		info: 'constructor',
		examples: [
			'',
		],
	},
	reservedContinue: {
		token: 'continue',
		isCode: true,
		file: 'continue',
		info: 'continue',
		examples: [
			'',
		],
	},
	reservedDebugger: {
		token: 'debugger',
		isCode: true,
		file: 'debugger',
		info: 'debugger',
		examples: [
			'',
		],
	},
	reservedDefault: {
		token: 'default',
		isCode: true,
		file: 'default',
		info: 'default',
		examples: [
			'',
		],
	},
	reservedDelete: {
		token: 'delete',
		isCode: true,
		file: 'delete',
		info: 'delete',
		examples: [
			'',
		],
	},
	reservedDo: {
		token: 'do',
		isCode: true,
		file: 'do',
		info: 'do',
		examples: [
			'',
		],
	},
	reservedElse: {
		token: 'else',
		isCode: true,
		file: 'else',
		info: 'else',
		examples: [
			'',
		],
	},
	reservedExport: {
		token: 'export',
		isCode: true,
		file: 'export',
		info: 'export',
		examples: [
			'',
		],
	},
	reservedExtends: {
		token: 'extends',
		isCode: true,
		file: 'extends',
		info: 'extends',
		examples: [
			'',
		],
	},
	reservedFalse: {
		token: 'false',
		isCode: true,
		file: 'false',
		info: 'false',
		examples: [
			'',
		],
	},
	reservedFinally: {
		token: 'finally',
		isCode: true,
		file: 'finally',
		info: 'finally',
		examples: [
			'',
		],
	},
	reservedFor: {
		token: 'for',
		isCode: true,
		file: 'for',
		info: 'for',
		examples: [
			'',
		],
	},
	reservedFrom: {
		token: 'from',
		isCode: true,
		file: 'from',
		info: 'from',
		examples: [
			'',
		],
	},
	reservedFunction: {
		token: 'function',
		isCode: true,
		file: 'function',
		info: 'function',
		examples: [
			'',
		],
	},
	reservedFunctionGenerator: {
		token: 'function *',
		isCode: true,
		file: 'functionGenerator',
		info: 'functionGenerator',
		examples: [
			'',
		],
	},
	reservedGet: {
		token: 'get',
		isCode: true,
		file: 'get',
		info: 'get',
		examples: [
			'',
		],
	},
	reservedIf: {
		token: 'if',
		isCode: true,
		file: 'if',
		info: 'if',
		examples: [
			'',
		],
	},
	reservedImport: {
		token: 'import',
		isCode: true,
		file: 'import',
		info: 'import',
		examples: [
			'',
		],
	},
	reservedInstanceof: {
		token: 'instanceof',
		isCode: true,
		file: 'instanceof',
		info: 'instanceof',
		examples: [
			'',
		],
	},
	reservedNew: {
		token: 'new',
		isCode: true,
		file: 'new',
		info: 'new',
		examples: [
			'',
		],
	},
	reservedNull: {
		token: 'null',
		isCode: true,
		file: 'null',
		info: 'null',
		examples: [
			'',
		],
	},
	reservedReturn: {
		token: 'return',
		isCode: true,
		file: 'return',
		info: 'return',
		examples: [
			'',
		],
	},
	reservedSet: {
		token: 'set',
		isCode: true,
		file: 'set',
		info: 'set',
		examples: [
			'',
		],
	},
	reservedStatic: {
		token: 'static',
		isCode: true,
		file: 'static',
		info: 'static',
		examples: [
			'',
		],
	},
	reservedSuper: {
		token: 'super',
		isCode: true,
		file: 'super',
		info: 'super',
		examples: [
			'',
		],
	},
	reservedSwitch: {
		token: 'switch',
		isCode: true,
		file: 'switch',
		info: 'switch',
		examples: [
			'',
		],
	},
	reservedThis: {
		token: 'this',
		isCode: true,
		file: 'this',
		info: 'this',
		examples: [
			'',
		],
	},
	reservedThrow: {
		token: 'throw',
		isCode: true,
		file: 'throw',
		info: 'throw',
		examples: [
			'',
		],
	},
	reservedTrue: {
		token: 'true',
		isCode: true,
		file: 'true',
		info: 'true',
		examples: [
			'',
		],
	},
	reservedTry: {
		token: 'try',
		isCode: true,
		file: 'try',
		info: 'try',
		examples: [
			'',
		],
	},
	reservedTypeof: {
		token: 'typeof',
		isCode: true,
		file: 'typeof',
		info: 'typeof',
		examples: [
			'',
		],
	},
	reservedUndefined: {
		token: 'undefined',
		isCode: true,
		file: 'undefined',
		info: 'undefined',
		examples: [
			'',
		],
	},
	reservedVar: {
		token: 'var',
		isCode: true,
		file: 'var',
		info: 'var',
		examples: [
			'',
		],
	},
	reservedVoid: {
		token: 'void',
		isCode: true,
		file: 'void',
		info: 'void',
		examples: [
			'',
		],
	},
	reservedWhile: {
		token: 'while',
		isCode: true,
		file: 'while',
		info: 'while',
		examples: [
			'',
		],
	},
	reservedYield: {
		token: 'yield',
		isCode: true,
		file: 'yield',
		info: 'yield',
		examples: [
			'',
		],
	},
	reservedYieldGenerator: {
		token: 'yield *',
		isCode: true,
		file: 'yieldGenerator',
		info: 'yieldGenerator',
		examples: [
			'',
		],
	},
	reservedAs: {
		token: 'as',
		isCode: true,
		file: 'as',
		info: 'as',
		examples: [
			'',
		],
	},
	reservedConst: {
		token: 'const',
		isCode: true,
		file: 'const',
		info: 'const',
		examples: [
			'',
		],
	},
	reservedIn: {
		token: 'in',
		isCode: true,
		file: 'in',
		info: 'in',
		examples: [
			'',
		],
	},
	reservedLet: {
		token: 'let',
		isCode: true,
		file: 'let',
		info: 'let',
		examples: [
			'',
		],
	},
	reservedOn: {
		token: 'on',
		isCode: true,
		file: 'on',
		info: 'on',
		examples: [
			'',
		],
	},
};