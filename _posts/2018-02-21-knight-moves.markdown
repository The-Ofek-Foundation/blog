---
title: Knight Moves
category: general-computer-programming
subcategory: programming-challenges
layout: post
custom-style: true
custom-script: true
mathjax: true
---

I recently came across a simple coding problem: What's the fewest number of moves it would take to move a chess knight from any single point on an n-dimensional board to any other point. The original problem asked to find a recursive solution, but that would take an unreasonable amount of time for large boards. In this blog post I'll walk you through two solutions for the problem, an ``O(n)`` complexity iterative solution, and then an **``O(1)``** mathematic solution.

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
* (1, 0) -> 3 moves
* (1, 1) -> 2 moves (or 4 moves if in corner)
* (2, 0) -> 2 moves
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


The final piece of the puzzle is realizing that in any possible position, the move that moves the knight closer to this square is the move where it jumps two spaces towards its greater displacement, and one space towards the smaller displacement. This means that if its displacement in x is greater than its displacement in y, it should make a larger jump in the x direction. Since we're defining dx to be >= dy, then it can always make jumps in the dx direction, as long as we maintain that dx >= dy (by continually swapping).

This trivializes the solution to this:

{% gist c2cfd5c1f92f0d32bf697cbeaf955385 %}

Note how in every case the knight makes a legal move, either (dx - 2, dy - 1) or (dx - 2, dy + 1), where both are moving 2 units in one direction, and 1 unit in the other.

Now, we just need to implement the 6 initial positions that we solved before, and we're done... right?

Well... not exactly.

Look at the below two diagrams in order to understand the possible error:

![1 0 error]
![1 0 good]

In the left diagram, the knight moves into the distance 2 square, and then uses the optimal solution for that point, resulting in 4 moves. However, as shown in the right diagram, if the knight had decided to enter the distance 2 square from another location, it would be able to reach the destination in just 2 moves. This also holds true for one of the other possible moves, shown below:

![2 2 bad]
![2 2 good]


![2 2 good2]
![2 2 good3]


The top left diagram shows one possible situation where the (2, 2) move could be entered into, describing a path with 5 moves. However, similar to the last example, the top right diagram shows an optimal solution that avoids the (2, 2) point, taking 3 moves instead. This situation is a bit trickier, however, since there are two other unique situations that could lead to the (2, 2) point. However, as shown in the bottom two diagrams, the optimal moves for these two situations also conveniently take 3 moves.

What this means, in essence, is that any more that would lead into the (1, 0) or the (2, 2) squares from the outside could have picked a better path that would save it 2 moves in total. Therefore, unless the knight initially started in the (2, 2) or (1, 0) squares, if it landed in any of those two squares, you should *remove 2 moves from your count*.

With this in mind, let's update our table:

* (0, 0) -> 0 moves (already at the destination)
* (1, 0) -> 3 moves, **or only 1 move if not the first move**
* (1, 1) -> 2 moves (or 4 moves if in corner)
* (2, 0) -> 2 moves
* (2, 1) -> 1 move
* (2, 2) -> 4 moves, **or only 2 moves if not the first move**

While we're at it, the whole (1, 1) corner conundrum can also be avoided if it isn't the first move, see the below diagram:

![1 1 bad]
![1 1 good]

As you can see, the first diagram heads into the (1, 1) square even though the destination is a corner, and it takes 5 moves. However, as you see from the right diagram, the knight could've picked another path that takes only 3 moves. Since this also saves 2 moves, the only situation where the (1, 1) spot effectively takes 4 moves instead of two is if the knight starts there in its first move. Therefore, the (1, 1) slot in the table can be amended as follows:

* (1, 1) -> 2 moves (or 4 moves if in corner **and first move**)

This allows us to finally write a complete function that determines how many moves to add from the distance 2 square:

{% gist 15cbc2973bdadac8733a0b85b01a9ed4 %}

Note that the above function doesn't handle the (1, 1) first move problem&mdash; since this function only takes dx and dy, it doesn't know the initial locations. Therefore, this problem must be addressed elsewhere.


If you understand all of the above, we're now ready to solve the whole problem:

{% gist ecc62ab019cfc7dc37d855a83fcd5c8b %}

Feel free to copy the above code into a text editor and test it out for yourselves!

## Creating an **O(1)** Mathematical Solution

This solution uses the same line of approach as the last one, except that it overrides iteration by using some relatively simple mathematics. Note that the second phase (finding out how many moves it takes from the 5x5 square to the destination) is implemented in the same way.

First, let's represent the knights moves with variables to be used in mathematics.

* **dx**: The greater displacement component between start & end points
* **dy**: The lesser displacement component
* **nx**: The number of knight moves primarily in the ``dx`` direction (moving 2 units towards ``dx`` and 1 unit toward ``dy``, like a knight)
* **ny**: The number of knight moves in the ``dy`` direction

Here is my proposal for solving the problem:

1. Calculate the minimum ``ny`` necessary
2. Use that ``ny`` to find the minimum ``nx`` necessary
3. Use the ``nx`` and ``ny`` values to find the position the knight will be after moving
4. Use the previous solutions' algorithm to figure out how many moves to add to the end

To do this, we need to set up a series of inequalities. In the x direction, we know that after moving ``nx`` moves in the x direction and ``ny`` moves in the y (and x) direction, the ``dx`` will be between 0 and 2. Since we know that it's not possible to jump directly into the 0 point (0, 0), then we can exclude 0, so $$0 \lt dx_f \le 2$$.

