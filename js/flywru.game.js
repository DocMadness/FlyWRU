//Матрица игрового поля.
//-1 - ничего(нет мухи)
// 0 - муха смотрит вверх
// 1 - -//- вправо
// 2 - -//- вниз
// 3 - -//- влево
var gamefield = [];

//код поворота мухи
const fly_up = 0, fly_right = 1, fly_down = 2, fly_left = 3;

//переменная хранит скрыта муха или нет
var fly_hide = false;

//кол-во ходов
var fly_steps = 0;

//выход за пределы поля
var fly_outward = false;

$(document).ready(function () {
	//инициализировать игровое поле
	init_gamefield();
	
	//обновить игровое поле
	gamefield_view(false);
});

function init_gamefield() {
	gamefield = [[-1, -1, -1],[-1, 0, -1],[-1, -1, -1]];
}

//функция которая рисует поле в браузере
function gamefield_view(bgcolor) {
	var table = document.getElementById("gamefieldtable");
	
	for (var r = 0, n = table.rows.length; r < n; r++) {
		for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
			if (fly_hide) {
				table.rows[r].cells[c].innerHTML = "?";
			} else {
				//получаем данные ячейки с массива(матрицы)
				var d = gamefield[r][c]; 
				if (d === -1) { //если пустая ячейка
					table.rows[r].cells[c].innerHTML = "";
				} 
				else if (d === 0) { //если муха смотрит вверх
					if (!bgcolor) {
						table.rows[r].cells[c].innerHTML = '<img id="fly" src="images/fly.png">';
					} else {
						table.rows[r].cells[c].innerHTML = '<img id="fly" src="images/fly.png" style="background-color: red;">';
					}
				}
				else if (d === 1) { //смотрит вправа
					if (!bgcolor) {
						table.rows[r].cells[c].innerHTML = '<img id="fly" src="images/fly.png" style="transform:rotate(90deg);">';
					} else {
						table.rows[r].cells[c].innerHTML = '<img id="fly" src="images/fly.png" style="transform:rotate(90deg); background-color: red;">';
					}
				}
				else if (d === 2) { //смотрит вниз
					if (!bgcolor) {
						table.rows[r].cells[c].innerHTML = '<img id="fly" src="images/fly.png" style="transform:rotate(180deg);">';
					} else {
						table.rows[r].cells[c].innerHTML = '<img id="fly" src="images/fly.png" style="transform:rotate(180deg); background-color: red;">';
					}
				}
				else if (d === 3) { //смотрит влево
					if (!bgcolor) {
						table.rows[r].cells[c].innerHTML = '<img id="fly" src="images/fly.png" style="transform:rotate(-90deg)">';
					} else {
						table.rows[r].cells[c].innerHTML = '<img id="fly" src="images/fly.png" style="transform:rotate(-90deg); background-color: red;">';
					}
				}
			}
		}
	}
}

//получить координату (х) мухи
function get_coord_x() {
	for (var r = 0, n = gamefield.length; r < n; r++) {
		for (var c = 0, m = gamefield[r].length; c < m; c++) {
			var d = gamefield[r][c];
			if (d === 0 || d === 1 || d === 2 || d === 3) {
				return c;
			}
		}
	}
	return -1;
}

//получить координату (у) мухи
function get_coord_y() {
	for (var r = 0, n = gamefield.length; r < n; r++) {
		for (var c = 0, m = gamefield[r].length; c < m; c++) {
			var d = gamefield[r][c];
			if (d === 0 || d === 1 || d === 2 || d === 3) {
				return r;
			}
		}
	}
	return -1;
}

//получить направление мухи
function get_fly_dir() {
	for (var r = 0, n = gamefield.length; r < n; r++) {
		for (var c = 0, m = gamefield[r].length; c < m; c++) {
			var d = gamefield[r][c];
			if (d > -1) {
				return d;
			}
		}
	}
	return -1;
}

//если нажата кнопка вверх
function maincontrolbutton_up() {
	if (!fly_outward) { //если не gameover
		if (get_fly_dir() != 2) { //если муха не смотрит вниз
		    //убираем информацию о том что назад ходить нельзя, если она была показана
			var infonotback = document.getElementById('infonotback');
			infonotback.style.display = 'none';
			
			//добавляем +1 к ходам
			info_steps_add();
		
			//получем координаты мухи
			var x = get_coord_x();
			var y = get_coord_y();
			
			if (x > -1 && y > -1) {
				if (y > 0) { //если муха не выходит за пределы поля
					gamefield[y][x] = -1; //убираем муху с текущей ячейки
					gamefield[y - 1][x] = fly_up; //ставим муху на ячейку вверх смотрящюю муху вверх
					gamefield_view(false); //рисуем поле
				} else { //если муха вышла за пределы поля
					gamefield[y][x] = fly_up; //на текущей ячейке меняем направление мухи на смотрящюю вверх
					set_gameover(); //помечам что игра завершена
					gamefield_view(true); //рисуем поле с красным фоном рисунка мухи
				}
			}
		} else {
			//если нажата кнопка вверх когда муха смотрела вниз, показываем сообщение что нельзя ходить назад
			var infonotback = document.getElementById('infonotback');
			infonotback.style.display = 'block';
		}
	}
}

