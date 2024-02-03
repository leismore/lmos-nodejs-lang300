import { assert }       from 'chai';
import axios            from 'axios';
import CONFIG from '../src/config.json' assert {type: 'json'};
import { lowercase_mapping } from '../src/lib/lowercase_mapping.js';

const appName       = CONFIG.app.name;
const host          = CONFIG.app.host;
const port          = CONFIG.app.port;
const statusCode    = CONFIG.redirection.statusCode;
const mapping       = lowercase_mapping();
const defaultLang   = CONFIG.defaultLang.toLowerCase();
const cookieLangTag = CONFIG.cookies.langTag;

const endpoint = `http://${host}:${port}`;



describe(`${appName} - Unit Test`, function(){

  it('Should redirect to Google', function(){
    return axios.get( endpoint, {headers: {
        'Accept-Language': 'en-US;q=0.5, en-GB;q=0.9, en;q=0.8'
    }, maxRedirects: 0, validateStatus: (status:number):boolean =>{
        if (status === 302)
        {
            return true;
        }
        else {return false}
    },}
    )
    .then( res => {
      assert
      (
        ( res.status === Number(statusCode) &&
          res.headers['location'] === CONFIG.mapping['en-GB'] &&
          res.headers['vary']  === 'accept-language'
        ),
        'Invalid data'
      );
    })
    .catch( e => {
      assert(false, 'Server failure');
    });
  });

});
