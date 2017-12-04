const fs = require('fs');
const path = require('path');
const I18N_PATH = path.join(__dirname, 'i18n');
const I18N_PATH_EN_US = path.join(I18N_PATH, 'en-US.js');
const I18N_PATH_ZH_CN = path.join(I18N_PATH, 'zh-CN.js');
const I18N_PATH_TEST = path.join(I18N_PATH, 'test.js');
const LAN_CN = 'zh-CN';
const LAN_TW = 'zh-TW';
const LAN_EN = 'en-US';
const REG_EXP_CN = /[\u4E00-\u9FA5]/g;
let enUsJson = require(I18N_PATH_EN_US);
let zhCnJson = require(I18N_PATH_ZH_CN);
let testJson = require(I18N_PATH_TEST);
let enUsJsonPure = {};

function _isEmptyObject(obj) {
    for (let key in obj) {
        return false;
    }
    return true;
}

function fnFilterZhInEn(obj) {
    for (let k in obj) {
        if (typeof obj[k] === 'object') {
            fnFilterZhInEn(obj[k]);
        } else {
            if (REG_EXP_CN.test(obj[k])) {
                delete obj[k];
            }
        }
    }
    return obj;
}

function fnDeleteEmptyObj(obj) {
    for (let k in obj) {
        if (typeof obj[k] === 'object') {
            if (!_isEmptyObject(obj[k])) {
                fnDeleteEmptyObj(obj[k]);
            } else {
                delete obj[k];
            }
        }
    }
    return obj;
}

let filterJson = fnFilterZhInEn(testJson);
let pureTestJson = fnDeleteEmptyObj(filterJson);




// const REG_EXP_NOTE = new RegExp("(/\\\*([^*]|[\\\r\\\n]|(\\\*+([^*/]|[\\\r\\\n])))*\\\*+/)|(//.*)","g");  
// const REG_EXP_CONST = /const[\s]*lan[\s]*=/g;
// const REG_EXP_EXPORTS = /module.exports[\s]*=[\s]*lan;/g;
// const REG_EXP_SINGLE_SEMI = /'([A-Za-z0-9_\.\s。]*)'/g; // 匹配单引号内的所有字符包括 . 。 _和空格
// const REG_EXP_STR = /(\w+)/g;
// let strFileData = fs.readFileSync(I18N_PATH_EN, 'utf8');
// let strFileData = fs.readFileSync(I18N_PATH_TEST, 'utf8');
// console.log(strFileData);
// console.log(typeof strFileData);
// console.log(strFileData.match(REG_EXP_CONST));
// console.log(strFileData.match(REG_EXP_EXPORTS));
// let strFileDataTmp = strFileData.replace(REG_EXP_NOTE, ""); // 去掉注释
// strFileDataTmp = strFileDataTmp.replace(REG_EXP_CONST, ""); // 去掉声明
// strFileDataTmp = strFileDataTmp.replace(REG_EXP_EXPORTS, ""); // 去掉exports  
// strFileDataTmp = strFileDataTmp.replace(REG_EXP_SINGLE_SEMI, '"$1"');  // 单引号转双引号
// let strFileDataJson = strFileDataTmp.replace(REG_EXP_STR, "");  // 给不带引号的key加上双引号
// console.log(strFileDataJson);
// let parseFileData = JSON.parse(strFileDataJson);
// console.log(parseFileData);