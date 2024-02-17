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
		example: ''
	},
	*/
	stringQuotationBegin: {
		token: '"',
		isCode: true,
		file: 'stringQuotationBegin',
		info: 'string',
		example:
			`let nome = "Fulana de Tal";\n` +
			`console.log(nome);`
	},
	stringQuotationEnd: {
		token: '"',
		isCode: true,
		file: 'stringQuotationEnd',
		info: 'string',
		example:
			`let nome = "Fulana de Tal";\n` +
			`console.log(nome);`
	},
	stringApostropheBegin: {
		token: '\'',
		isCode: true,
		file: 'stringApostropheBegin',
		info: 'string',
		example:
			`let nome = 'Fulana de Tal';\n` +
			`console.log(nome);`
	},
	stringApostropheEnd: {
		token: '\'',
		isCode: true,
		file: 'stringApostropheEnd',
		info: 'string',
		example:
			`let nome = 'Fulana de Tal';\n` +
			`console.log(nome);`
	},
	/*
	stringTemplateBegin: {
		token: '`',
		isCode: true,
		file: 'stringTemplateBegin',
		info: 'string',
		example: ''
	},
	stringTemplateEnd: {
		token: '`',
		isCode: true,
		file: 'stringTemplateEnd',
		info: 'string',
		example: ''
	},
	commentLine: {
		token: '//',
		isCode: true,
		file: 'commentLine',
		info: 'commentLine',
		example: ''
	},
	commentBlockBegin: {
		token: '/_*',
		isCode: true,
		file: 'commentBlockBegin',
		info: 'commentBlock',
		example: ''
	},
	commentBlockEnd: {
		token: '*_/',
		isCode: true,
		file: 'commentBlockEnd',
		info: 'commentBlock',
		example: ''
	},
	blockOrObjectBegin: {
		token: '{',
		isCode: true,
		file: 'blockOrObjectBegin',
		info: 'blockOrObject',
		example: ''
	},
	blockOrObjectEnd: {
		token: '}',
		isCode: true,
		file: 'blockOrObjectEnd',
		info: 'blockOrObject',
		example: ''
	},
	groupBegin: {
		token: '(',
		isCode: true,
		file: 'groupBegin',
		info: 'group',
		example: ''
	},
	groupEnd: {
		token: ')',
		isCode: true,
		file: 'groupEnd',
		info: 'group',
		example: ''
	},
	comma: {
		token: ',',
		isCode: true,
		file: 'comma',
		info: 'comma',
		example: ''
	},
	semicolon: {
		token: ';',
		isCode: true,
		file: 'semicolon',
		info: 'semicolon',
		example: ''
	},
	arrayBegin: {
		token: '[',
		isCode: true,
		file: 'arrayBegin',
		info: 'array',
		example: ''
	},
	arrayEnd: {
		token: ']',
		isCode: true,
		file: 'arrayEnd',
		info: 'array',
		example: ''
	},
	increment: {
		token: '++',
		isCode: true,
		file: 'increment',
		info: 'increment',
		example: ''
	},
	*/
	plusOrConcat: {
		token: '+',
		isCode: true,
		file: 'plusOrConcat',
		info: 'plusOrConcat',
		example:
			`let idade = 25 + 5;\n` +
			`let nome = 'Fulana';\n` +
			`let sobrenome = 'de Tal';\n` +
			`let nomeCompleto = nome + ' ' + sobrenome;\n` +
			`console.log('Nome: ' + nomeCompleto);\n` +
			`console.log('Idade: ' + idade + ' anos');`
	},
	/*
	decrement: {
		token: '--',
		isCode: true,
		file: 'decrement',
		info: 'decrement',
		example: ''
	},
	*/
	minus: {
		token: '-',
		isCode: true,
		file: 'minus',
		info: 'minus',
		example:
			`let idade = 25 - 5;\n` +
			`console.log('Idade: ' + idade + ' anos');`
	},
	power: {
		token: '**',
		isCode: true,
		file: 'power',
		info: 'power',
		example:
			`let idade = 4 ** 3;\n` +
			`console.log('Idade: ' + idade + ' anos');`
	},
	times: {
		token: '*',
		isCode: true,
		file: 'times',
		info: 'times',
		example:
			`let idade = 5 * 4;\n` +
			`console.log('Idade: ' + idade + ' anos');`
	},
	division: {
		token: '/',
		isCode: true,
		file: 'division',
		info: 'division',
		example:
			`let idade = 100 / 2;\n` +
			`console.log('Idade: ' + idade + ' anos');`
	},
	modulus: {
		token: '%',
		isCode: true,
		file: 'modulus',
		info: 'modulus',
		example:
			`let idade = 100 % 3;\n` +
			`console.log('Idade: ' + idade + ' anos');`
	},
	equalStrict: {
		token: '===',
		isCode: true,
		file: 'equalStrict',
		info: 'equalStrict',
		example:
			`let idade = 25;\n` +
			`if (idade === 25) {\n` +
			`\tconsole.log('Você tem 25 anos!');\n` +
			`}`
	},
	equal: {
		token: '==',
		isCode: true,
		file: 'equal',
		info: 'equal',
		example:
			`let idade = '25';\n` +
			`if (idade == 25) {\n` +
			`\tconsole.log('Você tem 25 anos!');\n` +
			`}`
	},
	/*
	functionArrow: {
		token: '=>',
		isCode: true,
		file: 'functionArrow',
		info: 'functionArrow',
		example: ''
	},
	*/
	assignment: {
		token: '=',
		isCode: true,
		file: 'assignment',
		info: 'assignment',
		example:
			`let numero = 5;\n` +
			`numero = numero * 10;\n` +
			`console.log(numero);`
	},
	differentStrict: {
		token: '!==',
		isCode: true,
		file: 'differentStrict',
		info: 'differentStrict',
		example:
			`let idade = '25';\n` +
			`if (idade !== 25) {\n` +
			`\tconsole.log('Você não tem 25 anos!');\n` +
			`}`
	},
	different: {
		token: '!=',
		isCode: true,
		file: 'different',
		info: 'different',
		example:
			`let idade = 30;\n` +
			`if (idade != 25) {\n` +
			`\tconsole.log('Você não tem 25 anos!');\n` +
			`}`
	},
	not: {
		token: '!',
		isCode: true,
		file: 'not',
		info: 'not',
		example:
			`let idade;\n` +
			`if (!idade) {\n` +
			`\tconsole.log('Você não preencheu a idade!');\n` +
			`}`
	},
	and: {
		token: '&&',
		isCode: true,
		file: 'and',
		info: 'and',
		example:
			`let nome = 'Beltrano';\n` +
			`let idade = 25;\n` +
			`if (nome === 'Beltrano' && idade === 25) {\n` +
			`\tconsole.log('Você é quem eu estava procurando!');\n` +
			`}`
	},
	/*
	bitwiseAnd: {
		token: '&',
		isCode: true,
		file: 'bitwiseAnd',
		info: 'bitwiseAnd',
		example: ''
	},
	*/
	or: {
		token: '||',
		isCode: true,
		file: 'or',
		info: 'or',
		example:
			`let nome = 'Fulano';\n` +
			`let idade = 25;\n` +
			`if (nome === 'Beltrano' || idade === 25) {\n` +
			`\tconsole.log('Você é quem eu estava procurando!');\n` +
			`}`
	},
	/*
	bitwiseOr: {
		token: '|',
		isCode: true,
		file: 'bitwiseOr',
		info: 'bitwiseOr',
		example: ''
	},
	bitwiseNot: {
		token: '~',
		isCode: true,
		file: 'bitwiseNot',
		info: 'bitwiseNot',
		example: ''
	},
	bitwiseXor: {
		token: '^',
		isCode: true,
		file: 'bitwiseXor',
		info: 'bitwiseXor',
		example: ''
	},
	bitwiseShiftUnsigned: {
		token: '>>>',
		isCode: true,
		file: 'bitwiseShiftUnsigned',
		info: 'bitwiseShiftUnsigned',
		example: ''
	},
	bitwiseShiftRight: {
		token: '>>',
		isCode: true,
		file: 'bitwiseShiftRight',
		info: 'bitwiseShiftRight',
		example: ''
	},
	*/
	greaterEqual: {
		token: '>=',
		isCode: true,
		file: 'greaterEqual',
		info: 'greaterEqual',
		example:
			`let idade = 25;\n` +
			`if (idade >= 25) {\n` +
			`\tconsole.log('Você tem 25 anos ou mais!');\n` +
			`}`
	},
	greater: {
		token: '>',
		isCode: true,
		file: 'greater',
		info: 'greater',
		example:
			`let idade = 26;\n` +
			`if (idade > 25) {\n` +
			`\tconsole.log('Você tem mais de 25 anos!');\n` +
			`}`
	},
	/*
	bitwiseShiftLeft: {
		token: '<<',
		isCode: true,
		file: 'bitwiseShiftLeft',
		info: 'bitwiseShiftLeft',
		example: ''
	},
	*/
	lesserEqual: {
		token: '<=',
		isCode: true,
		file: 'lesserEqual',
		info: 'lesserEqual',
		example:
			`let idade = 25;\n` +
			`if (idade <= 25) {\n` +
			`\tconsole.log('Você tem 25 anos ou menos!');\n` +
			`}`
	},
	lesser: {
		token: '<',
		isCode: true,
		file: 'lesser',
		info: 'lesser',
		example:
			`let idade = 24;\n` +
			`if (idade < 25) {\n` +
			`\tconsole.log('Você tem menos de 25 anos!');\n` +
			`}`
	},
	/*
	nullCoalesc: {
		token: '??',
		isCode: true,
		file: 'nullCoalesc',
		info: 'nullCoalesc',
		example: ''
	},
	chainOptional: {
		token: '?.',
		isCode: true,
		file: 'chainOptional',
		info: 'chainOptional',
		example: ''
	},
	ternaryIf: {
		token: '?',
		isCode: true,
		file: 'ternaryIf',
		info: 'ternaryIf',
		example: ''
	},
	ternaryElseOrPropertyValue: {
		token: ':',
		isCode: true,
		file: 'ternaryElseOrPropertyValue',
		info: 'ternaryElseOrPropertyValue',
		example: ''
	},
	spreadOrRest: {
		token: '...',
		isCode: true,
		file: 'spreadOrRest',
		info: 'spreadOrRest',
		example: ''
	},
	chain: {
		token: '.',
		isCode: true,
		file: 'chain',
		info: 'chain',
		example: ''
	},
	*/
	functionConsoleLog: {
		token: 'console.log',
		isCode: true,
		file: 'functionConsoleLog',
		info: 'functionConsoleLog',
		example:
			`let nome = 'Fulana';\n` +
			`console.log('Olá, ' + nome + '!');`
	},
	/*
	reservedArguments: {
		token: 'arguments',
		isCode: true,
		file: 'arguments',
		info: 'arguments',
		example: ''
	},
	reservedAsync: {
		token: 'async',
		isCode: true,
		file: 'async',
		info: 'async',
		example: ''
	},
	reservedAwait: {
		token: 'await',
		isCode: true,
		file: 'await',
		info: 'await',
		example: ''
	},
	reservedBreak: {
		token: 'break',
		isCode: true,
		file: 'break',
		info: 'break',
		example: ''
	},
	reservedCase: {
		token: 'case',
		isCode: true,
		file: 'case',
		info: 'case',
		example: ''
	},
	reservedCatch: {
		token: 'catch',
		isCode: true,
		file: 'catch',
		info: 'catch',
		example: ''
	},
	reservedClass: {
		token: 'class',
		isCode: true,
		file: 'class',
		info: 'class',
		example: ''
	},
	reservedConstructor: {
		token: 'constructor',
		isCode: true,
		file: 'constructor',
		info: 'constructor',
		example: ''
	},
	reservedContinue: {
		token: 'continue',
		isCode: true,
		file: 'continue',
		info: 'continue',
		example: ''
	},
	reservedDebugger: {
		token: 'debugger',
		isCode: true,
		file: 'debugger',
		info: 'debugger',
		example: ''
	},
	reservedDefault: {
		token: 'default',
		isCode: true,
		file: 'default',
		info: 'default',
		example: ''
	},
	reservedDelete: {
		token: 'delete',
		isCode: true,
		file: 'delete',
		info: 'delete',
		example: ''
	},
	reservedDo: {
		token: 'do',
		isCode: true,
		file: 'do',
		info: 'do',
		example: ''
	},
	*/
	reservedElse: {
		token: 'else',
		isCode: true,
		file: 'else',
		info: 'else',
		example:
			`let idade = 15;\n` +
			`if (idade === 16 || idade === 17 || idade >= 70) {\n` +
			`\tconsole.log('Voto facultativo.');\n` +
			`} else if (idade >= 18 && idade < 70) {\n` +
			`\tconsole.log('Voto obrigatório.');\n` +
			`} else {\n` +
			`\tconsole.log('Voto proibido.');\n` +
			`}`
	},
	/*
	reservedExport: {
		token: 'export',
		isCode: true,
		file: 'export',
		info: 'export',
		example: ''
	},
	reservedExtends: {
		token: 'extends',
		isCode: true,
		file: 'extends',
		info: 'extends',
		example: ''
	},
	*/
	reservedFalse: {
		token: 'false',
		isCode: true,
		file: 'false',
		info: 'false',
		example:
			`let idade = 17;\n` +
			`let podeEntrar;\n` +
			`if (idade > 17) {\n` +
			`\tpodeEntrar = true;\n` +
			`} else {\n` +
			`\tpodeEntrar = false;\n` +
			`}\n` +
			`console.log('Pode entrar? ' + podeEntrar);`
	},
	/*
	reservedFinally: {
		token: 'finally',
		isCode: true,
		file: 'finally',
		info: 'finally',
		example: ''
	},
	reservedFor: {
		token: 'for',
		isCode: true,
		file: 'for',
		info: 'for',
		example: ''
	},
	reservedFrom: {
		token: 'from',
		isCode: true,
		file: 'from',
		info: 'from',
		example: ''
	},
	reservedFunction: {
		token: 'function',
		isCode: true,
		file: 'function',
		info: 'function',
		example: ''
	},
	reservedFunctionGenerator: {
		token: 'function *',
		isCode: true,
		file: 'functionGenerator',
		info: 'functionGenerator',
		example: ''
	},
	reservedGet: {
		token: 'get',
		isCode: true,
		file: 'get',
		info: 'get',
		example: ''
	},
	*/
	reservedIf: {
		token: 'if',
		isCode: true,
		file: 'if',
		info: 'if',
		example:
			`let idade = 18;\n` +
			`if (idade > 17) {\n` +
			`\tconsole.log('Pode entrar!');\n` +
			`}`
	},
	/*
	reservedImport: {
		token: 'import',
		isCode: true,
		file: 'import',
		info: 'import',
		example: ''
	},
	reservedInstanceof: {
		token: 'instanceof',
		isCode: true,
		file: 'instanceof',
		info: 'instanceof',
		example: ''
	},
	reservedNew: {
		token: 'new',
		isCode: true,
		file: 'new',
		info: 'new',
		example: ''
	},
	*/
	reservedNull: {
		token: 'null',
		isCode: true,
		file: 'null',
		info: 'null',
		example:
			`let nome = null;\n` +
			`if (!nome) {\n` +
			`\tconsole.log('Você não preencheu o nome!');\n` +
			`} else {\n` +
			`\tconsole.log('Você preencheu o nome!');\n` +
			`}\n`
	},
	/*
	reservedReturn: {
		token: 'return',
		isCode: true,
		file: 'return',
		info: 'return',
		example: ''
	},
	reservedSet: {
		token: 'set',
		isCode: true,
		file: 'set',
		info: 'set',
		example: ''
	},
	reservedStatic: {
		token: 'static',
		isCode: true,
		file: 'static',
		info: 'static',
		example: ''
	},
	reservedSuper: {
		token: 'super',
		isCode: true,
		file: 'super',
		info: 'super',
		example: ''
	},
	reservedSwitch: {
		token: 'switch',
		isCode: true,
		file: 'switch',
		info: 'switch',
		example: ''
	},
	reservedThis: {
		token: 'this',
		isCode: true,
		file: 'this',
		info: 'this',
		example: ''
	},
	reservedThrow: {
		token: 'throw',
		isCode: true,
		file: 'throw',
		info: 'throw',
		example: ''
	},
	*/
	reservedTrue: {
		token: 'true',
		isCode: true,
		file: 'true',
		info: 'true',
		example:
			`let idade = 18;\n` +
			`let podeEntrar;\n` +
			`if (idade > 17) {\n` +
			`\tpodeEntrar = true;\n` +
			`} else {\n` +
			`\tpodeEntrar = false;\n` +
			`}\n` +
			`console.log('Pode entrar? ' + podeEntrar);`
	},
	/*
	reservedTry: {
		token: 'try',
		isCode: true,
		file: 'try',
		info: 'try',
		example: ''
	},
	*/
	reservedTypeof: {
		token: 'typeof',
		isCode: true,
		file: 'typeof',
		info: 'typeof',
		example:
			`let nome = 'Fulana de Tal';\n` +
			`let tipoNome = typeof nome;\n` +
			`console.log('O tipo do dado "nome" é: ' + tipoNome);`
	},
	reservedUndefined: {
		token: 'undefined',
		isCode: true,
		file: 'undefined',
		info: 'undefined',
		example:
			`let nome;\n` +
			`console.log(Seu nome é: ' + nome);`
	},
	reservedVar: {
		token: 'var',
		isCode: true,
		file: 'var',
		info: 'var',
		example:
			`var idade = 10;\n` +
			`console.log(idade);\n` +
			`idade = idade + 5;\n` +
			`console.log(idade);\n` +
			`idade = idade + 3;\n` +
			`console.log(idade);`
	},
	/*
	reservedVoid: {
		token: 'void',
		isCode: true,
		file: 'void',
		info: 'void',
		example: ''
	},
	reservedWhile: {
		token: 'while',
		isCode: true,
		file: 'while',
		info: 'while',
		example: ''
	},
	reservedYield: {
		token: 'yield',
		isCode: true,
		file: 'yield',
		info: 'yield',
		example: ''
	},
	reservedYieldGenerator: {
		token: 'yield *',
		isCode: true,
		file: 'yieldGenerator',
		info: 'yieldGenerator',
		example: ''
	},
	reservedAs: {
		token: 'as',
		isCode: true,
		file: 'as',
		info: 'as',
		example: ''
	},
	*/
	reservedConst: {
		token: 'const',
		isCode: true,
		file: 'const',
		info: 'const',
		example:
			`const janeiro = 1;\n` +
			`console.log('O mês de janeiro é: ' + janeiro);`
	},
	/*
	reservedIn: {
		token: 'in',
		isCode: true,
		file: 'in',
		info: 'in',
		example: ''
	},
	*/
	reservedLet: {
		token: 'let',
		isCode: true,
		file: 'let',
		info: 'let',
		example:
			`let idade = 10;\n` +
			`console.log(idade);\n` +
			`idade = idade + 5;\n` +
			`console.log(idade);\n` +
			`idade = idade + 3;\n` +
			`console.log(idade);`
	},
	/*
	reservedOf: {
		token: 'of',
		isCode: true,
		file: 'of',
		info: 'of',
		example: ''
	},
	*/
};
