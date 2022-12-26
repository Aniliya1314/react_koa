const router = require("koa-router")();
const {
  createMessage,
  getMessages,
  deleteMessage,
} = require("../controller/message");

router.prefix("/api/message");

function handleRes(ctx, next, res) {
  if (res.status === 0) {
    ctx.body = res;
  } else {
    ctx.status = res.httpCode;
    ctx.body = res;
  }
}

router.post("/create", async function (ctx, next) {
  const sessionId = ctx.cookies.get("sessionId");
  const res = await createMessage(ctx.request.body, sessionId);
  handleRes(ctx, next, res);
});

router.get("/list", async function (ctx, next) {
  const res = await getMessages(ctx.query);
  handleRes(ctx, next, res);
});

router.post("/delete", async function (ctx, next) {
  const sessionId = ctx.cookies.get("sessionId");
  const res = await deleteMessage(ctx.request.body, sessionId);
  handleRes(ctx, next, res);
});

module.exports = router;
