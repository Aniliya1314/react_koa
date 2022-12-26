const path = require("path");
const fs = require("fs");
const Busboy = require("busboy");
const { SuccessModel, ErrorModel } = require("../model/resModel");

/**
 * 同步创建文件目录
 * @param {string} dirname 目录绝对路径
 * @return {boolean} 创建目录结果
 */
function mkdirSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

/**
 * 上传文件
 * @param {object} ctx koa上下文
 * @param {object} options 文件上传参数 fileType文件类型 path文件存放路径
 * @return {promise}
 */
function uploadFile(ctx, options) {
  let req = ctx.req;
  let busboy = Busboy({ headers: req.headers });

  //获取类型
  let fileType = options.fileType || "common";
  let filePath = path.join(options.path, fileType);
  mkdirSync(filePath); //创建上传文件的目录

  return new Promise((resolve) => {
    console.log("文件上传中...");
    let result = {};

    //解析请求文件事件
    busboy.on("file", function (name, file, info) {
      const { filename } = info;
      const patt = /\.(jpg|jpeg|png|bmp|BMP|JPG|PNG|JPEG)$/;
      const isPic = patt.test(filename);
      if (options.isImg) {
        if (!isPic) {
          resolve(
            new ErrorModel({
              message: "文件格式非图片类型",
            })
          );
          return;
        }
      }

      let fileName = filename;
      let _uploadFilePath = path.join(filePath, fileName);
      let saveTo = path.join(_uploadFilePath);

      //文件保存至指定路径
      file.pipe(fs.createWriteStream(saveTo));

      //文件写入事件结束
      file.on("close", function () {
        result = new SuccessModel({
          message: "文件上传成功",
          data: {
            url: `${ctx.origin}/${fileType}/${fileName}`,
          },
        });
        console.log("文件上传成功");
      });
    });

    //解析结束事件
    busboy.on("close", function () {
      console.log("文件上传结束");
      resolve(result);
    });

    //解析错误事件
    busboy.on("error", function () {
      console.log("文件上传出错");
      resolve(
        new ErrorModel({
          message: "文件上传出错",
        })
      );
    });
    req.pipe(busboy);
  });
}

module.exports = uploadFile;
