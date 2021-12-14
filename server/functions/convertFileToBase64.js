const fs = require('fs');
const path = require('path');

exports.convertFileToBase64 = async (fileName) => {
    const filePath = path.resolve('files', fileName);
    const fileContent = await fs.readFile(filePath, { encoding: 'base64url' });
    return fileContent;
}