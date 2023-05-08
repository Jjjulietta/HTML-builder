const fs = require('fs');
const path = require('path');


async function readDir(){
  let files = await fs.promises.readdir((path.join(__dirname, 'styles')));
  let n = files.length;
  let dataStyles = [];
  let i = 0;
  while(i < n){
    const stat = await fs.promises.stat(path.join(__dirname, 'styles', files[i]));
    if(stat.isFile()) {
      let exten = path.extname(files[i], __filename);
      if(exten === '.css') {
        files[i] = await fs.promises.readFile(path.join(__dirname, 'styles', files[i]), 'utf-8');
        dataStyles.push(files[i]);
  
      } }i++;}
  let string = dataStyles.join('');

  fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), string, (error) => {
    if(error) { throw error;}
  });

}
readDir();
