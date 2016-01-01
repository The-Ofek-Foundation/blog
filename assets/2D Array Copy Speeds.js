var boards;

$(document).ready(function() {
  generate_boards();
});

function generate_boards() {
  $("#generate-text").val("Generating...");
  setTimeout(function() {
    boards = new Array(1000);
    for (var i = 0; i < boards.length; i++)
      boards[i] = generate_board();
    $("#generate-text").val("Generated");
  }, 100);
}

function generate_board() {
  var board = new Array(7);
  var position = "";
  for (var i = 0; i < board.length; i++) {
    board[i] = new Array(6);
    for (var a = 0; a < board[i].length; a++)
      board[i][a] = 0;
  }

  for (var ran_len = Math.random() * 25 | 0, turn = true; ran_len > 0; ran_len--, turn = !turn) {
    var ran_col;
    do {
      ran_col = Math.random() * 7 | 0;
    } while (board[ran_col][0] !== 0);
    position += ran_col;
    for (var row = 5; board[ran_col][row] !== 0; row--);
    board[ran_col][row] = turn ? 1:2;
  }
  return [board, position];
 }

function test_all() {
  $("#jQuery-extend-time").text("jQuery Copies: Testing...");
  setTimeout(function() {
    var jQuery_copies = 0;
    var jQuery_start = new Date().getTime();
    while (new Date().getTime() - jQuery_start < 1000) {
      var board = boards[jQuery_copies % boards.length][0];
      board = $.extend(true, [], board);
      jQuery_copies++;
    }
    $("#jQuery-extend-time").text("jQuery Copies: " + jQuery_copies);
    $("#JSON-time").text("JSON Copies: Testing...");
    setTimeout(function() {
      var JSON_copies = 0;
      var JSON_start = new Date().getTime();
      while (new Date().getTime() - JSON_start < 1000) {
        var board = boards[JSON_copies % boards.length][0];
        board = JSON.parse(JSON.stringify(board));
        JSON_copies++;
      }
      $("#JSON-time").text("JSON Copies: " + JSON_copies);
      $("#dimension-change-time").text("Dimension Change Copies: Testing...");
      setTimeout(function() {
        var dimension_change_copies = 0;
        var dimension_change_start = new Date().getTime();
        while (new Date().getTime() - dimension_change_start < 1000) {
          var board = boards[dimension_change_copies % boards.length][0];
          board = oned_to_twod(twod_to_oned(board));
          dimension_change_copies++;
        }
        $("#dimension-change-time").text("Dimension Change Copies: " + dimension_change_copies);
        $("#reconstruct-time").text("Reconstruction Copies: Testing...");
        setTimeout(function() {
          var reconstruct_copies = 0;
          var reconstruct_start = new Date().getTime();
          while (new Date().getTime() - reconstruct_start < 1000) {
            var position = boards[reconstruct_copies % boards.length][1];
            var board = reconstruct(position);
            reconstruct_copies++;
          }
          $("#reconstruct-time").text("Reconstruction Copies: " + reconstruct_copies);
        }, 100);
      }, 100);
    }, 100);
  }, 100);
}

function oned_to_twod(oned) {
  var twod = new Array(7);
  for (var i = 0; i < 7; i++)
    twod[i] = oned.slice(i * 6, (i + 1) * 7);
  return twod;
}

function twod_to_oned(twod) {
  var oned = new Array(42);
  for (var i = 0; i < oned.length; i++)
    oned[i] = twod[i / 6 | 0][i % 6];
  return oned;
}

function reconstruct(pos) {
  var b = new Array(7);
  var i, a, col;
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