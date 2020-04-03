
const express=require('express')
const app=express()
//设置密钥
app.set('secret','qwreewewfwefer')
//json中间件
app.use(express.json())
//跨域模块
app.use(require('cors')())

//托管静态路径
//1.上传路径/projectserver/uploads
//完全是为了客户端访问（暴露快捷方式）
app.use('/uploads',express.static(__dirname+'/uploads'))
app.use('/images',express.static(__dirname+'/images'))
app.use('/videos',express.static(__dirname+'/videos'))
app.use('/bigfile',express.static(__dirname+'/bigfile'))
//为了实际环境部署，对admin下文件进行静态托管
app.use('/admin',express.static(__dirname+'/admin'))

//引入路由函数【对外释放访问接口】
//router/admin--后台管理的路由
//router/web  --前端  的  路由
//注意引入的是函数
require('./plugin/db')(app)
// console.log(app)
//引入路由
require('./router/admin')(app)
//

app.listen(3000,()=>{
  console.log('listening 3000...')
})

/*
'use strict';



const express = require('express');

const formidable = require('formidable');



const app = express();



app.get('/', (req, res) => {

  res.send(`

    <h2>With <code>"express"</code> npm package</h2>

    <form action="/api/upload" enctype="multipart/form-data" method="post">

      <div>Text field title: <input type="text" name="title" /></div>

      <div>File: <input type="file" name="someExpressFiles" multiple="multiple" /></div>

      <input type="submit" value="Upload" />

    </form>

  `);

});



app.post('/api/upload', (req, res, next) => {

  const form = formidable({ multiples: true,maxFileSize:0 });
  form.uploadDir = "./uploads/"
  form.on('progress', (bytesReceived, bytesExpected) => {
    console.log(bytesReceived, bytesExpected)
    // res.send({bytesReceived, bytesExpected})
  });

  form.parse(req, (err, fields, files) => {

    if (err) {

      next(err);

      return;

    }
    console.log({ fields, files })
    res.json({ fields, files });

  });

});



app.listen(3000, () => {

  console.log('Server listening on http://localhost:3000 ...');

});
*/

