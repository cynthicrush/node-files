const fs = require('fs')
const process = require('process')
const axios = require('axios')

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else {
            console.log(data);
        }
    })
}


async function webCat(url) {
    let response = axios.get(url)
    response
    .then(res => console.log(res.data))
    .catch(err => {
         console.log(`Error fetching ${url}: ${err}`);
         process.exit(1);

    })
}


let path = process.argv[2];

if(path.slice(0, 4) === 'http') {
    webCat(path);
} else {
    cat(path)
}

