//window.onload = function(){
//	/* 注册登录跳转按钮  */
//	var btn1 = document.getElementsByClassName("toregister")[0].getElementsByTagName("a")[0];
//	var btn2 = document.getElementsByClassName("toregister")[1].getElementsByTagName("a")[0];
//	
//	/* 登录注册框 */
//	var login = document.getElementsByClassName("login")[0];
//	var register = document.getElementsByClassName("register")[0];
//	var logSucc = document.getElementsByClassName("logSucc")[0];
//	console.log(logSucc);
//	/* 登录注册按钮 */
//	var btnR = document.getElementsByClassName("button")[0];
//	var btnL = document.getElementsByClassName("button")[1];
//	
//	
//	/* 注册模块 */
//	/* 提示注册内容 */
//	var tip1= document.getElementsByClassName("re_tips")[0];
//	var tip2 = document.getElementsByClassName("re_tips")[1];
//	var tip3 = document.getElementsByClassName("re_tips")[2];
//	/* 提示登录内容 */
//	var tip0 = document.getElementsByClassName("lg_tips")[0];
//	/* 注册输入框 */
//	var logR = document.getElementsByClassName("row")[2].getElementsByTagName("input")[0];
//	var passR1 = document.getElementsByClassName("row")[3].getElementsByTagName("input")[0];
//	var passR2 = document.getElementsByClassName("row")[4].getElementsByTagName("input")[0];
//	/* 登录输入框 */
//	var userR1 = document.getElementsByClassName("row")[0].getElementsByTagName("input")[0];
//	var userR2 = document.getElementsByClassName("row")[1].getElementsByTagName("input")[0];
//	/* 注册输入框事件 */
//	logR.onfocus = function(){
//		tip1.innerText = "";
//	}
//	passR1.onfocus = function(){
//		tip2.innerText = "";
//	}
//	passR2.onfocus = function(){
//		tip2.innerText = "";
//	}
//	/* 登录输入框事件 */
//	userR1.onfocus = function(){
//		tip0.innerText = "";
//	}
//	userR2.onfocus = function(){
//		tip0.innerText = "";
//	}
//	/* 登录注册按钮事件 */
//	btn1.onclick = function(){
//		login.style.display = "none";
//		register.style.display = "block";
//	}
//	
//	btn2.onclick = function(){
//		login.style.display = "block";
//		register.style.display = "none";
//	}
//	
//	/*	页面按钮  */
//	/* 点击注册按钮  注册逻辑 */
//	btnL.onclick = function(){
//		var user = document.getElementsByClassName("row")[2].getElementsByTagName("input")[0].value;
//		var pass = document.getElementsByClassName("row")[3].getElementsByTagName("input")[0].value;
//		var repass = document.getElementsByClassName("row")[4].getElementsByTagName("input")[0].value;
//		if(!logR.value){
//			tip1.innerText = "用户名不能为空";
//		}else if(passR1.value==null){
//			tip2.innerText = "密码不能为空";
//		}else if(passR1.value!=passR2.value){
//			tip2.innerText = "两次输入密码不一致";
//		}else{
//			ajax("/api/user/register","username="+user+"&password="+pass+"&repassword="+repass,"application/x-www-form-urlencoded",function(){
//				var data = JSON.parse(this.responseText);
//				if(!data.code){
//					tip3.innerText = data.message;
//					setTimeout(function(){
//						login.style.display = "block";
//						register.style.display = "none";
//						},1000);
//					}
//				if(data.code==4){
//					tip3.innerText = data.message;
//				}
//			});
//		}
//	}
//	/* 登录模块 */
//	/* 点击登录 */
//	btnR.onclick = function(){
//		var user = document.getElementsByClassName("row")[0].getElementsByTagName("input")[0].value;
//		var pass = document.getElementsByClassName("row")[1].getElementsByTagName("input")[0].value;
//		if(user==""||pass==""){
//			tip0.innerText = "用户名或密码不能为空";
//		}else{
//			
//			ajax("/api/user/login","username="+user+"&password="+pass,"application/x-www-form-urlencoded",function(){
//				var data = JSON.parse(this.responseText);
//				console.log(data);
//				if(data.code){
//					tip0.innerText  = data.message;
//				}else{
//					setTimeout(function(){
//						login.style.display = "none";
//						logSucc.style.display = "block";
//					},500);
//				}
//			});
//		}
//	}
//	/* 用户信息框 */
//	var userInfo = document.getElementsByClassName("userInfo")[0];
//	console.log(userInfo);
//	
//	userInfo.innerText = "注销";
//	/* ajax组件 */
//	function ajax(url,data,type,fsucc){
//		
//		var oajax = new XMLHttpRequest();
//		
//		oajax.open("post",url,true);
//		
//		oajax.setRequestHeader("Content-type",type);
//		
//		oajax.send(data);
//		oajax.onreadystatechange = function(){
//			if(oajax.readyState == 4){
//				if(oajax.status==200){
//					console.log(this.responseText);
////					tip1.innerText = JSON.parse(this.responseText);
//					fsucc.call(this);
//				}
//			}
//		}
//	}
//}
//

