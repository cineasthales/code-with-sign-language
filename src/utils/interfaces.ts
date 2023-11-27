import { Uri } from 'vscode';

export interface ICategory 
{
    title: string;
    id: string;
    icon: string;
    signs: string[];
}

export interface IResult
{
    token: string;
    sign: string;
    info: string;
}

export interface IVideo
{
    token: string;
    sign: Uri;
    info: Uri | undefined;
}