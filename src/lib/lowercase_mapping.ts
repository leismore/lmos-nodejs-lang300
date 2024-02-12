// Convert the keys in CONFIG.mapping to lowercase form

import CONFIG from '../config.json' with {type: 'json'};

const ORIGIN = CONFIG.mapping;

function lowercase_mapping():{[key:string]:string}
{
    let lowercased:{[key:string]:string} = {};

    for (let key in ORIGIN)
    {
        // @ts-ignore
        lowercased[key.toLowerCase()] = ORIGIN[key];
    }

    return lowercased;
}

export {lowercase_mapping};
