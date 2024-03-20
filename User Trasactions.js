'use strict';

const fs = require('fs');
const https = require('https');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');
    main();
});

function readLine() {
    return inputString[currentLine++];
}

async function getNumTransactions(username) {
    // Make a GET request to the API endpoint to fetch user details
    const userResponse = await fetchData(`https://jsonmock.hackerrank.com/api/article_users?username=${username}`);
    
    if (userResponse.data.length === 0) {
        return 'Username Not Found';
    }

    const userId = userResponse.data[0].id;

    // Make a GET request to the API endpoint to fetch transactions using the userId
    const transactionsResponse = await fetchData(`https://jsonmock.hackerrank.com/api/transactions?&userId=${userId}`);

    return transactionsResponse.total;
}

async function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const username = readLine().trim();
    const result = await getNumTransactions(username);
    ws.write(result.toString());
}

async function fetchData(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve(JSON.parse(data));
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

