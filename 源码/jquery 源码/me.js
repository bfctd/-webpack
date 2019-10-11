(function $(argument) {
	function jQuery(){
		return new jQuery.prototype.init()
	}

	jQuery.prototype = {
		init:function(){

		},
		a:function(){
			return 'a'
		}
	}

	jQuery.extend=function(){
		if (arguments.length ===1) {
			var obj = arguments[0]
			jQuery.prototype.init.extend = obj
		}else{
			alert('拷贝，浅or深')
		}
	}


	// 共享原型，就是想让jquery.prototype.init.protytype 和 jQuery.prototype 的原型一样。扩展在jq.prototype 原型属性上的对象同样能出现在init的prototype上
	jQuery.prototype.init.prototype = jQuery.prototype;

	window.$ = window.jQuery = jQuery
})()