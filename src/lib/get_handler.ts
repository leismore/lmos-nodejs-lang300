import { Request, Response } from 'express';
import CONFIG from '../config.json';
import resolveAcceptLanguage from 'resolve-accept-language';
import { lowercase_mapping } from './lowercase_mapping.js';

const langTag = CONFIG.cookies.langTag;
const mapping = lowercase_mapping();
const langDefault = mapping.default;
delete mapping.default;
const statusCode = CONFIG.redirection.statusCode;

function get_handler(req:Request, res:Response):void
{
    let langCookie:string;
    let langSelected:string;
    let langRequest:string;
    if (req.headers['accept-language'] !== undefined)
    {
        langRequest = req.headers['accept-language'];
    }

    if (langTag in req.cookies && req.cookies[langTag] in mapping)
    {
        langSelected = req.cookies[langTag];
        res.redirect(Number(statusCode), mapping[langSelected]);
        return;
    }
    else
    {
        
    }

}

export { get_handler };
