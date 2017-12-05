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
const REG_EXP_CN = /^[\u4E00-\u9FA5\.\s，。:：]+$/g; // 匹配中文带:。和不可见字符
const REG_EXP_EN = /^[\w\d\-\.\s_:：']+$/g;
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

/**
 * 删除语言包中value为中文的key
 * @param {object}
 * @return {object}
*/
function fnFilterZh(obj) {
    for (let k in obj) {
        if (REG_EXP_CN.test(obj[k]) || _isEmptyObject(obj[k])) {
            delete obj[k];
        }
        if (typeof obj[k] === 'object' && !_isEmptyObject(obj[k])) {
            fnFilterZh(obj[k]);
        }
    }
    return obj;
}

let filterTestJson = fnFilterZh(testJsonEn);
console.log(filterTestJson);

/**
 * 删除语言包中value为英文的key
 * @param {object}
 * @return {object}
*/
function fnFilterEn(obj) {
    for (let k in obj) {
        if (REG_EXP_EN.test(obj[k]) || _isEmptyObject(obj[k])) {
            delete obj[k];
        }
        if (typeof obj[k] === 'object' && !_isEmptyObject(obj[k])) {
            fnFilterEn(obj[k]);
        }
    }
    return obj;
}

// function fnDeleteEmptyObj(obj) {
//     for (let k in obj) {
//         if (typeof obj[k] === 'object') {
//             if (!_isEmptyObject(obj[k])) {
//                 fnDeleteEmptyObj(obj[k]);
//             } else {
//                 delete obj[k];
//             }
//         }
//     }
//     return obj;
// }

// let filterTestJson = fnFilterZh(testJsonEn);
// let pureTestJson = fnDeleteEmptyObj(filterTestJson);
// console.log(filterTestJson);
// console.log(filterTestJson.component.v_login.status);

/**
 * 比对baseObj和obj,若obj中的key不存在或者value为空,
 * 则将baseObj中的值赋给obj中的改key
 * @param {object}
 * @return {object}
*/
function fnMergeObj(baseObj, obj){
    for ( let k in baseObj ) {
        if(obj[k] === undefined || obj[k] === '' || _isEmptyObject(obj[k])) {
            obj[k] = baseObj[k];
        } 
        if (typeof obj[k] === 'object' && !_isEmptyObject(obj[k])) {
            fnMergeObj(baseObj[k], obj[k]);
        }
    }
    return obj;
}
// console.log(testJsonZh);
let newTestJsonEn = fnMergeObj(testJsonZh, filterTestJson);
// console.log(newTestJsonEn);

let filterTestJsonZh = fnFilterEn(newTestJsonEn);
// let newTestJsonZh = fnDeleteEmptyObj(filterTestJsonZh);
// console.log(filterTestJsonZh);
// console.log(filterTestJsonZh.component.v_login.status);
// console.log(newTestJsonZh);
// console.log(newTestJsonZh.component.v_login.status);