---
title: What is the Monte Carlo tree search?
category: artificial-intelligence
subcategory: monte-carlo-tree-search
---

## What is the Monte Carlo tree search?

In this post, we'll be covering when a [Monte Carlo tree search][monte carlo ts wiki] algorithm&mdash;a very new (2006!) form of game AI&mdash;should be used, its basics, and a naive implementation. If you doubt the power of this algorithm, just check out either my [Ultimate Tic Tac Toe engine][my uttt] or my [Connect Four engine][my connect four].

### What are the alternatives?

In order to decide whether or not you want to code your game AI using the Monte Carlo tree search, you must first of all consider your alternatives. The most naive alternatives are the [**Depth-first search**][dfs post] and the [**Breadth-first search**][bfs wiki] which traverse the game until the end in order to calculate the best move. To put it simply, these AIs check *all possible move combinations* in order to pick the move that would lead to the most favorable outcome.

**Pros of Depth/Breadth-first search:**

1. Essentially **solve the game**&mdash;since they search through **all** possible move combinations, the move that they pick is the *best possible move*.
2. **Very easy to code**&mdash;the only game-specific functions required are to find the next possible moves from any given position, and to tell when a game is over and who won.

**Cons:**

1. **Impractically long runtime**&mdash;the largest con for these AI methods and reason they are so rarely used is because it would literally take *ages* for them to run any complex game (chess would take well over a googol times the age of the universe to run)
2. **Cannot be cut off in the middle**&mdash;if this algorithm is cut off in the middle, its evaluations are completely *useless*. It *must* be allowed to run until it is finished.

Depth and Breadth-first search are therefore rarely used in the game AI business, and when they are used, it's mainly with *very* simple games, where there is no need to create a more complicated algorithm. For example, a game like simple Tic Tac Toe (not ultimate) could easily be solved with a Depth-first search, see my [Depth-first search blog post][dfs post] for much more information on both Depth-first search and for a sample implementation with Tic Tac Toe.

The next logical algorithm to use is [**Minimax**][minimax wiki], an algorithm that traverses the game tree in a similar manner as Depth-first search, but instead of traversing the whole game tree&mdash;the algorithm cuts off at a certain depth and evaluates the final position. Basically, instead of finding all possible end game positions and knowing who won which position, it finds all possible positions at a given depth and analyzes who it *thinks* is winning, and by how much. As you may guess, this requires some evaluation function that can estimate who is ahead and by how much in any given position.

**Pros of Minimax:**

1. Can be **fast in complex games**&mdash;major chess programs use variations of Minimax to calculate great moves in seconds
2. Can be **improved easily** to perform better&mdash;look at my [Minimax improvements blog post][minimax improvements post] for some examples and general tips

**Cons:**

