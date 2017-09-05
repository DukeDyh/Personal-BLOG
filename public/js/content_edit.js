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
	var id = $("#content-id").text();
	var title = $("#title").val();
	var category = $("#category").val();
	var description = $("#description").val();
	var content = $("#content").val();
	$.ajax({
		type:"post",
		url:"/admin/content/edit",
		async:true,
		data:{
			id:id,
			title:title,
			description:description,
			content:content,
			category:category
		},
		dataType:"json",
		success:function(data){
			if(data.code==1){
				$(".tips").text("修改文章成功！");
					window.history.back();
			}
		}
	});
});
$(".tips").css("color","red");
