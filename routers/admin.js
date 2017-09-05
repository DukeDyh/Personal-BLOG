var  express = require("express");
var router = express.Router();
var User = require("../models/User");
var Category = require("../models/Category");
var Content = require("../models/Content");

var responseData;


router.use(function(req,res,next){
	responseData = {
		code:0,
		message:""
	}
	if(!req.userInfo.isAdmin){
		res.send("对不起，只有管理员才可以进入后台管理！");
	}
	next();
});

router.get("/",function(req,res,next){
	res.render('admin/index',{
		userInfo:req.userInfo
	});
});
/* 
 *用户管理
 * 
 * */

	router.get("/user",function(req,res){
		//从数据读取数据
		//limit
		//skip 忽略数据的条数
		//1:1-3 skip:0
		//2: 4-6 skip:3
		//3:7-9 skip 6 （当前页-1）*limit
		
		var page = Number(req.query.page)|| 1;
		var limit = 6;
		var pages = 0;
		
		User.count().then(function(count){
			
			// 计算总页数
			pages = Math.ceil(count/limit);
			page = Math.min(page,pages);
			page = Math.max(1,page);
			
			var skip = (page-1)*limit;
			
			User.find().limit(limit).skip(skip).then(function(users){
			
				res.render("admin/user_index",{
					userInfo:req.userInfo,
					users:users,
					count:count,
					page:page,
					pages:pages,
					limit:limit
				});
			});
		});
		
		
		
	});
	//博客文章分类管理
	router.get("/category",function(req,res){
		var page = Number(req.query.page)|| 1;
		var limit = 6;
		var pages = 0;
		
		Category.count().then(function(count){
			
			// 计算总页数
			pages = Math.ceil(count/limit);
			page = Math.min(page,pages);
			page = Math.max(1,page);
			
			var skip = (page-1)*limit;
			//1:升序
			//-1 降序
			Category.find().sort({_id:-1}).limit(limit).skip(skip).then(function(categories){
			
				res.render("admin/category",{
					userInfo:req.userInfo,
					categories:categories,
					
					count:count,
					page:page,
					pages:pages,
					limit:limit
				});
			});
		});
	})
	//添加分类
	router.post("/category",function(req,res,next){
		var name = req.body.name;
		console.log(name);
		Category.findOne({
			name:name
		}).then(function(cateInfo){
			if(cateInfo){
				responseData.code = 0;
				responseData.message = "分类已存在";
				res.json(responseData);
				console.log("失败")
				return Promise.reject();
			}
			
			var category = new Category({
				name:name
			});
			
			return category.save();
		}).then(function(newCategory){
			console.log("成功");
			responseData.code = 1;
			responseData.message = "保存成功";
			res.json(responseData);
		});
	});
	//编辑分类
	router.post("/category/edit",function(req,res,next){
		var name = req.body.name;
		var newname = req.body.newname;
		Category.findOne({
			name:name
		}).then(function(category){
			console.log(category);
		 	return category.update({
				name:newname
			});
		}).then(function(){
			responseData.code = 1;
			responseData.message = newname;
			res.json(responseData);
		});
	});
	//删除分类
	router.post("/category/delete",function(req,res,next){
		var name = req.body.name;
		
		Category.findOne({
			name:name
		}).then(function(category){
			Content.remove({
				category:category._id
			}).then(function(){
				Category.remove({
					name:name
				}).then(function(){
					responseData.message = "删除成功";
					res.json(responseData);
				});
			});
		});
		
	});
	/* 
	 *内容首页
	 * */
	router.get("/content",function(req,res){
		var page = Number(req.query.page)|| 1;
		var limit = 6;
		var pages = 0;
		
		Content.count().then(function(count){
			
			// 计算总页数
			pages = Math.ceil(count/limit);
			page = Math.min(page,pages);
			page = Math.max(1,page);
			
			var skip = (page-1)*limit;
			
			Content.find().sort({addTime:-1}).limit(limit).skip(skip).populate(["category","user"]).then(function(contents){
				res.render("admin/content_index",{
					userInfo:req.userInfo,
					contents:contents,
					
					count:count,
					page:page,
					pages:pages,
					limit:limit
				});
			});
		});
	});
	router.get("/content/add",function(req,res){
		Category.find().sort({_id:-1}).then(function(categories){
			res.render('admin/content_add',{
				userInfo:req.UserInfo,
				categories:categories
			});
		});
	});
	//添加文章
	router.post("/content/add",function(req,res){
		console.log(req.body);
		new Content({
			category:req.body.category,
			title:req.body.title,
			user:req.userInfo._id,
			description:req.body.description,
			content:req.body.content,
			addTime: new Date()
		}).save().then(function(rs){
			responseData.code = 1;
			responseData.message = "添加成功";
			res.json(responseData);
		});
	});
	//删除文章
	router.post("/content/delete",function(req,res){
		var id = req.body.id;
		Content.remove({
			_id:id
		}).then(function(){
			responseData.message = "删除成功";
			res.json(responseData);
		});
	});
	
	router.get("/content/edit",function(req,res){
		var id = req.query.id;
		
		Category.find().sort({_id:-1}).then(function(categories){
			Content.findOne({
				_id:id
			}).populate("category").then(function(contents){
				res.render("admin/content_edit",{
					userInfo:req.userInfo,
					content:contents,
					categories:categories
				});
			});
		});
	});
	//编辑文章
	router.post("/content/edit",function(req,res){
		var id = req.body.id;
		var title = req.body.title;
		var description = req.body.description;
		var content = req.body.content;
		var category = req.body.category;
		Content.update({
			_id:id
		},{
			title:title,
			description:description,
			content:content,
			category:category
		}).then(function(){
			responseData.code = 1;
			responseData.message = "更新成功！";
			res.json(responseData);
		});
//		Content.findOne({
//			_id:id
//		}).then(function(content){
//			console.log(content);
//			return content.update({
//				title:title,
//				description:description,
//				content:content,
//				category:category
//			});
//		}).then(function(){
//			console.log(this);
//			responseData.code = 1;
//			responseData.message = "更新成功！";
//			res.json(responseData);
//		});
	});
	//评论
module.exports = router;