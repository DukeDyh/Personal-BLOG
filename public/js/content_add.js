$(".tips").css("color","red");
$(".btn").click(function(){
	if($("#title").val()==""){
			$(".tips").text("标题不能为空！");
			return;
	}else if($("#description").val()==""){
			$(".tips").text("简介不能为空!");
			return;
	}else if($("#content").val()==""){
			$(".tips").text("内容不能为空");
			return ;
	}
	var title = $("#title").val();
	var category = $("#category").val();
	var description = $("#description").val();
	var content = $("#content").val();
	$.ajax({
		type:"post",
		url:"/admin/content/add",
		async:true,
		data:{
			title:title,
			description:description,
			content:content,
			category:category
		},
		dataType:"json",
		success:function(data){
			if(data.code==1){
				$(".tips").text("添加文章成功！");
				setTimeout(function(){
					window.location.reload();
				},1000);
			}
		}
	});
});
$("#title").focus(function(){
	$(".tips").text("");
});
$("#description").focus(function(){
	$(".tips").text("");
});
$("#content").focus(function(){
	$(".tips").text("");
});
