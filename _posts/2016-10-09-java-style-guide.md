---
title: Java Style Guide
category: general-computer-programming
subcategory: java
layout: post
---


A majority of these styles are based off [Google's Java Style Guide][google java style guide], although many preferences are different. This style guide also largely agrees with [Mr. Greenstein's style guide][greenstein style guide], with a notable exception of indentation convention (use tabs, not spaces). This style guide also includes much more detail.

## Source File
**No wildcard imports**. Other than that, order the statements however you think makes the most sense. Empty lines between imports to separate similar statements are okay. You can even place comments here if you feel it is necessary (more on comments later).
{% gist fd77420962eef5f6da1d7f294794d265 %}
**One top-level class per file**. Nested classes are okay, but other than that, each class should be in its own .java file. If you're finding it hard to switch between files, considering using a more competent text editor (I recommend sublimetext).

Class names should be in UpperCamelCase.

## Formatting

### Braces
If braces are optional, their placement is optional. If you think that the body of the statement may increase in the future, place them, if they help clear confusion, place them, but if it is more concise without them, don't place them.

```java
/* This is ok */
if (condition()) {
	if (somethingElse()) {
		doSomething();
	}
} else {
	/* condition failed */
}

/* This is also ok */
if (condition()) {
	if (somethingElse())
		doSomething();
} else {
	/* condition failed */
}

/* and even this is ok */
if (condition())
	if (somethingElse())
		doSomething();
	else;
else {
	/* condition failed */
}
```

Avoid doing the second two unless you know what you are doing. My personal preferred method in this case would be the second option.

**Brace Placement:** [Egyptian Style Brackets][coding jargon] for non-empty blocks.

 * Line break after opening brace
 * Line break before closing brace
 * Line break after closing brace,  except with if-else or if-else-if statements

Don't do:
```java
public class MyClass
{
	public MyClass()
	{
		/* do something */
	}

	public void test(boolean condition)
	{
		if (condition)
		{
			/* do something */
		}
		else
		{
			/* do something else */
		}
	}
}
```
Instead, do:
```java
public class MyClass {

	public MyClass() {
		/* do something */
	}

	public void test(boolean condition) {
		if (condition) {
			/* do something */
		} else {
			/* do something else */
		}
	}
}
```

With empty blocks:

1. Whenever possible, end with semicolon.
2. If not possible (classes. methods, try-catch-finally), end with open and close braces.

For example:
```java
private void doSomething() {
	for (...);
	while (...);
	if (...);
	else /* do something */
}

private void doNothing() {}
```
Only use empty loops if they help legibility, avoid over-complicating.

