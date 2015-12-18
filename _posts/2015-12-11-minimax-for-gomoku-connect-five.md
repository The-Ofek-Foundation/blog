---
layout: default
title: Minimax for Gomoku (Connect Five)
category: Artificial Intelligence
subcategory: Minimax
comments: true
---

## Minimax for Gomoku (Connect Five)

### Refresher

If you all remember from the [last post], we used [depth-first search][dfs wiki] to solve the game of Tic Tac Toe, recursively traversing all the possible branches and finding the outcome given optimal play. Since we began from the bottom, we were able to  tell if a move was winning, losing, or tying and then work our way up, playing optimal moves for each player. This made the solution *very simple* for the following reasons:

1. We didn't need to store or create a game tree of any sort
2. We only had to detect wins and losses (This will become clearer after learning other algorithms)

However, it's major flaw made it impractical for even slightly more complex games -- It's complexity increases **exponentially** with both the [branching factor] and the depth, making it take literally *years* to run for Connect Four on a normal computer.

### Minimax

The most basic solution to this problem is actually another for of depth-first search, except this time, instead of searching to the end of the game, you only search to a certain depth. This brings up the additional complexity in [minimax], as **an [evaluation function] is required** to assess how good each position is. Instead of returning a 1, -1, or 0 depending on if the game is a win, loss, or tie, you might return a 0.8, -0.25, or a 0.001 based off of the output of your heuristic evaluation function.

What do I mean?

Take the following Tic Tac Toe position for example:

![unconditional win]  
No matter whose turn it is, the X's are going to win. The analysis function should return a very positive value for the X's. However, *the player's turn still plays a very important role in analysis functions*. For example:

<br />
![conditional win]  
Without looking at the player's turn, the position would look completely tied, but knowing that X's start and it is therefore their turn, it is clear that X's can win in the next move. Your evaluation function should reflect this, and submit a very high positive score for the X's, similar to the score in the first position.

You should already have some form of idea on how to score positions for Gomoku. It should take into account the following factors:

1. **How many** sets of consecutive squares you control in a row
2. **How long** are each of those sets
3. Whose turn it is
4. How many **open ends** each set contains (For example: if you control two consecutive positions with 0 open ends, there is no chance those two positions will become a five-in-a-row, and therefore should no be awarded any points)

Note that you should count up the sets in all directions (vertically/horizontally/diagonally) so that some squares may be counted for multiple different sets.

I understand this may be hard to visualize, so let's use the Tic Tac Toe analogy again:

![analyze tic tac toe position]  
You would count the following sets for X:

 - **Horizontal:**
   1. one X with one open end
   2. two X's with 0 open ends
 - **Vertical:**
   1. two X's with 1 open end
   2. one X with one open end
 - **Diagonal (top-left to bottom-right):**
   1. two X's with 0 open ends
   2. one X with two open ends
 - **Diagonal (top-right to bottom-left):**
   1. one X with 0 open ends
   2. one X with one open end
   3. one X with one open end

For Gomoku, this may be implemented in a similar method:

{% highlight javascript %}
{% include assets/gomoku-shape-score.js %}
{% endhighlight %}

As you can see, this function takes the number consecutive, number of open ends, and turn into account. It gives much more points to a 4 with open ends when it is your turn than when it isn't. Also notice how it gives 0 points to any shape that has no open ends. The weights for such a function are in practice chosen empirically.

There is still another major piece missing however -- the means of finding all the sets and passing them to the set-scoring function. Consider the following implementation for counting horizontal sets:

{% highlight javascript %}
{% include assets/gomoku-total-shapes.js %}
{% endhighlight %}

Of course, this is just one possible implementation, and is in no way the fastest. In addition, it only analyzes for black, and horizontally -- a real implementation should be able to handle both colors and in all directions. **You would subtract or divide the points of one player by the points of the other**. However, this function should still give you an idea on the kind of function that is required for summing up all the sets.

Now that we can build our analysis function, we still need to use a minimax algorithm to implement it. As a quick refresher, the idea is similar to depth-first search in that we go branch by branch having each player try to maximize their outcome. However, instead of going all the way to the end of the game, we cut the function off at a specific depth, and use our analysis function to tell how good that position is.

At depth 1, you would simply consider all the board positions once you play one move, and choose the one that is the most favorable for you.

Given the same position above:

![analyze tic tac toe position]  
The children to be analyzed would be:

![c1] &nbsp; ![c2] &nbsp; ![c3] &nbsp; ![c4]

Note that during your analysis, you **assume it is your opponent's turn**, *not your turn*! This will make the third child be clearly the most favorable, since in all other children, X has a two in a row with an open space (since it will also be their turn, your analysis function could give that a very high score). In this manor, you have successfully blocked their win.

Improving this is easy. We are currently only looking at a depth of 1, or of 1 [ply] (plies are used to indicate depth -- five 'plies' means five turns deep). We could make our AI much stronger by looking at a depth of two plies, consisting of one of your moves and one of their responses (reply). This explains the name 'Minimax', *while you are trying to maximize your points, your opponent is trying to minimize your points* -- out of all the possible minimizes you opponents can make in their replies, you chose the maximum, most favorable one for you, and play the corresponding move. You try to make the maximum out of your opponent's minimums. Of course, increasing the depth past two plies is trivial, as you just need to do more of the same thing.

Here is a very basic example of this in javascript:

{% highlight javascript %}
{% include assets/best-gomoku-move.js %}
{% endhighlight %}

As you can see, in every ply the player tries maximizing their own gains and minimizing the gains of their opponents. You will notice the similarity between this algorithm that the depth-first search one in the [previous blog post][last post].

You can build a pretty reasonable AI using this pure minimax algorithm, though there are still many improvements that can be made, that I'll perhaps cover in a future post. If you can't wait, try reading into [alpha-beta pruning], or try playing my own [Gomoku AI]!


[last post]:/blog/ai/2015/12/10/tic-tac-toe-ai-with-depth-first-search.html "Tic Tac Toe AI with depth-first search"

[dfs wiki]:https://en.wikipedia.org/wiki/Depth-first_search "Depth-first search wikipedia"

[branching factor]:https://en.wikipedia.org/wiki/Branching_factor "branching factor wikipedia"

[minimax]:https://en.wikipedia.org/wiki/Minimax "Minimax wikipedia"

[evaluation function]:https://en.wikipedia.org/wiki/Evaluation_function "evaluation function wikipedia"

[unconditional win]:/blog/assets/tic-tac-toe-unconditional-win.png "an unconditional win"

[conditional win]:/blog/assets/tic-tac-toe-conditional-win.png "a turn-conditional win"

[analyze tic tac toe position]:/blog/assets/tic-tac-toe-analyze.png "position to analyze"

[c1]:/blog/assets/tic-tac-toe-analyze-c1.png "child 1"

[c2]:/blog/assets/tic-tac-toe-analyze-c2.png "child 2"

[c3]:/blog/assets/tic-tac-toe-analyze-c3.png "child 3"

[c4]:/blog/assets/tic-tac-toe-analyze-c4.png "child 4"

[ply]:https://en.wikipedia.org/wiki/Ply_(game_theory) "ply wiki"

[alpha-beta pruning]:https://en.wikipedia.org/wiki/Alpha–beta_pruning "alpha-beta pruning"

[Gomoku AI]:/Online-Go/ "Gomoku AI"