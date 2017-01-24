---
title: Advanced Java
category: general-computer-programming
subcategory: java
---

## Advanced Java

So you just took the AP Java test, or you're a programmer switching to Java, or you just love programming in Java, and you're looking for some interesting nuances, syntax, built-in libraries, that you can easily take advantage of, and allow you to do amazing things. You've come to the right place. Here are some easy to learn and easy to use features of the Java language that you might not have known about.

#### The Ternary Operator
You might already have heard of this, but it isn't generally taught in Computer Science curriculums, so I thought I'd put it here just in case.
{% gist 8b27ff8806625d6d4669e93ab7e0185d %}
For more information, check [the wiki][ternary operator wiki] out!

#### Labeled **<tt>break</tt>** Statements
Did you ever want to leave two levels of loops, without a it looking convoluted and ugly?
{% gist 6bad2ee156e32a03e75dfdb41e3df522 %}
For another example, and an example with a labeled **<tt>continue</tt>** statement, visit [this website][labeled statements example].

#### The **<tt>finally</tt>** Block
The **<tt>finally</tt>** block after a **<tt>try</tt>** block is *always* called (except with a <code>System.exit(...);</code>).
{% gist d51dd576ebb7306b7a187fc7375973b7 %}
For more information on the **<tt>try-catch-finally</tt>** block, check out the [documentation][finally documentation].

#### **<tt>enum</tt>**s
You have probably heard about the **<tt>enum</tt>** datatype, but did you know that they can have their own pseudo-classes?
{% gist 5e81d3e26f6e8a84d48dbc7086926581 %}
For another cool example with planets, check [this link][oracle enum] out!

#### Custom Annotations
You probably already know of the <code>@Override</code> annotation, but did you know you could also make (and use) your own?
{% gist b6c7c56751e0e0ef3d6746cdbb0312bf %}
For more examples, see [this][annotation examples] or [this][oracle custom annotations]. To learn how to actually process annotations and their values using reflection, see [this article][annotation reflection].

#### The Robot Class
This class allows you to interact with the computer to a whole new level. You can see the screen, control the mouse, press keys, and much more!
{% gist eb6ee34fe5e30289ddaeb522504e7507 %}
For a neat lesson about the Robot Class, check out [this tutorial][robot class tutorial].

#### Multithreading
You might have already known this, but Java runs on its own virtual machine, and has a pretty cool threading system. It's pretty self-explanatory, so I'll whip up a quick example to add up the numbers from 1 to n using multithreading.
{% gist e0ae09d4f3f99b9e3f46ec3e3ecdf7ce %}
If that didn't make sense, feel free to contact me, or look at [this article][multithreading example]—albeit in Allman style formatting.

#### Lambda Functions
Ever since Java 8, Java has had lambda functions implemented, using the -> operator.
{% gist 2d2b65586aedddc421d322f06bef51fe %}
If you think that's pretty cool (and useful), be sure to check out [another example][lambda function example] or a [more in-depth explanation][oracle lambda function].

#### Reflection
I already touched on this before in the custom annotations section, but reflection allows your program to parse methods, classes, and other members of programs. [Oracle's tutorial][oracle reflection tutorial] covers this very well, so I'll just include a quick snippet into what's possible.
{% gist ee377b0cd35f412b22bd5097bb13c3c5 %}

#### Dynamic Typing
Last but not least, I can't make a post about cool Java features without including dynamic typing. It's possible to parse JavaScript natively using Java. This is so bizarre, and I can't think of any practical use for this, but enjoy nonetheless.
{% gist 7655756d8756df91baa5e27d8e206465 %}
You can read all about this scripting API [here][oracle java scripting api].


### The End
Well, that's the show folks, I hope you learned about at least one new feature of the Java language! If you have any lurking questions about these features, or want any more features to be covered, contact me—either by email or in the comment section below!

[ternary operator wiki]:https://en.wikipedia.org/wiki/%3F:#Java "ternary operator wiki"
[labeled statements example]:http://www.java2s.com/Tutorial/Java/0080__Statement-Control/TheLabeledbreakStatement.htm "example of labeled statements"
[finally documentation]:https://docs.oracle.com/javase/tutorial/essential/exceptions/finally.html "finally block documentation"
[oracle enum]:https://docs.oracle.com/javase/tutorial/java/javaOO/enum.html "oracle enum page"
[annotation examples]:http://www.javatpoint.com/custom-annotation "custom annotation examples"
[oracle custom annotations]:http://www.oracle.com/technetwork/articles/hunter-meta-2-098036.html "oracle custom annotation examples"
[annotation reflection]:https://keyholesoftware.com/2014/09/15/java-annotations-using-reflection/ "process annotations using reflection"
[robot class tutorial]:http://www.developer.com/java/other/article.php/3077871/Demonstrating-Java-Programs-using-the-Robot-Class.htm "robot class tutorial"
[multithreading example]:http://beginnersbook.com/2013/03/multithreading-in-java/ "multithreading example"
[lambda function example]:https://www.tutorialspoint.com/java8/java8_lambda_expressions.htm "lambda expressions example"
[oracle lambda function]:https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html "oracle lambda expression explanation"
[oracle reflection tutorial]:http://www.oracle.com/technetwork/articles/java/javareflection-1536171.html "oracle reflection tutorial"
[oracle java scripting api]:https://docs.oracle.com/javase/8/docs/technotes/guides/scripting/prog_guide/api.html "oracle java scripting api"
