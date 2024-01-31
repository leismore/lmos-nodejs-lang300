import { Request, Response } from 'express';
import CONFIG from '../config.json' assert {type: 'json'};
import resolveAcceptLanguage from 'resolve-accept-language';
import { lowercase_mapping } from './lowercase_mapping.js';
import { LMResponse, LMResponseData } from '@leismore/lmos-nodejs-lmresponse';

const cookieTag = CONFIG.cookies.langTag;
const mapping = lowercase_mapping();
const langDefault = CONFIG.defaultLang;
const statusCode = CONFIG.redirection.statusCode;

function get_handler(req:Request, res:Response):void
{
    const resp = new LMResponse(res);

    let langCookie:string;
    let langSelected:string;
    let langRequest:string;
    
    resp.send({
        statusCode: statusCode,
        headers: {Location: CONFIG.mapping['en-US']}
    });
}

export { get_handler };
