const fs = require('fs');
const path = require('path');


fs.readdir(path.join(__dirname, 'secret-folder'), {withFileType: true}, (error, files) => {
  if(error) {console.error(error.message);}
  files.forEach(element => {
    if(fs.stat(path.join(__dirname, 'secret-folder', element), (err, stats) =>{
      if(err) {console.error(err.message); return; }
      if(stats.isFile()){
        let fileName = '';
        let exten = path.extname(element, __filename);
   
        let name = path.basename(element, path.extname(element, __filename));
        fileName += `${name} `;
        fileName += `- ${exten.toString().slice(1)} - `;
        let size = stats.size;
        fileName += `${size}b`; 
        console.log(fileName);
      }}));
    
    
   
      
      
  } );});
  