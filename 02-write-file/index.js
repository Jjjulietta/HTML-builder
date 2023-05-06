const fs = require('fs');
const path = require('path');
const { stdin, stdout} = process;

//const input = fs.createReadStream(path.join(__dirname, 'input.txt'), 'utf-8');
const output = fs.createWriteStream(path.join(__dirname, 'input.txt'));
stdout.write('Здравствуйте! Введите текст.\n');

stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit'){stdout.write('До свидания!'); process.exit();}
  else {output.write(data);}
  process.on('SIGINT', () => {stdout.write('До свидания!'); process.exit();});
});