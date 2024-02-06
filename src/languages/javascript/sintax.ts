export const reservedWords: string[] = [
	//'arguments',
	//'async',
	//'await',
	//'break',
	//'case',
	//'catch',
	//'class',
	//'constructor',
	//'continue',
	//'debugger',
	//'default',
	//'delete',
	//'do',
	'else',
	//'export',
	//'extends',
	'false',
	//'finally',
	//'for',
	//'from',
	//'function',
	//'get',
	'if',
	//'import',
	//'instanceof',
	//'new',
	'null',
	//'return',
	//'set',
	//'static',
	//'super',
	//'switch',
	//'this',
	//'throw',
	'true',
	//'try',
	'typeof',
	'undefined',
	'var',
	//'void',
	//'while',
	//'with',
	//'yield',
    // substrings of other reserved words
	//'as',
	'const',
	//'in',
	'let',
	//'of',
];

export const signs: any = {
	/*
	commentHashbang: {
		token: '#!',
		isCode: true,
		file: 'commentHashbang',
		info: 'commentHashbang',
		examples: [],
	},
	*/
	stringQuotationBegin: {
		token: '"',
		isCode: true,
		file: 'stringQuotationBegin',
		info: 'string',
		examples: [
			`let nome = "Fulana de Tal";`,
		],
	},
	stringQuotationEnd: {
		token: '"',
		isCode: true,
		file: 'stringQuotationEnd',
		info: 'string',
		examples: [
			`let nome = "Fulana de Tal";`,
		],
	},
	stringApostropheBegin: {
		token: '\'',
		isCode: true,
		file: 'stringApostropheBegin',
		info: 'string',
		examples: [
			`let nome = 'Fulana de Tal';`,
		],
	},
	stringApostropheEnd: {
		token: '\'',
		isCode: true,
		file: 'stringApostropheEnd',
		info: 'string',
		examples: [
			`let nome = 'Fulana de Tal';`,
		],
	},
	/*
	stringTemplateBegin: {
		token: '`',
		isCode: true,
		file: 'stringTemplateBegin',
		info: 'string',
		examples: [],
	},
	stringTemplateEnd: {
		token: '`',
		isCode: true,
		file: 'stringTemplateEnd',
		info: 'string',
		examples: [],
	},
	commentLine: {
		token: '//',
		isCode: true,
		file: 'commentLine',
		info: 'commentLine',
		examples: [],
	},
	commentBlockBegin: {
		token: '/_*',
		isCode: true,
		file: 'commentBlockBegin',
		info: 'commentBlock',
		examples: [],
	},
	commentBlockEnd: {
		token: '*_/',
		isCode: true,
		file: 'commentBlockEnd',
		info: 'commentBlock',
		examples: [],
		],
	},
	
	blockOrObjectBegin: {
		token: '{',
		isCode: true,
		file: 'blockOrObjectBegin',
		info: 'blockOrObject',
		examples: [
			`let pessoa = {\n` +
			`\tnome: 'Fulana de Tal',\n` +
			`\tidade: 25,\n` +
			`};`,
		],
	},
	blockOrObjectEnd: {
		token: '}',
		isCode: true,
		file: 'blockOrObjectEnd',
		info: 'blockOrObject',
		examples: [
			`let pessoa = {\n` +
			`\tnome: 'Fulana de Tal',\n` +
			`\tidade: 25,\n` +
			`};`,
		],
	},
	groupBegin: {
		token: '(',
		isCode: true,
		file: 'groupBegin',
		info: 'group',
		examples: [
			`let resultado = (10 + 1) * 2;`,
		],
	},
	groupEnd: {
		token: ')',
		isCode: true,
		file: 'groupEnd',
		info: 'group',
		examples: [
			`let resultado = (10 + 1) * 2;`,
		],
	},
	comma: {
		token: ',',
		isCode: true,
		file: 'comma',
		info: 'comma',
		examples: [
			`let frutas = ['banana', 'maçã', 'laranja'];`,
			`let precos = [2.5, 5, 7.5, 10];`,
		],
	},
	semicolon: {
		token: ';',
		isCode: true,
		file: 'semicolon',
		info: 'semicolon',
		examples: [
			`let idade = 25;`,
		],
	},
	arrayBegin: {
		token: '[',
		isCode: true,
		file: 'arrayBegin',
		info: 'array',
		examples: [
			`let frutas = ['banana', 'maçã', 'laranja'];`,
			`let precos = [2.5, 5, 7.5, 10];`,
		],
	},
	arrayEnd: {
		token: ']',
		isCode: true,
		file: 'arrayEnd',
		info: 'array',
		examples: [
			`let frutas = ['banana', 'maçã', 'laranja'];`,
			`let precos = [2.5, 5, 7.5, 10];`,
		],
	},
	increment: {
		token: '++',
		isCode: true,
		file: 'increment',
		info: 'increment',
		examples: [
			`let idade = 25;\n` +
			`idade++;`,
			`let idade = 25;\n` +
			`++idade;`,
		],
	},
	*/
	plusOrConcat: {
		token: '+',
		isCode: true,
		file: 'plusOrConcat',
		info: 'plusOrConcat',
		examples: [
			`let idade = 25 + 5;`,
			`let nome = 'Fulana';\n` +
			`let sobrenome = 'de Tal';\n` +
			`let nomeCompleto = nome + ' ' + sobrenome;`,
		],
	},
	/*
	decrement: {
		token: '--',
		isCode: true,
		file: 'decrement',
		info: 'decrement',
		examples: [
			`let idade = 25;\n` +
			`idade--;`,
			`let idade = 25;\n` +
			`--idade;`,
		],
	},
	*/
	minus: {
		token: '-',
		isCode: true,
		file: 'minus',
		info: 'minus',
		examples: [
			`let idade = 25 - 5;`,
		],
	},
	power: {
		token: '**',
		isCode: true,
		file: 'power',
		info: 'power',
		examples: [
			`let idade = 4 ** 5;`,
		],
	},
	times: {
		token: '*',
		isCode: true,
		file: 'times',
		info: 'times',
		examples: [
			`let idade = 4 * 5;`,
		],
	},
	divisionOrRegex: {
		token: '/',
		isCode: true,
		file: 'divisionOrRegex',
		info: 'divisionOrRegex',
		examples: [
			`let idade = 100 / 2;`,
			`let expressaoRegular = /[0-9]/g`,
		],
	},
	modulus: {
		token: '%',
		isCode: true,
		file: 'modulus',
		info: 'modulus',
		examples: [
			`let idade = 100 % 3;`,
		],
	},
	equalStrict: {
		token: '===',
		isCode: true,
		file: 'equalStrict',
		info: 'equalStrict',
		examples: [
			`if (idade === 25) {\n` +
			`\t\n` +
			`}`,
		],
	},
	equal: {
		token: '==',
		isCode: true,
		file: 'equal',
		info: 'equal',
		examples: [
			`if (idade == 25) {\n` +
			`\t\n` +
			`}`,
		],
	},
	/*
	functionArrow: {
		token: '=>',
		isCode: true,
		file: 'functionArrow',
		info: 'functionArrow',
		examples: [],
	},
	*/
	assignment: {
		token: '=',
		isCode: true,
		file: 'assignment',
		info: 'assignment',
		examples: [
			`let numero = 5;
			numero = numero * 10;`,
		],
	},
	differentStrict: {
		token: '!==',
		isCode: true,
		file: 'differentStrict',
		info: 'differentStrict',
		examples: [
			`if (idade !== 25) {\n` +
			`\t\n` +
			`}`,
		],
	},
	different: {
		token: '!=',
		isCode: true,
		file: 'different',
		info: 'different',
		examples: [
			`if (idade != 25) {\n` +
			`\t\n` +
			`}`,
		],
	},
	not: {
		token: '!',
		isCode: true,
		file: 'not',
		info: 'not',
		examples: [
			`if (!idade) {\n` +
			`\t\n` +
			`}`,
		],
	},
	and: {
		token: '&&',
		isCode: true,
		file: 'and',
		info: 'and',
		examples: [
			`if (nome === 'Fulana de Tal' && idade === 25) {\n` +
			`\t\n` +
			`}`,
		],
	},
	/*
	bitwiseAnd: {
		token: '&',
		isCode: true,
		file: 'bitwiseAnd',
		info: 'bitwiseAnd',
		examples: [],
	},
	*/
	or: {
		token: '||',
		isCode: true,
		file: 'or',
		info: 'or',
		examples: [
			`if (nome === 'Fulana de Tal' || idade === 25) {\n` +
			`\t\n` +
			`}`,
		],
	},
	/*
	bitwiseOr: {
		token: '|',
		isCode: true,
		file: 'bitwiseOr',
		info: 'bitwiseOr',
		examples: [],
	},
	bitwiseNot: {
		token: '~',
		isCode: true,
		file: 'bitwiseNot',
		info: 'bitwiseNot',
		examples: [],
	},
	bitwiseXor: {
		token: '^',
		isCode: true,
		file: 'bitwiseXor',
		info: 'bitwiseXor',
		examples: [],
	},
	bitwiseShiftUnsigned: {
		token: '>>>',
		isCode: true,
		file: 'bitwiseShiftUnsigned',
		info: 'bitwiseShiftUnsigned',
		examples: [],
	},
	bitwiseShiftRight: {
		token: '>>',
		isCode: true,
		file: 'bitwiseShiftRight',
		info: 'bitwiseShiftRight',
		examples: [],
	},
	*/
	greaterEqual: {
		token: '>=',
		isCode: true,
		file: 'greaterEqual',
		info: 'greaterEqual',
		examples: [
			`if (idade >= 25) {\n` +
			`\t\n` +
			`}`,
		],
	},
	greater: {
		token: '>',
		isCode: true,
		file: 'greater',
		info: 'greater',
		examples: [
			`if (idade > 25) {\n` +
			`\t\n` +
			`}`,
		],
	},
	/*
	bitwiseShiftLeft: {
		token: '<<',
		isCode: true,
		file: 'bitwiseShiftLeft',
		info: 'bitwiseShiftLeft',
		examples: [],
	},
	*/
	lesserEqual: {
		token: '<=',
		isCode: true,
		file: 'lesserEqual',
		info: 'lesserEqual',
		examples: [
			`if (idade <= 25) {\n` +
			`\t\n` +
			`}`,
		],
	},
	lesser: {
		token: '<',
		isCode: true,
		file: 'lesser',
		info: 'lesser',
		examples: [
			`if (idade < 25) {\n` +
			`\t\n` +
			`}`,
		],
	},
	/*
	nullCoalesc: {
		token: '??',
		isCode: true,
		file: 'nullCoalesc',
		info: 'nullCoalesc',
		examples: [],
	},
	chainOptional: {
		token: '?.',
		isCode: true,
		file: 'chainOptional',
		info: 'chainOptional',
		examples: [],
	},
	ternaryIf: {
		token: '?',
		isCode: true,
		file: 'ternaryIf',
		info: 'ternaryIf',
		examples: [],
	},
	ternaryElseOrPropertyValue: {
		token: ':',
		isCode: true,
		file: 'ternaryElseOrPropertyValue',
		info: 'ternaryElseOrPropertyValue',
		examples: [],
	},
	spreadOrRest: {
		token: '...',
		isCode: true,
		file: 'spreadOrRest',
		info: 'spreadOrRest',
		examples: [],
	},
	chain: {
		token: '.',
		isCode: true,
		file: 'chain',
		info: 'chain',
		examples: [],
	},
	reservedArguments: {
		token: 'arguments',
		isCode: true,
		file: 'arguments',
		info: 'arguments',
		examples: [],
	},
	reservedAsync: {
		token: 'async',
		isCode: true,
		file: 'async',
		info: 'async',
		examples: [],
	},
	reservedAwait: {
		token: 'await',
		isCode: true,
		file: 'await',
		info: 'await',
		examples: [],
	},
	reservedBreak: {
		token: 'break',
		isCode: true,
		file: 'break',
		info: 'break',
		examples: [
			`let nomeMes;\n` +
			`switch (mes) {\n` +
			`\tcase 1:\n` +
			`\t\tnomeMes = 'janeiro';\n` +
			`\t\tbreak;\n` +
			`\tcase 2:\n` +
			`\t\tnomeMes = 'fevereiro';\n` +
			`\t\tbreak;\n` +
			`\tdefault\n` +
			`\t\tnomeMes = 'outro mês';\n` +
			`}`,
		],
	},
	reservedCase: {
		token: 'case',
		isCode: true,
		file: 'case',
		info: 'case',
		examples: [
			`let nomeMes;\n` +
			`switch (mes) {\n` +
			`\tcase 1:\n` +
			`\t\tnomeMes = 'janeiro';\n` +
			`\t\tbreak;\n` +
			`\tcase 2:\n` +
			`\t\tnomeMes = 'fevereiro';\n` +
			`\t\tbreak;\n` +
			`\tdefault\n` +
			`\t\tnomeMes = 'outro mês';\n` +
			`}`,
		],
	},
	reservedCatch: {
		token: 'catch',
		isCode: true,
		file: 'catch',
		info: 'catch',
		examples: [],
	},
	reservedClass: {
		token: 'class',
		isCode: true,
		file: 'class',
		info: 'class',
		examples: [],
	},
	reservedConstructor: {
		token: 'constructor',
		isCode: true,
		file: 'constructor',
		info: 'constructor',
		examples: [],
	},
	reservedContinue: {
		token: 'continue',
		isCode: true,
		file: 'continue',
		info: 'continue',
		examples: [],
	},
	reservedDebugger: {
		token: 'debugger',
		isCode: true,
		file: 'debugger',
		info: 'debugger',
		examples: [],
	},
	reservedDefault: {
		token: 'default',
		isCode: true,
		file: 'default',
		info: 'default',
		examples: [
			`let nomeMes;\n` +
			`switch (mes) {\n` +
			`\tcase 1:\n` +
			`\t\tnomeMes = 'janeiro';\n` +
			`\t\tbreak;\n` +
			`\tcase 2:\n` +
			`\t\tnomeMes = 'fevereiro';\n` +
			`\t\tbreak;\n` +
			`\tdefault\n` +
			`\t\tnomeMes = 'outro mês';\n` +
			`}`,
		],
	},
	reservedDelete: {
		token: 'delete',
		isCode: true,
		file: 'delete',
		info: 'delete',
		examples: [],
	},
	reservedDo: {
		token: 'do',
		isCode: true,
		file: 'do',
		info: 'do',
		examples: [
			`let numero = 0;\n` +
			`do {\n` +
			`\tnumero = numero + 10;\n` +
			`} while (numero < 5);`,
		],
	},
	*/
	reservedElse: {
		token: 'else',
		isCode: true,
		file: 'else',
		info: 'else',
		examples: [
			`let voto;\n` +
			`if (idade >= 18) {\n` +
			`\tvoto = 'obrigatório';\n` +
			`} else if (idade === 16 || idade === 17 || idade >= 70) {\n` +
			`\tvoto = 'facultativo';\n` +
			`} else {\n` +
			`\tvoto = 'proibido';\n` +
			`}`,
		],
	},
	/*
	reservedExport: {
		token: 'export',
		isCode: true,
		file: 'export',
		info: 'export',
		examples: [],
	},
	reservedExtends: {
		token: 'extends',
		isCode: true,
		file: 'extends',
		info: 'extends',
		examples: [],
	},
	*/
	reservedFalse: {
		token: 'false',
		isCode: true,
		file: 'false',
		info: 'false',
		examples: [
			`let podeEntrar;\n` +
			`if (idade > 17) {\n` +
			`\tpodeEntrar = true;\n` +
			`} else {\n` +
			`\tpodeEntrar = false;\n` +
			`}`,
		],
	},
	/*
	reservedFinally: {
		token: 'finally',
		isCode: true,
		file: 'finally',
		info: 'finally',
		examples: [],
	},
	reservedFor: {
		token: 'for',
		isCode: true,
		file: 'for',
		info: 'for',
		examples: [
			`let numero = 0;\n` +
			`for (let i = 0; i < 5; i++) {\n` +
			`\tnumero = numero + 10;\n` +
			`}`,
		],
	},
	reservedFrom: {
		token: 'from',
		isCode: true,
		file: 'from',
		info: 'from',
		examples: [],
	},
	reservedFunction: {
		token: 'function',
		isCode: true,
		file: 'function',
		info: 'function',
		examples: [
			`function dividir(dividendo, divisor) {\n` +
			`\tif (divisor === 0) {\n` +
			`\t\treturn 'Impossível dividir';\n` +
			`\t}\n` +
			`\tlet resultado = dividendo / divisor;\n` +
			`\treturn 'Resultado: ' + resultado;\n` +
			`}`,
		],
	},
	reservedFunctionGenerator: {
		token: 'function *',
		isCode: true,
		file: 'functionGenerator',
		info: 'functionGenerator',
		examples: [],
	},
	reservedGet: {
		token: 'get',
		isCode: true,
		file: 'get',
		info: 'get',
		examples: [],
	},
	*/
	reservedIf: {
		token: 'if',
		isCode: true,
		file: 'if',
		info: 'if',
		examples: [
			`let podeEntrar;\n` +
			`if (idade > 17) {\n` +
			`\tpodeEntrar = true;\n` +
			`} else {\n` +
			`\tpodeEntrar = false;\n` +
			`}`,
		],
	},
	/*
	reservedImport: {
		token: 'import',
		isCode: true,
		file: 'import',
		info: 'import',
		examples: [],
	},
	reservedInstanceof: {
		token: 'instanceof',
		isCode: true,
		file: 'instanceof',
		info: 'instanceof',
		examples: [],
	},
	reservedNew: {
		token: 'new',
		isCode: true,
		file: 'new',
		info: 'new',
		examples: [],
	},
	*/
	reservedNull: {
		token: 'null',
		isCode: true,
		file: 'null',
		info: 'null',
		examples: [
			`let nome = null;\n` +
			`let temNome;\n` +
			`if (!nome) {\n` +
			`\ttemNome = false;\n` +
			`} else {\n` +
			`\ttemNome = true;\n` +
			`}\n`,
		],
	},
	/*
	reservedReturn: {
		token: 'return',
		isCode: true,
		file: 'return',
		info: 'return',
		examples: [
			`function dividir(dividendo, divisor) {\n` +
			`\tif (divisor === 0) {\n` +
			`\t\treturn 'Impossível dividir';\n` +
			`\t}\n` +
			`\tlet resultado = dividendo / divisor;\n` +
			`\treturn 'Resultado: ' + resultado;\n` +
			`}`,
		],
	},
	reservedSet: {
		token: 'set',
		isCode: true,
		file: 'set',
		info: 'set',
		examples: [],
	},
	reservedStatic: {
		token: 'static',
		isCode: true,
		file: 'static',
		info: 'static',
		examples: [],
	},
	reservedSuper: {
		token: 'super',
		isCode: true,
		file: 'super',
		info: 'super',
		examples: [],
	},
	reservedSwitch: {
		token: 'switch',
		isCode: true,
		file: 'switch',
		info: 'switch',
		examples: [
			`let nomeMes;\n` +
			`switch (mes) {\n` +
			`\tcase 1:\n` +
			`\t\tnomeMes = 'janeiro';\n` +
			`\t\tbreak;\n` +
			`\tcase 2:\n` +
			`\t\tnomeMes = 'fevereiro';\n` +
			`\t\tbreak;\n` +
			`\tdefault\n` +
			`\t\tnomeMes = 'outro mês';\n` +
			`}`,
		],
	},
	reservedThis: {
		token: 'this',
		isCode: true,
		file: 'this',
		info: 'this',
		examples: [],
	},
	reservedThrow: {
		token: 'throw',
		isCode: true,
		file: 'throw',
		info: 'throw',
		examples: [],
	},
	*/
	reservedTrue: {
		token: 'true',
		isCode: true,
		file: 'true',
		info: 'true',
		examples: [
			`let podeEntrar;\n` +
			`if (idade > 17) {\n` +
			`\tpodeEntrar = true;\n` +
			`} else {\n` +
			`\tpodeEntrar = false;\n` +
			`}`,
		],
	},
	/*
	reservedTry: {
		token: 'try',
		isCode: true,
		file: 'try',
		info: 'try',
		examples: [],
	},
	*/
	reservedTypeof: {
		token: 'typeof',
		isCode: true,
		file: 'typeof',
		info: 'typeof',
		examples: [
			`let nome = 'Fulana de Tal';\n` +
			`let tipoNome = typeof nome;`,
		],
	},
	reservedUndefined: {
		token: 'undefined',
		isCode: true,
		file: 'undefined',
		info: 'undefined',
		examples: [
			`let nome;`,
		],
	},
	reservedVar: {
		token: 'var',
		isCode: true,
		file: 'var',
		info: 'var',
		examples: [
			`var idade = 10;\n` +
			`idade = idade + 5;\n` +
			`idade = idade + 3;`,
		],
	},
	/*
	reservedVoid: {
		token: 'void',
		isCode: true,
		file: 'void',
		info: 'void',
		examples: [],
	},
	reservedWhile: {
		token: 'while',
		isCode: true,
		file: 'while',
		info: 'while',
		examples: [
			`let numero = 0;\n` +
			`while (numero < 5) {\n` +
			`\tnumero = numero + 10;\n` +
			`}`,
		],
	},
	reservedYield: {
		token: 'yield',
		isCode: true,
		file: 'yield',
		info: 'yield',
		examples: [],
	},
	reservedYieldGenerator: {
		token: 'yield *',
		isCode: true,
		file: 'yieldGenerator',
		info: 'yieldGenerator',
		examples: [],
	},
	reservedAs: {
		token: 'as',
		isCode: true,
		file: 'as',
		info: 'as',
		examples: [],
	},
	*/
	reservedConst: {
		token: 'const',
		isCode: true,
		file: 'const',
		info: 'const',
		examples: [
			`const janeiro = 1;\n` +
			`const fevereiro = 2;`,
		],
	},
	/*
	reservedIn: {
		token: 'in',
		isCode: true,
		file: 'in',
		info: 'in',
		examples: [],
	},
	*/
	reservedLet: {
		token: 'let',
		isCode: true,
		file: 'let',
		info: 'let',
		examples: [
			`let idade = 10;\n` +
			`idade = idade + 5;\n` +
			`idade = idade + 3;`,
		],
	},
	/*
	reservedOf: {
		token: 'of',
		isCode: true,
		file: 'of',
		info: 'of',
		examples: [],
	},
	*/
};
