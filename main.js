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
