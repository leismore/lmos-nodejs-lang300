/**
 * Redirection
 */

import { Request, Response } from 'express';
import { lowercase_mapping } from './lowercase_mapping.js';
import { LMResponse, LMResponseData } from '@leismore/lmos-nodejs-lmresponse';
import CONFIG from '../config.json' assert {type: 'json'};

const mapping     = lowercase_mapping();
const statusCode  = CONFIG.redirection.statusCode;

function get_handler3(req:Request, res:Response):void
{
    const resp        = new LMResponse(res);
    const lang:string = res.locals.lang;
    const url         = mapping[lang];

    const respData:LMResponseData = {
        statusCode: statusCode,
        headers: {Location: url, Vary: 'accept-language'}
    }

    resp.send(respData);
}

export { get_handler3 };
