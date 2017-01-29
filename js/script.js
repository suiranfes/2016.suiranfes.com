/* ===================================================================

 * click_or_tap : window.TouchEventでDOM.click_or_tapの中身を変えるだけ

 * 追加 20161102 Akyus

=================================================================== */
$(function($) {
if(window.TouchEvent){
$('.click_or_tap').html("タップ");
}else{
$('.click_or_tap').html("クリック");
}
});
/* ===================================================================

 * PC向けメニュー

=================================================================== */
$(function($) {
	$(window).on('scroll', function() {
		var headerH = $('header').outerHeight(true);
		if ($(this).scrollTop() > headerH) {
			$('nav').addClass('fixed');
		} else {
			$('nav').removeClass('fixed');
		}
	});
});


/* ===================================================================

 * スマホ向けメニュー

=================================================================== */
$(function($){
	$('#spMenu').hide();
	var windowWidth = window.innerWidth || document.documentElement.clientWidth || 0;

	// 読み込み時処理
	$(window).on('load', function(){
		slideMenu();
		headerHight();
		summay();
		spMenu();
		subNav();
	});

	// リサイズ時処理
	$(window).on('resize', function(){
		var nowWidth = window.innerWidth || document.documentElement.clientWidth || 0;
		if(windowWidth != nowWidth) {
			slideMenu();
			headerHight();
		}
	});

	// PCとスマートフォンのメニュー切り替え
	function slideMenu() {
		if ($('#main').css('float') == 'none') {
			$('#spMenu').show();
			$('.gnav').hide();
		}else {
			$('#spMenu').hide();
			$('.gnav').show();
		}
	}

	// ヘッダー分の余白取得（スマートフォンのみ）
	function headerHight() {
		if ($('#main').css('float') == 'none') {
			var headerH = $('header').outerHeight(true);
			$('body').css({'margin-top' : headerH});
		}else {
			$('body').css({'margin-top' : 0});
		}
	}

	// メニューボタンの表示（
	function spMenu() {
		$('#spMenu').on('click', function(e) {
			$('.gnav').slideToggle(e);
			$('#navBtnIcon').toggleClass('close');
			$('html, body').toggleClass('lock');
		});
	}

	// サブメニューの表示
	function subNav() {
		if ($('#main').css('float') == 'none') {
			$('.subnav > a').on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				$(this).parent().find('ul').slideToggle();
				$(this).parent().toggleClass('active');
			});
		} else {
			if('ontouchstart' in document) {
				$('.subnav > a').on('click', function(e) {
					e.preventDefault();
					$(this).parent().toggleClass('showNav');
					$(this).parent().find('li').toggleClass('showSub');
				});
			} else {
				$('.subnav').hover(function(){
					$(this).find('li').addClass('showSub');
				}, function(){
					$(this).find('li').removeClass('showSub');
				});
			}
		}
	}

	// 要約部分の非表示
	function summay() {
		if ($('#main').css('float') == 'none') {
			var position = 50; // 非表示位置
			var $element = $('.summary');
			if ($(window).scrollTop() > position){
				$element.hide();
			}
			$(window).on('scroll', function(){
				if ($(this).scrollTop() >= position) {
					$element.not(':animated').hide();
				} else {
					$element.not(':animated').show();
				}
				headerHight();
			});
		}
	}
});
