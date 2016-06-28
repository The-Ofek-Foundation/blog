---
layout: default
title: What is the Monte Carlo tree search?
category: Artificial Intelligence
subcategory: Monte Carlo tree search
new-tab-redirect: true
comments: true
---

## What is the Monte Carlo tree search?

In this post, we'll be covering when a [Monte Carlo tree search][monte carlo ts wiki] algorithm—a very new (2006!) form of game AI— should be used, its basics, and a naive implementation. If you doubt the power of this algorithm, just check out either my [Ultimate Tic Tac Toe engine][my uttt] or my [Connect Four engine][my connect four].

### What are the alternatives?

In order to decide whether or not you want to code your game AI using the Monte Carlo tree search, you must first of all consider your alternatives. The most naive alternatives are the [**Depth-first search**][dfs post] and the [**Breadth-first search**][bfs wiki] which traverse the game until the end in order to calculate the best move. To put it simply, these AIs check *all possible move combinations* in order to pick the move that would lead to the most favorable outcome.

**Pros of Depth/Breadth-first search:**

1. Essentially **solve the game**—since they search through **all** possible move combinations, the move that they pick is the *best possible move*.
2. **Very easy to code**—the only game-specific functions required are to find the next possible moves from any given position, and to tell when a game is over and who won.

**Cons:**

1. **Impractically long runtime**—the largest con for these AI methods and reason they are so rarely used is because it would literally take *ages* for them to run any complex game (chess would take well over a googol times the age of the universe to run)
2. **Cannot be cut off in the middle**—if this algorithm is cut off in the middle, its evaluations are completely *useless*. It *must* be allowed to run until it is finished.

Depth and Breadth-first search are therefore rarely used in the game AI business, and when they are used, it's mainly with *very* simple games, where there is no need to create a more complicated algorithm. For example, a game like simple Tic Tac Toe (not ultimate) could easily be solved with a Depth-first search, see my [Depth-first search blog post][dfs post] for much more information on both Depth-first search and for a sample implementation with Tic Tac Toe.

The next logical algorithm to use is [**Minimax**][minimax wiki], an algorithm that traverses the game tree in a similar manner as Depth-first search, but instead of traversing the whole game tree—the algorithm cuts off at a certain depth and evaluates the final position. Basically, instead of finding all possible end game positions and knowing who won which position, it finds all possible positions at a given depth and analyzes who it *thinks* is winning, and by how much. As you may guess, this requires some evaluation function that can estimate who is ahead and by how much in any given position.

**Pros of Minimax:**

1. Can be **fast in complex games**—major chess programs use variations of Minimax to calculate great moves in seconds
2. Can be **improved easily** to perform better—look at my [Minimax improvements blog post][minimax improvements post] for some examples and general tips

**Cons:**

