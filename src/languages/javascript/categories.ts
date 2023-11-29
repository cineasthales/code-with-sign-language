import { ICategory } from '../../utils/interfaces';
import { signs } from './sintax';

export const categories: ICategory[]  = [
	{
		title: 'Variáveis, Constantes e Vetores',
		id: 'Var',
		icon: 'tags',
		videos: [
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
		videos: [
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
		videos: [
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
		videos: [
			
		],
	},
	{
		title: 'Operadores Relacionais',
		id: 'Relational',
		icon: 'code-compare',
		videos: [
			
		],
	},
	{
		title: 'Operadores Lógicos',
		id: 'Logical',
		icon: 'flag',
		videos: [
			
		],
	},
	{
		title: 'Estruturas de Repetição',
		id: 'Repetition',
		icon: 'rotate-left',
		videos: [
			
		],
	},
	{
		title: 'Tratamento de Exceção e Depuração',
		id: 'Exception',
		icon: 'triangle-exclamation',
		videos: [
			
		],
	},
	{
		title: 'Funções e Métodos',
		id: 'Function',
		icon: 'gears',
		videos: [
			
		],
	},
	{
		title: 'Classes',
		id: 'Class',
		icon: 'sitemap',
		videos: [
			
		],
	},
	{
		title: 'Objetos',
		id: 'Object',
		icon: 'object-group',
		videos: [
			
		],
	},
	{
		title: 'Módulos',
		id: 'Module',
		icon: 'cubes',
		videos: [
			
		],
	},
	{
		title: 'Outros',
		id: 'Other',
		icon: 'icons',
		videos: [
			
		],
	},
];
