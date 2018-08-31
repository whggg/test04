$(function(){
			$('.xieyi .xy_l b').click(function(event) {
				$(this).find('img').toggle();
			});

			$('.header_c .tas').click(function(event) {
				var index = $(this).index();
				$(this).find('.imgs').addClass('imgshow');
				$(this).siblings().find('.imgs').removeClass('imgshow');
				$('.tab .tabs').eq(index).show().siblings().hide();
			});

			//登录
			$(".tab1 input").keyup(function(event) {
				/* Act on the event */
				var login = $(".tab1 ul li input[type='text']")
				var pwd = $(".tab1 ul li input[type='password']")
				if(login.val()==''){
					$('.tab1 .submit').show()
					$('.tab1 .submit1').hide()
				}else if(pwd.val()==''){
					$('.tab1 .submit').show()
					$('.tab1 .submit1').hide()
				}
				// }else if ($('.xy_l img').is(":visible")==false) {
				// 	$('.tab1 .submit').show()
				// 	$('.tab1 .submit1').hide()
				// }
				else {
					$('.tab1 .submit1').show()
					$('.tab1 .submit').hide()
				}
			// }
			});

			$('.tab1 .submit1').click(function(event) {
     				window.location.href='gan/daohangye.html'
			});
			// 注册
			$(".tab2 input").keyup(function(event) {
				
				if($('.login1').val()==''){
					$('.tab2 .submit').show()
					$('.tab2 .submit1').hide()
				}else if($('.pwd1').val()==''){
					$('.tab2 .submit').show()
					$('.tab2 .submit1').hide()
				}else if ($('.pwd2').val()=='') {
					$('.tab2 .submit').show()
					$('.tab2 .submit1').hide()
				}else if ($('.phone').val()=='') {
					$('.tab2 .submit').show()
					$('.tab2 .submit1').hide()
				}else if ($('.yanzheng').val()=='') {
					$('.tab2 .submit').show()
					$('.tab2 .submit1').hide()
				}
				else {
					$('.tab2 .submit1').show()
					$('.tab2 .submit').hide()
				}
			});

			$('.tab2 .submit1').click(function(event) {
     				$('.tab1').show();
     				$('.tab2').hide();
     				$('.header_c .denglu').find('.imgs').addClass('imgshow');
     				$('.header_c .zhuce').find('.imgs').removeClass('imgshow');
			});

			$('.zhuce').click(function(event) {
				$('.zhezhao').fadeToggle(500);
				$('.content').fadeIn(500);
			});
			$('.yes').click(function(event) {
				$('.content').fadeOut(500);
				$('.zhezhao').fadeOut(500);
				$('.xy_l b img').show(500);
			});
			$('.no').click(function(event) {
				$('.content').fadeOut(500);
				$('.zhezhao').fadeOut(500);
				$('.tab1').show();
     			$('.tab2').hide();
     			$('.header_c .denglu').find('.imgs').addClass('imgshow');
     			$('.header_c .zhuce').find('.imgs').removeClass('imgshow');
			});

})