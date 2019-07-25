### 启动
使用```net start MongoDB```启动mongoDB服务，使用命令```mongo```进行数据库操作
### mongo命令
1. ```show dbs``` 展示现在的数据库表
2. ```use students``` 创建数据库名字，tudents就是数据库名字
3. ```show collections``` 显示数据库中所有的集合，默认都是model的名称加个s
4. ```db.students.insert({id:"001",name:"JIM",age:"18"});``` 插入数据
5. ```db.students.find()``` 往students这个数据库查询当前集合中所有的文档，也可以条件查询



### 连接数据库
>Mongoose是在nodejs环境中对MongoDB数据库操作的封装
```js
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/test');//对应在什么目录下建表
const Girl = mongoose.model('Girl',{name:String})
const HuiHui = new Girl({name:'HuiHui'});
//保存
const res = await HuiHui.save()
```

### 使用Schema
```js
var Human = mongoose.Schema({

})
```
