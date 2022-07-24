#!/usr/bin/env node

import fetch from 'node-fetch';

// to prevent tls warnings stop the program
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
// to disable warnings
process.env['NODE_NO_WARNINGS'] = '1';

const fetchResults = async (searchText) => {
    const url = "https://www.codegrepper.com/api/get_answers_1.php";

    const req = await fetch(`${url}?v=3&s=${encodeURI(searchText)}`, {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9,fr;q=0.8",
        "cache-control": "no-cache",
        "pragma": "no-cache",
        "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Linux\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site"
      },
      "referrer": "https://www.google.com/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,
      "method": "GET",
      "mode": "cors",
      "credentials": "omit"
    });

    const results = await req.json();
    return results?.answers;
    // return {...results?.answers, ...results?.more_answers};
}

const args = process.argv.slice(2).join(' ');
fetchResults(args).then(answers => {
    if (args.length >= 3){
        console.log(`[-] Searching code snippets for : "${args}"`)
        console.log('- - - - - - - - - - - - - - - - - - - - - - - - - -\n')

        try {
            // fetch results and execute delta difference
            for (let value of Object.values(answers)){
                console.log('\x1b[36m', value?.answer, '\x1b[0m')
                console.log('- - - - - - - - - - - - - - - - - - - - - - - - - -\n')
            }
        } catch (err) {
            console.error(`[x] ${err}`)
        }

    }else {
        console.log('[x] Provide more than 3 characters for your search text.')
        console.log('\n    Usage : ggp <your-search-text>')
        console.log('         ggp javascript recursion example')
        console.log('         grepper-cli javascript recursion example\n')
    }
});


