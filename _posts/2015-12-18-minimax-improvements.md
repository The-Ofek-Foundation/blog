---
title: Minimax Improvements
category: artificial-intelligence
subcategory: minimax
---

## Minimax Improvements

In the [last post] we discussed the implementation of [Minimax][minimax wiki] for game AIs, specifically with [Gomoku][gomoku wiki]. In this post, we'll cover general improvements for minimax that can be made. While they might not all apply to all games, they may apply to general **[zero-sum games][zero-sum game wiki]**, like chess, connect four, checkers, etc... Note that most of these improvements are *very game-specific*.

- **Irrelevant Moves**

  In some zero-sum games, there are moves that can be skipped in the Minimax process. For example, in gomoku or othello, playing in squares that are not close to other pieces on the board would be bad moves, and thus can be skipped without resulting in a loss of skill.

- **Limit the Number of Moves Checked**

  Since the complexity of minimax relies heavily on the [branching factor]—the number of children for any node—limiting the number of moves checked can significantly speed up your search. A basic way to do this is to sort all the possible moves from any position based off much the move improves the position with a depth-1 evaluation function (compare the evaluation before and after placing the piece). Then only search deeper on the first n best moves instead of on all possible moves.

- **Detect Forced Moves**

  In most games, there are situations where a move is forced. Forced moves can be categorized into two categories, I'll use chess and gomoku for examples.  
  **1. Forced Defense**

    - For chess, when a King is in check, the player is forced to defend the King in some way.
    - For gomoku, when a player has a four-in-a-row with an open end, the other is forced to block it.

  **2. Win Available**

    This one is very simple—when a win is available, play it!

    - For chess, if you are threatening a King on your turn, capture it!
    - For gomoku, if you have a four-in-a-row with an open end on your turn, play on the end to win the game!

    After playing one of these moves in your minimax function, you can simply cut the game off returning the result of the game. There is no need to search the game any further (in this branch) since it is already over!

  Always detect wins before defenses. If no win exists, and you detected forced defense moves, then only search through the forced moves—don't even bother with other moves.

- **Alpha-Beta Pruning**

  The classic, most widely-known improvement to minimax algorithms is [alpha-beta pruning]. This algorithm allows you to skip over branches while running minimax while finding the same result that a naive minimax algorithm would have found with the same depth. The way it does this is by quitting out of the branch as it finds out that it is worse than a previously checked branch.

  ![alpha beta diagram] (The grayed-out nodes can be skipped) **Source: Jez9999, Wikipedia**

  I would highly recommend checking out the [Wikipedia page][alpha-beta pruning]—it does a much better job at explaining this than I do.

- **Game-Specific Algorithms**

  In many games, minimax is best when it is not used alone. Strong gomoku programs use threat-space search in conjunction with minimax. Strong chess programs use alpha-beta pruning along with other types of searches. In short—think about your game and try searching in a way that makes more sense to your game. This is the most complex improvement in the list I made.

- **Double-check your Code!**

  This might not seem like it should belong in this post, but there are almost always improvements that can be made to your functions. In minimax, the evaluation function is constantly being called on, if there is anything—however slight—that can be made more efficient in it, it'll really pay off.

If you have conducted all the above steps that apply for your game, you have just created a very strong program for your game that can probably beat humans! Unless—of course—if you are coding [Go]. For that, you will have to look into the Monte Carlo tree search, that I will cover in a future post. Until then, thanks for reading!

Leave feedback and/or improvements please!

[last post]:{{site.baseurl}}/artificial-intelligence/2015/12/11/minimax-for-gomoku-connect-five/ "minimax for gomoku"
[minimax wiki]:https://en.wikipedia.org/wiki/Minimax "minimax wikipedia"
[gomoku wiki]:https://en.wikipedia.org/wiki/Gomoku "gomoku wikipedia"
[zero-sum game wiki]:https://en.wikipedia.org/wiki/Zero-sum_game "zero-sum games wikipedia"
[branching factor]:https://en.wikipedia.org/wiki/Branching_factor "branching factor wikipedia"
[alpha-beta pruning]:https://en.wikipedia.org/wiki/Alpha–beta_pruning "alpha-beta pruning"
[alpha beta diagram]:https://upload.wikimedia.org/wikipedia/commons/9/91/AB_pruning.svg "alpha-beta diagram"
[Go]:https://en.wikipedia.org/wiki/Go_(game) "go board game wikipedia"