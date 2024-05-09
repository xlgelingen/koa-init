const router = require("koa-router")({
  prefix: "/api",
});

router.get('/', function (ctx, next) {
  ctx.body = 'this a api page!';
});

module.exports = router;