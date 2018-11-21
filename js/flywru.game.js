//Матрица игрового поля.
//-1 - ничего(нет мухи)
// 0 - муха смотрит вверх
// 1 - -//- вправо
// 2 - -//- вниз
// 3 - -//- влево
var gamefield = [];

//код поворота мухи
const fly_up = 0, fly_right = 1, fly_down = 2, fly_left = 3;

$(document).ready(function () {
	//инициализировать игровое поле
	init_gamefield();
	
	//обновить игровое поле
	gamefield_view();
});

function init_gamefield() {
	gamefield = [[-1, -1, -1],[-1, 0, -1],[-1, -1, -1]];
}

function gamefield_view() {
	var table = document.getElementById("gamefieldtable");
	
	for (var r = 0, n = table.rows.length; r < n; r++) {
		for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
			var d = gamefield[r][c];
			if (d === -1) {
				table.rows[r].cells[c].innerHTML = "";
			} 
			else if (d === 0) {
				table.rows[r].cells[c].innerHTML = '<img id="fly" src="images/fly.png">';
			}
			else if (d === 1) {
				table.rows[r].cells[c].innerHTML = '<img id="fly" src="images/fly.png" style="transform:rotate(90deg)">';
			}
			else if (d === 2) {
				table.rows[r].cells[c].innerHTML = '<img id="fly" src="images/fly.png" style="transform:rotate(180deg)">';
			}
			else if (d === 3) {
				table.rows[r].cells[c].innerHTML = '<img id="fly" src="images/fly.png" style="transform:rotate(-90deg)">';
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

function maincontrolbutton_up() {
	var x = get_coord_x();
	var y = get_coord_y();
	
	if (x > -1 && y > -1) {
		if (y > 0) {
			gamefield[y][x] = -1;
			gamefield[y - 1][x] = fly_up;
			gamefield_view();
		}
	}
}

function maincontrolbutton_left() {
	var x = get_coord_x();
	var y = get_coord_y();
	
	if (x > -1 && y > -1) {
		if (x > 0) {
			gamefield[y][x] = -1;
			gamefield[y][x - 1] = fly_left;
			gamefield_view();
		}
	}
}

function maincontrolbutton_right() {
	var x = get_coord_x();
	var y = get_coord_y();
	
	if (x > -1 && y > -1) {
		if (x < 2) {
			gamefield[y][x] = -1;
			gamefield[y][x + 1] = fly_right;
			gamefield_view();
		}
	}
}

function maincontrolbutton_down() {
	var x = get_coord_x();
	var y = get_coord_y();
	
	if (x > -1 && y > -1) {
		if (y < 2) {
			gamefield[y][x] = -1;
			gamefield[y + 1][x] = fly_down;
			gamefield_view();
		}
	}
}