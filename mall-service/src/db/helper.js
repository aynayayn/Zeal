const getMeta = () => {
  return {
    createdAt: {
      type: Number,
      default: +new Date(),
      // default: (new Date()).getTime(),
    },
    updatedAt: {
      type: Number,
      default: +new Date(),
    },
  }
}

module.exports = {
  getMeta,
};
