//首先要加速，第一圈加速，最后一圈减速

var lottery={
     index : 1, //起点
     speed : 400, //初始速度
     roll:0, //定时器id
     cycle : 1, //已跑的圈速
     times : 4, //至少跑几圈
     prize : -1, //中奖索引
     btn:0,
    run : function () {
        var before = lottery.index == 1 ? 8 : lottery.index - 1;
        $(".roll-" + lottery.index).addClass("move");
        $(".roll-" + before).removeClass("move");
 		 //初步加快的过程
        lottery.upSpeed();
        lottery.downSpeed();
        lottery.index += 1;
        lottery.index = lottery.index == 9 ? 1 : lottery.index;
    },
    //提速
    upSpeed : function () {
        if (lottery.cycle < 2 && lottery.speed > 100) {
            lottery.speed -= lottery.index * 8;
            lottery.stop();
            lottery.start();
        }
    },
    //降速
    downSpeed:function () {
        if (lottery.index == 8) {
            lottery.cycle += 1;
        }
        if (lottery.cycle > lottery.times - 1 && lottery.speed < 400) {
            lottery.speed += 20;
            lottery.stop();
            lottery.start();
        }
 
        if (lottery.cycle > lottery.times && lottery.index == lottery.prize) {
            lottery.stop();
            lottery.showPrize();
         
        }
 
    },
    //先停止再显示结果 按钮显示出来
    showPrize:function(){
         
        setTimeout(function(){
             
//          alert("price is "+lottery.prize);
//			$('.prizePage').css('display','inherit');
			easingAnim('bounceInDown', '.jiesuan');
			$('.prizePage').show();
            lottery.btn.bind('click',lottery.reset);
            lottery.btn.removeClass().addClass('start');
//          switch_scroll.enableScroll();
 
        },700);
    },
 
    //重新开始
    reset : function () {
        lottery.btn=$(this);
        lottery.btn.unbind('click');
        lottery.btn.removeClass().addClass('end');
        switch_scroll.disableScroll();
        lottery.speed = 400;
        lottery.cycle = 0;
        lottery.prize = Math.round(Math.random()*7)+1;
        $('.jiesuan_prize_num').html($('.roll-'+lottery.prize).children().eq(0).text());
        console.log(lottery.prize);
        console.log($('.roll-'+lottery.prize).children().eq(0).text());
        lottery.run();
    },
    start : function () {
        lottery.roll = setInterval(lottery.run, lottery.speed);
    },
 
    stop : function () {
        clearInterval(lottery.roll);
    }
}