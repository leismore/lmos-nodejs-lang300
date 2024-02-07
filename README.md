# lmos-nodejs-lang300

A HTTP redirector which navigates users to language-specified URLs based on their language preferences

## Motivation

My name is [Kyle Chine](https://www.kylechine.name). I am a Chinese blogger who also has an English blog. I am hosting my blogs at:

1. <https://zh-hans.blog.kylechine.name> for the Simplified Chinese version
2. <https://zh-hant.blog.kylechine.name> for the Traditional Chinese version
3. <https://en.blog.kylechine.name> for the English version

Although these are well-structured URLs, I believe everybody should agree that this is not user-friendly at all.

What I need is an easy-to-remember portal URL <https://blog.kylechine.name> for all my blogs, via which my readers could be redirected to a specified language version according to their language preferences.

This is the reason behind `lmos-nodejs-lang300` project. 300 is come from HTTP 3xx status codes.

## How It Works

Firstly, this application will check a browser cookie named `lang`. If its value is a supported [language tag](https://www.rfc-editor.org/info/rfc5646), then redirect the user to the language-specified URL.

Secondly, the HTTP [Accept-Language](https://www.rfc-editor.org/rfc/rfc2616.html#page-104) request header will be checked with a supported language list. The user will be redirected to a matched language-specified URL.

Lastly, if no language could be matched, the user will be redirected to the default langugae URL.

## Installation

`git clone https://github.com/leismore/lmos-nodejs-lang300.git`

## Test

`npm test`

## Configuration

In `src/config.json`,

* `app.name`:     Change to your instance name
* `app.id`:       Change to a new UUID
* `app.host`:     Change to your host name
* `app.port`:     Change to your port number
* `defaultLang`:  Change to your default language tag
* `mapping`:      Change to your language tag list and URLs

For the format of language tags, always use `<primary_language_2letters>-<COUNTRY_CODE_2LETTERS>`

## Build

`npm run build`

## Run

`node ./dist/index.js`

## Donation

[![Donate with PayPal button](https://www.paypalobjects.com/en_AU/i/btn/btn_donateCC_LG.gif "PayPal - The safer, easier way to pay online!")](https://www.paypal.com/donate/?hosted_button_id=7JP6Y2PKH3G8L)

## License

© [Leismore](https://www.leismore.co) 2024

GNU AFFERO GENERAL PUBLIC LICENSE v3

## Authors

* [Kyle Chine](https://kyle-chine.leismore.co) since 07 February 2024




---

[![Leismore Logo](https://logos.leismore.co/en/3-0-0/light/textual-margins.svg)](https://lmos.leismore.org)

Product of [Leismore OpenSource](https://lmos.leismore.org)

[Leismore](https://www.leismore.co) (Australian Business Number: 25 935 862 619) is *your affordable and reliable business software provider* since 2021
