(function(window){var svgSprite='<svg><symbol id="icon-loginpassword" viewBox="0 0 1024 1024"><path d="M543.168 706.688c14.56-9.792 24.096-26.272 24.096-44.928 0-30.016-24.736-54.4-55.296-54.4s-55.296 24.352-55.296 54.4c0 20.128 11.136 37.728 27.68 47.136l-16 144.352 45.504-1.568 45.504 1.568-16.192-146.56zM502.624 96l22.048 0c125.888 0 228 102.08 228 227.968l0 154.112c51.392 2.88 84.544 5.504 84.544 5.504l0 432.96c0 0-166.912 11.456-327.168 11.456-164.96 0-323.232-11.456-323.232-11.456l0-432.96c0 0 34.592-2.784 87.808-5.76l0-153.856c0-125.92 102.08-227.968 228-227.968zM328.256 340.32l0 134.816c53.856-2.464 117.664-4.48 181.44-4.48 66.816 0 133.632 2.144 189.312 4.704l0-135.04c0-104.576-82.112-189.984-185.344-195.2-103.264 5.216-185.376 90.592-185.376 195.2z"  ></path></symbol><symbol id="icon-yonghu" viewBox="0 0 1024 1024"><path d="M598.215594 591.274508c176.913269 29.033243 227.892337 155.281599 227.892337 201.183022 0 62.770626-216.137619 77.698616-313.866431 77.698616-97.731882 0-313.8695-14.929014-313.8695-77.698616 0-45.093011 50.304709-173.801395 227.202629-201.124693 11.322883-1.74883 26.192545-38.266535 16.544815-44.936445-57.973366-40.079834-102.541421-109.466134-102.541421-221.380016 0-95.358835 71.690786-171.174568 172.664501-171.174568 100.967576 0 172.661432 75.81471 172.661432 171.174568 0 110.262266-46.89403 181.300182-105.062847 221.801619C570.839083 553.085744 587.120908 589.454046 598.215594 591.274508z"  ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)