Line-wrap where it makes sense (don't have super-long lines, but there is no clear formula for knowing when to break).

### Indentation

**Tabs for indentation, spaces for alignment.** There is no debate.

Yes, tabs can look different for different people, but that's one of the pros of tabs. If some else likes using 8 spaces per tab and I prefer 4 we can both use tabs and define tab size differently with our text editors. Wouldn't that mess up alignment? No! Indentation has nothing to do with alignment. You align elements within the same indentation level, so both will have the same amount of tabs and different amounts of spaces.

**Note:** Markdown doesn't support tabs in formatted code, so assume that the blocks were indented with tabs :/

For example:
```java
public class doSomething() {
	/* indented block (with tab) */

	/* variables aligned with spaces */
	int    candies = 5;
	String cookies = "I love cookies, cookies are the best";

	/* Array aligned with tabs for indentation and spaces for alignment */
	double[][] randomNumbers = new double[][] {
	         {5f  , 6.7     , 9.4 },
	         {3.4 , 16.74545, 19.8},
	         {2.03, 16.6    , 12.7}
	};
}
```
For more information, read [this article][tabs vs spaces].

### Whitespace
In this section I particularly agree with (and copy from) [Google's Java Style Guides][google java style whitespace], although there are some slight modifications I make. All credit goes to them, however.

#### Vertical Whitespace

A single blank line appears:

1. Between consecutive members (or initializers) of a class: fields, constructors, methods, nested classes, static initializers, instance initializers.
 * Exception: A blank line between two consecutive fields (having no other code between them) is optional. Such blank lines are used as needed to create logical groupings of fields.
 * Exception: Enums are weird, there's no strict conventions with them.
2. Between statements, as needed to organize the code into logical subsections.
3. Optionally before the first member or after the last member of the class (neither encouraged nor discouraged).

#### Horizontal Whitespace
Beyond where required by the language or other style rules, and apart from literals, comments and Javadoc, a single ASCII space also appears in the following places only:

1. Separating any reserved word, such as if, for or catch, from an open parenthesis (() that follows it on that line
2. Separating any reserved word, such as else or catch, from a closing curly brace (&#125;) that precedes it on that line
3. Before any open curly brace (&#123;), with two exceptions:
 * @SomeAnnotation(&#123;a, b&#125;) (no space is used)
 * String[][] x = &#123;&#123;"foo"&#125;&#125;; (no space is required between &#123;&#123;, by item 8 below)
4. On both sides of any binary or ternary operator. This also applies to the following "operator-like" symbols:
 * the ampersand in a conjunctive type bound: &lt;T extends Foo & Bar&gt;
 * the pipe for a catch block that handles multiple exceptions: catch (FooException | BarException e)
 * the colon (:) in an enhanced for ("foreach") statement, but optional in the ? ternary operator
  * condition ? true:false and condition ? true : false are both acceptable.
 * the arrow in a lambda expression: (String str) -> str.length()

 but not:
 * the two colons (::) of a method reference, which is written like Object::toString
 * the dot separator (.), which is written like object.toString()
5. After ,:; or the closing parenthesis ()) of a cast
6. On both sides of the double slash (//) that begins an end-of-line comment. Here, multiple spaces are allowed, but not required.
7. Between the type and variable of a declaration: List&lt;String&gt; list
8. Optional just inside both braces of an array initializer
 * new int[] &#123;5, 6} and new int[] &#123; 5, 6 &#125; are both valid

This rule is never interpreted as requiring or forbidding additional space at the start or end of a line; it addresses only interior space.

#### Horizontal Alignment
Neither required, encouraged, nor discouraged. If you want to horizontally align, do it.
Horizontal alignment is:
```java
/* not horizontally aligned */
private int myInteger;
private String myString;
private BigInteger myBigInteger;

/* horizontally aligned */
private int        myInteger;
private String     myString;
private BigInteger myBigInteger;
```

### Grouping Parenthesis
Use when it helps interpretation.

### Variable Declarations
Global variables should be declared on the top of the class, before the constructor, and initialized in the constructor (except constants, which should be first and initialized in the same line). It is ok to declare multiple global variables on the same line when logical (xCoord, yCoord).

Local variables should be declared near first used, not always on the top of the method.

For example:
```java
public static final double PI = 3.14;
private final int INTEGER_CONSTANT = 18;
private int numThreads;
private double mouseX, mouseY;

public MyClass(int numThreads) {
	this.numThreads = numThreads;
	mouseX = mouseY = 0;
}

public boolean checkDead() {
	boolean test1 = false;
	for (...)
		if (...)
			test1 = true;

	boolean test2 = false;
	for (...)
		if (...)
			test2 = true;

	return test1 || test2;
}
```
Declare arrays with square brackets near the variable type, not the variable name. Initialize arrays however you want.
```java
/* do this */
String[] text = new String[4];

/* don't do this */
String text[] = new String[4];

/* do any of these */
new int[] {           new int[] {
  0, 1, 2, 3            0,
}                       1,
                        2,
new int[] {             3,
  0, 1,               }
  2, 3
}                     new int[]
                          {0, 1, 2, 3}
```
### Switch Statements
End blocks with a break, continue, return, or thrown exception. If you purposely want the code to fall through, mention it with a comment.

If default statements are not required, you may or may not put them. Breaks for them are also not necessary, but recommended.
```java
switch (numDots)	{
	case 6:
		g.fillOval(x1, y2, dotSize, dotSize);
		g.fillOval(x3, y2, dotSize, dotSize);
		/* falls through */
	case 4: case 5:
		g.fillOval(x1, y3, dotSize, dotSize);
		g.fillOval(x3, y1, dotSize, dotSize);
		/* falls through */
	case 2: case 3:
		g.fillOval(x1, y1, dotSize, dotSize);
		g.fillOval(x3, y3, dotSize, dotSize);
		/* falls through */
	case 1:
		if (numDots % 2 == 1)
			g.fillOval(x2, y2, dotSize, dotSize);
		break;
	default: break;
}
```

### Comments
Use /* */ for multiline comments. Use // comments to clear confusion, but on their own line (unless the statement is very simple like basic getters and setters).

Use javadoc comments for all public methods and classes, and for private ones when necessary. Every file should have an initial javadoc comment immediately before the class definition.
```java
/**
 * Finds the factorial of passed num recursively.
 *
 * @param   long num the number to find the factorial for
 * @returns long     the factorial number
 */
public long factorial(long num) {
	if (num <= 1)
		return num;
	// Recursively calls factorial function for num - 1
	return num * factorial(num - 1);
}
```

## Conclusion
The most important use of a styleguide is to make sure that code is formatted and edited consistently in order to promote malleability, teamwork, and sustainability. Even if you don't follow this styleguide completely, at least know what your own preferences are and follow them consistently.

That being said, any code Java made for The Ofek Foundation should be styled according to this style guide since it is objectively superior. If you have any comments, feedback, or concerns, feel free to contact me at ofek@theofekfoundation.org

[google java style guide]:https://google.github.io/styleguide/javaguide.html "google java style guide"
[coding jargon]:http://www.codinghorror.com/blog/2012/07/new-programming-jargon.html "coding jargon"
[tabs vs spaces]:http://lea.verou.me/2012/01/why-tabs-are-clearly-superior/ "tabs and spaces"
[google java style whitespace]:https://google.github.io/styleguide/javaguide.html#s4.6-whitespace "google java style whitespace"
[greenstein style guide]:http://greenstein.com/mvhs/apcs/conventions.php "mr. greenstein's style guide"