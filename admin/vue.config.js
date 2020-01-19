module.exports = {
  configureWebpack:{
  resolve:{
      alias:{
        'assets':'@/assets',
        'views':'@/views',
        'components':'@/components',
      }
    },
  },
  outputDir:__dirname + '/../server/admin',
  publicPath: process.env.NODE_ENV === 'production'?'/admin':'/',
}