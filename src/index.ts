/**
 * res.locals:
 *   lang:(string|null) - The selected language tag (lowercase)
 */

import express from 'express';
import CONFIG from './config.json' assert {type: 'json'};
import { get_handler1 } from './lib/get_handler1.js';
import { get_handler2 } from './lib/get_handler2.js';
import { get_handler3 } from './lib/get_handler3.js';

const appName = CONFIG.app.name;
const port = CONFIG.app.port;

const app = express();


app.get('/', get_handler1, get_handler2, get_handler3);

app.listen(port, CONFIG.app.host, CONFIG.app.backlog, () => {
  console.log(`${appName} listening on port ${port}`)
})
