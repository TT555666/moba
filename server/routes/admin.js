// app是index传入的参数
module.exports = app => {
  const express = require('express')
  // router 是express的子路由,最后挂载在app上
  const router = express.Router(
    //继承父路由的params参数,为了子路由能使用:curd
    { mergeParams: true }
  )
  const authMiddleWare = require('../middleware/auth')
  const crudMiddleWare = require('../middleware/crud')
  /****************************************CRUD***************************************
  /**
   * 保存分类名称
   */
  router.post('/', async (req, res) => {
    // 创建数据
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  /**
   * 获取分类名称
   */
  router.get('/', async (req, res) => {
    //populate是取出关联的数据的完整信息,为了能通过id取到父分类,然后得到父分类名称
    const options = {}
    //并不是所有的数据库模型都需要关联
    if (req.Model.modelName === 'Category') {
      options.populate = 'parent'
    } else if (req.Model.modelName === 'Article') {
      options.populate = 'categories'

    }
    // //setOptions设置属性
    const items = await req.Model.find().setOptions(options)
    res.send(items)
  })
  /**
   * 获取一条分类名称
   */
  router.get('/:id', async (req, res) => {
    const item = await req.Model.findById(req.params.id)
    res.send(item)
  })
  /**
   * 编辑一条分类名称
   */
  router.put('/:id', async (req, res) => {
    const newItem = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(newItem)
  })
  /**
   * 删除一条分类名称
   */
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      message: true
    })
  })
  /**
   * 挂载子路由 crud代表CRUD的通用接口,添加中间键处理crud
   * auth是判断是通过token来登陆验证
   */
  app.use('/admin/api/crud/:curd', authMiddleWare(),crudMiddleWare(), router)

  /**********************************图片*******************************************************/
  // Express默认并不处理HTTP请求体中的数据，对于普通请求体(JSON、二进制、字符串)数据，可以使用body-parser中间件，而文件上传(multipart/form-data请求)，可以基于请求流处理，也可以使用formidable模块或Multer中间件
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../uploads' })
  // upload.single处理单个数据,file是前端传来的
  app.post('/admin/api/upload',authMiddleWare(),upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
  /*********************************登陆********************************************************** */
  /**
   * 管理员登陆验证
   */
  app.post('/admin/api/login', async (req, res) => {
    const { password, username } = req.body
    const Admin = require('../models/Admin')
    //根据用户名查找用户,select('+password')是因为之前把password隐藏了
    const admin = await Admin.findOne({ username }).select('+password')
    if (!admin) {
      return res.status(422).send({
        message: '用户不存在'
      })
    }
    //compareSync是比较传进来的密码和保存的是否匹配
    const isValid = require('bcryptjs').compareSync(password, admin.password)
    if (!isValid) {
      return res.status(422).send({
        message: '密码错误'
      })
    }
    //返回token
    const jwt = require('jsonwebtoken')
    //sign第一个参数可以放要保存的数据，第二个参数是密钥应该放在全局
    const token = jwt.sign({id: admin._id}, app.get('secret'))
    res.send({token})
  })

  /************************************错误处理**********************************************************/
  /**
   * 错误处理
   */
  app.use(async (err,req,res,next)=>{
    res.status(err.status || 500).send({
      message:err.message
    })
  })
}
