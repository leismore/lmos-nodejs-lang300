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

// 1. Without cookies; Should be en-US
const requestHeaders_normal1:{[key:string]:string} = {
  'Accept-Language': 'en-US, en-GB;q=0.9, en;q=0.8, zh-CN;q=0.7, zh;q=0.6'
};

// 2. Without cookies; Should be en-GB
const requestHeaders_normal2:{[key:string]:string} = {
  'Accept-Language': 'en-US;q=0.9, en-GB, en;q=0.8, zh-CN;q=0.7, zh;q=0.6'
};

// 3. With cookies; Should be en-GB
const requestHeaders_cookie1:{[key:string]:string} = {
  'Accept-Language': 'en-US, en-GB;q=0.9, en;q=0.8, zh-CN;q=0.7, zh;q=0.6',
  'Cookie': `${cookieLangTag}=en-GB`
};

// 4. With cookies; Should be en-US
const requestHeaders_cookie2:{[key:string]:string} = {
  'Accept-Language': 'en-US;q=0.9, en-GB, en;q=0.8, zh-CN;q=0.7, zh;q=0.6',
  'Cookie': `${cookieLangTag}=en-US`
};

// 5. With an unsupported cookie; Should be en-GB
const requestHeaders_cookie3:{[key:string]:string} = {
  'Accept-Language': 'en-US;q=0.9, en-GB, en;q=0.8, zh-CN;q=0.7, zh;q=0.6',
  'Cookie': `${cookieLangTag}=zh-CN`
};

// 6. No supported; Should use the default language; Without cookies
const requestHeaders_default1:{[key:string]:string} = {
  'Accept-Language': 'zh-CN, zh;q=0.1'
};

// 7. No supported; Should use the default language; With cookies
const requestHeaders_default2:{[key:string]:string} = {
  'Accept-Language': 'zh-CN, zh;q=0.1',
  'Cookie': `${cookieLangTag}=zh-CN`
};

describe(`${appName} - Unit Test`, function(){

  it('1. Testing Accept-Language without Cookies - Should return en-US', function(){

    return axios.get(
      endpoint,
      {
        headers:         requestHeaders_normal1,
        maxRedirects:    0,
        validateStatus:  (status:number):boolean => {
          if (status === Number(statusCode))
          {
            return true;
          }
          else
          {
            return false;
          }
        }
      }
    )
    .then( res => {
      assert
      (
        ( res.status                        === Number(statusCode) &&
          res.headers['location']           === mapping['en-us']   &&
          res.headers['vary'].toLowerCase() === 'accept-language'
        ),
        ( '\n' + `Status Code: ${res.status}`           + '\n' +
                 `Location:    ${res.headers.location}` + '\n' +
                 `Vary:        ${res.headers.vary}` )
      );
    });

  }); // it #1

  it('2. Testing Accept-Language without Cookies - Should return en-GB', function(){

    return axios.get(
      endpoint,
      {
        headers:         requestHeaders_normal2,
        maxRedirects:    0,
        validateStatus:  (status:number):boolean => {
          if (status === Number(statusCode))
          {
            return true;
          }
          else
          {
            return false;
          }
        }
      }
    )
    .then( res => {
      assert
      (
        ( res.status                        === Number(statusCode) &&
          res.headers['location']           === mapping['en-gb']   &&
          res.headers['vary'].toLowerCase() === 'accept-language'
        ),
        ( '\n' + `Status Code: ${res.status}`           + '\n' +
                 `Location:    ${res.headers.location}` + '\n' +
                 `Vary:        ${res.headers.vary}` )
      );
    });

  }); // it #2

  it('3. Testing with Cookies - Should return en-GB', function(){

    return axios.get(
      endpoint,
      {
        headers:         requestHeaders_cookie1,
        maxRedirects:    0,
        validateStatus:  (status:number):boolean => {
          if (status === Number(statusCode))
          {
            return true;
          }
          else
          {
            return false;
          }
        }
      }
    )
    .then( res => {
      assert
      (
        ( res.status                        === Number(statusCode) &&
          res.headers['location']           === mapping['en-gb']   &&
          res.headers['vary'].toLowerCase() === 'accept-language'
        ),
        ( '\n' + `Status Code: ${res.status}`           + '\n' +
                 `Location:    ${res.headers.location}` + '\n' +
                 `Vary:        ${res.headers.vary}` )
      );
    });

  }); // it #3

  it('4. Testing with Cookies - Should return en-US', function(){

    return axios.get(
      endpoint,
      {
        headers:         requestHeaders_cookie2,
        maxRedirects:    0,
        validateStatus:  (status:number):boolean => {
          if (status === Number(statusCode))
          {
            return true;
          }
          else
          {
            return false;
          }
        }
      }
    )
    .then( res => {
      assert
      (
        ( res.status                        === Number(statusCode) &&
          res.headers['location']           === mapping['en-us']   &&
          res.headers['vary'].toLowerCase() === 'accept-language'
        ),
        ( '\n' + `Status Code: ${res.status}`           + '\n' +
                 `Location:    ${res.headers.location}` + '\n' +
                 `Vary:        ${res.headers.vary}` )
      );
    });

  }); // it #4

  it('5. Testing with an Unsupported Cookie - Should return en-GB', function(){

    return axios.get(
      endpoint,
      {
        headers:         requestHeaders_cookie3,
        maxRedirects:    0,
        validateStatus:  (status:number):boolean => {
          if (status === Number(statusCode))
          {
            return true;
          }
          else
          {
            return false;
          }
        }
      }
    )
    .then( res => {
      assert
      (
        ( res.status                        === Number(statusCode) &&
          res.headers['location']           === mapping['en-gb']   &&
          res.headers['vary'].toLowerCase() === 'accept-language'
        ),
        ( '\n' + `Status Code: ${res.status}`           + '\n' +
                 `Location:    ${res.headers.location}` + '\n' +
                 `Vary:        ${res.headers.vary}` )
      );
    });

  }); // it #5

  it('6. Testing Unsupported Accept-Language, without Cookies - Should return the default language', function(){

    return axios.get(
      endpoint,
      {
        headers:         requestHeaders_default1,
        maxRedirects:    0,
        validateStatus:  (status:number):boolean => {
          if (status === Number(statusCode))
          {
            return true;
          }
          else
          {
            return false;
          }
        }
      }
    )
    .then( res => {
      assert
      (
        ( res.status                        === Number(statusCode)   &&
          res.headers['location']           === mapping[defaultLang] &&
          res.headers['vary'].toLowerCase() === 'accept-language'
        ),
        ( '\n' + `Status Code: ${res.status}`           + '\n' +
                 `Location:    ${res.headers.location}` + '\n' +
                 `Vary:        ${res.headers.vary}` )
      );
    });

  }); // it #6

  it('7. Testing with an Unsupported Cookie and an Unsupported Accept-Language - Should return the default language', function(){

    return axios.get(
      endpoint,
      {
        headers:         requestHeaders_default2,
        maxRedirects:    0,
        validateStatus:  (status:number):boolean => {
          if (status === Number(statusCode))
          {
            return true;
          }
          else
          {
            return false;
          }
        }
      }
    )
    .then( res => {
      assert
      (
        ( res.status                        === Number(statusCode)   &&
          res.headers['location']           === mapping[defaultLang] &&
          res.headers['vary'].toLowerCase() === 'accept-language'
        ),
        ( '\n' + `Status Code: ${res.status}`           + '\n' +
                 `Location:    ${res.headers.location}` + '\n' +
                 `Vary:        ${res.headers.vary}` )
      );
    });

  }); // it #7

}); // Describe
