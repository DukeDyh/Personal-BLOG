var express = require("express");
var router = express.Router();
var Category = require("../models/Category");
var Content = require("../models/Content");
var data = {};

router.use(function(req,res,next){
	/*
	 *处理通用数据
	 * */
	data = {
		userInfo:req.userInfo,
	}
	
	Category.find().then(function(categories){
		data.categories = categories;
		next();
	});
});

router.get("/",function(req,res,next){
	res.render("main/nav");
});

router.get("/blog",function(req,res,next){
	data.category = req.query.category || "";
	data.count = 0;
	data.page = Number(req.query.page)|| 1;
	data.pages = 0;
	data.limit = 3;
	var where = {};
	if(data.category){
		where.category = data.category;
	}
	Content.where(where).count().then(function(count){
		data.count = count;
		data.pages = Math.ceil(data.count/data.limit);
		data.page = Math.min(data.page,data.pages);
		data.page = Math.max(1,data.page);
		var skip  = (data.page-1)*data.limit;
		
		
		return Content.where(where).find().sort({_id:-1}).limit(data.limit).skip(skip).populate(["category","user"]).sort({addTime:-1});
		
	}).then(function(contents){
		data.contents = contents;
		res.render("main/index",data);
	});
});

router.get("/view",function(req,res){
	var contentId = req.query.contentid || "";
	console.log(contentId);
	Content.findOne({
		_id:contentId,
	}).populate(["category","user"]).then(function(content){
		data.content = content;
		res.render("main/view",data);
	});
	Content.findOne({
		_id:contentId,
	}).populate(["category","user"]).then(function(content){
		
	 	return	content.update({
			views:content.views+1
		});
	}).then(function(){
	});
});


module.exports = router;