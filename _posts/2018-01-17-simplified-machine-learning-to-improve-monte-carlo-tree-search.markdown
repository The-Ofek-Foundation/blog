---
title: Monte Carlo tree-search simplified Machine Learning improvements
category: artificial-intelligence
subcategory: monte-carlo-tree-search
layout: post
---

It's been quite a while since my [last post] where I gave an in-depth explanation as to what the Monte Carlo tree-search is, and why it's useful&mdash;which you should definitely check out if you don't know what it is yet&mdash;so I felt like it's time to update you with some recent progress I've made in significantly improving my ai using pseudo-'machine learning'. Please keep in mind that I am *very hesitant* to call this 'machine learning' because this is not what 'machine learning' typically refers to in today's day and age, but it is, without a doubt, machine learning.

## What is machine learning?

Strictly speaking, Machine Learning gives computers the ability to 'learn' without being explicitly programmed (see [Wikipedia][machine learning wiki page]). And 'learning' is simply expanding one's existing knowledge. So any application that can expand its own knowledge base without being explicitly told how to is&mdash;strictly speaking&mdash;Machine Learning. Now, Machine Learning today often refers to a specific set of methods that can use some more recent and fancy technologies. Let me list a few: **Neural Networks, Supervised Learning, Reinforcement Learning, Convolutional Deep Neural Networks, etc...**, but I'm not going to be discussing those (because frankly, I'm not much more than an interested layman in this field). Instead, I'm going to be sticking to the much much easier and simpler strict application of Machine Learning.

## What am I referring to then?

Recently, I saw [a video][menace video] by [standupmaths][standupmaths youtube channel] that showed how a collection of match boxes was used to beat humans in tic-tac-toe. Please watch their video in order to understand the basic idea&emdash;that by rewarding moves leading to good game outcomes (wins and ties in tic-tac-toe) and punishing losses, the collection of matchboxes would tend to suggest moves that led to better outcomes. This sounded like a very trivial way to improve my pre-existing ai's. Note that while my approach is very similar, it has some key differences.

P.S. If you're interested in a post describing how to implement MENACE in code (along with some major flaws with their implementation), leave a comment below.

## The Method

The method is actually very simple, and can be broken down into two major parts:

1. **Self-play Games:** Simulate games of an existing strong AI against itself, compelling it to vary its moves (as to not always play similar games&mdash;with MCTS this can be done by increasing the expansion constant).

2. **Storing the Data**: Count how many times each outcome occurred in each specific position (win/loss/tie), and then store the data in an easy-to-access manor.

With the Monte Carlo tree-search, the data is used as a substitute for simulating games (instead of simulating a game at a specific game state, find that game state in the data and assume the outcome is the most likely outcome from the self-play games).

Note that the self-play games use previously obtained data.

Yes, that's it! You might be thinking that this is way too simple to be considered 'Machine Learning', and you're right that this is definitely not what the term is used to refer to commonly today, but it is indeed a method that the AI 'learns' without explicitly programming it the ideas. As you leave this program running, it will play better and better and 'learn' new strategies!

## Closing Thoughts

After just a few days of training, given the same amount of simulations, the ai with the data has an 85% win rate over the one without it, and only around an 8% loss rate. If you're interested in seeing my code for implementing this in connect four, check out [my github repository for it][connect four ml github].

If you want to play against my connect four ai using the data, head over to [my connect four game page][connect four game page], head to 'Settings', and click on 'ML File (Optional)' in order to see a popup with the link to download the latest data.

Let me know down in the comments if you have any questions, suggestions, or comments about the post or anything.

Cheers!



[last post]:{{site.baseurl}}/artificial-intelligence/2016/06/27/what-is-the-monte-carlo-tree-search/ "monte carlo tree-search explanation post"

[machine learning wiki page]:https://en.wikipedia.org/wiki/Machine_learning "machine learning wiki page"

[menace video]:https://www.youtube.com/watch?v=R9c-_neaxeU "video about a matchbox ai"

[standupmaths youtube channel]:https://www.youtube.com/channel/UCSju5G2aFaWMqn-_0YBtq5A "standupmaths youtube channel"

[connect four ml github]:https://github.com/The-Ofek-Foundation/ConnectFourMl "connect four ml github"

[connect four game page]:https://www.theofekfoundation.org/games/ConnectFour/ "my connect four game page"

