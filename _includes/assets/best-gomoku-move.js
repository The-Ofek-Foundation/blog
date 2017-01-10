function best_gomoku_move(bturn, depth) {
  var color = bturn ? 'B':'W';
  var x_best = -1, y_best = -1;
  var best_score = bturn ? -1000000000:1000000000;
  var analysis, response;
  var anal_turn = depth % 2 === 0 ? bturn:!bturn;
  var moves = get_moves();

  for (var i_temp = moves.length-1; i_temp > moves.length - ai_move_check - 1 && i_temp >= 0; i_temp--) {
    board[moves[i_temp][1]][moves[i_temp][2]] = color;
    if (depth == 1)
      analysis = analyze_gomoku(anal_turn);
    else {
      response = best_gomoku_move(!bturn, depth - 1);
      analysis = response[2];
    }
    board[moves[i_temp][1]][moves[i_temp][2]] = ' ';
    if ((analysis > best_score && bturn) || (analysis < best_score && !bturn)) {
      best_score = analysis;
      x_best = moves[i_temp][1];
      y_best = moves[i_temp][2];
    }
  }

  return [x_best, y_best, best_score];
}