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

function gamefield_view(bgcolor) {
	var table = document.getElementById("gamefieldtable");
	
	for (var r = 0, n = table.rows.length; r < n; r++) {
		for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
			if (fly_hide) {
				table.rows[r].cells[c].innerHTML = "?";
			} else {
				var d = gamefield[r][c];
				if (d === -1) {
					table.rows[r].cells[c].innerHTML = "";
				} 
				else if (d === 0) {
					if (!bgcolor) {
						table.rows[r].cells[c].innerHTML = '<img id="fly" src="images/fly.png">';
					} else {
						table.rows[r].cells[c].innerHTML = '<img id="fly" src="images/fly.png" style="background-color: red;">';
					}
				}
				else if (d === 1) {
					if (!bgcolor) {
						table.rows[r].cells[c].innerHTML = '<img id="fly" src="images/fly.png" style="transform:rotate(90deg);">';
					} else {
						table.rows[r].cells[c].innerHTML = '<img id="fly" src="images/fly.png" style="transform:rotate(90deg); background-color: red;">';
					}
				}
				else if (d === 2) {
					if (!bgcolor) {
						table.rows[r].cells[c].innerHTML = '<img id="fly" src="images/fly.png" style="transform:rotate(180deg);">';
					} else {
						table.rows[r].cells[c].innerHTML = '<img id="fly" src="images/fly.png" style="transform:rotate(180deg); background-color: red;">';
					}
				}
				else if (d === 3) {
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

function maincontrolbutton_up() {
	if (!fly_outward) {
		if (get_fly_dir() != 2) {
			var infonotback = document.getElementById('infonotback');
			infonotback.style.display = 'none';
			
			info_steps_add();
		
			var x = get_coord_x();
			var y = get_coord_y();
			
			if (x > -1 && y > -1) {
				if (y > 0) {
					gamefield[y][x] = -1;
					gamefield[y - 1][x] = fly_up;
					gamefield_view(false);
				} else {
					gamefield[y][x] = fly_up;
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

function info_steps_add() {
	fly_steps++;
	
	var info_steps = document.getElementById('info-steps');
	info_steps.innerHTML = fly_steps;
}

function control_reset() {
	var gameover = document.getElementById('gameover');
	gameover.style.display = 'none';
	
	var infonotback = document.getElementById('infonotback');
	infonotback.style.display = 'none';
	
	fly_steps = 0;
	fly_outward = false;
	var info_steps = document.getElementById('info-steps');
	info_steps.innerHTML = 0;
	
	init_gamefield();
	
	fly_hide = false;
	var button = document.getElementById("button-showhide");
	button.innerHTML = "Hide";
	
	gamefield_view(false);
}