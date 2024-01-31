/**
 * Checking HTTP Accept-Language
 */

import { Request, Response, NextFunction } from 'express';
import resolveAcceptLanguage from 'resolve-accept-language';
import CONFIG from '../config.json' assert {type: 'json'};
import { lowercase_mapping } from './lowercase_mapping.js';

const mapping       = lowercase_mapping();
const langSupported = Object.keys(mapping);
const langDefault   = CONFIG.defaultLang.toLowerCase();

function get_handler2(req:Request, res:Response, next:NextFunction):void
{
    let lang:(string|null) = res.locals.lang;
    let langRequest:string;

    if (lang === null)
    {
        if ('accept-language' in req.headers && typeof req.headers['accept-language'] === 'string')
        {
            langRequest = req.headers['accept-language'];
            res.locals.lang = resolveAcceptLanguage.default(langRequest, langSupported, langDefault).toLowerCase();
        }
        else
        {
            res.locals.lang = langDefault;
        }
    }
    
    next();
}

export { get_handler2 };
