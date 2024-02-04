/**
 * Checking the language-tag cookie
 */

import { Request, Response, NextFunction } from 'express';
import CONFIG from '../config.json' assert {type: 'json'};
import { lowercase_mapping } from './lowercase_mapping.js';

const cookieName    = CONFIG.cookies.langTag;
const mapping       = lowercase_mapping();
const langSupported = Object.keys(mapping);

function get_handler1(req:Request, res:Response, next:NextFunction):void
{
    res.locals.lang = null;
    let cookieValue:string;

    if (cookieName in req.cookies && typeof req.cookies[cookieName] === 'string')
    {
        cookieValue = req.cookies[cookieName].toLowerCase();

        if ( langSupported.includes(cookieValue) )
        {
            res.locals.lang = cookieValue;
        }
    }

    next();
}

export { get_handler1 };
