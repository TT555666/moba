module.exports = options =>{  //用函数的形式比较灵活
  const jwt = require('jsonwebtoken')
  const Admin = require('../models/Admin')
  const assert = require('http-assert')

  return async(req,res,next) =>{
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token,401,'请先登陆')
    const {id} = jwt.verify(token,req.app.get('secret'))
    assert(id,401,'请先登陆')
    req.admin = await Admin.findById(id)
    assert(token,401,'请先登陆')
    await next()
  }
}