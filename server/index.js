const express = require('express')
const app = express()
const cors = require('cors')

//使用body
app.use(express.json())
//跨域
app.use(cors())
//托管静态文件,让uploads文件可以通过/uploads访问
app.use('/',express.static(__dirname+'/web'))
app.use('/uploads',express.static(__dirname+'/uploads'))
app.use('/admin',express.static(__dirname+'/admin'))
//全局生成一个密钥
app.set('secret','123456')
/**
 * 将app传给到路由,注意位置,写在后面
 */
require('./plugins/db.js')(app)
require('./routes/admin.js')(app)
require('./routes/web.js')(app)

/**
 * 监听3000端口
 */
app.listen(3000,()=>{
  console.log('http://localhost:3000');
})