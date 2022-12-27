const router = require("koa-router")();
const {
  checkName,
  register,
  login,
  getUser,
  updateUser,
  getUsers,
  deleteUser,
  getAllUsers,
} = require("../controller/user");

router.prefix("/api/users");

function handleRes(ctx, next, res) {
  if (res.status === 0) {
    ctx.body = res;
  } else {
    ctx.status = res.httpCode;
    ctx.body = res;
  }
}

router.post("/register", async function (ctx, next) {
  const { username, password } = ctx.request.body;
  const res = await register(username, password, ctx);
  handleRes(ctx, next, res);
});

router.get("/checkName", async function (ctx, next) {
  const { username } = ctx.query;
  const res = await checkName(username);
  handleRes(ctx, next, res);
});

router.post("/login", async function (ctx, next) {
  const { username, password } = ctx.request.body;
  const res = await login(username, password, ctx);
  handleRes(ctx, next, res);
});

router.get("/getUser", async function (ctx, next) {
  const res = await getUser(ctx.query);
  handleRes(ctx, next, res);
});

router.get("/getUsers", async function (ctx, next) {
  const res = await getUsers(ctx.query);
  handleRes(ctx, next, res);
});

router.get("/getAllUsers", async function (ctx, next) {
  const res = await getAllUsers();
  handleRes(ctx, next, res);
});

router.post("/update", async function (ctx, next) {
  const sessionId = ctx.cookies.get("sessionId");
  const res = await updateUser(ctx.request.body, sessionId);
  handleRes(ctx, next, res);
});

router.post("/delete", async function (ctx, next) {
  const res = await deleteUser(ctx.request.body);
  handleRes(ctx, next, res);
});

module.exports = router;
