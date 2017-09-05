var mongoose =require("mongoose");

var ContentsSchema = require("../schemas/contents");

module.exports=mongoose.model("Content",ContentsSchema );
