const fs = require('fs');
const path = require('path');
const input = fs.createReadStream(path.join(__dirname, 'text.txt',), 'utf-8');
let data = '';
input.on('data', chunk => console.log(data +=chunk));