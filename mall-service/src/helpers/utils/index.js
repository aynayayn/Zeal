// 取时间戳对应的年份
const getYearByTimestamp = (ts) => {
  const date = new Date(ts);
  return date.getFullYear();
}

const getDateByTimestamp = (ts) => {
  const date = new Date(ts);
  return date.getDate();
}

const getRequestBody = (ctx) => {
  return ctx.request.body || {};
}

module.exports = {
  getYearByTimestamp,
  getDateByTimestamp,
  getRequestBody,
};