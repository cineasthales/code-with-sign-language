import { ICategory } from '../../utils/interfaces';
import { signs } from './sintax';

export const categories: ICategory[]  = [
	{
		title: 'Variáveis e Constantes',
		id: 'Var',
		icon: 'tags',
		tooltip: 'var',
		signs: [
			signs.reservedLet,
			signs.reservedConst,
			signs.assignment,
			signs.reservedTypeof,
			signs.reservedVar,
		],
	},
	{
		title: 'Valores',
		id: 'Value',
		icon: 'magnifying-glass-chart',
		tooltip: 'value',
		signs: [
			signs.reservedTrue,
			signs.reservedFalse,
			signs.reservedNull,
			signs.reservedUndefined,
			signs.stringQuotationBegin,
			signs.stringQuotationEnd,
			signs.stringApostropheBegin,
			signs.stringApostropheEnd,
			//signs.stringTemplateBegin,
			//signs.stringTemplateEnd,
		],
	},
	{
		title: 'Operadores Matemáticos',
		id: 'Math',
		icon: 'calculator',
		tooltip: 'math',
		signs: [
			signs.plusOrConcat,
			signs.minus,
			signs.times,
			signs.divisionOrRegex,
			signs.modulus,
			signs.power,
			//signs.increment,
			//signs.decrement,
		],
	},
	{
		title: 'Estruturas de Condição',
		id: 'Conditional',
		icon: 'arrows-split-up-and-left',
		tooltip: 'conditional',
		signs: [
			signs.reservedIf,
			signs.reservedElse,
			//signs.reservedSwitch,
			//signs.reservedCase,
			//signs.reservedBreak,
			//signs.reservedDefault,
			//signs.ternaryIf,
			//signs.ternaryElseOrPropertyValue,
			//signs.nullCoalesc,
		],
	},
	{
		title: 'Operadores Relacionais',
		id: 'Relational',
		icon: 'code-compare',
		tooltip: 'relational',
		signs: [
			signs.equalStrict,
			signs.equal,
			signs.differentStrict,
			signs.different,
			signs.greaterEqual,
			signs.greater,
			signs.lesserEqual,
			signs.lesser,
		],
	},
	{
		title: 'Operadores Lógicos',
		id: 'Logical',
		icon: 'flag',
		tooltip: 'logical',
		signs: [
			signs.not,
			signs.and,
			signs.or,
			//signs.bitwiseNot,
			//signs.bitwiseAnd,
			//signs.bitwiseOr,
			//signs.bitwiseXor,
			//signs.bitwiseShiftLeft,
			//signs.bitwiseShiftRight,
			//signs.bitwiseShiftUnsigned,
		],
	},
	/*
	{
		title: 'Estruturas de Repetição',
		id: 'Repetition',
		icon: 'rotate-left',
		tooltip: 'repetition',
		signs: [
			signs.reservedWhile,
			signs.reservedDo,
			signs.reservedFor,
			signs.reservedIn,
			signs.reservedOf,
			signs.reservedContinue,
		],
	},
	{
		title: 'Funções',
		id: 'Function',
		icon: 'gears',
		tooltip: 'function',
		signs: [
			signs.reservedFunction,
			signs.reservedReturn,
			signs.reservedVoid,
			signs.functionArrow,
			signs.reservedYield,
			signs.reservedArguments,
			signs.reservedAsync,
			signs.reservedAwait,
			signs.reservedFunctionGenerator,
			signs.reservedYieldGenerator,
		],
	},
	{
		title: 'Tratamento de Exceção e Depuração',
		id: 'Exception',
		icon: 'triangle-exclamation',
		tooltip: 'exception',
		signs: [
			signs.reservedTry,
			signs.reservedCatch,
			signs.reservedFinally,
			signs.reservedThrow,
			signs.reservedDebugger,
		],
	},
	{
		title: 'Vetores e Objetos',
		id: 'Object',
		icon: 'object-group',
		tooltip: 'object',
		signs: [
			signs.blockOrObjectBegin,
			signs.blockOrObjectEnd,
			signs.arrayBegin,
			signs.arrayEnd,
			signs.reservedNew,
			signs.reservedThis,
			signs.reservedSuper,
			signs.chain,
			signs.chainOptional,
			signs.reservedInstanceof,
			signs.reservedDelete,
		],
	},
	{
		title: 'Classes',
		id: 'Class',
		icon: 'sitemap',
		tooltip: 'class',
		signs: [
			signs.reservedClass,
			signs.reservedConstructor,
			signs.reservedGet,
			signs.reservedSet,
			signs.reservedExtends,
			signs.reservedStatic,
		],
	},
	{
		title: 'Módulos',
		id: 'Module',
		icon: 'cubes',
		tooltip: 'module',
		signs: [
			signs.reservedImport,
			signs.reservedFrom,
			signs.reservedAs,
			signs.reservedExport,
		],
	},
	{
		title: 'Outros',
		id: 'Other',
		icon: 'icons',
		tooltip: 'other',
		signs: [
			signs.comma,
			signs.semicolon,
			signs.groupBegin,
			signs.groupEnd,
			signs.spreadOrRest,
			signs.commentLine,
			signs.commentBlockBegin,
			signs.commentBlockEnd,
			signs.commentHashbang,
		],
	},
	*/
];
