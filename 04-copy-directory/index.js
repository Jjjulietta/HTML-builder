const fs = require('fs');
const path = require('path');
const { stdout} = process;

function copyDir() {
  fs.mkdir(path.join(__dirname, 'files-copy'), {recursive: true},  err =>{
    if(err) {throw err;}
  });
  fs.readdir(path.join(__dirname, 'files-copy'), (error, files) =>{
    if(error) {throw error;}
    files.forEach(element => fs.unlink(path.join(__dirname, 'files-copy', element), err => {
      if(err) throw err;
    }));
  });
  fs.readdir(path.join(__dirname, 'files'), (error, files) => {
    if(error) {throw error;}
    files.forEach(element => fs.copyFile(path.join(__dirname, 'files', element), path.join(__dirname, 'files-copy', element), (err) => {
      if(err) throw err;
    }));
  });
  stdout.write(path.join(__dirname, 'files-copy'));
}
copyDir();
