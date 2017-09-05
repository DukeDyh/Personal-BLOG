var express = require("express");
var swig = require("swig");
//加载数据库模块
var mongoose = require("mongoose");
//处理数据模块
var bodyParser = require("body-parser");
//加载cookies模块
var Cookies = require("cookies");
var app = express();
var Category = require("./models/Category");
var User = require("./models/User");

//设置静态文件
app.use("/public",express.static(__dirname+"/public"));
//建立模板
//注册模板引擎
app.engine("html",swig.renderFile);
//设置模板所在目录
app.set("views","./views");
app.set("view engine","html");
//清除缓存
swig.setDefaults({cache:false});

//bodyParser中间件
app.use(bodyParser.urlencoded({extended:true}));
//设置cookies
app.use(function(req,res,next){
	req.cookies = new Cookies(req,res);
	//解析登录用户的cookies信息
	req.userInfo = {};
	if(req.cookies.get('userInfo')){
		try{
			req.userInfo = JSON.parse(req.cookies.get("userInfo"));
			//获取当前登录用户类型
			User.findById(req.userInfo._id).then(function(userInfo){
				req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
				next();
			})
		}catch(e){
			next();
		}
	}else{
		next();
	}
});
//分模块
app.use("/admin",require("./routers/admin"));
app.use("/api",require("./routers/api"));
app.use("/",require("./routers/main"));
//链接数据库
mongoose.connect("mongodb://localhost:27018/blog",function(err){
	if(err){
		console.log("数据库链接失败");
	}else{
		console.log("数据库链接成功");
		app.listen(8081);
	}
});
