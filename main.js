const fs = require('fs');
const path = require('path');
const I18N_PATH = path.join(__dirname, 'i18n');
const I18N_PATH_EN = path.join(I18N_PATH, 'en-US.js');
const I18N_PATH_TEST = path.join(I18N_PATH, 'test.json');
const LAN_CN = 'zh-CN';
const LAN_TW = 'zh-TW';
const LAN_EN = 'en-US';
const REG_EXP_NOTE = new RegExp("(/\\\*([^*]|[\\\r\\\n]|(\\\*+([^*/]|[\\\r\\\n])))*\\\*+/)|(//.*)","g");  
const REG_EXP_CONST = /const[\s]*lan[\s]*=/g;
const REG_EXP_EXPORTS = /module.exports[\s]*=[\s]*lan;/g;

console.log(I18N_PATH_TEST);
// let strFileData = fs.readFileSync(I18N_PATH_EN, 'utf8');
let strFileData = fs.readFileSync(I18N_PATH_TEST, 'utf8');
console.log(strFileData);
// console.log(typeof strFileData);
// console.log(strFileData.match(REG_EXP_CONST));
// console.log(strFileData.match(REG_EXP_EXPORTS));
let strFileDataTmp = strFileData.replace(REG_EXP_NOTE, "");  
strFileDataTmp = strFileDataTmp.replace(REG_EXP_CONST, "");  
let strFileDataJson = strFileDataTmp.replace(REG_EXP_EXPORTS, "");  
console.log(strFileDataJson);
let parseFileData = JSON.parse(strFileDataJson);
console.log(parseFileData);

