var mongoose =require("mongoose");

module.exports = new mongoose.Schema({
	//关键字段 与其他表关联
	category:{
		//类型
		type:mongoose.Schema.Types.ObjectId,
		//引用
		ref:"Category"
	},
	user:{
		//类型
		type:mongoose.Schema.Types.ObjectId,
		//引用
		ref:"User"
	},
	//添加时间
	addTime:{
		type:Date,
		default:new Date()
	},
	//阅读量
	views:{
		type:Number,
		default:0
	},
	//分类
	title:String,
	description:{
		type:String,
		default:""
	},
	content:{
		type:String,
		default:""
	},
	comments:{
		type:Array,
		default:[]
	}
	
});
