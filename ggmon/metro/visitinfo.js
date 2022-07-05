var visitDate = new Date();
var visitTime = String(Math.floor(visitDate.getTime() / 1000));
var visitCode = visitTime.concat(String(Math.floor(Math.random() * 10 + 1) - 1)).concat(String(Math.floor(Math.random() * 10 + 1) - 1)).concat(String(Math.floor(Math.random() * 10 + 1) - 1)).concat(String(Math.floor(Math.random() * 10 + 1) - 1));

var parser = document.createElement('a');
parser.href = window.location.href.replace("s3.amazonaws.com/", "");

var urlHost = parser.host && parser.host.toLowerCase();
var visitUrl = parser.pathname && parser.pathname;

var visitUrls = visitUrl.split("/");
function loadFile(file, callback) {
	var elem = document.createElement("script");
	elem.setAttribute("src", file);
	elem.setAttribute("async", "true");
	elem.setAttribute("defer", "defer");
	// async="true" defer
	elem.onload = function () {
		if (callback) {
			callback();
		}
	};
	document.head.appendChild(elem);
}

/*if(visitUrls.length>=4&&urlHost=='online.fliphtml5.com'){
	var uLink=visitUrls[1];
	var bLink=visitUrls[2];
	jQuery(document).ready(function(){
			getBookCaseConfig("http://stat.fliphtml5.com/statistic-server/add-book-visitinfo.php?uLink="+uLink+"&bLink="+bLink+"&type=1&page=1&code="+visitCode);
		});
}*/

//ad-banner
if (visitUrls.length >= 4) {
	if (urlHost == 'online.fliphtml5.com') {
		$.getScript("../getuserinfo.js")
			.done(function (script, textStatus) {
				if (typeof userInfo != 'undefined') {
					var uType = userInfo.user_type;
					var ad_flag = userInfo.disable_ad
				} else {
					var uType = user_type
					var ad_flag = disable_ad
				}
				if (uType == 0) {
					// å¹¿å‘Šé…ç½®å‚æ•°
					var ads = [
						{
							name: 'fh_small',
							width: 320,
							height: 50,
							googleAd: '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> <ins class="adsbygoogle" style="display:inline-block;width:320px;height:50px" data-ad-client="ca-pub-9840740068404348" data-ad-slot="2711178962"></ins> <script> (adsbygoogle = window.adsbygoogle || []).push({}); </script>'
						},
						{
							name: 'fh_middle',
							width: 468,
							height: 60,
							googleAd: '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> <ins class="adsbygoogle" style="display:inline-block;width:468px;height:60px" data-ad-client="ca-pub-9840740068404348" data-ad-slot="3498836391"></ins> <script> (adsbygoogle = window.adsbygoogle || []).push({}); </script>'
						},
						{
							name: 'fh_large',
							width: 728,
							height: 90,
							googleAd: '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px" data-ad-client="ca-pub-9840740068404348" data-ad-slot="8863807747"></ins> <script> (adsbygoogle = window.adsbygoogle || []).push({}); </script>'
						}
					];

					// æ ¹æ®çª—å£å®½åº¦ï¼Œç¡®å®šè¦åŠ è½½çš„å¹¿å‘Šå°ºå¯¸
					var ad;
					var windowWidth = $(window).width();
					if (windowWidth >= 1000) {
						ad = ads[2];
					} else if (windowWidth < 1000 && windowWidth >= 600) {
						ad = ads[1];
					} else {
						ad = ads[0];
					}

					var barHeight = 0;
					var hasBar = false;
					var bottom = 25;
					var other = 5;
					var old_buttonMargin = 0;
					if (typeof toolBar == 'object' && typeof toolBar.getBottomHeight == 'function') {
						var barHeight = toolBar.getBottomHeight()
						hasBar = true;
						bottom = barHeight + other;
						old_buttonMargin = bookConfig.bottomMargin || 0;
						bookConfig.bottomMargin = old_buttonMargin + ad.height + other;
						onStageResize()
					}

					// æž„é€ å¹¿å‘Šçš„url
					var iframeSrc, imgSrc;
					if (location.host == 'localhost') {
						imgSrc = "/visit/" + ad.name + ".png";
						// iframeSrc = "/visit/banner_" + ad.width + "_" + ad.height + ".html";  // å·²åœç”¨
					} else {
						imgSrc = "//static.fliphtml5.com/book/banner/" + ad.name + ".png";
						// iframeSrc = "//static.fliphtml5.com/book/banner/banner_" + ad.width + "_" + ad.height + ".html"; // å·²åœç”¨
					}

					var $body = $("body");
					var $container = $("<div class='fh5---banner---container'></div>").css({
						display: 'none',
						zIndex: 99999,
						position: "fixed",
						width: ad.width + 'px',
						height: ad.height + 'px',
						left: "50%",
						marginLeft: -ad.width / 2,
						bottom: bottom,
						border: "1px solid #181818",
						background: "white"
					});

					var $adsText = $("<div>Ads</div>").css({
						position: "absolute",
						left: "0",
						bottom: "100%",
						background: "white",
						border: "1px solid gray",
						color: "gray",
						padding: "2px 6px",
						fontSize: "13px",
						lineHeight: "13px",
						marginBottom: "2px"
					});

					var $closeBtn = $("<div style=''></div>").css({
						cursor: "pointer",
						position: "absolute",
						border: "1px solid #181818",
						width: 22,
						height: 22,
						cursor: "pointer",
						background: "white url(//static.fliphtml5.com/book/banner/close.png) no-repeat 3px 3px",
						left: "100%",
						top: "0px",
						marginLeft: "2px"
					});

					$container
						.append($closeBtn)
						.append($adsText);

					var $fh_banner = $("<a href='//fliphtml5.com?gad' target='_blank'><img src='" + imgSrc + "' alt='' /></a>").css({
						position: "absolute",
						width: "100%",
						height: "100%"
					});

					// æ‰‹æœºç¦ç”¨è°·æ­Œå¹¿å‘Šæ—¶ï¼Œæ·»åŠ æˆ‘ä»¬çš„å¹¿å‘Šã€‚ç”µè„‘å§‹ç»ˆåŠ è½½æˆ‘ä»¬çš„å¹¿å‘Šï¼Œæ²¡ç¦ç”¨è°·æ­Œçš„è¯ï¼Œå†åŠ è½½è°·æ­Œå¹¿å‘ŠæŒ¡ä½æˆ‘ä»¬çš„å¹¿å‘Š
					if (ad_flag == 1) {
						addFH5Ad()
					} else {
						if (isPhone() || isPad()) {
							// addMobileGoogleAd()
							ad = ads[0];
							$container
								.append($(ad.googleAd))
								.appendTo($body);
						} else {
							addPCGoogleAd()
						}
					}

					// å¹¿å‘Šå®¹å™¨å»¶è¿Ÿ2sæ‰å‡ºçŽ°
					setTimeout(function () {
						// ç”¨äº†fadeIn, ä¼šå¯¼è‡´å®¹å™¨é«˜åº¦ä¸¢äº†ï¼Œè¿™é‡Œé‡æ–°è®¾ç½®ä¸€ä¸‹é«˜åº¦ã€‚
						$container.height(ad.height).fadeIn(400);
					}, 2000);

					$closeBtn.on("click", function () {
						$container.remove();
						if(hasBar) {
							bookConfig.bottomMargin = old_buttonMargin;
							onStageResize()
						}
					});

					function addFH5Ad() {
						$container
							.append($fh_banner)
							.appendTo($body);
					}

					function addPCGoogleAd() {
						$container
							.append($(ad.googleAd))
							.appendTo($body);
					}

					function addMobileGoogleAd() {
						// $("body").append('<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><script>(adsbygoogle = window.adsbygoogle || []).push({google_ad_client: "ca-pub-9840740068404348",enable_page_level_ads: true});</script>');
						$("body").append('<script data-ad-client="ca-pub-9840740068404348" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>');
					}
					// ads end
				}
			})
			.fail(function (jqxhr, settings, exception) {
				//åŠ è½½å¤±è´¥
			});
	}
}