1. **Sub-ideal moves**&mdash;while minimax-based algorithms may give great moves depending on the search-depth and the improvements made, its moves are not guaranteed to be ideal (and often aren't) unlike the perfect Depth/Breadth-first search
2.  **More game-specific**&mdash;unlike with the previously described searches, it is harder to code a good Minimax algorithm without concrete knowledge of the specific game. This is largely due to the fact that a positional [evaluation function][heuristic evaluation function wiki] is integral for Minimax to work, and that the strongest engines use specific game knowledge to tailor their Minimax algorithm
3. **Cannot be cut off in the middle**&mdash;similarly to the previous search methods, naive Minimax algorithms are rendered useless if cut off in the middle. However, note that if the algorithm takes too long to run, it could always be changed to run at a lower depth (sacrificing move quality)
4. **Poor with** games that have a **high branching factor**&mdash;a game like chess has around 35 possible moves given any position, meaning that the number of positions that a naive Minimax algorithm needs to evaluate is multiplied by a factor of 35 for every increased depth level. At depth 1, there would be 35 positions, at 2 there would be 35<sup>2</sup> positions or 1125, and at 5 there would be around 50 million. With a game such as [Go (Weiqi)][go wiki] where there are between around 150 to 250 possible moves on average, the number of positions that need to be evaluated gets ugly fast.
5. **Poor with** games that **don't have any good evaluation function**&mdash;this disadvantage is worth repeating; every Minimax coder needs to balance the accuracy of the evaluation function with its runtime. With games like Go that simply don't have any efficient enough nor accurate enough evaluation function, Minimax-based algorithms fall short.

After reading all those cons, don't start thinking that all Minimax-based algorithms are awful&mdash;they aren't. Minimax is very well understood and perfected, and ways have been invented to improve or even eliminate some of these cons. Moreover, it's relatively simple to build a naive Minimax algorithm, and you can check out my [blog post on using Minimax for Gomoku (Connect Five)][minimax for gomoku post] for more information and some sample functions for Gomoku

### What is It?

Now that you have a basic understanding of your alternatives (which may be completely valid options), it's time to finally tell you what the heck the Monte Carlo tree search is, and then why you might want to use it.

First, let's touch up on the [Monte Carlo method][monte carlo wiki]&mdash;a method largely used in mathematics that estimates solutions to problems with completely random samples. In order to understand this a bit better, you can see [how the Monte Carlo method can be used to approximate PI][mc pi], or read [this well-written article][beej mc] that sheds some light at how Monte Carlo could potentially be used for games.

The Monte Carlo tree search is quite different (and far better) than the pure Monte Carlo aforementioned article&mdash;as you may guess, the Monte Carlo *tree search* requires the construction of a **tree**, and the ability to search through it; it requires a [**search tree**][search tree wiki]. Instead of simply running random simulations from the current board position, it uses the results of the simulations to generate a search tree, and then runs simulations from the leafs of the tree, propagating the results through the tree.

I'll be explaining more on the specifics and how to make it later in the article, so don't worry if you don't completely get it yet.

### Why use it?

**Pros of the Monte Carlo tree search:**

1. **Variable runtime**&mdash;the Monte Carlo tree search can run for *however long you want it to*. This is **huge!** Since the algorithm is essentially a loop running simulations, it can be cut off any time! This makes it **laughably easy** to specify for how long the AI should run&mdash;very useful if you want the user to be able to choose how much time to give the AI to 'think'. Of course it plays better when given more time to run since it can run more simulations, increasing the size of its search tree
2. Can be **cut off in the middle**&mdash;unlike the previous algorithms discussed, the Monte Carlo tree search can be very easily cut off in the middle
3. **Reusable tree**&mdash;the nodes in the algorithm's generated search tree typically cover all of your opponent's possible moves, and can all be valid tree roots. This means that when a new move is played, all previous calculations made by the algorithm for the corresponding node still apply, and the corresponding subtree functions as the new tree. If that didn't make sense, either read [this wiki page on trees][wiki trees] or just understand that calculations made in previous moves can be used in future moves
4. **Easy pondering**&mdash;while this can essentially be derived from the previous points, it's worth reiterating. This algorithm can be easily made to run while the opponent is thinking, so that it can play better while thinking less on its own turn.
5. Very **easy to code**&mdash;similarly to Depth/Breadth-first search, this algorithm requires minimal game-specific functions&mdash;namely getting children from a specific board position and running a random (or pseudo-random) simulation from a given position. Don't get me wrong, there are much more complex implementations using heavy [deep learning][deep learning wiki] and [machine learning][machine learning wiki]  extensions, or using [neural networks][neural networks wiki] for evaluations, but these are not necessary for a pure Monte Carlo implementation.
6. **No need** for an **evaluation function**&mdash;adding on to the last point, this game only needs to know if the game is over, and if so, who won; it places weights by itself on positions. In some games (like Ultimate Tic Tac Toe), where good heuristic evaluation functions are very difficult to create, Monte Carlo thrives.
7. **Immense room** for **improvement**&mdash;not only is this algorithm amazing, it has the potential to improve to heights that nobody has seen before! Note my wording however&mdash;unlike Minimax, many of these powerful improvements are *anything but easy*.

**Cons:**

1. **Harder** to **understand conceptually**&mdash;without any formal education in this field, you'll find a surprising **lack of** Monte Carlo tree search **implementation examples** or tutorials. It took me a few good hours to fully understand the concept.
2. **Not best** for **all cases**&mdash;while this algorithm should be able to play any game well, games with a simpler evaluation function (like chess) are ultimately better and faster solved using traditional minimax approaches.

The Monte Carlo tree search has been used to create truly remarkable game AIs, from various [Go AIs][computer go wiki] including [Google DeepMind's AlphaGo][alphago page] Go-playing program, and simple yet powerful game AIs such as my own [Connect Four][my connect four] and [Ultimate Tic Tac Toe/Anti-Ultimate Tic Tac Toe][my uttt] AIs!

### How it's made

First of all, gain a basic understanding of search trees (you can use [Wikipedia][search tree wiki] to help out). Next. read the first part of the [wiki page][monte carlo ts wiki] explaining it to get a basic conceptual understanding. Now, let's go through the steps one-by-one, assuming you understand the fundamentals of search trees (using JavaScript as an example, but it should be easy to transfer to any language):

First, let's create a generic object to represent a node:
{% gist 322df8fdd9adac269d4da1208ac0867c %}
That was the easy part. Now, we need to create the backbone of the algorithm, the part that chooses which child node to run a simulation with:
{% gist 6f61e2c2961b541060a75f214306de64 %}
You might notice that this function calls a few functions that weren't mentioned yet, but you'll probably have some kind of understanding of them having read the wiki article. I'll start by covering the simplest one first. If you notice a lack of explanation here, that's because this is nearly identical to Wikipedia's [exploration vs exploitation section][wiki exploration vs exploitation]:
{% gist 0f814cf2a8fe47040390064f7106cfd6 %}
While we're at it, let's get done with the very simple and generic algorithms first:
{% gist 54459687152b24b2c702b4b1c8d71fce %}
Now that the framework is done, let's get to the more game-specific functions. Let's start with the function that gets all the possible children of a given position:
{% gist 8f91548f73ec68ad2a28ee43e240f305 %}
(Note that the simpleCopy function was taken from [this blog post][simple copy blog post]).

Assuming you understand that, let's move on to the random simulation function:
{% gist 9d70d9b4ad58f616bd374691193e31f7 %}
And last but not least (after you finishing coding all the game-specific helper methods), you need a function to create the root node. That's refreshingly simple:
{% gist 6f14ef713d28a764efdf5a4e630e5117 %}
And you're done! If you want any more help, you can check out [my github game JavaScript folder] to view my Mancala, Connect Four, and Ultimate Tic Tac Toe implementations, or simply comment below!

Let me know if I should clear up anything!

[my uttt]:https://www.theofekfoundation.org/games/UltimateTicTacToe "my ultimate tic tac toe ai"
[my connect four]:https://www.theofekfoundation.org/games/ConnectFour "my connect four ai"
[monte carlo ts wiki]:https://en.wikipedia.org/wiki/Monte_Carlo_tree_search "monte carlo tree search wiki"
[uttt math with bad drawings]:https://mathwithbaddrawings.com/2013/06/16/ultimate-tic-tac-toe/ "game rules and explanation"
[dfs post]:{{site.baseurl}}/artificial-intelligence/2015/12/10/tic-tac-toe-ai-with-depth-first-search/ "depth-first search post"
[bfs wiki]:https://en.wikipedia.org/wiki/Breadth-first_search "breadth-first search wiki"
[minimax wiki]:https://en.wikipedia.org/wiki/Minimax "minimax wiki"
[minimax improvements post]:{{site.baseurl}}/artificial-intelligence/2015/12/18/minimax-improvements/ "minimax improvements post"
[heuristic evaluation function wiki]:https://en.wikipedia.org/wiki/Evaluation_function "heuristic evaluation function wiki"
[go wiki]:https://en.wikipedia.org/wiki/Go_(game) "go (weiqi) wiki"
[minimax for gomoku post]:{{site.baseurl}}/artificial-intelligence/2015/12/11/minimax-for-gomoku-connect-five/ "minimax for gomoku post"
[monte carlo wiki]:https://en.wikipedia.org/wiki/Monte_Carlo_method "monte carlo method wiki"
[mc pi]:https://curiosity-driven.org/pi-approximation "monte carlo pi approximation"
[beej mc]:https://beej.us/blog/data/monte-carlo-method-game-ai/ "monte carlo for games article"
[search tree wiki]:https://en.wikipedia.org/wiki/Search_tree "search tree wiki"
[wiki trees]:https://en.wikipedia.org/wiki/Tree_(data_structure)#Terminologies_used_in_Trees "tree data structure wiki"
[deep learning wiki]:https://en.wikipedia.org/wiki/Deep_learning "deep learning wiki"
[machine learning wiki]:https://en.wikipedia.org/wiki/Machine_learning "machine learning wiki"
[neural networks wiki]:https://en.wikipedia.org/wiki/Artificial_neural_network "neural networks wiki"
[computer go wiki]:https://en.wikipedia.org/wiki/Computer_Go "computer go wiki"
[alphago page]:https://deepmind.com/alpha-go "official alphago site"
[wiki exploration vs exploitation]:https://en.wikipedia.org/wiki/Monte_Carlo_tree_search#Exploration_and_exploitation "wiki exploration vs exploitation"
[my github game JavaScript folder]:https://github.com/The-Ofek-Foundation/theofekfoundation.org/tree/master/static/assets/javascript/games "my github game javascript folder"
[simple copy blog post]:{{site.baseurl}}/general-computer-programming/2015/12/30/2d-array-copy-speeds/
