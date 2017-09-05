var express = require("express");
var router = express.Router();
var User = require("../models/User");
var Content = require("../models/Content");
var responseData;

router.use(function(req,res,next){
	responseData = {
		code:0,
		message:""
	}
	next();
});
/*
 *用户注册
 * 1用户名不能为空
 * 2密码不能为空
 * 3两次输入密码必须一致
 * 4用户不能已被注册  (基于数据库的验证)
 * 
 *
 * */
router.post("/user/register",function(req,res,next){
	var username = req.body.username;
	var password =  req.body.password;
	console.log(username);
	var repassword = req.body.repassword;
		//如果数据库中存在同名数据表示该用户名已经被注册
	User.findOne({
		username:username
	}).then(function(userInfo){
		if(userInfo){
			//数据库中有该记录
			responseData.code = 4;
			responseData.message = "用户名已被注册";
			res.json(responseData);
			return Promise.reject();
			console.log(1);
		}
		var user = new User({
			username:username,
			password:password
		});
		return user.save();
		}).then(function(userInfo){
			responseData.message = "注册成功";
			responseData.userInfo = {
				_id:userInfo._id,
				username:userInfo.username
			}
			req.cookies.set("userInfo",JSON.stringify({
				_id:userInfo._id,
				username:userInfo.username
			}));
			res.json(responseData);
		});
	
//	if(username ==""){
//		responseData.code = 1;
//		responseData.message = "用户名不能为空";
//		res.json(responseData);
//		return;
//	}else if(password==""){
//		responseData.code = 2;
//		responseData.message = "密码不能为空";
//		res.json(responseData);
//		return;
//	}else if(password!=repassword){
//		responseData.code = 3;
//		responseData.message ="两次输入密码不一致";
//		res.json(responseData);
//		return;
//	}
});

router.post("/user/login",function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	console.log(username);
//	数据库查询
	User.findOne({
		username:username,
		password:password
	}).then(function(userInfo){
		if(!userInfo){
			responseData.code = 2;
			responseData.message = "用户名或密码错误";
			res.json(responseData);
			return;
		}
		responseData.message = "登录成功";
		responseData.userInfo = {
			_id:userInfo._id,
			username:userInfo.username
		}
		req.cookies.set("userInfo",JSON.stringify({
			_id:userInfo._id,
			username:userInfo.username
		}));
		res.json(responseData);
		return;
	})
});

router.get("/user/logout",function(req,res){
	req.cookies.set("userInfo",null);
	res.json(responseData);
});
//评论：
router.post("/comment/post",function(req,res){
	//内容的ID
	var contentId = req.body.contentid || "";
	var postData = {
		username:req.userInfo.username,
		postTime : new Date(),
		content:req.body.content,
		innerComment: new Array
	}
//	console.log(contentId);
	//查询当前这篇内容的讯息
	Content.findOne({
		_id:contentId
	}).then(function(content){
		content.comments.push(postData);
		return content.save();
	}).then(function(newContent){
		console.log(newContent);
		responseData.messgae = "评论成功";
		responseData.data = newContent;
		res.json(responseData);
	});
	
});

router.get("/comment",function(req,res){
	var contentId = req.query.contentid || "";
	
	Content.findOne({
		_id:contentId
	}).then(function(content){
		responseData.data = content.comments;
		res.json(responseData);
	});
});
module.exports = router;