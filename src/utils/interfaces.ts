import { Uri } from 'vscode';

export interface ICategory 
{
    title: string;
    id: string;
    icon: string;
    signs: string[];
}

export interface IVideo
{
    sign: string;
    file: Uri;
    info: Uri | undefined;
}