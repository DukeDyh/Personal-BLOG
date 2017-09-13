$(".mynavbar").find("li").on("click",function(){
	$(this).find("ul").slideToggle();
});
function mobile(){
	if($(window).width()<768){
		$(".more").text("更多");
	}
}
mobile();