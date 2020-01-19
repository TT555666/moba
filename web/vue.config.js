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
  outputDir:__dirname + '/../server/web'
  // publicPath: process.env.NODE_ENV === 'production'?'':'/',
}