//если нажата кнопка влево
function maincontrolbutton_left() {
	if (!fly_outward) {
		if (get_fly_dir() != 1) {
			var infonotback = document.getElementById('infonotback');
			infonotback.style.display = 'none';
			
			info_steps_add();
	
			var x = get_coord_x();
			var y = get_coord_y();
			
			if (x > -1 && y > -1) {
				if (x > 0) {
					gamefield[y][x] = -1;
					gamefield[y][x - 1] = fly_left;
					gamefield_view(false);
				} else {
					gamefield[y][x] = fly_left;
					set_gameover();
					gamefield_view(true);
				}
			}
		} else {
			var infonotback = document.getElementById('infonotback');
			infonotback.style.display = 'block';
		}
	}
}

//если нажата кнопка вправо
function maincontrolbutton_right() {
	if (!fly_outward) {
		if (get_fly_dir() != 3) {
			var infonotback = document.getElementById('infonotback');
			infonotback.style.display = 'none';
			
			info_steps_add();
	
			var x = get_coord_x();
			var y = get_coord_y();
			
			if (x > -1 && y > -1) {
				if (x < 2) {
					gamefield[y][x] = -1;
					gamefield[y][x + 1] = fly_right;
					gamefield_view(false);
				} else {
					gamefield[y][x] = fly_right;
					set_gameover();
					gamefield_view(true);
				}
			}
		} else {
			var infonotback = document.getElementById('infonotback');
			infonotback.style.display = 'block';
		}
	}
}

//если нажата кнопка вниз
function maincontrolbutton_down() {
	if (!fly_outward) {
		if (get_fly_dir() != 0 || fly_steps == 0) {
			var infonotback = document.getElementById('infonotback');
			infonotback.style.display = 'none';
			
			info_steps_add();
	
			var x = get_coord_x();
			var y = get_coord_y();
			
			if (x > -1 && y > -1) {
				if (y < 2) {
					gamefield[y][x] = -1;
					gamefield[y + 1][x] = fly_down;
					gamefield_view(false);
				} else {
					gamefield[y][x] = fly_down;
					set_gameover();
					gamefield_view(true);
				}
			}
		} else {
			var infonotback = document.getElementById('infonotback');
			infonotback.style.display = 'block';
		}
	}
}

//если нажата кнопка Show\Hide
function control_showhide() {
	if (!fly_hide) {
		fly_hide = true;
		
		//меняем название кнопки
		var button = document.getElementById("button-showhide");
		button.innerHTML = "Show";
		
		//заполняем все поле знаками '?'
		var table = document.getElementById("gamefieldtable");
		for (var r = 0, n = table.rows.length; r < n; r++) {
			for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
				table.rows[r].cells[c].innerHTML = "?";
			}
		}
	} else {
		fly_hide = false;
		
		//меняем название кнопки
		var button = document.getElementById("button-showhide");
		button.innerHTML = "Hide";
		
		gamefield_view(fly_outward);
	}
}

function set_gameover() {
	fly_outward = true;
	
	var gameover = document.getElementById('gameover');
	gameover.style.display = 'block';
}

//+1 к ходам
function info_steps_add() {
	fly_steps++;
	
	var info_steps = document.getElementById('info-steps');
	info_steps.innerHTML = fly_steps;
}

//сбросить игру
function control_reset() {
	//убираем все сообщения
	var gameover = document.getElementById('gameover');
	gameover.style.display = 'none';
	
	var infonotback = document.getElementById('infonotback');
	infonotback.style.display = 'none';
	
	//обнуляем кол-во ходов и сбрасывам состояние игры
	fly_steps = 0;
	fly_outward = false;
	var info_steps = document.getElementById('info-steps');
	info_steps.innerHTML = 0;
	
	//ставим муху в центр поля
	init_gamefield();
	
	//помечам что муху видно и меняем надпись кнопки на дефолтное имя (Hide)
	fly_hide = false;
	var button = document.getElementById("button-showhide");
	button.innerHTML = "Hide";
	
	//рисуем игровое поле
	gamefield_view(false);
}