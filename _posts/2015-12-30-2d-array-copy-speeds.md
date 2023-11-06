---
title: 2D Array Copy Speeds
category: general-computer-programming
subcategory: efficiency
layout: post
---

## Preface

When creating [my AI for Connect Four][My Connect Four AI] using the [Monte Carlo tree search][MCTS wiki] algorithm, I needed to create and store a huge tree. Each node needed to contain its own state of the board in order to be able to run simulations with it. For more information about the specifics of the tree search, find it on [Wikipedia][MCTS wiki]. The states of the board needed to be independent of each other, so I needed to [deep copy][deep copy wiki] the board 2D array, not [shallow copy][shallow copy wiki]. Using jQuery extend or JSON.stringify with JSON.parse is simply too slow. **There are much more efficient methods to copy 2D arrays.**

## Methods

You can test the speeds of these methods below.

**EDIT:** Sorry, my spoon count for this blog is incredible, I skipped the easiest way to copy, just creating a new array with equal dimensions and populating it with the previous array. As an example:
{% gist 9e993389d8bab4ce906be46fe569a34a %}

**1. jQuery extend**

  jQuery provides its own way to deep copy objects that can be applied to arrays as follows:
  {% gist f50e6958ecbbaf6822f836dabd7a8cf7 %}
  When applied to a Monte Carlo tree search, each node will contain a 2D representation of the state of the board, and will be deep copied as a 2D array for use in future nodes.

**2. JSON stringify + parse**

  You can also deep copy an array by converting it to a JSON object and then parsing it.
  {% gist ebfa6fbcda1192807cad5de2da70f251 %}
  For Monte Carlo tree search, each node will create the JSON representation of the board (as a string), and will parse it when it needs to be accessed. While this method is slower, it is much more space efficient.

**3. Converting to a 1D array and then back to 2D**

  By converting to a 1D array and then back to a 2D array, the array is deep copied. This can be achieved by:
  {% gist d9e9bd72a826a5560a9a3a36ded50fc3 %}
  ***Note that this example is specifically for a standard 7 by 6 Connect Four board. It is impossible to convert an array from 1D to 2D without knowing the length the 2D array should have.***

  For MCTS, each node will store a 1D representation of the board that will be converted to 2D when it is being accessed. This is around as memory efficient as storing the arrays as JSON strings, but significantly faster—as you will see below.

**4. Game-specific storage**

  At the end of the day, I am doing this for game AIs. A common theme in game AIs is that usually the generic algorithms aren't the best—game-specific functions will work better. For Connect Four, this means storing the position of the game as a string that contains the history of moves in the game with numbers corresponding to columns. For example, a position of "441" would mean that the 1st player played in the 4th column, the 2nd played on top of it, and the the 1st played in the 1st column. Such a string can be converted to a board as so (with 0 being empty, 1 being 1st player, and 2 being 2nd player):
  {% gist 68128d9895ec3968cf16c5a2d20335bd %}
  This can then be used to deep copy as so:
  {% gist 1aff11176f5c83d4ec01da8fbf4071a2 %}
  given the position.

  As you may have guessed, the MCTS would simply contain strings of the position that can be converted to boards. This method is much more space efficient than storing as JSON or 1D arrays, and is significantly faster when the board is not heavily filled. *This method becomes slower as the game goes on—slightly slower than a 1D array*—but for Connect Four the thinking in the start of the game is more important making this method preferable.

## Speed Tests

Now for the moment you have all been waiting for—the speed tests! Generate 1000 new Connect Four boards and use each method to deep copy the boards. Each method will have a limited amount of time to try to copy as much as it can. It is worth mentioning that these boards are a maximum of 25 moves into the game.

Edit: In an effort to remove jQuery from me website, the speed tests have been moved to [jsperf][jsperf speed tests] instead. Sorry for the inconvenience.

**Thanks for reading, and *never use jQuery to deep copy!!!***

[My Connect Four AI]:www.theofekfoundation.org/games/ConnectFour "my connect four ai"
[MCTS wiki]:https://en.wikipedia.org/wiki/Monte_Carlo_tree_search "monte carlo tree search wikipedia"
[deep copy wiki]:https://en.wikipedia.org/wiki/Object_copying#Deep_copy "deep copy wikipedia"
[shallow copy wiki]:https://en.wikipedia.org/wiki/Object_copying#Shallow_copy "shallow copy wikipedia"
[code for tests]:{{site.baseurl}}/assets/{{page.title}}.js
[jsperf speed tests]:https://jsperf.com/2d-array-hard-copy-speeds/1 "jsperf speed tests"
