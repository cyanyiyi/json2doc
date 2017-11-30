const fs = require('fs');
const path = require('path');
const I18N_PATH = path.join(__dirname, 'i18n');
const I18N_PATH_EN = path.join(I18N_PATH, 'en-US.js')
const LAN_CN = 'zh-CN';
const LAN_TW = 'zh-TW';
const LAN_EN = 'en-US';
const REG_EXP_NOTE = new RegExp("(/\\\*([^*]|[\\\r\\\n]|(\\\*+([^*/]|[\\\r\\\n])))*\\\*+/)|(//.*)","g");  
console.log(I18N_PATH_EN);
let strFileData = fs.readFileSync(I18N_PATH_EN, 'utf8');
console.log(strFileData.match(REG_EXP_NOTE));
let strFileData2 = strFileData.replace(REG_EXP_NOTE, "");  
// console.log(strFileData2);
let parseFileData = JSON.parse(strFileData2);
// console.log(fileData);
console.log(parseFileData);

