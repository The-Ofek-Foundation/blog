function gomokuShapeScore(consecutive, openEnds, currentTurn) {
	if (openEnds == 0 && consecutive < 5)
		return 0;
	switch (consecutive) {
		case 4:
			switch (openEnds) {
				case 1:
					if (currentTurn)
						return 100000000;
					return 50;
				case 2:
					if (currentTurn)
						return 100000000;
					return 500000;
			}
		case 3:
			switch (openEnds) {
				case 1:
					if (currentTurn)
						return 7;
					return 5;
				case 2:
					if (currentTurn)
						return 10000;
					return 50;
			}
		case 2:
			switch (openEnds) {
				case 1:
					return 2;
				case 2:
					return 5;
			}
		case 1:
			switch (openEnds) {
				case 1:
					return 0.5;
				case 2:
					return 1;
			}
		default:
			return 200000000;
	}
}
