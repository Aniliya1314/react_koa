const { exec } = require("../db/mysql");
const { SuccessModel } = require("../model/resModel");

/**
 * 添加聊天记录
 * @param {*} param
 */
const addChat = async function (param) {
  const { userId, username, userAvatar, createTime, content } = param;
  const sql = `insert into chats (userId,username,userAvatar,createTime,content) values (${userId},'${username}','${userAvatar}',${createTime},'${content}')`;
  const res = await exec(sql);
  return new SuccessModel({
    data: {
      id: res.insertId,
    },
  });
};

/**
 * 获取最新聊天记录前100条
 */
const getChatList = async function () {
  const sql = `select * from chats order by createTime desc limit 100`;
  const res = await exec(sql);
  return new SuccessModel({
    data: res.reverse(),
  });
};

module.exports = {
  addChat,
  getChatList,
};
