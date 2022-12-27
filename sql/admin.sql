/*
Navicat MySQL Data Transfer

Source Server         : admin
Source Server Version : 50740
Source Host           : localhost:3306
Source Database       : admin

Target Server Type    : MYSQL
Target Server Version : 50740
File Encoding         : 65001

Date: 2022-12-27 17:03:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for chats
-- ----------------------------
DROP TABLE IF EXISTS `chats`;
CREATE TABLE `chats` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `userId` int(11) DEFAULT NULL COMMENT '用户id',
  `username` varchar(32) DEFAULT NULL COMMENT '用户名',
  `userAvatar` varchar(128) DEFAULT NULL COMMENT '用户头像',
  `createTime` bigint(20) DEFAULT NULL COMMENT '创建时间',
  `content` varchar(512) DEFAULT NULL COMMENT '聊天内容',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for messages
-- ----------------------------
DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `type` int(8) DEFAULT NULL COMMENT '0(留言)、1(回复)',
  `createTime` bigint(20) DEFAULT NULL COMMENT '创建信息时间',
  `content` varchar(1024) DEFAULT NULL COMMENT '信息内容',
  `userId` int(11) DEFAULT NULL COMMENT '回复人id',
  `userIsAdmin` int(8) DEFAULT NULL COMMENT '回复人是否是管理员',
  `userName` varchar(32) DEFAULT NULL COMMENT '回复人用户名',
  `userAvatar` varchar(128) DEFAULT NULL COMMENT '回复人头像',
  `targetUserId` int(11) DEFAULT NULL COMMENT '被回复人id',
  `targetUserIsAdmin` int(8) DEFAULT NULL COMMENT '被回复人是否是管理员',
  `targetUserName` varchar(32) DEFAULT NULL COMMENT '被回复人用户名',
  `targetUserAvatar` varchar(128) DEFAULT NULL COMMENT '被回复人头像',
  `pid` int(11) DEFAULT '-1' COMMENT '父级id',
  `likeNum` int(11) DEFAULT '0' COMMENT '赞的数量',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=190 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for scores
-- ----------------------------
DROP TABLE IF EXISTS `scores`;
CREATE TABLE `scores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL COMMENT '用户id',
  `createTime` bigint(20) DEFAULT NULL COMMENT '创建时间',
  `score` int(8) DEFAULT NULL COMMENT '分数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(32) NOT NULL COMMENT '用户名',
  `password` varchar(128) NOT NULL COMMENT '用户密码',
  `registrationAddress` varchar(256) DEFAULT NULL COMMENT '注册地址信息',
  `registrationTime` bigint(20) DEFAULT NULL COMMENT '注册时间',
  `lastLoginAddress` varchar(256) DEFAULT '' COMMENT '最后登录地址信息',
  `lastLoginTime` bigint(20) DEFAULT NULL COMMENT '最后登录时间',
  `isAdmin` int(8) unsigned DEFAULT '0' COMMENT '是否是管理员',
  `avatar` varchar(128) DEFAULT NULL COMMENT '用户头像',
  `birth` bigint(20) DEFAULT NULL COMMENT '出生日期',
  `phone` varchar(32) DEFAULT NULL COMMENT '电话',
  `location` varchar(256) DEFAULT NULL COMMENT '所在地',
  `gender` varchar(8) DEFAULT NULL COMMENT '性别',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`) COMMENT '唯一索引'
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for works
-- ----------------------------
DROP TABLE IF EXISTS `works`;
CREATE TABLE `works` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `title` varchar(256) DEFAULT NULL COMMENT '作品标题',
  `description` varchar(256) DEFAULT NULL COMMENT '作品描述',
  `url` varchar(128) DEFAULT NULL COMMENT '预览地址',
  `githubUrl` varchar(128) DEFAULT NULL COMMENT 'github地址',
  `createTime` bigint(20) DEFAULT NULL COMMENT '创建时间',
  `author` varchar(32) DEFAULT NULL COMMENT '作者',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4;
