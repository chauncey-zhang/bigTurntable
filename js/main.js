var switch_light = true;
var tip = 0;
$(function() {
	document.body.addEventListener('touchstart', function() {});
	//开始按钮绑定事件start
	$(".start").bind('click', lottery.reset);
	//开始按钮绑定事件end
	$('.prizePage').bind('click', function(e) {
			$(this).hide();
			//		$('.ticket').css('visibility', 'hidden')
			switch_scroll.enableScroll();
		})
		//查看按钮绑定事件
	$('.jiesuan_btn').bind('click', jiesuan_btn);
	//传入获得奖项的种类，ajaxPrize为奖盘序列号，左上角为1 ，顺时针排列，依次为1，2，3，4，5，6，7，8
	// window.ajaxPrize = Math.round(Math.random()*7)+1;
	// console.log(ajaxPrize)
})

window.onload = function() {
	var img = new Image();
	img.src = 'images/liang.png'
	img.src = 'images/end.png'


	an_liang_light();
	$('.scroll_2').html($('.scroll_1').html());
	scroll()
}

var an_liang_light = function() {
	if (switch_light) {
		$('#lights').removeClass().addClass('choujiang_action_liang')
		switch_light = false;
	} else {
		$('#lights').removeClass().addClass('choujiang_action_an');
		switch_light = true;
	}

	setTimeout('an_liang_light()', 500);
}

function scroll() {
		tip+=0.1
		$('.list_ctx').scrollTop(tip);
		if ($('.list_ctx').scrollTop() >= $('.scroll_1').height()) {
			$('.list_ctx').scrollTop(0);
			tip = 0;
		}
		setTimeout("scroll()", 1);
	}
	//查看卡券按钮函数

function jiesuan_btn(e) {
	e.stopPropagation();
	//	easingAnim('bounceInDown', '.ticket');
	//	$('.ticket').css('visibility', 'visible');
	//	$(this).unbind('click')
}

var switch_scroll = {
	//禁止touchmove
	preventDefault: function(e) {
		e = e || window.event;
		if (e.preventDefault)
			e.preventDefault();
		e.returnValue = false;
	},

	preventDefaultForScrollKeys: function(e) {
		if (keys[e.keyCode]) {
			this.preventDefault(e);
			return false;
		}
	},

	disableScroll: function() {
		if (window.addEventListener) // older FF
			window.addEventListener('DOMMouseScroll', this.preventDefault, false);
		window.onwheel = this.preventDefault; // modern standard
		window.onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE
		window.ontouchmove = this.preventDefault; // mobile
		document.onkeydown = this.preventDefaultForScrollKeys;
	},

	enableScroll: function() {
		if (window.removeEventListener)
			window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
		window.onmousewheel = document.onmousewheel = null;
		window.onwheel = null;
		window.ontouchmove = null;
		document.onkeydown = null;
	}
}

function easingAnim(x, id) {
	$(id).addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
		$(this).removeClass(x + ' animated');
	});
};