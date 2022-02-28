const fs = require('fs')
const process = require('process')
const axios = require('axios')


function handleOutput(content, out) {
    if(out) {
        fs.writeFile(out, content, 'utf8', function(err) {
            if(err) {
                console.log(`Couldn't write ${out}: ${err}`);
                process.exit(1);
            }
        })
    } else {
        console.log(content);
    }
}


function cat(path, out) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else {
            handleOutput(data, out);
        }
    })
}


async function webCat(url, out) {
    let response = axios.get(url)
    response
    .then(res => handleOutput(res.data, out))
    .catch(err => {
         console.log(`Error fetching ${url}: ${err}`);
         process.exit(1);

    })
}


let path;
let out;

if (process.argv[2] === '--out') {
    out = process.argv[3]
    path = process.argv[4]
} else {
    path = process.argv[2];
}


if(path.slice(0, 4) === 'http') {
    webCat(path, out);
} else {
    cat(path, out)
}

