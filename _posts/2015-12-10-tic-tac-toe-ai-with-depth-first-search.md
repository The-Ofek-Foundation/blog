---
layout: default
title: Tic Tac Toe AI with Depth-First Search
category: ai
comments: true
---

## Tic Tac Toe AI with a Depth-First Search

This is my first post, so please don't be too rough or judge too harshly.

[Depth-first search][dfs wiki] is an algorithm that traverses a tree depth-first, meaning that it traverses the tree [recursively][recursive wiki], exhausting one branch completely before continuing to the next one.

![dfs order diagram] **Source**: Wikipedia

This can be used to [solve a game][solved games], to find the best possible move or simply who wins given ideal gameplay. This form of game AI is amongst the **easiest** to implement, since it *doesn't require the construction of a tree*. Since this algorithm works bottom up without rechecking any nodes, it is typially using a recursive function and a function that checks if the game is over.

For the game of Tic Tac Toe, consider the following method:

{% highlight java %}
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
{% endhighlight %}

This recursive method does the following:

1. **Check if the game is over** -- if either player won or if the board is fully filled
 - If so, return the result of the game

2. **Iterate through all board squares**
 - If the square is occupied, continue to the next one
 - Set the square to either an 'X' or an 'O' depending on the current player's color
 - Get the outcome of the game by recursing, calling the same method with the updated board, and with the turn boolean swapped
 - Update the best result of this branch, trying to maximize the result for the current player

In short, it finds the results by assuming that both players will play moves that maximize their game. Note that it is very simple to change this algorithm to play [Misère or Anti Tic Tac Toe][misere], a game played like Tic Tac Toe except that the goal of the game is to lose.

Since this solution is written for simplicity, it can take nearly half a second to run on Tic Tac Toe, although it can relatively easily be implemented to run in less than **a hundredth of a second**. Of course for larger games such as Connect Four and Gomoku (connect five), it will take much, much longer. This is because the fact that the complexity of depth-first search is **O(b<sup>d</sup>)**, where b is the branching factor (average number of possible moves in any given board position) and d is the average depth or moves played in a game before it is over.

If the time it takes to run on Tic Tac Toe is 1, then the relative runtimes for different games would roughly be:

 - **Connect Four:** 1.80 * 10<sup>16</sup>
 - **Othello (Reversi):** 3.81 * 10<sup>52</sup>
 - **Gomoku:** 1.77 * 10<sup>64</sup>
 - **Chess:** 1.28 * 10<sup>118</sup>
 - **Go (Weiqi):** 1.87 * 10<sup>354</sup>

To put it into comparison, if you were to move one hairlength, solve Tic Tac Toe completely, then move another hairlength and repeat, while someone else was trying to solve Connect Four, the other person would be done when you move the distance from Earth to the Moon *one thousand times*! In other words, **you aren't going to get far trying to solve Connect Four, nor any other complex game, using pure depth-first search**.

![moon img]

<br />

The moral of the story is: while depth-first search can be used to solve Tic Tac Toe, it ultimately fails for more complex games -- I doubt your Connect Four player would want to wait years for the computer to think. That's why AI's use algorithms such as minimax and Monte Carlo tree search to find good moves. While the moves they find are often not perfect, they can still be very good and, more importantly, be evaluated in just a few seconds.

If you want to check out my Connect Four AI (which boasts as much stronger than any other AI you'll find online), be sure to [check it out](/ConnectOfek/ "my Connect Four AI").

If you have any questions, advice, or feedback at all, feel free to leave a comment down below!

[dfs wiki]:https://en.wikipedia.org/wiki/Depth-first_search "Depth-first search wikipedia"
[recursive wiki]:https://en.wikipedia.org/wiki/Recursion_(computer_science) "Recursion wikipedia"
[dfs order diagram]:https://upload.wikimedia.org/wikipedia/commons/1/1f/Depth-first-tree.svg "the order in which the nodes get traversed"
[solved games]:https://en.wikipedia.org/wiki/Solved_game "solved games"
[misere]:http://coolmathstuff123.blogspot.com/2013/09/anti-tic-tac-toe.html "blog about Misère Tic Tac Toe"
[moon img]:http://www.wired.com/wp-content/uploads/images_blogs/wiredscience/2012/03/earthmoon_near_big.jpg "Earth and Moon"