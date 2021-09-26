import {localRequest} from "./request";

export function addProductToCartList(account, product) {
  return localRequest({
    method: 'put',
    url: '/cart/add',
    data: {
      account,
      product,
    },
  });
}

export function getCartListByAccount(account) {
  return localRequest({
    method: 'get',
    url: '/cart/list',
    params: {
      account,
    },
  });
}

export function setCartItemCheckedStatus(account, iid, status) {
  return localRequest({
    method: 'put',
    url: '/cart/setStatus',
    data: {
      account,
      iid,
      status,
    },
  });
}

export function setStatusOfAllCartItem(account, status) {
  return localRequest({
    method: 'put',
    url: '/cart/setStatusOfAll',
    data: {
      account,
      status,
    },
  });
}

export function modifyCartItemCount(account, iid, count) {
  return localRequest({
    method: 'put',
    url: '/cart/modifyCount',
    data: {
      account,
      iid,
      count,
    },
  })
}

export function deleteCartItemById(account, iid) {
  return localRequest({
    method: 'post',
    url: '/cart/delete',
    data: {
      account,
      iid,
    }
  });
}
