var page = 1;
var limit = 10;
var pages = null;
//每次刷新进入页面显示评论
$.ajax({
	type:"get",
	url:"/api/comment",
	data:{
		contentid:$("#contentId").text(),
	},
	success:function(responseData){
		renderComment(responseData.data.reverse());
		pages = responseData.data.length/limit;
		$("#messageCount").text(responseData.data.length);
	}
});


$("#commentBtn").click(function(){
	if($("#messageContent").val()){
		$.ajax({
			type:"post",
			url:"/api/comment/post",
			data:{
				contentid:$("#contentId").text(),
				content:"<pre class='mycomments' style='white-space:pre-wrap;'>"+$("#messageContent").val()+"</pre>"
			},
			success:function(responseData){
				pages = responseData.data.length/limit;
				content:$("#messageContent").val("");
				renderComment(responseData.data.comments.reverse());
			}
		});
	}else{
		return;
	}
});
function renderComment(comments){
	var html = "";
	for(var i = 0+limit*(page-1);i<Math.min(limit*page,comments.length);i++){
		html += '<div class="messageBox" style="padding-top:30px;padding-bottom:30px;">'
		+				"<div><p class='name clear'><span class='f1'>"
		+				comments[i].username+"  "+"</span><span class='fr'>"
		+formatDate(comments[i].postTime)+"</span></p>"+comments[i].content
		+"</div><a class='innerComment' style='cursor:pointer'>引用</a></div>";
	}
	$(".messageList").html(html);
}
$("#next").click(function(){
	if(page>=Math.ceil(pages)){
		return;
	}else{
		page = page + 1;
		$.ajax({
			type:"get",
			url:"/api/comment?page="+page +"&"+new Date(),
			data:{
				contentid:$("#contentId").text(),
			},
			success:function(responseData){
				renderComment(responseData.data.reverse());
				$("#messageCount").text(responseData.data.length);
			}
		});
	}
});
$("#prev").click(function(){
		if(page<=1){
		}else{
			page = page - 1;
			$.ajax({
				type:"get",
				url:"/api/comment?page="+page +"&"+new Date(),
				data:{
					contentid:$("#contentId").text(),
				},
				success:function(responseData){
					renderComment(responseData.data.reverse());
					$("#messageCount").text(responseData.data.length);
				}
			});
		}
		
});
setTimeout(function(){
	$(".innerComment").click(function(){
		$("#messageContent").text($(this).prev().html());
		console.log($(this).prev());
	});
},500);

function formatDate(d){
	var date = new Date(d);
	return date.getFullYear() + "年" + (date.getMonth()+1)+"月" + date.getDate() + "日" + date.getHours() + ":" + date.getMinutes() + ":" +date.getSeconds();
}
