module.exports = options => {
  return async (req, res, next) => {
    // inflection将请求的数据转为大写
    const modelName = require('inflection').classify(req.params.curd)
    // console.log(req.params.curd);
    //可以动态地请求数据库
    req.Model = require(`../models/${modelName}`)
    next()
  }
}