1. **Sub-ideal moves**—while minimax-based algorithms may give great moves depending on the search-depth and the improvements made, its moves are not guaranteed to be ideal (and often aren't) like in Depth/Breadth-first search
2.  **More game-specific**—unlike with the previously described searches, it is harder to code a good Minimax algorithm without concrete knowledge of the specific game. This is largely due to the fact that a positional [evaluation function][heuristic evaluation function wiki] is integral for Minimax to work, and that the strongest engines use specific game knowledge to tailor their Minimax algorithm
3. **Cannot be cut off in the middle**—similarly to the previous search methods, naive Minimax algorithms are rendered useless if cut off in the middle. However, note that if the algorithm takes too long to run, it could always be changed to run at a lower depth (sacrificing move quality)
4. **Poor with** games that have a **high branching factor**—a game like chess has around 35 possible moves given any position, meaning that the number of positions that a naive Minimax algorithm needs to evaluate is multiplied by a factor of 35 for every increased depth level. At depth 1, there would be 35 positions, at 2 there would be 35<sup>2</sup> positions or 1125, and at 5 there would be around 50 million. With a game such as [Go (Weiqi)][go wiki] where there are between around 150 to 250 possible moves on average, the number of positions that need to be evaluated get ugly fast.
5. **Poor with** games that **don't have any good evaluation function**—this disadvantage is worth repeating; every Minimax coder needs to balance the accuracy of the evaluation function with its runtime. With games like Go that simply don't have any efficient enough nor accurate enough evaluation function, Minimax-based algorithms fall short

After reading all those cons, don't start thinking that all Minimax-based algorithms are awful—they aren't. Minimax is very well understood and perfected, and ways have been invented to improve or even eliminate some of these cons. Moreover, its relatively simple to build a naive Minimax algorithm, and you can check out my [blog post on using Minimax for Gomoku (Connect Five)][minimax for gomoku post] for more information and some sample functions for Gomoku

### What is It?

Now that you have a basic understanding of your alternatives (which may be completely valid options), it's time to finally tell you what the heck the Monte Carlo tree search is, and then why you might want to use it.

First, let's touch up on the [Monte Carlo method][monte carlo wiki]—a method largely used in mathematics that estimates solutions to problems with completely random samples. In order to understand this a bit better, you can see [how the Monte Carlo method can be used to approximate PI][mc pi], or read [this well-written article][beej mc] that sheds some light at how Monte Carlo could potentially be used for games.

The Monte Carlo tree search is quite different (and far better) than the pure Monte Carlo aforementioned article—as you may guess, the Monte Carlo *tree search* requires the construction of a **tree**, and the ability to search through it; it requires a [**search tree**][search tree wiki]. Instead of simply running random simulations from the current board position, it uses the results of the simulations to generate a search tree, and then runs simulations from the leafs of the tree, propagating the results through the tree.

I'll be explaining more on the specifics and how to make it later in the article, so don't worry if you don't completely get it yet.

### Why use it?

**Pros of the Monte Carlo tree search:**

1. **Variable runtime**—the Monte Carlo tree search can run for *however long you want it to*. This is **huge!** Since the algorithm is essentially a loop running simulations, it can be cut off any time! This makes it **laughably easy** to specify for how long the AI should run—very useful if you want the user to be able to choose how much time to give the AI to 'think'. Of course it plays better when given more time to run since it can run more simulations, increasing the size of its search tree
2. Can be **cut off in the middle**—unlike the previous algorithms discussed, the Monte Carlo tree search can be very easily cut off in the middle
3. **Reusable tree**—the nodes in the algorithm's generated search tree typically cover all of your opponent's possible moves, and can all be valid tree roots. This means that when a new move is played, all previous calculations made by the algorithm for the corresponding node still apply, and the corresponding subtree functions as the new tree. If that didn't make sense, either read [this wiki page on trees][wiki trees] or just understand that calculations made in previous moves can be used in future moves
4. **Easy pondering**—while this can essentially be derived from the previous points, it's worth reiterating. This algorithm can be easily made to run while the opponent is thinking, so that it can play better while thinking less on its own turn.
5. Very **easy to code**—similarly to Depth/Breadth-first search, this algorithm requires minimal game-specific functions—namely getting children from a specific board position and running a random (or pseudo-random) simulation from a given position. Don't get me wrong, there are much more complex implementations using heavy [deep learning][deep learning wiki] and [machine learning][machine learning wiki]  extensions, or using [neural networks][neural networks wiki] for evaluations, but these are not necessary for a pure Monte Carlo implementation.
6. **No need** for an **evaluation function**—adding on to the last point, this game only needs to know if the game is over, and if so, who won; it places weights by itself on positions. In some games (like Ultimate Tic Tac Toe), where good heuristic evaluation functions are very difficult to create, Monte Carlo thrives.
7. **Immense room** for **improvement**—not only is this algorithm amazing, it has the potential to improve to heights that nobody has seen before! Note my wording however—unlike Minimax, many of these powerful improvements are *anything but easy*.

**Cons:**

1. **Harder** to **understand conceptually**—without any formal education in this field, you'll find a surprising **lack of** Monte Carlo tree search **implementation examples** or tutorials. It took me a few good hours to fully understand the concept.
2. **Not best** for **all cases**—while this algorithm should be able to play any game well, games with a simpler evaluation function (like chess) are ultimately better and faster solved using traditional minimax approaches.

The Monte Carlo tree search has been used to create truly remarkable game AIs, from various [Go AIs][computer go wiki] including [Google DeepMind's AlphaGo][alphago page] Go-playing program, and simple yet powerful game AIs such as my own [Connect Four][my connect four] and [Ultimate Tic Tac Toe/Anti-Ultimate Tic Tac Toe][my uttt] AIs!

### How it's made

First of all, gain a basic understanding of search trees (you can use [Wikipedia][search tree wiki] to help out). Next. read the first part of the [wiki page][monte carlo ts wiki] explaining it to get a basic conceptual understanding. Now, let's go through the steps one-by-one, assuming you understand the fundamentals of search trees (using JavaScript as an example, but it should be easy to transfer to any language):

First, let's create a generic object to represent a node:

{% highlight javascript %}
var MCTS_Node = function(State, parent) {
  this.State = State; // The current state of the board
  this.parent = parent;

  // As explained in the wiki, the hits, misses, and total tries
  // are used in the algorithm
  this.hits = 0;
  this.misses = 0;
  this.total_tries = 0;
};

/**
  * In order to be as generic as possible,
  * I moved the current state of the board
  * to its own class.
  **/
var State = function(board, turn) {
  this.board = board;
  this.last_move;
  this.turn = turn;
};
{% endhighlight %}

That was the easy part. Now, we need to create the backbone of the algorithm, the part that chooses which child node to run a simulation with:

{% highlight javascript %}
/** This function propagates to a leaf node and runs
  * a simulation at it.
  **/
MCTS_Node.prototype.choose_child = function() {

  // If the node doesn't have children defined yet,
  // create them (the get_children function will be
  // game specific.
  if (!this.children)
    this.children = get_children(this.State, this);

  // If the node is a leaf node, run a simulation
  // at it and back-propogate the results
  if (this.children.length === 0)
    this.run_simulation();

  else {
    // Get all the unexplored children (if any)
    let unexplored = [];
    for (let i = 0; i < this.children.length; i++)
      if (this.children[i].total_tries === 0)
        unexplored.push(this.children[i]);

    // If there are any unexplored children,
    // pick one at random and run with it.
    if (unexplored.length > 0)
      unexplored[Math.floor(Math.random() * unexplored.length)].run_simulation();
    else {

     // Find the best child (using the wiki-described
     // algorithm that I'll demo later) and recursively
     // call this function in it.
      let best_child = this.children[0], best_potential = child_potential(this, this.children[0]), potential;
      for (let i = 1; i < this.children.length; i++) {
        potential = child_potential(this, this.children[i]);
        if (potential > best_potential) {
          best_potential = potential;
          best_child = this.children[i];
        }
      }
      best_child.choose_child();
    }
  }
};
{% endhighlight %}

You might notice that this function calls a few functions that weren't mentioned yet, but you'll probably have some kind of understanding of them having read the wiki article. I'll start by covering the simplest one first. If you notice a lack of explanation here, that's because this is nearly identical to Wikipedia's [exploration vs exploitation section][wiki exploration vs exploitation]:

{% highlight javascript %}
/** This function returns the 'child potential'
  * for any given node, following the Wikipedia
  * "exploration and exploitation" principle.
  **/
function child_potential(parent, child) {
  /** Assuming that the turn changes with every
    * move, the number of wins should be child.misses
    * (the number of times the opponent/next player
    * loses). However, I noticed that this works better
    * if also the wins are taken into account. For the
    * pure implementation, let w = child.misses;
    **/
  let w = child.misses - child.hits;
  let n = child.total_tries;
  var c = Math.sqrt(2); // This constant is typically found empirically
  var t = parent.total_tries;

  return w / n  +  c * Math.sqrt(Math.log(t) / n);
};
{% endhighlight %}

While we're at it, let's get done with the very simple and generic algorithms first:

{% highlight javascript %}
/** Run the simulation at the current board state,
  * and then back propagate the results to the
  * root of the tree.
  **/
MCTS_Node.prototype.run_simulation = function() {
  this.back_propagate(simulate(this.State));
};

MCTS_Node.prototype.back_propagate = function(simulation) {
  if (simulation > 0)
    this.hits++;
  else if (simulation < 0)
    this.misses++;
  this.total_tries++;

  /** Assuming that the previous turn was by the opponent,
    * flip the signs of the simulation result while back
    * propagating. If it wasn't, then leave the sign of
    * the simulation the same.
    **/
  if (this.parent)
    this.parent.back_propagate(-simulation);
};
{% endhighlight %}

Now that the framework is done, let's get to the more game-specific functions. Let's start with the function that gets all the possible children of a given position:

{% highlight javascript %}
// Returns all the possible moves from a given state
function get_possible_moves(state) {
  let possible_moves = [];

  // Assuming a 2d board

  for (let i = 0; i < state.board.length; i++)
    for (let a = 0; a < state.board[i].length; a++)

      // legal_move returns true if the move is legal
      // with the given state.
      if (legal_move(state, [i, a]))
        possible_moves.push([i, a]);
  return possible_moves;
}

function get_children(state, parent) {
  let temp_board = state.board.slice(0),
    turn = state.turn,
    possible_moves = get_possible_moves(state),
    possible_children = new Array(possible_moves.length);

  for (let i = 0; i < possible_children.length; i++) {
    temp_board = play_move(temp_board, possible_moves[i]);

    possible_children[i] = new MCTS_Node(new State(temp_board, !turn, possible_moves[i]), parent);

    temp_board = state.board.slice(0);
  }

  return possible_children;

  /** In other words, return an array of all possible
    * children nodes from the given position.
    **/
}
{% endhighlight %}

Assuming you got that, let's move on to the random simulation function:

{% highlight javascript %}
// I found this easiest to implement with an
// initializing function calling a recursive function,
// to avoid overriding the original state.
function simulate(state) {
  let temp_state = JSON.parse(JSON.stringify(state)),
    possible_moves = get_possible_moves(temp_state);

  // Using the same play_move function as used in the
  // get_children function, advance the board position.
  temp_state.board = play_move(temp_state.board, possible_moves[Math.floor(Math.random() * possible_moves.length)]);

  // Assuming the other player plays next...
  temp_state.turn = !temp_state.turn;

  // Starts simulating a game recursively with a random move.
  return simulate_game(temp_state, temp_state.turn);
}

function simulate_recursive(temp_state, initial_turn) {

  // Return the result of the game if it is over.
  if (game_over(temp_state))
    // If the winner is the player that the simulation started on,
    // great. If not, flip the result to match.
    return game_result(temp_state) * (temp_state.turn === initial_turn ? 1:-1);

  let possible_moves = get_possible_moves(temp_state);

  temp_state.board = play_move(temp_state.board, possible_moves[Math.floor(Math.random() * possible_moves.length)]);
  temp_state.turn = !temp_state.turn;

  return simulate_recursive(temp_state, initial_turn);
}
{% endhighlight %}

And last but not least (after you finishing coding all the game-specific helper methods), you need a function to create the root node. That's refreshingly simple:

{% highlight javascript %}
function create_MCTS_root() {
  return new MCTS_Node(new State(board, global_turn, null), null);
}
{% endhighlight %}

And you're done! If you want any more help, you can check out [my github game JavaScript folder] to view my Mancala, Connect Four, and Ultimate Tic Tac Toe implementations, or simply comment below!

Let me know if I should clear up anything!

[my uttt]:http://www.theofekfoundation.org/games/UltimateTicTacToe "my ultimate tic tac toe ai"
[my connect four]:http://www.theofekfoundation.org/games/ConnectFour "my connect four ai"
[monte carlo ts wiki]:https://en.wikipedia.org/wiki/Monte_Carlo_tree_search "monte carlo tree search wiki"
[uttt math with bad drawings]:https://mathwithbaddrawings.com/2013/06/16/ultimate-tic-tac-toe/ "game rules and explanation"
[dfs post]:{{site.baseurl}}/artificial%20intelligence/2015/12/10/tic-tac-toe-ai-with-depth-first-search.html "depth-first search post"
[bfs wiki]:https://en.wikipedia.org/wiki/Breadth-first_search "breadth-first search wiki"
[minimax wiki]:https://en.wikipedia.org/wiki/Minimax "minimax wiki"
[minimax improvements post]:{{site.baseurl}}/artificial%20intelligence/2015/12/18/minimax-improvements.html "minimax improvements post"
[heuristic evaluation function wiki]:https://en.wikipedia.org/wiki/Evaluation_function "heuristic evaluation function wiki"
[go wiki]:https://en.wikipedia.org/wiki/Go_(game) "go (weiqi) wiki"
[minimax for gomoku post]:{{site.baseurl}}/artificial%20intelligence/2015/12/11/minimax-for-gomoku-connect-five.html "minimax for gomoku post"
[monte carlo wiki]:https://en.wikipedia.org/wiki/Monte_Carlo_method "monte carlo method wiki"
[mc pi]:https://curiosity-driven.org/pi-approximation "monte carlo pi approximation"
[beej mc]:http://beej.us/blog/data/monte-carlo-method-game-ai/ "monte carlo for games article"
[search tree wiki]:https://en.wikipedia.org/wiki/Search_tree "search tree wiki"
[wiki trees]:https://en.wikipedia.org/wiki/Tree_(data_structure)#Terminologies_used_in_Trees "tree data structure wiki"
[deep learning wiki]:https://en.wikipedia.org/wiki/Deep_learning "deep learning wiki"
[machine learning wiki]:https://en.wikipedia.org/wiki/Machine_learning "machine learning wiki"
[neural networks wiki]:https://en.wikipedia.org/wiki/Artificial_neural_network "neural networks wiki"
[computer go wiki]:https://en.wikipedia.org/wiki/Computer_Go "computer go wiki"
[alphago page]:https://deepmind.com/alpha-go "official alphago site"
[wiki exploration vs exploitation]:https://en.wikipedia.org/wiki/Monte_Carlo_tree_search#Exploration_and_exploitation "wiki exploration vs exploitation"
[my github game JavaScript folder]:https://github.com/The-Ofek-Foundation/theofekfoundation.org/tree/master/static/assets/javascript/games "my github game javascript folder"