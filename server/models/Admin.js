
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    //用set方法可以操作数据
    // bcrypt用来做密码的散列，比md5好很多，推荐这个
    set(val) {
      // hashSync()是同步的方法，salt：10这个值越高保密越好，一般10到12
      return require('bcryptjs').hashSync(val, 10)
    },
    // 因为点击编辑的时候会出现散列，然后再保存的时候会保存散列这是错的，用select可以让密码不被查出来，点编辑修改也没事
    select: false
  },
})

module.exports = mongoose.model('Admin', schema)
