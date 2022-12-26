const CryptoJS = require("crypto-js");
const crypto = require("crypto");
const { FRONT_SECRETKEY, BACKEND_SECRETKEY } = require("../config/secret");

/**前端加密函数*/
function encrypt(str) {
  return CryptoJS.AES.encrypt(JSON.stringify(str), FRONT_SECRETKEY).toString();
}

/**前端解密函数*/
function decrypt(str) {
  const bytes = CryptoJS.AES.decrypt(str, FRONT_SECRETKEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

/**md5加密*/
function md5(content) {
  let md5 = crypto.createHash("md5");
  return md5.update(content).digest("hex");
}

/**后端及加密函数，加密同一个字符串每次结果相同*/
function genPassword(password) {
  const str = `password=${password}&key=${BACKEND_SECRETKEY}`;
  return md5(str);
}

module.exports = {
  encrypt,
  decrypt,
  genPassword,
};
