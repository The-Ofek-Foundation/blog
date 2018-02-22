var answerSpan = document.getElementById('answer-span');

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function dynamicWidth(elem, event, addon=1, alwaysupdate=false) {
	if (event.key >= '0' && event.key <= '9' || alwaysupdate)
		elem.style.width = ((elem.value.length + addon) * 15.4) + 'px';
	else if (event.key === 'Backspace')
		elem.style.width = ((elem.value.length + (addon === 1 ? -1:0)) * 15.4) + 'px';

	answerSpan.innerText = numberWithCommas(calcKnightMoves());
}

function calcCloseKnight(dx_real, dy_real) {
	let dx = Math.max(dx_real, dy_real);
	let dy = Math.min(dx_real, dy_real);

	if (dx === 0 && dy === 0) return 0
	if (dx === 1 && dy === 0) return 3
	if (dx === 1 && dy === 1) return 2
	if (dx === 2 && dy === 0) return 2
	if (dx === 2 && dy === 1) return 1
	if (dx === 2 && dy === 2) return 4
}

function mapSquare(dx_real, dy_real) {
	let dx = Math.max(dx_real, dy_real) - 3;
	let dy = Math.min(dx_real, dy_real);
	let diag = dx + dy;
	let val = diag / 2 | 0 + 1;
	let diag_val = val - (dy + (diag + 1) % 2) / 2 | 0;
	let mv = Math.max(1, (diag + 1)) / 3 | 0;
	return Math.max(diag_val, mv);
}

function mapFinal(dx_real, dy_real) {
	let dx = Math.max(dx_real, dy_real) - 3;
	let dy = Math.min(dx_real, dy_real);

	let patternCeil = dx / 2 | 0 + 4 - dx % 2;

	if (dy <= patternCeil)
		return ((dx + 1) / 2 | 0 + dy + 1) % 2 + 1;

	if ((dy - patternCeil) % 3 === 2)
		return 1;
	else return 2;
}

function calcKnightMovesHelper(dx, dy) {
	if (Math.max(dx, dy) <= 2)
		return calcCloseKnight(dx, dy);

	return mapSquare(dx, dy) + mapFinal(dx, dy);
}

function calcKnightMoves() {
	let x1 = parseInt(document.querySelector('input[name=startx]').value);
	let y1 = parseInt(document.querySelector('input[name=starty]').value);
	let x2 = parseInt(document.querySelector('input[name=endx]').value);
	let y2 = parseInt(document.querySelector('input[name=endy]').value);

	if ((x1 === 0 && y1 === 0 && x2 === 1 && y2 === 1) ||
		(x1 === 1 && y1 === 1 && x2 === 0 && y2 === 0))
		return 4;

	let dx = Math.abs(x1 - x2);
	let dy = Math.abs(y1 - y2);
	return calcKnightMovesHelper(dx, dy);
}
