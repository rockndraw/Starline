var edost_office_create = function(name) {
	var self = this;
	var protocol = (document.location.protocol == 'https:' ? 'https://' : 'http://')
	var geo, format, onkeydown_backup = 'free', onclose = '', map_loading = false, inside = false
	var loading = '<div class="edost_map_loading"><img src="' + protocol + 'edostimg.ru/img/site/loading.gif" border="0" width="64" height="64"></div>'
	var free_ico = 'Бесплатно!'

	this.map = false
	this.data = false
	this.timer = false
	this.timer_inside = false
	this.data_string = ''
	this.data_parsed = false
	this.loading_inside = ''

	this.window = function(param, onclose_set_office) {

		if (param == 'inside') {
			inside = true;
			param = 'all';
		}
		else if (param != 'show') {
			inside = false;
		}

		if (onclose_set_office == true) onclose = param;

		var office_format = format;
		if (param == 'shop' || param == 'office' || param == 'terminal' || param == 'all') {
			format = param;
			param = 'show'
		}

		if (param == 'esc') {
			if (!self.map || !self.map.balloon.isOpen()) param = 'close';
			else {
				self.map.balloon.close();
				return;
			}
		}

		if (!inside)
			if (param != 'show') {
			    document.onkeydown = onkeydown_backup;
			    onkeydown_backup = 'free';
			}
			else if (onkeydown_backup == 'free') {
			    onkeydown_backup = document.onkeydown;
				document.onkeydown = new Function('event', 'if (event.keyCode == 27) ' + name + '.window("esc");');
			}


		// интеграция окна
		if (inside) {
			var E = document.getElementById('edost_office_inside');
			if (!E) return;
			var E2 = document.getElementById('edost_office_inside_head');
			if (!E2) E.innerHTML = '<div id="edost_office_inside_head" class="edost_office_inside_head"></div><div id="edost_office_inside_map"></div>';
		}
		else {
			var E = document.getElementById('edost_office_window');
			if (!E) {
				var E = document.body;

				var E2 = document.createElement('DIV');
				E2.className = 'edost_office_window_fon';
				E2.id = 'edost_office_window_fon';
				E2.style.display = 'none';
				E2.onclick = new Function('', name + '.window("close")');
				E.appendChild(E2);

				var E2 = document.createElement('DIV');
				E2.className = 'edost_office_window';
				E2.id = 'edost_office_window';
				E2.style.display = 'none';
				E2.innerHTML = '<div class="edost_office_window_close" onclick="' + name + '.window(\'close\');"></div><div id="edost_office_window_head" class="edost_office_window_head"></div><div id="edost_office_window_map"></div>';
				E.appendChild(E2);
			}
		}


		var display = (param != 'show' ? 'none' : 'block');

		var office_data = document.getElementById('edost_office_data');
		if (!office_data) return;

		var E = document.getElementById(inside ? 'edost_office_inside' : 'edost_office_window');
		if (!E) return;
		E.style.display = display;

		if (!inside) {
			var E = document.getElementById('edost_office_window_fon');
			if (E) E.style.display = display;
		}

		if (param == 'close' && onclose != '') {
			var s = onclose;
			onclose = '';
			edost_SetOffice(s);
		}
		if (param != 'show') return;

		// размер окна браузера
		var browser_w = (document.documentElement.clientWidth == 0 ? document.body.clientWidth : document.documentElement.clientWidth);
		var browser_h = (document.documentElement.clientHeight == 0 ? document.body.clientHeight : document.documentElement.clientHeight);
		var small_ico = (browser_w < 1100 || browser_h < 600 ? true : false);


		// подготовка данных при первом запуске
		if (self.map && (office_data.value != 'parsed' || !self.data_parsed || office_format != format)) {
			if (office_data.value != 'parsed') {
				self.data_string = office_data.value;
				office_data.value = 'parsed';
				edost_office.data_parsed = edost_office2.data_parsed = false;
			}
			else if (!self.data_parsed) self.data_string = (name == 'edost_office' ? edost_office2.data_string : edost_office.data_string);

			var v = (window.JSON && window.JSON.parse ? JSON.parse(self.data_string) : eval('(' + self.data_string + ')'));
			self.data = [];
			self.data_parsed = true;
			var tariff = [];
			var point = v.point;
			var ico_path = v.ico_path + (v.ico_path.substr(-1) != '/' ? '/' : '');
			var cod_tariff = false;

			// распаковка и поиск активных тарифов (format: 'shop' - самовывоз из магазина,  'office' - пункты выдачи,  'terminal' - терминалы ТК)
			for (var i = 0; i < v.tariff.length; i++) {
				var ar = v.tariff[i].split('|');
				if (ar[13] == undefined) continue;
				var p = {
					"profile": ar[0], "company": ar[1], "name": ar[2], "tariff_id": ar[3], "price": ar[4], "price_formatted": ar[5], "pricecash": ar[6],
					"codplus": ar[7], "codplus_formatted": ar[8], "day": ar[9], "insurance": ar[10], "to_office": ar[11], "company_id": ar[12], "format": ar[13],
					"cod_tariff": (ar[14] != undefined ? ar[14] : '')
				};
				if (p.format == format || format == 'all') tariff.push(p);
			}
//			edost_ShowData(tariff, '', 20);

			// распаковка офисов
			for (var i = 0; i < point.length; i++) {
				var p = [];
				for (var i2 = 0; i2 < point[i].data.length; i2++) {
					var ar = point[i].data[i2].split('|');
					if (ar[7] == undefined) continue;
					var v = {"id": ar[0], "name": ar[1], "address": ar[2], "schedule": ar[3].replace(/,/g, '<br>'), "gps": ar[4].split(','), "type": ar[5], "metro": ar[6], "codmax": ar[7]};
					p.push(v);
				}
				point[i].data = p;
			}
//			edost_ShowData(point, '', 20);

			// разделение тарифов по группам (по службам доставки и эксклюзивным ценам)
			var office = [];
			for (var i = 0; i < tariff.length; i++) {
				var v = tariff[i];

				var u = -1;
				for (var i2 = 0; i2 < office.length; i2++) if (v.company_id == office[i2].company_id && v.to_office == office[i2].to_office) {
					u = i2;
					break;
				}

				if (u == -1) {
					var r = {"company": v.company, "company_id": v.company_id, "ico": v.tariff_id, "to_office": v.to_office, "format": v.format, "point": [], "button": "", "cod": true, "header2": "", "header2_min": ""};
					r.header = '<span class="edost_name">' + v.company + '</span>';
					u = office.length;
					office[u] = r;
				}

				if (v.codplus == '') office[u].cod = false;
				else if (office[u].codplus_max == undefined || v.codplus*1 > office[u].codplus_max[0]*1) office[u].codplus_max = [v.codplus, v.codplus_formatted];

				if (office[u].price_min == undefined || v.price*1 < office[u].price_min[0]*1) office[u].price_min = [v.price, v.price_formatted];
				if (office[u].price_max == undefined || v.price*1 > office[u].price_max[0]*1) office[u].price_max = [v.price, v.price_formatted];
				if (v.pricecash !== '' && (office[u].pricecash_max == undefined || v.pricecash*1 > office[u].pricecash_max*1)) office[u].pricecash_max = v.pricecash;

				if (v.cod_tariff != '') cod_tariff = true;

				var price = (v.price_formatted == 0 ? '<span class="edost_price_free">' + free_ico + '</span>' : '<span class="edost_price">' + v.price_formatted + '</span>');

				var s = [];
				if (v.day != '') s.push('<span class="edost_day">' + v.day + '</span>');
				if (v.name != '') s.push('<span class="edost_tariff">' + v.name + '</span>');
				if (v.insurance == 1) s.push('<span class="edost_insurance">со страховкой</span>');
				s = price + (s.length > 0 ? ' (' + s.join(', ') + ')' : '');

				if (v.cod_tariff != 'Y') {
					office[u].header2 += '<br>' + s;
					if (office[u].price_min[0] == v.price) office[u].header2_min = '<br>' + price + '<br>' + '<span class="edost_day">' + v.day + '</span>';
				}

				if (v.cod_tariff != '') s += '<br><div class="edost_payment_map"><span class="edost_payment_' + (v.cod_tariff == 'N' ? 'normal' : 'cod') + '">' + (v.cod_tariff == 'N' ? 'с предоплатой заказа' : 'с оплатой при получении') + '</span></div>';

				office[u].button += '<div class="edost_button" onclick="edost_SetOffice(\'' + v.profile + '\', \'%office%\', \'' + v.cod_tariff + '\', \'' + v.format + '\')">'
					+ '<table align="center" cellpadding="0" cellspacing="0" border="0"><tr><td class="edost_button_left" align2="left">' + s + '</td><td class="edost_button_right">выбрать</td></tr></table>'
					+ '</div>';
			}
//			edost_ShowData(office, '', 20);

			// подпись о возможности наложки в заголовке с группами тарифов
			if (!inside) {
				var n = 0;
				for (var i = 0; i < office.length; i++) if (office[i].cod) n++;
				if (n != 0 && n != office.length)
					for (var i = 0; i < office.length; i++) if (office[i].cod) {
						office[i].header2 += '<div class="edost_payment">+ возможна оплата при получении</div>';
						office[i].header2_min += '<div class="edost_payment">+ возможна<br> оплата при<br> получении</div>';
					}
			}

			// прикрепление офисов к группам тарифов (сначала офисы с эксклюзивной ценой, потом - все остальные)
			for (var n = 0; n <= 1; n++)
				for (var i = 0; i < office.length; i++) if ((n == 0 && office[i].to_office != '') || (n == 1 && office[i].to_office == ''))
					for (var u = 0; u < point.length; u++) if (point[u].company_id == office[i].company_id)
						for (var u2 = 0; u2 < point[u].data.length; u2++) if (point[u].data[u2] != 'none') {
							if (n == 0 && point[u].data[u2].type != office[i].to_office) continue;

							var v = point[u].data[u2];
							v.cod = office[i].cod;
							if (v.cod && v.codmax !== '' && office[i].pricecash_max*1 > v.codmax*1) v.cod = false;

							office[i].point.push(v);
							point[u].data[u2] = 'none';
						}
//			edost_ShowData(office, '', 20);

			// заголовок с группами тарифов
			var n = office.length;
			var s = '';
			var price_min = -1;
			var count = 0;
			for (var i = 0; i < n; i++) if (office[i].point.length > 0) count++;
			if (inside && count >= 6) small_ico = true;
			for (var i = 0; i < n; i++) if (office[i].point.length > 0) {
				office[i].button += '<div class="edost_button_bottom"></div>';
				if (price_min == -1 || office[i].price_min[0]*1 < price_min*1) price_min = office[i].price_min[0];

				var v = office[i];

				var head = '';
				if (n == 1) {
					if (v.company_id == 26) head = 'Постаматы и пункты выдачи';
					else if (v.company_id == 72) head = 'Почтоматы';
					else if (v.format == 'terminal') head = 'Терминалы ТК';
					else if (v.format == 'shop') head = 'Адреса магазинов';
					else head = 'Пункты выдачи';
				}
				if (v.company_id.substr(0, 1) == 's' && (v.company.substr(0, 9) == 'Самовывоз' || v.format == 'shop')) {
					if (n != 1) head = (v.format == 'shop' ? 'Магазины' : 'Пункты выдачи');
					office[i].header = '';
				}
				if (head != '') head = '<span class="edost_name">' + head + ' </span>';

				s += '<td id="' + name + '_price_td_' + i + '" onclick="' + name + '.set_map(' + i + ');">'
				s += '<img class="edost_ico edost_ico_' + (small_ico ? 'small' : 'normal') + '" src="' + ico_path + office[i].ico + '.gif" border="0">' + head;
				if (n <= 5) s += office[i].header;
				if (!small_ico)
					if (n > 5) s += office[i].header2_min;
					else if (n > 1) s += office[i].header2;
				s += '</td>';

				if (n > 1) s += '<td width="8" class="edost_office_head_delimiter"></td><td width="8"></td>';
			}
			else {
				office.splice(i, 1); i--; n--; // удаление группы без пунктов выдачи
			}

			var E = document.getElementById('edost_office_' + (inside ? 'inside' : 'window') + '_head');
			if (inside) E.innerHTML = '';
			else E.innerHTML = '<table class="edost_office_head" cellpadding="0" cellspacing="0" border="0"><tr>'
				+ s + '<td width="120" class="edost_office_head_all"><div id="' + name + '_price_td_all" onclick="' + name + '.set_map(\'all\');">показать все</div></td>'
				+ '</tr></table>';

			// поиск одинаковых адресов у разных служб доставки (repeat_individual = true - у каждого офиса свой заголовок с временем работы)
			var n = -1;
			for (var i = 0; i < office.length-1; i++) for (var i2 = 0; i2 < office[i].point.length; i2++) if (office[i].point[i2].repeat == undefined) {
				var repeat_individual = false;
				for (var u = i; u < office.length; u++) {
					var start = (u == i ? i2+1 : 0);
					for (var u2 = start; u2 < office[u].point.length; u2++) if (office[u].point[u2].repeat == undefined && office[i].point[i2].address == office[u].point[u2].address) {
						if (office[i].point[i2].repeat == undefined) {
							n++;
							office[i].point[i2].repeat = n;
						}
						office[u].point[u2].repeat = n;

						if (office[i].point[i2].schedule != office[u].point[u2].schedule ||
							(office[i].point[i2].type == 5 || office[i].point[i2].type == 6) && office[i].point[i2].type != office[u].point[u2].type) repeat_individual = true;
					}
				}
				if (repeat_individual) {
					office[i].point[i2].repeat_individual = true;
					for (var u = i; u < office.length; u++) for (var u2 = 0; u2 < office[u].point.length; u2++)
						if (office[u].point[u2].repeat == n) office[u].point[u2].repeat_individual = true;
				}
			}

			// выделение жирным дешевой доставки
			var n = 0;
			for (var i = 0; i < office.length; i++)
				if (office[i].price_min[0]*1 > price_min*1 + 50*1) office[i].bold = false;
				else {
					office[i].bold = true;
					n++;
				}
			if (n == office.length) for (var i = 0; i < office.length; i++) office[i].bold = false;


			self.data = office;

			// удаление с карты старых меток
			if (self.map) self.map.geoObjects.each(function(v) { self.map.geoObjects.remove(v); });
//			if (self.map) self.map.geoObjects.removeAll(); // yandex map 2.1 beta

			// размещение меток на карте
			geo = new ymaps.Clusterer({preset: 'twirl#invertedBlueClusterIcons', groupByCoordinates: false, clusterDisableClickZoom: false, zoomMargin: 100}); // maxZoom: 10

			var repeat = [];
			for (var i = 0; i < office.length; i++) {
				var v = office[i];
				var point = [], point2 = [];
				for (var i2 = 0; i2 < v.point.length; i2++) {
					var head = 'Пункт выдачи';
					var hint = '';
					var ico_map = v.company_id;
					var payment = (v.point[i2].cod && !cod_tariff ? 'возможна оплата за заказ при получении' : '') + (v.point[i2].cod && !cod_tariff && v.codplus_max != undefined && v.codplus_max[1] != 0 ? ' (+ ' + v.codplus_max[1] + ')' : '');
					var ico = '<img class="edost_ico edost_ico_small" src="' + ico_path + 'small/' + v.ico + '.gif" border="0">';
					var detailed = '<a class="edost_link" href="' + protocol + 'edost.ru/office.php?c=' + v.point[i2].id + '" target="_blank">подробнее...</a>';

					if (v.company_id.substr(0, 1) == 's') {
						ico_map = 0;
						if (v.company.substr(0, 9) == 'Самовывоз' || v.format == 'shop') v.company = '';
					}

					if (v.format == 'shop') head = 'Магазин';
					if (v.format == 'terminal') head = 'Терминал ТК';
					if (v.company_id == 26 && (v.point[i2].type == 5 || v.point[i2].type == 6)) {
						head = 'Постамат';
						ico_map += '-2';
						hint = '&nbsp;<a href="' + protocol + 'pickpoint.ru/faq/?category=5" target="_blank"><img class="edost_ico edost_hint" src="' + protocol + 'edostimg.ru/img/hint/hint_grey.gif"></a>';
						if (payment != '') payment += '<br>наличными или банковской картой Visa и MasterCard';
			        }
					if (v.company_id == 72 && (v.point[i2].type == 5 || v.point[i2].type == 6)) {
						head = 'Почтомат';
						ico_map += '-2';
						hint = '&nbsp;<a href="' + protocol + 'inpost.ru/ru/customers/kak-poluchit-zakaz" target="_blank"><img class="edost_ico edost_hint" src="' + protocol + 'edostimg.ru/img/hint/hint_grey.gif"></a>';
			        }

					if (payment != '') payment = '<div class="edost_payment edost_balloon_payment">' + payment + '</div>';

					var button = v.button.replace(/%office%/g, v.point[i2].id);

					var ico_price = (v.price_min[1] == 0 ? free_ico : v.price_min[1]);
					if (v.bold) ico_price = '<b>' + ico_price + '</b>';

					var font_size = (v.company.length >= 11 ? ' style="font-size: 13px;"' : '');

					var placemark = new ymaps.Placemark([v.point[i2].gps[1], v.point[i2].gps[0]], {
						balloonContent: '<div class="edost_balloon">'
							+ '<div class="edost_balloon_schedule"' + font_size + '>' + v.point[i2].schedule + '</div>'
							+ ico + '<span class="edost_name"' + font_size + '>' + head + ' ' + v.company + '</span>' + hint + '<br>'
							+ (v.point[i2].name != '' ? v.point[i2].name + '<br>' : '')
							+ v.point[i2].address
							+ ' ' + detailed
							+ payment + button
							+ '</div>',
						iconContent: '<div class="edost_ico_price">' + ico_price + '</div>'
					}, {
						iconImageHref: protocol + 'edostimg.ru/img/companymap/' + ico_map + '.png',
						iconImageSize: [36, 36],
						iconImageOffset: [-12, -36]
					});

					if (v.point[i2].repeat == undefined) point.push(placemark);
					else {
						point2.push(placemark);

						// отдельная группа меток для офисов с одинаковыми адресами всех служб доставки
						var u = v.point[i2].repeat;
						if (repeat[u] == undefined) {
							var s = '';
							if (!v.point[i2].repeat_individual) s += '<div class="edost_balloon_schedule">' + v.point[i2].schedule + '</div><span class="edost_name">' + head + '</span><br>';
							s += (v.point[i2].name != '' ? v.point[i2].name + '<br>' : '') + v.point[i2].address;
							if (!v.point[i2].repeat_individual) s += ' ' + detailed;
							repeat[u] = {"info": s,  "button": "", "point": v.point[i2], "price_min": v.price_min, "bold": v.bold};;
						}

						if (v.bold) repeat[u].bold = v.bold;
						if (v.price_min[0]*1 < repeat[u].price_min[0]*1) repeat[u].price_min = v.price_min;

						var s = '<div class="edost_balloon_delimiter"></div>';
						if (v.point[i2].repeat_individual) s += '<div class="edost_balloon_schedule edost_balloon_schedule_individual"' + font_size + '>' + v.point[i2].schedule + '</div>'
							+ ico + '<span class="edost_name"' + font_size + '>' + head + ' ' + v.company + '</span>' + hint + '<br>'
							+ '<div class="edost_balloon_detailed">' + detailed + '</div>'
							+ payment;
						else s += '<div class="edost_balloon_individual">'
							+ '<span class="edost_day">служба доставки </span>'
							+ ico + '<span class="edost_name">' + v.company + '</span>' + hint + '<br>'
							+ payment
							+ '</div>';
						repeat[u].button += s + button;
					}
				}

				self.data[i].geo = new ymaps.Clusterer({preset: 'twirl#invertedBlueClusterIcons', groupByCoordinates: false, clusterDisableClickZoom: false, zoomMargin: 100});
				self.data[i].geo.add(point);
				self.data[i].geo.add(point2);
				geo.add(point);
			}

			// размещение на карте меток для офисов с одинаковыми адресами всех служб доставки
			var point = [];
			for (var i = 0; i < repeat.length; i++) if (repeat[i] != undefined) {
				var v = repeat[i];

				var ico_price = (v.price_min[1] == 0 ? free_ico : v.price_min[1]);
				if (v.bold) ico_price = '<b>' + ico_price + '</b>';

				var placemark = new ymaps.Placemark([v.point.gps[1], v.point.gps[0]], {
					balloonContent: '<div class="edost_balloon">' + v.info + v.button + '</div>',
					iconContent: '<div class="edost_ico_price">' + ico_price + '</div>'
				}, {
					iconImageHref: protocol + 'edostimg.ru/img/companymap/0.png',
					iconImageSize: [36, 36],
					iconImageOffset: [-12, -36]
				});

				point.push(placemark);
			}
			geo.add(point);

			self.set_map('all');
		}


		// установка размера окна
		var E = document.getElementById(inside ? 'edost_office_inside' : 'edost_office_window');
		var E2 = document.getElementById('edost_office_' + (inside ? 'inside' : 'window') + '_head');
		var E3 = document.getElementById('edost_office_' + (inside ? 'inside' : 'window') + '_map');

		var window_w = E.offsetWidth;
		var window_h = E.offsetHeight;
		var head_h = E2.offsetHeight;
		var max_w = browser_w - (small_ico ? 4 : 100);

		window_w = max_w;
		if (!small_ico && window_w > 1200) {
			window_w = (browser_h > 960 ? Math.round(browser_h*1.25) : 1200);
			if (window_w > max_w) window_w = max_w;
		}

		if (!inside) {
			window_h = browser_h - (small_ico ? 6 : 100);
			E.style.width = window_w + 'px';
			E.style.height = window_h + 'px';
			E.style.left = (small_ico ? '-3' : Math.round((browser_w - window_w)*0.5)) + 'px';
			E.style.top = (small_ico ? '-1' : Math.round((browser_h - window_h)*0.5)) + 'px';
		}

		E3.style.height = window_h - head_h - 2 + 'px';


		// карта
		if (self.map) self.map.container.fitToViewport();
		else {
			// подключение карты
			var E = document.getElementById('edost_office_' + (inside ? 'inside' : 'window') + '_map');
			if (E) {
				var s = loading;
				if (inside)
					if (window.edost_catalogdelivery && edost_catalogdelivery.loading != '') s = edost_catalogdelivery.loading;
					else if (self.loading_inside != '') s = self.loading_inside;

				E.innerHTML = s;
				self.add_map();
			}
		}

	}


	this.set_map = function(n) {

		if (self.data == undefined) return;

		var point_count = 0;
		for (var i = 0; i < self.data.length; i++) {
			var show = (n == 'all' || i == n ? true : false);

			var E = document.getElementById(name + '_price_td_' + i);
			if (E) E.className = 'edost_active_' + (show ? 'on' : 'off');

			if (!show) self.map.geoObjects.remove(self.data[i].geo);
			else {
				point_count += self.data[i].point.length;
				if (n == 'all') self.map.geoObjects.remove(self.data[i].geo);
				else {
					self.map.geoObjects.add(self.data[i].geo);
					self.map.setBounds(self.data[i].geo.getBounds());
				}
			}
		}

		if (n != 'all') self.map.geoObjects.remove(geo);
		else {
			self.map.geoObjects.add(geo);
			self.map.setBounds(geo.getBounds());
		}

		var E = document.getElementById(name + '_price_td_all');
		if (E) E.style.display = (n == 'all' || self.data.length == 1 ? 'none' : 'block');

		if (point_count == 1) self.map.setZoom(13);
		else {
			var z = self.map.getZoom();
			if (z == 0) z = 11;
			self.map.setZoom(z - 1);
		}

	}


	this.create_map = function() {

		if (self.map) return;
		var E = document.getElementById('edost_office_' + (inside ? 'inside' : 'window') + '_map');
		if (!E) return;

		E.innerHTML = '';
		E.className = 'edost_map';

		self.map = new ymaps.Map('edost_office_' + (inside ? 'inside' : 'window') + '_map', {center: [0, 0], zoom: 12, type: 'yandex#map', behaviors: ['default', 'scrollZoom']});
		if (name == 'edost_office') edost_map = self.map; // поддержка старых функций

		self.map.controls
			.add('zoomControl', { left: 5, top: 5 })
			.add('typeSelector')
			.add('mapTools', { left: 35, top: 5 });

		map_loading = false;

		if (inside) {
			var E = document.getElementById('edost_office_detailed');
			if (E) E.style.display = 'block';
		}

		self.window('show', '');

	}


	this.add_map = function() {

		if (map_loading) return;

		map_loading = true;

		if (!window.ymaps) {
			var E = document.body;
			var E2 = document.createElement('SCRIPT');
			E2.type = 'text/javascript';
			E2.charset = 'utf-8';
			E2.src = protocol + 'api-maps.yandex.ru/2.0-stable/?load=package.standard,package.clusters&lang=ru-RU';
			E.appendChild(E2);
		}

		if (window.ymaps) ymaps.ready(self.create_map);
		else self.timer = window.setInterval('if (window.ymaps) { window.clearInterval(' + name + '.timer); ymaps.ready(' + name + '.create_map); }', 500);

	}

}


var edost_office = new edost_office_create('edost_office');
var edost_office2 = new edost_office_create('edost_office2');


// поддержка старых функций
var edost_map;
function edost_SetWindow(a1, a2) { edost_office.window(a1, a2) }


function edost_ShowData(data, prefix, size, main) {
	if (main == undefined) main = true;
	var s = '';
	for (k in data) {
		s += prefix + " " + k + ": ";
		if (data[k] && 'object' === typeof data[k] && prefix.length < size-1) {
			s += '\r\n' + edost_ShowData(data[k], prefix + "    ", size, false)
		}
		else s += data[k] + "\r\n";
		if (main) s += '\r\n';
	}
	if (main) alert(s);
	else return s;
}
