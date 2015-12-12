/**
 * @param  board The current state of the board
 * @param  xTurn The current turn
 * @return the game result - a 1 if X's win, -1 if Y's, and 0 for tie game
 */
public int getGameResult(char[][] board, boolean xTurn) {

  // If the game is already over with this board, return the result

  if (gameOver(board))
    return gameResult(board);

  // If the game is still going, check all the possible moves
  // and choose the one with the most favorable outcome for the player

  int result = xTurn ? -1:1;

  for (int i = 0; i < board.length; i++)
    for (int a = 0; a < board[i].length; a++) {

      if (board[i][a] != ' ')
	continue;
      // Place the move, then run the function recrusively, then undo the move
      board[i][a] = xTurn ? 'X':'O';
      int tempResult = getGameResult(board, !xTurn);
      board[i][a] = ' ';

      // Check if the result is favorable for the player
      if ((xTurn == tempResult > result) || (!xTurn && tempResult < result))
        result = tempResult;
    }

  return result;
}