import { Uri } from 'vscode';

export interface ITooltips
{
    id: string;
    file: Uri;
}

export interface ISign
{
    token: string;
    isCode: boolean;
    file: string;
    info: string;
    examples: string[];
}

export interface ISignVideos
{
    token: string;
    file: Uri;
    info: Uri | undefined;
    examples: string[] | undefined;
}

export interface ICategory 
{
    title: string;
    id: string;
    icon: string;
    tooltip: string;
    signs: ISign[];
}

export interface ICategoryVideos
{
    title: string;
    id: string;
    icon: string;
    tooltip: Uri;
    videos: ISignVideos[];
}
