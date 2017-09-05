var mongoose = require("mongoose");

mongoose.Promise = global.Promise; 
//分类的表结构

module.exports = new mongoose.Schema({
	//分类名
	name:String
	
});