//if($.cookie('user')){
//	$(".userId").html($.cookie("user"));
//	$(".login").hide();
//	$(".userInfo").show();
//}
//注销按钮
$(".logout").click(function(){
//	$.cookie("userInfo._id",null,{expires:-1});//删除cookies
	$.ajax({
		url:"/api/user/logout",
		success:function(result){
			if(!result.code){
				window.location.reload();
			}
		}
	});
});
//登录注册切换
$(".login").find(".link").click(function(){
	$(".login").fadeOut();
	$(".register").fadeIn();
});
$(".login").find("input").focus(function(){
	$(".tips").html("");
});

$(".register").find(".link").click(function(){
	$(".login").fadeIn();
	$(".register").fadeOut();
});

$(".register").find("input").focus(function(){
	$(".tips").html("");
});

//注册
$(".register").find(".btn").click(regisTer);
//登录
$(".login").find(".btn").click(logIn);
//键盘注册登录
$(document).keydown(function(ev){
	if($(".login").is(":visible")){
		if(ev.keyCode==13){
			logIn();
		}
	}
	if($(".register").is(":visible")){
		if(ev.keyCode==13){
			regisTer();
		}
	}
});



function logIn(){
	var username = $(".login").find("input[name='username']").val();
	var password = $(".login").find("input[name='password']").val();
	

	
	if(username==""||password==""){
		$(".login").find(".tips").html("用户名或密码不能为空");
	}else{
		$.ajax({
			type:"post",
			url:"/api/user/login",
			data:{
				"username":username,
				"password":password
			},
			dataType:"json",
			success:function(data){
				if(data.code==2){
					$(".login").find(".tips").html("用户名或密码错误");
				}else{
					$(".login").find(".tips").html("登录成功！");
					setTimeout(function(){
//						$.cookie("user",username,{expires:7});
//						$(".userId").html($.cookie("user"));
//						$(".login").hide();
//						$(".userInfo").show();
						//清空记录
						$(".login").find("input[name='username']").val("");
						$(".login").find("input[name='password']").val(""); 
						$(".login").find(".tips").html("");
						window.location.reload();
					},500);
				}
			}
		});
	}
}
function regisTer(){
	var username = $(".register").find("input[name='username']").val();
	var password = $(".register").find("input[name='password']").val();
	var repassword = $(".register").find("input[name='repassword']").val();
	
	console.log(username);
	console.log(password);
	
	if(username==""||password==""){
		$(".register").find(".tips").html("用户名或密码不能为空");
	}else if(password!=repassword){
		$(".register").find(".tips").html("两次输入密码不一致");
	}else{
		$.ajax({
			type:"post",
			url:"/api/user/register",
			data:{
				"username":username,
				"password":password
			},
			dataType:"json",
			success:function(data){
				if(data.code){
					$(".register").find(".tips").html("用户名已被注册");
				}else{
					$(".register").find(".tips").html("注册成功");
					//注册设置cookies
//					$.cookie("user",username,{expires:7});
//					$(".userId").html($.cookie("user"));
					setTimeout(function(){
						//清空记录
						$(".register").find("input[name='username']").val("");
						$(".register").find("input[name='password']").val(""); 
						$(".register").find("input[name='repassword']").val("");
						$(".register").find(".tips").html("");
						window.location.reload();
					},500);
				}
				
			}
		});
	}
}