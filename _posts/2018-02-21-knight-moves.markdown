---
title: Knight Moves
category: general-computer-programming
subcategory: programming-challenges
layout: post
custom-style: true
custom-script: true
---

I recently came across a simple coding problem: What's the fewest number of moves it would take to move a chess knight from any single point on an n-dimensional board to any other point. The original problem asked to find a recursive solution, but that would take an unreasonable amount of time for large boards. In this blog post I'll walk you through solutions for the problem starting with ``O(n)`` complexity, but quickly progressing to ``O(log(n))`` and even **``O(1)``** complexities.

## Working **O(1)** Demo

**Click on the coordinates below to edit them, and see the answer change before your eyes!**

If the knight is at (<input type="number" name="startx" min="0" step="1" value="0" onkeydown="dynamicWidth(this, event,);" onkeyup="dynamicWidth(this, event, 0);" onchange="dynamicWidth(this, event, 0, true);">, <input type="number" name="starty" min="0" step="1" value="0" onkeydown="dynamicWidth(this, event,);" onkeyup="dynamicWidth(this, event, 0);" onchange="dynamicWidth(this, event, 0, true);">) and is heading to (<input type="number" name="endx" min="0" step="1" value="0" onkeydown="dynamicWidth(this, event,);" onkeyup="dynamicWidth(this, event, 0);" onchange="dynamicWidth(this, event, 0, true);">, <input type="number" name="endy" min="0" step="1" value="0" onkeydown="dynamicWidth(this, event,);" onkeyup="dynamicWidth(this, event, 0);" onchange="dynamicWidth(this, event, 0, true);">), then the it would take the knight **<span id="answer-span">0</span> move/s** to get to their destination.

Disclaimers: This demo assumes that the board is at least 5x5, and that the only corner location is at ``(0, 0)``. The numbers are limited but javascript's number limit.


## Base Concept

![radius 2 knight moves]
*Animation showing distance 2 solutions*

First of all, let's equip ourselves with some tools that we can use to tackle this problem. I'm going to split this up into two problems:

1. How many moves does it take to a distance of 2 squares from the destination?
2. Once getting to that square, how many moves will it take to get to the exact destination?

The second problem is very simple to answer. Note that there is a caveat that I will get back to later, but for now just go along with it. Anyways, it is simple to map the 6 unique squares within a distance of 2 from the destination to a number of knight moves.

* (0, 0) -> 0 moves (already at the destination)
* (0, 1) -> 3 moves
* (1, 1) -> 2 moves (unless destination is a corner square, in which case it's 4 moves)
* (0, 2) -> 2 moves
* (2, 1) -> 1 move
* (2, 2) -> 4 moves

See the **animation above** for a visual of the solutions, or the animation below showing the special case where the destination is at the corner and the knight starts in the (1, 1) square.

![knight move special case]
*Special corner case variant*


## Creating an **O(n)** Iterative Solution

Let's start with a very simple iterative solution to implement the first problem&mdash;finding how many moves it would take to get to a distance of 2 squares from the destination.

First off, let's pick a good representation of where the knight is relative to its destination. To get to a distance of 2, the absolute locations of the start and end points don't matter, only their relative locations. This means that getting from (7, 6) to a distance of 2 from (2, 1) should take the same number of steps as getting from (5, 5) to a distance of 2 from (0, 0).

This can clearly be seen in the animations below (the pawn square represents a distance of 2).

![trans sim 1]
![trans sim 2]

In addition to the above translational symmetry, there is also a rotational symmetry. This can be seen below, with knights going from (1, 6) -> (8, 2), and the other going from (6, 1) -> (2, 8) (swapping the axes).

![rot sim 2]
![rot sim 1]

Furthermore, it is important to note that the relative distance from the destination that the knights end up in in both cases is similar, for the first two cases it ended up 2 units away in both the x and y location, and in the second set of positions it ended up 1 unit away in both x and y location. These symmetries can be exploited to simplify the code a bit.

The first symmetry allows us to disregard the absolute positions and only use the relative distances (dx and dy), such that:

{% gist 0be6a644a5b8d3d86505920b7108be07 %}

The second symmetry can be exploited by treating the dx the same as dy. For conveniences' sake, I prefer that ``dx >= dy``, and I can freely swap the two without losing accuracy.

{% gist 4cd3f8548b94145832c7703cc2a2605b %}


The final piece of the puzzle is realizing that in any possible position, the move that moves the knight closer to this square is the move where it jumps two spaces towards its greater displacement, and one space towards the smaller displacement. This means that if its displacement

[radius 2 knight moves]:{{site.baseurl}}/assets/images/radius2knightmoves.gif "radius 2 knight moves"

[knight move special case]:{{site.baseurl}}/assets/images/knightmoveexception.gif "knight move special case"

[trans sim 1]:{{site.baseurl}}/assets/images/transsim1.gif "knight translational symmetry example"

[trans sim 2]:{{site.baseurl}}/assets/images/transsim2.gif "knight translational symmetry example"

[rot sim 1]:{{site.baseurl}}/assets/images/rotsim1.gif "knight rotational symmetry example"

[rot sim 2]:{{site.baseurl}}/assets/images/rotsim2.gif "knight rotational symmetry example"