Putting this in equation form, you get:

$$dx_f = dx - 2nx - ny\\0 \lt dx - 2nx - ny \le 2$$

In the y direction, however, it doesn't necessarily need to move at all&mdash; think (100, 0). Its ``nx`` will be large (49, to be exact), but its $$dy_f$$ won't be -49. Since we don't know its lower bound, the equation form looks like this:


$$ dy_f \ge dy - 2ny - nx\\dy - 2ny - nx \le 2$$

Now, looking at our outline, we need to solve for the minimum possible ``ny``.

$$
\begin{align*}
	0 \lt dx - 2nx - ny &\le 2\\\\
	dy - 2ny - nx &\le 2 && \text{Let's solve for nx}\\
	dy - 2ny - 2 &\le nx && \text{subtract 2 and add nx}\\\\
	0 &\lt dx - 2 \times (dy - 2ny - 2) - ny && \text{substitute into 1st equation}\\
	dx - 2dy + 4ny + 4 -ny &\gt 0 && \text{expand parentheses}\\
	dx - 2dy + 3ny &\gt -4 && \text{combine like terms}\\
	3ny &\gt 2dy - dx - 4 && \text{isolate ny}\\
	ny &\gt \frac{2dy - dx - 4}{3}\\
	ny &\gt \left\lfloor\frac{2dy - dx - 4}{3}\right\rfloor && \text{take floor to make into an integer}\\
	ny &\ge \left\lfloor\frac{2dy - dx - 4}{3}\right\rfloor + 1 && \text{add 1 and change inequality}\\
	ny &\ge \left\lfloor\frac{2dy - 2d - 1}{3}\right\rfloor && \text{algebraic fiddling}
\end{align*}
$$

Using a little bit of algebra, we managed to deduce that $$ny \ge \left\lfloor\frac{2dy - 2d - 1}{3}\right\rfloor$$. This solves step 1, since the minimum ``ny`` necessary is $$\left\lfloor\frac{2dy - 2d - 1}{3}\right\rfloor$$. Note that if the above value is negative, then $$ny = 0$$.

Now we want to use that value of ``ny`` to find ``nx`` in a similar algebraic fashion.

$$
\begin{align*}
	0 \lt dx - 2nx - ny &\le 2 && \text{same equation as last time}\\
	-2 \le -dx + 2nx + ny &\lt 0 && \text{multiply by -1}\\
	dx - ny - 2 \le 2nx &\lt dx - ny && \text{isolate nx}\\
	\frac{dx - ny - 2}{2} \le nx &\lt \frac{dx - ny}{2}\\
	\frac{dx - ny - 2}{2} \le \frac{dx - ny - 1}{2} &\lt \frac{dx - ny}{2} && \text{insert expression that fits}\\
	nx &= \left\lfloor\frac{dx - ny - 1}{2}\right\rfloor && \text{use floor because ≤ on left side}\\
\end{align*}
$$

That wasn't too bad! Now that we have both ``nx`` and ``ny``, the next step is to find the final position the knight will be in. That's super simple!

$$
\begin{align*}
	dx_f &= dx - 2nx - ny\\
	dy_f &= (dy - 2ny - nx)\mod(2) && \text{the mathematical mod handles negative y values}\\
\end{align*}
$$

The last phase is already done for us from the iterative solution, so we can just combine them all together as so:

{% gist 126c2c28dc011b124a97541b30550c84 %}

And that's it! A relatively simple, mathematical solution for this problem! Feel free to test it out to your heart's desire and let me know if you have any questions!

***But wait... there's more...?***
If any of you decided to look at the source code for the ``O(1)`` demo above, you would notice that the algorithm over there looks a bit weird (and in javascript). Keep tuned for the next post, but as a teaser I'll leave you with this different, fully working, ``O(1)`` solution for the problem in python. See if you understand how it works!

{% gist e2e19254a7398ba1731b654f6d629786 %}


[radius 2 knight moves]:{{site.baseurl}}/assets/images/radius2knightmoves.gif "radius 2 knight moves"

[knight move special case]:{{site.baseurl}}/assets/images/knightmoveexception.gif "knight move special case"

[trans sim 1]:{{site.baseurl}}/assets/images/transsim1.gif "knight translational symmetry example"

[trans sim 2]:{{site.baseurl}}/assets/images/transsim2.gif "knight translational symmetry example"

[rot sim 1]:{{site.baseurl}}/assets/images/rotsim1.gif "knight rotational symmetry example"

[rot sim 2]:{{site.baseurl}}/assets/images/rotsim2.gif "knight rotational symmetry example"

[1 0 error]:{{site.baseurl}}/assets/images/10error.gif "suboptimal knight path"

[1 0 good]:{{site.baseurl}}/assets/images/10good.gif "optimal knight path"


[2 2 bad]:{{site.baseurl}}/assets/images/22bad.gif "suboptimal knight path"

[2 2 good]:{{site.baseurl}}/assets/images/22good.gif "optimal knight path"

[2 2 good2]:{{site.baseurl}}/assets/images/22good2.gif "optimal knight path 2"
[2 2 good3]:{{site.baseurl}}/assets/images/22good3.gif "optimal knight path 3"

[1 1 bad]:{{site.baseurl}}/assets/images/11bad.gif "suboptimal knight path"

[1 1 good]:{{site.baseurl}}/assets/images/11good.gif "optimal knight path"

