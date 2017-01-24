let boards;

function generate_boards() {
	$("#generate-text").val("Generating...");
	setTimeout(function() {
		boards = new Array(1000);
		for (let i = 0; i < boards.length; i++)
			boards[i] = generate_board();
		$("#generate-text").val("Generated");
	}, 100);
}

function generate_board() {
	let board = new Array(7);
	let position = "";
	for (let i = 0; i < board.length; i++) {
		board[i] = new Array(6);
		for (let a = 0; a < board[i].length; a++)
			board[i][a] = 0;
	}

	for (let ran_len = Math.random() * 25 | 0, turn = true; ran_len > 0; ran_len--, turn = !turn) {
		let ran_col;
		do {
			ran_col = Math.random() * 7 | 0;
		} while (board[ran_col][0] !== 0);
		position += ran_col;
		let row = 5;
		for (; board[ran_col][row] !== 0; row--);
		board[ran_col][row] = turn ? 1:2;
	}
	return [board, position];
 }

function test_all() {
	$("#jQuery-extend-time").text("jQuery Copies: Testing...");
	setTimeout(function() {
		let jQuery_copies = 0;
		let jQuery_start = new Date().getTime();
		while (new Date().getTime() - jQuery_start < 1000) {
			let board = boards[jQuery_copies % boards.length][0];
			board = $.extend(true, [], board);
			jQuery_copies++;
		}
		$("#jQuery-extend-time").text("jQuery Copies: " + jQuery_copies);
		$("#JSON-time").text("JSON Copies: Testing...");
		setTimeout(function() {
			let JSON_copies = 0;
			let JSON_start = new Date().getTime();
			while (new Date().getTime() - JSON_start < 1000) {
				let board = boards[JSON_copies % boards.length][0];
				board = JSON.parse(JSON.stringify(board));
				JSON_copies++;
			}
			$("#JSON-time").text("JSON Copies: " + JSON_copies);
			$("#dimension-change-time").text("Dimension Change Copies: Testing...");
			setTimeout(function() {
				let dimension_change_copies = 0;
				let dimension_change_start = new Date().getTime();
				while (new Date().getTime() - dimension_change_start < 1000) {
					let board = boards[dimension_change_copies % boards.length][0];
					board = oned_to_twod(twod_to_oned(board));
					dimension_change_copies++;
				}
				$("#dimension-change-time").text("Dimension Change Copies: " + dimension_change_copies);
				$("#reconstruct-time").text("Reconstruction Copies: Testing...");
				setTimeout(function() {
					let reconstruct_copies = 0;
					let reconstruct_start = new Date().getTime();
					while (new Date().getTime() - reconstruct_start < 1000) {
						let position = boards[reconstruct_copies % boards.length][1];
						let board = reconstruct(position);
						reconstruct_copies++;
					}
					$("#reconstruct-time").text("Reconstruction Copies: " + reconstruct_copies);
					$("#simple-copy-time").text("Simple Copy Copies: Testing...");
					setTimeout(function() {
						let simple_copy_copies = 0;
						let simple_copy_start = new Date().getTime();
						while (new Date().getTime() - simple_copy_start < 1000) {
							let board = boards[simple_copy_copies % boards.length][0];
							board = simple_copy(board);
							simple_copy_copies++;
						}
						$("#simple-copy-time").text("Simple Copy Copies: " + simple_copy_copies);
					}, 100);
				}, 100);
			}, 100);
		}, 100);
	}, 100);
}

function simple_copy(board) {
	let simple_copy = new Array(board.length);
	for (let i = 0; i < board.length; i++) {
		simple_copy[i] = new Array(board[i].length);
		for (let a = 0; a < board[i].length; a++)
			simple_copy[i][a] = board[i][a];
	}
	return simple_copy;
}

function oned_to_twod(oned) {
	let twod = new Array(7);
	for (let i = 0; i < 7; i++)
		twod[i] = oned.slice(i * 6, (i + 1) * 7);
	return twod;
}

function twod_to_oned(twod) {
	let oned = new Array(42);
	for (let i = 0; i < oned.length; i++)
		oned[i] = twod[i / 6 | 0][i % 6];
	return oned;
}

function reconstruct(pos) {
	let b = new Array(7);
	let i, a, col;
	for (i = 0; i < 7; i++) {
		b[i] = new Array(6);
		for (a = 0; a < 6; a++)
			b[i][a] = 0;
	}
	for (i = 0; i < pos.length; i++) {
		col = parseInt(pos.charAt(i), 10);
		for (a = 6; a >= 0; a--)
			if (b[col][a] === 0) {
				b[col][a] = i % 2 === 0 ? 1:2;
				break;
			}
	}
	return b;
}
