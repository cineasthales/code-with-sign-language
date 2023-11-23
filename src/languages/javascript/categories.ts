import { ICategory } from "../../extension";

export const categories: ICategory[]  = [
	{
		title: 'Variáveis e Constantes',
		id: 'Var',
		icon: 'tags',
		signs: ['var', 'let', 'const', 'typeof'],
	},
	{
		title: 'Valores',
		id: 'Value',
		icon: 'flag',
		signs: ['true', 'false', 'null', 'undefined'],
	},
	{
		title: 'Estruturas de Condição',
		id: 'Condition',
		icon: 'arrows-split-up-and-left',
		signs: ['if', 'else', 'switch', 'case', 'default'],
	},
	{
		title: 'Estruturas de Repetição',
		id: 'Repetition',
		icon: 'rotate-left',
		signs: ['while', 'do', 'break', 'continue', 'for', 'of', 'in'],
	},
	{
		title: 'Tratamento de Exceção',
		id: 'Exception',
		icon: 'triangle-exclamation',
		signs: ['try', 'catch', 'finally', 'throw'],
	},
	{
		title: 'Funções e Métodos',
		id: 'Function',
		icon: 'gears',
		signs: ['function', 'void', 'return', 'arguments', 'eval', 'yield'],
	},
	{
		title: 'Classes',
		id: 'Class',
		icon: 'sitemap',
		signs: ['class', 'constructor', 'get', 'set', 'extends', 'static'],
	},
	{
		title: 'Objetos',
		id: 'Object',
		icon: 'icons',
		signs: ['new', 'this', 'super', 'instanceof', 'delete'],
	},
	{
		title: 'Programação Assíncrona',
		id: 'Async',
		icon: 'arrows-turn-right',
		signs: ['async', 'await'],
	},
	{
		title: 'Módulos',
		id: 'Module',
		icon: 'cubes',
		signs: ['import', 'export', 'from', 'as'],
	},
	{
		title: 'Depuração',
		id: 'Debug',
		icon: 'bug-slash',
		signs: ['debugger'],
	},
];