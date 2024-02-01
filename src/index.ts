/**
 * res.locals:
 *   lang:(string|null) - The selected language tag (lowercase)
 */

import express from 'express';
import cookieParser from 'cookie-parser';
import CONFIG from './config.json' assert {type: 'json'};
import { get_handler1 } from './lib/get_handler1.js';
import { get_handler2 } from './lib/get_handler2.js';
import { get_handler3 } from './lib/get_handler3.js';

const appName = CONFIG.app.name;
const host    = CONFIG.app.host;
const port    = CONFIG.app.port;
const backlog = CONFIG.app.backlog;

const app = express();
app.use(cookieParser());

app.get('/', get_handler1, get_handler2, get_handler3);

app.listen(Number(port), host, backlog, () => {
  console.log(`${appName} is listening on ${host}:${port}`);
});