function sendvisitinfo(type, page) {
	var type = type;
	var page = page;
	if (type == null) {
		var type = '';
	}
	if (page == null) {
		var page = '';
	}

	var isAdd = false;
	if (visitUrls.length >= 4) {
		var uLink = visitUrls[1];
		var bLink = visitUrls[2];
		if (urlHost == 'online.fliphtml5.com') {
			isAdd = true;
		} else if ((urlHost == 'fliphtml5.com') && (visitUrls[1] == 'read')) {
			var uLink = visitUrls[2];
			var bLink = visitUrls[3];
			isAdd = true;
		} else {
			if (uLink == 'books') {
				uLink = 'domain_' + urlHost;
				isAdd = true;
			}
		}
	}
	if (isAdd == true) {
		jQuery(document).ready(function () {
			getBookCaseConfig("//newstat.fliphtml5.com/bookvisitinfo.html?uLink=" + uLink + "&bLink=" + bLink + "&type=" + type + "&page=" + page + "&code=" + visitCode);
		});
	}
}

function getBookCaseConfig(url, callBack) {
	$.ajax({
		async: true,
		url: url,
		type: "GET",
		dataType: 'script',
		jsonp: 'jsoncallback',
		timeout: 5000,
		beforeSend: function () {
		},
		success: function (json, s) {
		},
		complete: function (XMLHttpRequest, textStatus) {
			if (textStatus == "success" && typeof callBack == "function") {
				callBack();
			};
		},
		error: function (xhr) {
		}
	});
};
$(document).ready(function () {
	var t = new Date().getTime();
	loadFile('https://static.fliphtml5.com/book/js/statistic.js?' + t, function () {
		loadFile('https://static.fliphtml5.com/book/js/writeLog.js?' + t);
	});
})