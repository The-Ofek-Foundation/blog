function bestGomokuMove(bturn, depth) {
	var color = bturn ? 'B':'W';
	var xBest = -1, yBest = -1;
	var bestScore = bturn ? -1000000000:1000000000;
	var analysis, response;
	var analTurn = depth % 2 === 0 ? bturn:!bturn;
	var moves = get_moves();

	for (var i = moves.length-1; i > moves.length - aiMoveCheck - 1
		&& i >= 0; i--) {
		board[moves[i][1]][moves[i][2]] = color;
		if (depth == 1)
			analysis = analyzeGomoku(analTurn);
		else {
			response = bestGomokuMove(!bturn, depth - 1);
			analysis = response[2];
		}
		board[moves[i][1]][moves[i][2]] = ' ';
		if ((analysis > bestScore && bturn) ||
			(analysis < bestScore && !bturn)) {
			bestScore = analysis;
			xBest = moves[i][1];
			yBest = moves[i][2];
		}
	}

	return [xBest, yBest, bestScore];
}
