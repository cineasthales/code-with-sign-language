import { ICategory } from '../../utils/interfaces';
import { signs } from './sintax';

export const categories: ICategory[]  = [
	{
		title: 'Variáveis, Constantes e Vetores',
		id: 'Var',
		icon: 'tags',
		signs: [
			signs.reservedVar,
			signs.reservedLet,
			signs.reservedConst,
			signs.assignment,
			signs.reservedTypeof,
			signs.arrayBegin,
			signs.arrayEnd,
		],
	},
	{
		title: 'Valores',
		id: 'Value',
		icon: 'magnifying-glass-chart',
		signs: [
			signs.reservedTrue,
			signs.reservedFalse,
			signs.reservedNull,
			signs.reservedUndefined,
			signs.stringQuotationBegin,
			signs.stringQuotationEnd,
			signs.stringApostropheBegin,
			signs.stringApostropheEnd,
			signs.stringTemplateBegin,
			signs.stringTemplateEnd,
		],
	},
	{
		title: 'Operadores Matemáticos',
		id: 'Math',
		icon: 'calculator',
		signs: [
			signs.plusOrConcat,
			signs.minus,
			signs.times,
			signs.divisionOrRegex,
			signs.modulus,
			signs.power,
			signs.increment,
			signs.decrement,
		],
	},
	{
		title: 'Estruturas de Condição',
		id: 'Condition',
		icon: 'arrows-split-up-and-left',
		signs: [
			signs.reservedIf,
			signs.reservedElse,
			signs.reservedSwitch,
			signs.reservedCase,
			signs.reservedDefault,
			signs.ternaryIf,
			signs.ternaryElseOrPropertyValue,
			signs.nullCoalesc,
		],
	},
	{
		title: 'Operadores Relacionais',
		id: 'Relational',
		icon: 'code-compare',
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
		signs: [
			signs.not,
			signs.and,
			signs.or,
			signs.bitwiseNot,
			signs.bitwiseAnd,
			signs.bitwiseOr,
			signs.bitwiseXor,
			signs.bitwiseShiftLeft,
			signs.bitwiseShiftRight,
			signs.bitwiseShiftUnsigned,
		],
	},
	{
		title: 'Estruturas de Repetição',
		id: 'Repetition',
		icon: 'rotate-left',
		signs: [
			
		],
	},
	{
		title: 'Tratamento de Exceção e Depuração',
		id: 'Exception',
		icon: 'triangle-exclamation',
		signs: [
			
		],
	},
	{
		title: 'Funções e Métodos',
		id: 'Function',
		icon: 'gears',
		signs: [
			
		],
	},
	{
		title: 'Classes',
		id: 'Class',
		icon: 'sitemap',
		signs: [
			
		],
	},
	{
		title: 'Objetos',
		id: 'Object',
		icon: 'object-group',
		signs: [
			
		],
	},
	{
		title: 'Módulos',
		id: 'Module',
		icon: 'cubes',
		signs: [
			
		],
	},
	{
		title: 'Outros',
		id: 'Other',
		icon: 'icons',
		signs: [
			
		],
	},
];
