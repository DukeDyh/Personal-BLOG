$(".tips").css("color","red");
$(".content-delete").click(function(){
	var id = $(this).parent().prev().prev().prev().text();
	console.log(id);
	var result = confirm("你确定要删除这篇文章吗？");
	if(result){
		$.ajax({
			type:"post",
			url:"/admin/content/delete",
			async:true,
			data:{
				id:id
			},
			dataType:"json",
			success:function(){
				$(".tips").show();
				$(".tips").text("删除成功");
				setTimeout(function(){
					window.location.reload();
				},1000);
			}
		});
	}else{
		return;
	}
	
});

