/**
 * @author monkindey
 * @date 2015.10.1
 * @description 实现Mac dock效果 PS.苦逼的国庆节还在公司
 * 
 *
 * offsetTop：offsetTop returns the distance of the current element relative 
 * to the top of the offsetParent node
 */

var dockEffect = (function(Doc) {
	/**
	 * config
	 * el: 对那个父元素里面的元素显示dock效果，id(string)
	 * toTag: img(默认是查看对应元素的img)
	 * cb: 回调函数(有监听事件就应该给回调函数)
	 */
	return function(config) {
		config = config || {};
		var dockWrap = Doc.getElementById(config.el);
		var toTag = config.toTag || 'img';
		var img = dockWrap.getElementsByTagName(toTag);
		var imgAmount = img.length;
		var originalWidth = [];
		var imgScale = 0;
		var x = 0,
			y = 0,
			i = 0;

		function initPage() {
			for (i = 0; i < imgAmount; i++) {
				originalWidth.push(img[i].offsetWidth);
				img[i].width = parseInt(img[i].offsetWidth / 2);
			}
		}

		// 获取相对于HTML的y轴
		function getOffsetTop(el) {
			if (el.offsetParent == null) {
				return el.offsetTop;
			}
			return el.offsetTop + getOffsetTop(el.offsetParent);
		}

		function initEvent() {
			dockWrap.onmousemove = function(e) {
				e = e || window.event;
				for (i = 0; i < imgAmount; i++) {
					x = e.clientX - (img[i].offsetLeft + img[i].offsetWidth / 2);
					y = img[i].offsetTop + getOffsetTop(dockWrap) + img[i].offsetHeight / 2 - e.clientY;
					imgScale = 1 - Math.sqrt(x * x + y * y) / 300;
					if (imgScale < 0.5) {
						imgScale = 0.5;
					};
					img[i].width = originalWidth[i] * imgScale;
				}

				config.cb && config.cb();
			};
		}

		function init() {
			initPage();
			initEvent();
		}

		init();
	}
})(document)