---
layout: default
title: 2D Array Copy Speeds
category: General Computer Programming
subcategory: Efficiency
new-tab-redirect: true
comments: true
custom-script: true
---

## {{page.title}}

### Preface

When creating [my AI for Connect Four][My Connect Four AI] using the [Monte Carlo tree search][MCTS wiki] algorithm, I needed to create and store a huge tree. Each node needed to contain its own state of the board in order to be able to run simulations with it. For more information about the specifics of the tree search, find it on [Wikipedia][MCTS wiki]. The states of the board needed to be independent of each other, so I needed to [deep copy][deep copy wiki] the board 2D array, not [shallow copy][shallow copy wiki]. Using jQuery extend or JSON.stringify with JSON.parse is simply too slow. **There are much more efficient methods to copy 2D arrays.**

### Methods

You can test the speeds of these methods below.

**1. jQuery extend**

  jQuery provides its own way to deep copy objects that can be applied to arrays as follows:

  {% highlight javascript %}
  $.extend(true, [], array);{% endhighlight %}

  When applied to a Monte Carlo tree search, each node will contain a 2D representation of the state of the board, and will be deep copied as a 2D array for use in future nodes.

**2. JSON stringify + parse**

  You can also deep copy an array by converting it to a JSON object and then parsing it.

  {% highlight javascript %}
  JSON.parse(JSON.stringify(array));{% endhighlight %}

  For Monte Carlo tree search, each node will create the JSON representation of the board (as a string), and will parse it when it needs to be accessed. While this method is slower, it is much more space efficient.

**3. Converting to a 1D array and then back to 2D**

  By converting to a 1D array and then back to a 2D array, the array is deep copied. This can be achieved by:

  {% highlight javascript %}
  oned_to_twod(twod_to_oned(array));

  function oned_to_twod(oned) {
    var twod = new Array(7);
    for (var i = 0; i < 7; i++)
      twod[i] = oned.slice(i * 6, (i + 1) * 7);
    return twod;
  }

  function twod_to_oned(twod) {
    var oned = new Array(twod.length * twod[0].length);
    for (var i = 0; i < oned.length; i++)
      oned[i] = twod[i / twod[0].length | 0][i % twod[0].length];
    return oned;
  }{% endhighlight %}

  ***Note that this example is specifically for a standard 7 by 6 Connect Four board. It is impossible to convert an array from 1D to 2D without knowing the length the 2D array should have.***

  For MCTS, each node will store a 1D representation of the board that will be converted to 2D when it is being accessed. This is around as memory efficient as storing the arrays as JSON strings, but significantly faster—as you will see below.

**4. Game-specific storage**

  At the end of the day, I am doing this for game AIs. A common theme in game AIs is that usually the generic algorithms aren't the best—game-specific functions will work better. For Connect Four, this means storing the positionition of the game as a string that contains the history of moves in the game with numbers corresponding to columns. For example, a positionition of "441" would mean that the 1st player played in the 4th column, the 2nd played on top of it, and the the 1st played in the 1st column. Such a string can be converted to a board as so (with 0 being empty, 1 being 1st player, and 2 being 2nd player):

  {% highlight javascript %}
  function reconstruct(position) {
    var board = new Array(7);
    var i, a, col;
    for (i = 0; i < 7; i++) {
      board[i] = new Array(6);
      for (a = 0; a < 6; a++)
        board[i][a] = 0;
    }
    for (i = 0; i < position.length; i++) {
      col = +position.charAt(i);
      for (a = 6; a >= 0; a--)
        if (board[col][a] === 0) {
          board[col][a] = i % 2 === 0 ? 1:2;
          break;
        }
    }
    return boards;
  }{% endhighlight %}

  This can then be used to deep copy as so:

  {% highlight javascript %}
  reconstruct(position);{% endhighlight %}given the position.

  As you may have guessed, the MCTS would simply contain strings of the position that can be converted to boards. This method is much more space efficient than storing as JSON or 1D arrays, and is significantly faster when the board is not heavily filled. *This method becomes slower as the game goes on—slightly slower than a 1D array*—but for Connect Four the thinking in the start of the game is more important making this method preferable.

### Speed Tests

Now for the moment you have all been waiting for—the speed tests! Generate 1000 new Connect Four boards and use each method to deep copy the boards. Each method will have a limited amount of time to try to copy as much as it can. It is worth mentioning that these boards are a maximum of 25 moves into the game.

<button onclick="generate_boards()">Generate New Boards</button> <input id="generate-text" readonly>
<br />
<br />
<button onclick="test_all()">Test Copy Speeds </button>
<br />
<div id="jQuery-extend-time">jQuery Copies: </div>
<div id="JSON-time">JSON Copies: </div>
<div id="dimension-change-time">Dimension Change Copies: </div>
<div id="reconstruct-time">Reconstruction Copies: </div>

<br />

The exact code for these tests can be found [here][code for tests].

**Thanks for reading, and *never use jQuery to deep copy!!!***

[My Connect Four AI]:www.theofekfoundation.org/games/ConnectFour "my connect four ai"
[MCTS wiki]:https://en.wikipedia.org/wiki/Monte_Carlo_tree_search "monte carlo tree search wikipedia"
[deep copy wiki]:https://en.wikipedia.org/wiki/Object_copying#Deep_copy "deep copy wikipedia"
[shallow copy wiki]:https://en.wikipedia.org/wiki/Object_copying#Shallow_copy "shallow copy wikipedia"
[code for tests]:{{site.baseurl}}/assets/{{page.title}}.js