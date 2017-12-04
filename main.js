const fs = require('fs');
const path = require('path');
const I18N_PATH = path.join(__dirname, 'i18n');
const I18N_PATH_EN_US = path.join(I18N_PATH, 'en-US.js');
const I18N_PATH_ZH_CN = path.join(I18N_PATH, 'zh-CN.js');
const I18N_PATH_TEST_EN = path.join(I18N_PATH, 'test-en.js');
const I18N_PATH_TEST_ZH = path.join(I18N_PATH, 'test-zh.js');
const LAN_CN = 'zh-CN';
const LAN_TW = 'zh-TW';
const LAN_EN = 'en-US';
const REG_EXP_CN = /[\u4E00-\u9FA5]/g;
let enUsJson = require(I18N_PATH_EN_US);
let zhCnJson = require(I18N_PATH_ZH_CN);
let testJsonEn = require(I18N_PATH_TEST_EN);
let testJsonZh = require(I18N_PATH_TEST_ZH);
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

let filterTestJson = fnFilterZhInEn(testJsonEn);
let pureTestJson = fnDeleteEmptyObj(filterTestJson);
// console.log(pureTestJson);

function fnMergeObj(baseObj, obj){
    for ( let k in baseObj ) {
        if(obj[k] === undefined) {
            obj[k] = baseObj[k];
        } else if (typeof obj[k] === 'object') {
            fnMergeObj(baseObj[k], obj[k]);
        }
    }
    return obj;
}
// console.log(testJsonZh);
let newTestJsonEn = fnMergeObj(testJsonZh, pureTestJson);
console.log(newTestJsonEn);
console.log(newTestJsonEn.component.v_login.status);