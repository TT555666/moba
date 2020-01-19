const mongoose = require('mongoose')

const schema =new mongoose.Schema({
    name:{type:String},
    //类型是关联数据库里的对象ID型,ref指关联的数据库模型,这里关联本身
    parent:{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}
})
schema.virtual('children',{
    localField:'_id',
    foreignField:'parent',
    justOne:false,
    ref:'Category'
})

module.exports = mongoose.model('Category',schema)
