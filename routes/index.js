var router = require('koa-router')();

router.get('/', async function (ctx, next) {
  ctx.state = {
    title: 'koa2 title'
  };

  await ctx.render('index', {
  });
})

const api = require("./api");

router.use(api.routes(), api.allowedMethods());

module.exports = router;