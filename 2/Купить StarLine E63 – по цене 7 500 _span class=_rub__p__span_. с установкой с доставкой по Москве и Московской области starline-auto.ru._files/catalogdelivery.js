var edost_catalogdelivery = new function() {
	var self = this;
	var protocol = (document.location.protocol == 'https:' ? 'https://' : 'http://')
	var clear_white, size = {auto: true, x: 650, y: 80}, show_quantity, show_add_cart, add_cart, show_button, info = '', error = '<div class="edost_warning2">Расчет недоступен</div>'
	var onkeydown_backup = 'free', window_top = 0
	var inside = false
	var quantity_timer

	this.param_string = ''
	this.product_id = 0
	this.product_name = ''
	this.quantity = 1
	this.head = 'Расчет доставки'
	this.loading = ''
	this.loading_small = ''
	this.bookmark = ''
	this.location_data = '';


	this.get_cookie = function(name) {
		var r = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
		return (r ? decodeURIComponent(r[2]) : '');
	}

	this.set_cookie = function(value) {
		document.cookie = value + '; path=/; expires=Thu, 01-Jan-2020 00:00:01 GMT';
	}


	// расчет доставки
	this.calculate = function(param, s1, s2) {

		var E = document.getElementById('edost_bookmark');
		if (E) self.bookmark = E.value;

		if (param == 'preview') {
			var E = document.getElementById('edost_catalogdelivery_inside');
			if (!E) return;

			self.set_window_param();
			self.product_id = s1;
			self.product_name = s2;

			var E = document.getElementById('edost_catalogdelivery_inside_city_head');
			if (E) E.style.display = 'none';
		}
		else if (param) {
			var E = document.getElementById('edost_catalogdelivery_data');
			if (!E) return;

			if (param == 'loading')	E.innerHTML = self.loading;
			else if (param == 'error') E.innerHTML = '<div class="edost_warning edost_warning_big">' + s1 + '</div>';

			return;
		}

		edost_GetTariff();

	}


	// расчет по таймеру
	this.timer = function(param) {

		if (param == 'start') {
			if (quantity_timer != undefined) window.clearInterval(quantity_timer);
			quantity_timer = window.setInterval("edost_GetTariff('quantity')", 300);
		}
		else {
			if (quantity_timer != undefined) quantity_timer = window.clearInterval(quantity_timer);
		}

	}


	// вывод ошибки
	this.set_error = function() {
		var E = document.getElementById('edost_catalogdelivery_window_error');
		if (E) E.innerHTML = '<div style="' + (!inside ? 'text-align: center; ' : '') + 'padding-top: 20px;">' + error + '</div>';
	}


	// параметры окна
	this.set_window_param = function(param, data) {
//		alert('set_window_param: ' + param + ' | ' + data);

		if (param == 'inside') inside = true;

		// загрузка параметров из html
		var E = document.getElementById('edost_catalogdelivery_param');
		if (E && E.value) self.param_string = E.value;

		if (!data) {
			var E = document.getElementById('edost_catalogdelivery_window_param');
			data = (E ? E.value : '');
		}

		v = data.split('|');

		size = {auto: (v[0] == 'N' ? false : true), x: (!v[1] || v[1] < 400 ? 650 : v[1]), y: (!v[2] || v[2] < 80 ? 80 : v[2])};
		clear_white = (v[3] == 'Y' ? true : false);
		show_quantity = (v[4] != undefined && v[4] == 'N' ? false : true);
		show_add_cart = (v[5] != undefined && v[5] == 'N' ? false : true);
		add_cart = (v[6] != undefined && v[6] == 'Y' ? true : false);
		show_button = (v[7] != undefined && v[7] == 'Y' ? true : false);
		if (v[8]) info = v[8].replace(/&quot;/g, '"');
		if (v[9]) error = v[9].replace(/&quot;/g, '"');

        self.loading = '<div class="edost_map_loading2"><img src="' + (v[10] ? v[10] : protocol + 'edostimg.ru/img/site/loading.gif') + '" border="0" width="64" height="64"></div>'
        self.loading_small = '<img style="vertical-align: top;" src="' + (v[11] ? v[11] : protocol + 'edostimg.ru/img/site/loading_small.gif') + '" border="0" width="20" height="20">'

        self.set_error();

	}


	// заполнение блока с расчетом, города и ссылки на детальную информацию
	this.set_data = function(tariff_data, location_data, city, detailed) {
//		alert('set_data: ' + tariff_data + ' | ' + location_data);

		self.set_window_param();
		self.location_data = location_data;
		if (tariff_data === 'FALSE') self.set_error();

		var link_begin = '<span class="edost_link" onclick="edost_catalogdelivery.window(';
		var link_end = '</span>';

		var E = document.getElementById('edost_catalogdelivery_window_city');
		if (E) {
			if (location_data == 'GETCITY') edost_catalogdelivery.window('getcity');
			else E.innerHTML = location_data;
		}

		if (inside) return;

		var E = document.getElementById('edost_catalogdelivery_inside_city');
		if (E) E.innerHTML = link_begin + "'getcity');\">" + city + link_end;

		var E = document.getElementById('edost_catalogdelivery_inside');
		if (E) {
			E.innerHTML = (tariff_data === 'FALSE' ? error : tariff_data);
			E.style.display = (tariff_data == '' ? 'none' : 'block');
		}

		var E = document.getElementById('edost_catalogdelivery_inside_detailed');
		if (E) {
			E.innerHTML = link_begin + ');">подробнее...' + link_end;
			E.style.display = (detailed == 'Y' ? 'block' : 'none');
		}

		edost_catalogdelivery.position('update');

	}


	this.window = function(param, product_id, product_name) {
//		alert(param + ' - ' + product_id);

		if (self.loading == '') self.set_window_param();

		if (product_id == undefined) product_id = '';
		if (product_name == undefined) product_name = '';

		if (param == 'esc') param = 'close';
		if (param == 'inside') {
			inside = true;
			param = '';
		}

		if (inside) {
			var E = document.getElementById('edost_catalogdelivery_window_fon');
			if (E) {
				E.remove();
				var E = document.getElementById('edost_catalogdelivery_window');
				if (E) E.remove();
			}
		}
		else {
			if (onkeydown_backup === 'free') {
			    onkeydown_backup = document.onkeydown;
				document.onkeydown = new Function('event', 'if (event.keyCode == 27) edost_catalogdelivery.window("esc");');
			}
			else if (param == 'close') {
			    document.onkeydown = onkeydown_backup;
			    onkeydown_backup = 'free';
			}
		}

		// интеграция окна
		var E = document.getElementById('edost_catalogdelivery_window');
		if (!E) {
			if (!inside) {
				var E = document.body;
				var E2 = document.createElement('DIV');
				E2.className = 'edost_catalogdelivery_window_fon';
				E2.id = 'edost_catalogdelivery_window_fon';
				E2.style.display = 'none';
				E2.onclick = new Function('', 'edost_catalogdelivery.window("close")');
				E.appendChild(E2);
			}
			else var E = document.getElementById('edost_catalogdelivery_inside');

			var E2 = document.createElement('DIV');
			if (!inside) E2.className = 'edost_catalogdelivery_window';
			E2.id = 'edost_catalogdelivery_window';
			E2.style.display = 'none';

			var s = '';
			s += '<table width="100%" height="100%" cellpadding="0" cellspacing="0" border="0">';

			if (!inside) {
				s += '<tr height="20"><td class="edost_catalogdelivery_window_head" align="left">';
				s += '<div class="edost_catalogdelivery_window_close" onclick="edost_catalogdelivery.window(\'close\')"></div>';
				s += '<span id="edost_catalogdelivery_window_head"></span>';
				s += '</td></tr>';
			}

			if (info) s += '<tr><td style="padding: ' + (clear_white ? '0px 10px 5px 10px;' : '10px 10px 0px 10px;') + '" align="left" valign="center"><div id="edost_catalogdelivery_window_info">' + info + '</div></td></tr>';

			s += '<tr><td style="padding: ' + (clear_white ? 0 : 10)  + 'px 10px 0 10px;" align="left" valign="center">';
			s += '<table id="edost_catalogdelivery_window_city_table" width="100%" cellpadding="2" cellspacing="0" border="0">';

			s += '<tr height="25">';
			s += '<td width="150" id="edost_catalogdelivery_window_city_head"' + (show_quantity || show_add_cart ? '' : 'style="color: #AAA;"') + '>' + 'Местоположение:';
			s += '</td>';
			s += '<td align="left" valign="top">';
			s += '<div id="edost_catalogdelivery_window_city">' + self.location_data + '</div>';
			s += '</td>';
			s += '</tr>';

			if (show_quantity || show_add_cart) {
			s += '<tr>';
			if (show_quantity) s += '<td id="edost_catalogdelivery_window_quantity_head" align="right">Количество:</td>';
			s += '<td align="left" colspan="2" style="vertical-align: middle;">';
			if (show_quantity) s += '<input id="edost_catalogdelivery_quantity" value="1" size="4" style="vertical-align: middle; width: 40px;" onfocus="edost_catalogdelivery.timer(\'start\')" onblur="edost_catalogdelivery.timer(\'\')">';
			if (show_add_cart) s += '<input type="checkbox" id="edost_catalogdelivery_cart"' + (add_cart ? ' checked=""': '') + ' style="margin-left: ' + (show_quantity ? '30' : '0') + 'px; vertical-align: middle;" onclick="edost_GetTariff();"> <label style="vertical-align: middle;" for="edost_catalogdelivery_cart">Учитывать товары в корзине</label>';
			s += '</td>';
			s += '</tr>';
			}

			s += '</table>';
			s += '</td></tr>';

			s += '<tr><td style="padding: 10px;" align="left" valign="center">';
			s += '<div id="edost_catalogdelivery_data" style="padding-bottom: 4px;">';
			s += '<input type="hidden" id="edost_catalogdelivery_window_no_data" value="">';
			s += '</div>';
			s += '</td></tr>';

			if (show_button && !inside) {
			s += '<tr height="60"><td>';
			s += '<div class="edost_catalogdelivery_button edost_catalogdelivery_button_bar" style="width: 120px;" onclick="edost_catalogdelivery.window(\'close\');">Закрыть</div>';
			if (show_quantity || show_add_cart) s += '<div class="edost_catalogdelivery_button edost_catalogdelivery_button_bar" style="width: 150px;" onclick="edost_GetTariff();">Пересчитать</div>';
			s += '</td></tr>';
			}

			s += '</table>';
			E2.innerHTML = s;

			if (E) {
				if (inside) E.innerHTML = '';
				E.appendChild(E2);
			}
		}

		var display = (param == 'close' ? 'none' : 'block');
		if (inside) display = 'block';

		var E = document.getElementById('edost_catalogdelivery_window');
		if (!E) return;
		E.style.display = display;

		var E = document.getElementById('edost_catalogdelivery_window_fon');
		if (E) E.style.display = display;

		if (param == 'close') return;

		if (product_name == '') {
			var E = document.getElementById('edost_catalogdelivery_product_name');
			if (E) product_name = E.value;
		}
		if (product_name == '') product_name = self.product_name;
		if (product_name != '') {
			self.product_name = product_name;
			var E = document.getElementById('edost_catalogdelivery_window_head');
			if (E) {
				var s = (clear_white ? 50 : 70);
				if (product_name.length > s) product_name = product_name.substring(0, s) + '...';
				E.innerHTML = (clear_white ? self.head + ': ' : '') + product_name;
			}
		}

		var product_id_old = self.product_id;
		if (product_id == '') {
			var E = document.getElementById('edost_catalogdelivery_product_id');
			if (E) product_id = E.value;
		}
		if (product_id != '') self.product_id = product_id;


		if (param == 'getcity') {
			document.getElementById('edost_catalogdelivery_data').innerHTML = '';
			edost_LoadLocation('start');
		}
		else {
			var E = document.getElementById('edost_catalogdelivery_window_no_data');
			if (E || product_id_old > 0 && self.product_id != product_id_old) {
				var E = document.getElementById('edost_shop_LOCATION');
				if (!E) {
					var E = document.getElementById('edost_catalogdelivery_window_city_table');
					if (E) E.style.display = 'none';
					var E = document.getElementById('edost_catalogdelivery_window_info');
					if (E) E.style.display = 'none';
				}

				edost_GetTariff();
			}
		}

		var E = document.getElementById('edost_office_div');
		if (E && E.style.display != 'none' && window.edost_office && edost_office.map) edost_office.map.container.fitToViewport();

		if (!inside) edost_catalogdelivery.position(param == 'getcity' ? 'getcity' : 'new');

	}


	this.position = function(mode) {

		if (mode == 'update') {
			var E = document.getElementById('edost_catalogdelivery_window_city_table');
			if (E) E.style.display = 'block';
			var E = document.getElementById('edost_catalogdelivery_window_info');
			if (E) E.style.display = 'block';
			var E = document.getElementById('edost_catalogdelivery_inside_city_head');
			if (E) E.style.display = 'inline';
		}

		if (inside) return;

		var E = document.getElementById('edost_bookmark_div');
		var bookmark_h = (E ? E.offsetHeight : 0);

		var E = document.getElementById('edost_catalogdelivery_window');
		var E2 = document.getElementById('edost_catalogdelivery_data');
		var E_tariff = document.getElementById('edost_tariff_div');
		if (!(E && E2 && E.style.display != 'none')) return;

		var w = (document.documentElement.clientWidth == 0 ? document.body.clientWidth : document.documentElement.clientWidth);
		var h = (document.documentElement.clientHeight == 0 ? document.body.clientHeight : document.documentElement.clientHeight);

		if (mode != 'getcity') {
			E2.style.height = 'auto';
			E2.style.overflowY = 'visible';
			if (E_tariff) {
				E_tariff.style.height = 'auto';
				E_tariff.style.overflowY = 'visible';
			}
		}

		var window_w = E.offsetWidth;
		var window_h = E.offsetHeight;
		var res_h = E2.offsetHeight;
		var	office_w = (w > 790 ? 750 : w - 40);

		var E_office = document.getElementById('edost_office_inside');
		E2.style.width = (E_office && E_office.innerHtml != '' ? office_w + 'px' : 'auto');

		if (size.auto) {
			var max_h = h - 100;
			if (res_h < size.y) res_h = size.y;

			if (E_tariff) {
				E_tariff.style.overflowY = (window_h > max_h ? 'scroll' : 'visible');
				E_tariff.style.paddingRight = (window_h > max_h ? '10px' : '0');
				E_tariff.style.height = (window_h > max_h ? (res_h - (window_h - max_h)) : res_h) - bookmark_h + 'px';
			}
			E2.style.overflowY = (window_h > max_h && !E_tariff ? 'scroll' : 'visible');
			E2.style.height = (window_h > max_h ? (res_h - (window_h - max_h)) : res_h) + 'px';
		}
		else {
			var new_h = size.y - (window_h - res_h);
			if (new_h < 80) new_h = 80;

			E2.style.overflowY = (res_h > new_h ? 'scroll' : 'visible');
			E2.style.height = new_h + 'px';
		}

		window_h = E.offsetHeight;

		var left = (w - window_w)/2;
		if (Math.abs(E.style.left.replace(/[^0-9.]/g, '') - left) > 20) E.style.left = left + 'px';

		var top = Math.round((h - window_h)*0.5);
		if (mode == 'new' || mode == 'getcity' || (mode == 'update' && top < window_top)) {
			E.style.top = top + 'px';
			window_top = top;
		}

	}

}


// поддержка старых функций
function edost_catalogdelivery_show(product_id, product_name, param) { edost_catalogdelivery.window(param, product_id, product_name) }