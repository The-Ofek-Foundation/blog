function analyzeHorizontalSetsForBlack(current_turn) {
	var score = 0;
	var countConsecutive = 0;
	var openEnds = 0;

	for (var i = 0; i < board.length; i++) {
		for (var a = 0; a < board[i].length; a++) {
			if (board[i][a] == 'B')
				countConsecutive++;
			else if (board[i][a] == ' ' && countConsecutive > 0) {
				openEnds++;
				score += gomokuShapeScore(countConsecutive,
					openEnds, current_turn == 'black');
				countConsecutive = 0;
				openEnds = 1;
			}
			else if (board[i][a] == ' ')
				openEnds = 1;
			else if (countConsecutive > 0) {
				score += gomokuShapeScore(countConsecutive,
					openEnds, current_turn == 'black');
				countConsecutive = 0;
				openEnds = 0;
			}
			else openEnds = 0;
		}
		if (countConsecutive > 0)
			score += gomokuShapeScore(countConsecutive,
				openEnds, current_turn == 'black');
		countConsecutive = 0;
		openEnds = 0;
	}
	return score;
}
