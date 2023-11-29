import { Uri } from 'vscode';

export interface ISign
{
    token: string;
    directory: string;
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
    signs: ISign[];
}

export interface ICategoryVideos
{
    title: string;
    id: string;
    icon: string;
    videos: ISignVideos[];
}