const router = require("koa-router")();
const { createScore, getScores } = require("../controller/score");

router.prefix("/api/score");

function handleRes(ctx, next, res) {
  if (res.status === 0) {
    ctx.body = res;
  } else {
    ctx.status = res.httpCode;
    ctx.body = res;
  }
}

router.get("/list", async function (ctx, next) {
  const res = await getScores();
  handleRes(ctx, next, res);
});

router.post("/create", async function (ctx, next) {
  const res = await createScore(ctx.request.body);
  handleRes(ctx, next, res);
});

module.exports = router;
