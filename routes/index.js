const router = require("koa-router")();
const uploadFile = require("../utils/upload");
const { getChatList } = require("../controller/chat");
const path = require("path");

function handleRes(ctx, next, res) {
  if (res.status === 0) {
    ctx.body = res;
  } else {
    ctx.status = res.httpCode;
    ctx.body = res;
  }
}

router.get("/", async (ctx, next) => {
  await ctx.render("index", {
    title: "Hello Koa 2!",
  });
});

//上传接口
router.post("/upload", async (ctx, next) => {
  const { isImg, fileType } = ctx.query;
  const serverFilePath = path.join(__dirname, "../public/upload-files");
  const res = await uploadFile(ctx, {
    fileType: fileType || "myUpload",
    path: serverFilePath,
    isImg: !!isImg,
  });
  handleRes(ctx, next, res);
});

//获取聊天列表
router.get("/api/chat/list", async function (ctx, next) {
  const res = await getChatList();
  handleRes(ctx, next, res);
});

module.exports = router;
