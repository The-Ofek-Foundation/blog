function analyze_horizontal_sets_for_black(current_turn) {
  var score = 0;
  var countConsecutive = 0;
  var open_ends = 0;

  for (var i = 0; i < board.length; i++) {
    for (var a = 0; a < board[i].length; a++) {
      if (board[i][a] == 'B')
        countConsecutive++;
      else if (board[i][a] == ' ' && countConsecutive > 0) {
        open_ends++;
        score += gomoku_shape_score(countConsecutive, open_ends, current_turn == 'black');
        countConsecutive = 0;
        open_ends = 1;
      }
      else if (board[i][a] == ' ')
        open_ends = 1;
      else if (countConsecutive > 0) {
        score += gomoku_shape_score(countConsecutive, open_ends, current_turn == 'black');
        countConsecutive = 0;
        open_ends = 0;
      }
      else open_ends = 0;
    }
    if (countConsecutive > 0)
      score += gomoku_shape_score(countConsecutive, open_ends, current_turn == 'black');
    countConsecutive = 0;
    open_ends = 0;
  }
  return score;
}