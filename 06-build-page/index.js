
const fs = require('fs');
const path = require('path');

async function makeDir(){
  try {
    await fs.promises.mkdir(path.join(__dirname, 'project-dist'), {recursive: true});
  } catch (error) {
    if(error.code === 'EEXIST') { console.error(error.message);
      return;
    }    
  }
}

makeDir();
async function copyDir(){
  let link = [__dirname, 'project-dist', 'assets'];
  let assetsLink = [__dirname, 'assets'];
  let projectFolder;
  projectFolder = path.join(...link);
  let assetsFolder;
  assetsFolder = path.join(...assetsLink);
 
  try {
    await fs.promises.mkdir(projectFolder, {recursive: true});
  } catch (error){
    if(error.code === 'EEXIST') {
      throw error;
    }
  }
  const filesDir = await fs.promises.readdir(projectFolder);
  for(let j = 0; j < filesDir.length; j += 1) {
    link.push(filesDir[j]);
    projectFolder = path.join(...link);
    await  fs.promises.rm( projectFolder, {force:true, recursive: true});
    
    link = [__dirname, 'project-dist', 'assets']; continue;
  }
  const files = await fs.promises.readdir(assetsFolder);
  for(let i = 0; i < files.length; i += 1) {
  
    // console.log(files[i]);
    if(files[i]){ copyFile(link, assetsLink, files[i]); }
    link = [__dirname, 'project-dist', 'assets'];
    assetsLink = [__dirname, 'assets']; continue;

  
  }
}

/* ---------- COPY FILE ASSETS ----------------------------------*/

async function copyFile(link, assetsLink, fileName) {
  let projectFolder;
  projectFolder = path.join(...link);
  let assetsFolder;
  assetsFolder = path.join(...assetsLink);
  link.push(fileName);
  assetsLink.push(fileName);
  
  assetsFolder = path.join(...assetsLink);
     
  projectFolder = path.join(...link);
  const stats = await fs.promises.stat(assetsFolder);
  if(stats.isFile()){
    await fs.promises.copyFile(assetsFolder, projectFolder); return;
  } else {   
    try {
      await fs.promises.mkdir(projectFolder, {recursive: true});
    } catch (error){
      if(error.code === 'EEXIST') { await fs.promises.rmdir(projectFolder);
        throw error;
      }
    }

    let filess = await fs.promises.readdir(assetsFolder);
    
    for(let i = 0; i < filess.length; i += 1) {
      link.push(filess[i]);
      assetsLink.push(filess[i]);
      // console.log(link);
      assetsFolder = path.join(...assetsLink);
      projectFolder = path.join(...link);
      const stats = await fs.promises.stat(assetsFolder);
      if(stats.isFile()){
        await  fs.promises.copyFile(assetsFolder, projectFolder);}
      link = link.slice(0, link.length-1);
      
      assetsLink = assetsLink.slice(0, assetsLink.length-1);
      
    }
  }

}


copyDir([__dirname, 'project-dist', 'assets'], [__dirname, 'assets']);


/*-------------- HTML-----------------------------*/

async function readFile() {
  const tags = await fs.promises.readdir(path.join(__dirname, 'components'));
  let n = tags.length;
  let tagsFiles = [];
  let objTags = {};
  let i = 0;
  while(i < n){
    const stat = await fs.promises.stat(path.join(__dirname, 'components', tags[i]));
    if(stat.isFile()) {
      let exten = path.extname(tags[i], __filename);
      if(exten === '.html') {
        let name = path.basename(tags[i], path.extname(tags[i], __filename));
        tags[i] = await fs.promises.readFile(path.join(__dirname, 'components', tags[i]), 'utf-8');
        tagsFiles.push(name);
        objTags[`${name}`] = tags[i];
      } }i++;}
  console.log(tagsFiles);
  //console.log(objTags);
  let template = await fs.promises.readFile(path.join(__dirname, 'template.html'), 'utf-8');
  
  tagsFiles.forEach(element => {if(template.includes(`${element}`)) {
    template = template.replace(`{{${element}}}`, objTags[`${element}`]);
  } 
  } 
  );
  fs.promises.writeFile(path.join(__dirname, 'project-dist', 'index.html'), template);
   
}


readFile();

/*---------------------STYLES---------------------------------------*/

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

  fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), string, (error) => {
    if(error) { throw error;}
  });

}
readDir();