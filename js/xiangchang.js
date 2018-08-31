// H5 plus事件处理
function plusReady(){
	var ev=document.getElementById('version');
	ev&&(ev.innerText=plus.runtime.version);
	plus.webview.currentWebview().show('zoom-fade-out');
	// 更新分享按钮
	plus.share.getServices(function(s){
		for(var i in s){
			shares[s[i].id]=s[i];
		}
		var ss=shares['weixin'];
		ss&&ss.nativeClient&&(shareBts.push({title:'微信朋友圈',s:ss,x:'WXSceneTimeline'}),
		shareBts.push({title:'微信好友',s:ss,x:'WXSceneSession'}));
		ss=shares['sinaweibo'];
		ss&&shareBts.push({title:'新浪微博',s:ss});
		ss=shares['qq'];
		ss&&ss.nativeClient&&shareBts.push({title:'QQ',s:ss});
		shareBts.push({title:'更多'});
	},function(e){
		console.log('updateShare failed: '+JSON.stringify(e));
	});
	// 在流应用环境下显示“创建桌面图标”
	if(navigator.userAgent.indexOf('StreamApp')>=0){
		shortcut.style.display='block';
	}
	// 设置窗口优化隐藏
	dragHide();
}
document.addEventListener("plusready",plusReady,false);

// 判断是否为流应用环境
var bStream = navigator.userAgent.indexOf('StreamApp')>=0;

// 分享应用
var shares={},shareBts=[];
function share(){
	(shareBts.length>1)||('Android'!==plus.os.name&&shareBts.length>0)?plus.nativeUI.actionSheet({title:'分享"HelloH5"应用',cancel:'取消',buttons:shareBts},function(e){
		(e.index>0)&&shareAction(shareBts[e.index-1]);
	}):(shareBts.length>0?shareWithSystem():plus.nativeUI.alert('当前环境无法支持分享操作!'));
}
function shareAction(sb){
	if(!sb.s){
		shareWithSystem();
		return;
	}
	var msg={};
	msg.href=bStream?'http://m3w.cn/s/HelloH5?url=about&__streamapp':'http://www.baidu.com';
	msg.content='我在"财礼无忧"上面发布了一条新动态,快来体验吧';
	sb.x&&(msg.extra={scene:sb.x});
	msg.thumbs=msg.pictures=['_www/icon.png'];
	console.log('share '+sb.title+' : '+JSON.stringify(msg));
	sb.s.authenticated?shareMessage(sb.s,msg):sb.s.authorize(function(){
		shareMessage(sb.s,msg);
	},function(e){
		plus.nativeUI.toast('取消分享!');
	});
}
function shareMessage(s,m){
	s.send(m, function(){
		plus.nativeUI.toast('完成分享!');
	},function(e){
		plus.nativeUI.toast('取消分享!');
	});
}
function shareWithSystem(){
	plus.share.sendWithSystem?plus.share.sendWithSystem({
		content:'我在"财礼无忧"上面发布了一条新动态,快来体验吧('+(bStream?'http://m3w.cn/s/HelloH5?__streamapp':'http://www.baidu.com')+')',
		title:'财礼无忧',
		href:bStream?'http://m3w.cn/s/HelloH5?__streamapp':'http://www.baidu.com',
		pictures:('Android'==plus.os.name)?null:['_www/icon.png']
	}):shareWithSystemNativeJS();
}
function shareWithSystemNativeJS(){
	var main = plus.android.runtimeMainActivity(),
	Intent = plus.android.importClass('android.content.Intent'),
	File = plus.android.importClass('java.io.File'),
	Uri = plus.android.importClass('android.net.Uri');
	var intent=new Intent(Intent.ACTION_SEND),
	p=plus.io.convertLocalFileSystemURL('_www/icon.png'),
	f=new File(p),
	uri=Uri.fromFile(f);
	if(f.exists()&&f.isFile()){
		intent.setType('image/*');
		intent.putExtra(Intent.EXTRA_STREAM,uri);
	}else{
		intent.setType('text/plain');
	}
	intent.putExtra(Intent.EXTRA_SUBJECT,'财礼无忧');
	intent.putExtra(Intent.EXTRA_TEXT,'我在"财礼无忧"上面发布了一条新动态,快来体验吧('+(bStream?'http://m3w.cn/s/HelloH5?__streamapp':'http://www.baidu.com')+')');
	intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
	main.startActivity(Intent.createChooser(intent,'分享"财礼无忧"应用'));
}
function createShortcut(){
	plus.navigator.createShortcut({name:'财礼无忧',icon:'icon.png'});
}
function dragHide(){
	var ws = plus.webview.currentWebview();
	// 窗口隐藏时调整到正确位置（drag操作会修改窗口位置），否则可能导致无法调用show方法显示
	ws.addEventListener('hide',function(){
		ws.setStyle({left:'0px'});
	},false);
	// 设置拖动关闭当前窗口
	// ws.drag({direction:'right',moveMode:'followFinger'}, {view:plus.runtime.appid,moveMode:'silent'}, function(e){
	// 	if(e.type=='end'&&e.result){
	// 		ws.hide();
	// 	}
	// 	console.log('Drag Event: '+JSON.stringify(e));
	// });
}

$(function(){
			$('.duihua .img1').click(function(event) {
				$(this).siblings('.pl').stop().fadeToggle(500);
				event.stopPropagation();
			});
			$(document).click(function(event) {
				$('.pl').fadeOut(1000);
				event.stopPropagation();
			});

			var i=0;
			$('.bt1').click(function(event) {
				if (i==0) {
					$(this).find('span').text('取消');
					i=1;
				}else {
					$(this).find('span').text('赞')
					i=0;
				}
			});

			$('.bt2').click(function(event) {
				$(this).parent().siblings().find('.plinp').show();
				$(this).parent().siblings().find('.plinp').css('display','flex');
			});
			$('.sub').click(function(event) {
				$(this).parent('.plinp').hide();
			});
		})

		document.addEventListener("plusready", function() {
	        // 注册返回按键事件
	        plus.key.addEventListener('backbutton', function() {
	            // 事件处理
	            window.history.back();
	        }, false);
	    });


