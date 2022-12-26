const env = process.env.NODE_ENV; //环境参数
let MYSQL_CONF = null;

if (env === "dev") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "123456",
    port: "3306",
    database: "admin",
    charset: "utf8mb4",
  };
}
if (env === "production") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "123456",
    port: "3306",
    database: "admin",
    charset: "utf8mb4",
  };
}
module.exports = {
  MYSQL_CONF,
};
