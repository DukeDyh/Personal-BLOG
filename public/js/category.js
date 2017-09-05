var btn = document.getElementsByClassName("btn")[0];


$(".tips").css({"color":"red"});
//通过键盘事件添加文章分类
$("#name1").focus(function(){
	$(document).keydown(function(ev){
		if(ev.keyCode==13) {
			var name = $("#name1").val();
			cateAdd(name);
		}
	});
	document.getElementsByClassName("tips")[0].innerHTML = null;
});
//添加文章分类
$(".btn").click(function(){
	var name = $("#name1").val();
	cateAdd(name);
});
//修改文章分类名
//点击开始修改
$(".modify").click(function(ev){
	$(".modify").parent().prev().prev().show();
	$(".modify").parent().prev().hide();
	$(this).parent().prev().prev().hide();
	$(this).parent().prev().show();
	$(this).parent().prev().children().val($(this).parent().prev().prev().text());
	$(this).parent().prev().children().focus();
	ev.stopPropagation();
	
});
//取消修改
$(".default").click(function(){
	$(this).parent().prev().show();
	$(this).parent().hide();
});
$(document).click(function(){
	$(".newcate").hide();
	$(".oldcate").show();
});
//提交修改
$(".submmit_data").click(function(event){
	var self = $(this);
	var name = $(this).parent().prev().text();
	var newname = $(this).prev().val();
	if(newname==""){
		alert("分类名不能为空");
		return;
	}
	$.ajax({
		type:"post",
		url:"/admin/category/edit",
		async:true,
		data:{
			name:name,
			newname:newname
		},
		dataType:"json",
		success:function(data){
			console.log(data.message);
			self.parent().prev().text(data.message);
			$(".default").parent().prev().show();
			$(".default").parent().hide();
		}
	});
});
//删除文章分类
$(".delete").click(function(){
	var result = confirm("确定要删除吗？该分类下的所有文章都会被删除");
	if(result){
		var name = $(this).parent().prev().prev().text();
		var self = $(this).parent().parent();
		console.log(name);
		console.log(self);
		$.ajax({
			type:"post",
			url:"/admin/category/delete",
			async:true,
			data:{
				name:name
			},
			dataType:"json",
			success:function(){
				window.location.reload();
			}
		});
	}else{
		return;
	}
});
//封装的添加文章分类方法
function cateAdd(name){
		
	if(name==""){
		$(".tips").html("请输入你要添加的分类");
	}else{
		$.ajax({
			type:"post",
			url:"/admin/category",
			data:{
				name:name
			},
			dataType:"json",
			success:function(data){
				console.log(data.code);
				if(data.code==0){
					$(".tips").html("该分类已存在");
				}else if(data.code==1){
					$(".tips").html("添加成功");
					setTimeout(function(){
						$(".tips").slideUp();
						$(".tips").html("");
						window.location.reload();
					},500);
				}
			}
		
			
		});
	}
	
}