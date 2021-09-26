import {localRequest} from './request';

export function postRegisterInfo(account, password, repeatPsw) {
  return localRequest({
    method: 'post',
    url: '/auth/register',
    data: {
      account,
      password,
      repeatPsw,
    },
  });
}

export function postLoginInfo(account, password) {
  return localRequest({
    method: 'post',
    url: '/auth/login',
    data: {
      account,
      password,
    },
  });
}
