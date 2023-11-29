import { Uri } from 'vscode';

export interface ICategory 
{
    title: string;
    id: string;
    icon: string;
    videos: IVideo[];
}

export interface IVideo
{
    token: string;
    file: Uri;
    info: Uri | undefined;
    examples: string[] | undefined;
}

export interface ISign
{
    token: string;
    directory: string;
    file: string;
    info: string;
    examples: string[];
}
