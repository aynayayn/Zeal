const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getRequestBody } = require('../../helpers/utils')

const Cart = mongoose.model('Cart');

const router = new Router({
  prefix: '/cart',
});
router.put('/add', async (ctx) => {
  const {account, product} = getRequestBody(ctx);
  let haveThisProduct = false;

  const findCart = await Cart.findOne({accountName: account}).exec();
  if(findCart) {
    const {iid, count} = product;
    for(let cartListItem of findCart.cartList) {
      if(cartListItem.iid === iid) {
        haveThisProduct = true;
        break;
      }
    }
    if(haveThisProduct) {
      const res = await Cart.updateOne({
        accountName: account,
        cartList: {
          $elemMatch: {
            iid
          }
        }
      }, {$inc: {'cartList.$.count': count}});
      ctx.body = {
        code: 1,
        msg: '数量更新成功',
        data: res,
      };
    }
    else {
      const res = await Cart.updateOne({
        accountName: account
      }, {
        $push: {cartList: product}
      });
      ctx.body = {
        code: 1,
        msg: '成功添加购物车',
        data: res,
      };
    }
  }
  else {
    const cart = new Cart({
      accountName: account,
      cartList: [product],
    });
    const res = await cart.save();
    ctx.body = {
      code: 1,
      msg: '新建购物车成功，商品添加成功',
      data: res,
    };
  }
});

router.get('/list', async (ctx) => {
  const { account } = ctx.request.query;
  if(account) {
    const findCart = await Cart.findOne({
      accountName: account
    }).exec();

    if(findCart) {
      ctx.body = {
        code: 1,
        msg: '购物车列表获取成功',
        data: findCart,
      }
    }
    else {
      ctx.body = {
        code: 0,
        msg: '用户不存在',
        data: null,
      }
    }
  }
  else {
    ctx.body = {
      code: 0,
      msg: '获取失败',
      data: null,
    }
  }
});

router.put('/setStatus', async(ctx) => {
  const {account, iid, status} = getRequestBody(ctx);

  if(!account || !iid) {
    ctx.body = {
      code: 0,
      msg: '请求非法',
      data: null,
    }
    return ;
  }

  const res = await Cart.updateOne({
    accountName: account,
    cartList: {
      $elemMatch: {
        iid
      }
    }
  }, {$set: {"cartList.$.status": status}});
  ctx.body = {
    code: 1,
    msg: '更新成功',
    data: res,
  }
});

router.put('/setStatusOfAll', async(ctx) => {
  const {account, status} = getRequestBody(ctx);
  const res = await Cart.update({
    accountName: account
  }, {$set: {"cartList.$[].status": status}}, {multi:true});
  ctx.body = {
    code: 1,
    msg: '标记更新成功',
    data: res,
  }
});

router.put('/modifyCount', async (ctx) => {
  const {account, iid, count} = getRequestBody(ctx);
  if(!account || !iid || !count) {
    ctx.body = {
      code: 1,
      msg: '请求非法',
      data: null,
    }
  }
  else {
    const res = await Cart.updateOne({
      accountName: account,
      cartList: {
        $elemMatch: {
          iid
        }
      }
    }, {$set: {"cartList.$.count": count}});
    ctx.body = {
      code: 1,
      msg: '修改成功',
      data: res,
    }
  }
});

router.post('/delete', async(ctx) => {
  const {account, iid} = getRequestBody(ctx);

  if(!account || !iid) {
    ctx.body = {
      code: 0,
      msg: '未在请求中取到用户或商品id',
      data: null,
    }
  }

  else {
    const res1 = await Cart.findOne({
      accountName: account
    }).exec();
    if(res1) {
      const tempArr = res1.cartList.filter(record => record.iid === iid);
      tempArr[0].remove();
      await res1.save();
      ctx.body = {
        code: 1,
        msg: '删除成功',
        data: null,
      }
    }
    else {
      ctx.body = {
        code: 0,
        msg: '未在数据库中找到用户',
        data: null,
      }
    }
  }
});

module.exports = router;