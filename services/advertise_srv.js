
const fs = require('fs');
const base64toFile = require('node-base64-to-file');

exports.uploadAdvertice = async (parentFolder1, newFolder1, pic) => {

  const parentFolder = `M:/${parentFolder1}`;
  const newFolder = newFolder1;
  const folderPath = `${parentFolder}/${newFolder}`

  if (fs.existsSync(folderPath)) {
    console.log(`Folder '${folderPath}' exists.`);
  }
  else {

    console.log(`Folder '${folderPath}' does not exist.`);

    fs.mkdir(`folderPath`, { recursive: true }, (err) => {
      if (err) {
        throw err;
      }
      else {
        console.log('New folder created successfully!');
      }
    });
  }


  const base64String = 'data:image/png;base64,iVBORw0KGgo...';


  // create an image with the a given name ie 'image'
  try {
    const imagePath = await base64toFile(base64String, { filePath: folderPath, fileName: pic, types: ['png'], fileMaxSize: 3145728 });
    console.log(imagePath)
  } catch (error) {
    console.log(error)
  }

}






