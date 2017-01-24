---
title: Advanced Java
category: general-computer-programming
subcategory: java
---

## Advanced Java

So you just took the AP Java test, or you're a programmer switching to Java, or you just love programming in Java, and you're looking for some interesting nuances, syntax, built-in libraries, that you can easily take advantage of, and allow you to do amazing things. You've come to the right place. Here are some easy to learn and easy to use features of the Java language that you might not have known about.

#### The Ternary Operator
You might already have heard of this, but it isn't generally taught in Computer Science curriculums, so I thought I'd put it here just in case.
```java
// Compact if/else with ? and :
boolean bool = condition ? true:false;

int i = 7 < 9 ? -5:14; // i = -5
String str = "hello".equals("hi") ? "same":"different";
	// str = "different"

someFunction(i > 5 ? str:str + "loko");
	// calls someFunction with "differentloko"
```
For more information, check [the wiki][ternary operator wiki] out!

#### Labeled **<tt>break</tt>** Statements
Did you ever want to leave two levels of loops, without a it looking convoluted and ugly?
```java
// Java's vestige of the goto statement
// break out of nested blocks

// without labeled breaks
boolean exit = false;
for (int i = 0; i < arr.length; i++) {
	for (int a = 0; a < arr[i].length; a++)
		if (...) {
			exit = true;
			break;
		}
	if (exit)
		break;
}

// with labeled breaks
exitlabel: // name this whatever you want
for (int i = 0; i < arr.length; i++)
	for (int a = 0; a < arr[i].length; a++)
		if (...)
			break exitlabel; // continues after nested loops

```
For another example, and an example with a labeled **<tt>continue</tt>** statement, visit [this website][labeled statements example].

#### The **<tt>finally</tt>** Block
The **<tt>finally</tt>** block after a **<tt>try</tt>** block is *always* called (except with a <code>System.exit(...);</code>).
```java
String nullStr = null;
try {
	System.out.println("Try Block");
	nullStr.equals("hello");
	System.out.println("After Exception");
} catch (NullPointerException e) {
	System.out.println("Catch Block");
	return;
} finally {
	System.out.println("Finally Block");
}
System.out.println("After Block");
/*
 * Outputs:
 * Try Block
 * Catch Block
 * Finally Block
 *
 * Note how the "After Block" is skipped (because of the return),
 * but the "Finally Block" isn't!
 */
```
For more information on the **<tt>try-catch-finally</tt>** block, check out the [documentation][finally documentation].

#### **<tt>enum</tt>**s
You have probably heard about the **<tt>enum</tt>** datatype, but did you know that they can have their own pseudo-classes?
```java
public enum WEEKDAY {
	SUNDAY(1, 50), MONDAY(2), TUESDAY(3, 1),
	WEDNESDAY(4, 2), THURSDAY(5, 5), FRIDAY(6, 10),
	SATURDAY(7, 100);

	public static final int WEEK_LENGTH = 7;
	private final int dayNumber;
	private final int awesomenessValue;

	WEEKDAY(int dayNumber, int awesomenessValue) {
		this.dayNumber = dayNumber;
		this.awesomenessValue = awesomenessValue;
	}

	WEEKDAY(int dayNumber) {
		this(dayNumber, 0);
	}

	int awesomenessRatio() {
		return awesomenessValue / dayNumber;
	}
}
...
WEEKDAY today = WEEKDAY.MONDAY;
int ratio = today.awesomenessRatio(); // ratio = 0

switch (today) { // switch statements work with enums!
	case SUNDAY: // note: don't put WEEKDAY.SUNDAY
		System.out.println("Enjoy the weekend while it lasts...");
		break;
	case MONDAY: // this will be called
		System.out.println("Tough Luck :/");
		break;
	...
}
```
For another cool example with planets, check [this link][oracle enum] out!

#### Custom Annotations
You probably already know of the <code>@Override</code> annotation, but did you know you could also make (and use) your own?
```java
// Declaration
public @interface CustomAnnotation {
	int intValue();
	int stringValue();
	int doubleValueWithDefault() default 14d;
}

// Usage
@CustomAnnotation(intValue=7, stringValue="hello")
/*
 * Some declaration/initialization goes here, eg:
 * private int i;
 * public static String str = "123";
 * public void goodbye() {
 *
 * Or even:
 * @interface OtherCustomAnnotation {}
 */
```
For more examples, see [this][annotation examples] or [this][oracle custom annotations]. To learn how to actually process annotations and their values using reflection, see [this article][annotation reflection].

#### The Robot Class
This class allows you to interact with the computer to a whole new level. You can see the screen, control the mouse, press keys, and much more!

```java
import java.awt.Robot;
import java.awt.image.BufferedImage;
import java.awt.Rectangle;
import java.awt.Toolkit;
import java.awt.event.InputEvent;
import java.awt.event.KeyEvent;

...

Robot robot = new Robot();

/* See the screen (as a BufferedImage) */
BufferedImage image = new Robot().createScreenCapture(new Rectangle(Toolkit.getDefaultToolkit().getScreenSize()));

/* Controlling the mouse */
robot.mouseMove(x, y);
	// where x and y are screen coordinates
robot.mousePress(InputEvent.BUTTON1_MASK);
	// BUTTON1, 2, and 3, correspond to left, center, and right mouse buttons
robot.mouseRelease(InputEvent.BUTTON1_MASK);

/* Pressing keys */
robot.keyPress(KeyEvent.VK_O);
	// Presses the 'o' key
	// For caps, press VK_SHIFT beforehand, and then release afterwards
	// robot.keyRelease(KeyEvent.VK_SHIFT);

/* Other useful stuff */
robot.delay(timeInMilliseconds); // Kinda like a Thread.sleep(...) for Robot
```
For a neat lesson about the Robot Class, check out [this tutorial][robot class tutorial].

#### Multithreading
You might have already known this, but Java runs on its own virtual machine, and has a pretty cool threading system. It's pretty self-explanatory, so I'll whip up a quick example to add up the numbers from 1 to n using multithreading.

```java
public class ForgottenGauss {

	private AddingThread[] addingThreads;
	private int sumTo;
	private int threadsReturned;
	private long totalSum;

	private double startTime;

	public ForgottenGauss(int sumTo, int numThreads) {
		this.sumTo = sumTo;
		addingThreads = new AddingThread[numThreads];
			// can be more than the real # of threads on your computer
		threadsReturned = 0;
		totalSum = 0l;

		/* Initializing the threads */
		int currentNum = 1;
		for (int i = 0; i < addingThreads.length; i++) {
			// Distributes even # of numbers to sum in each thread
			addingThreads[i] = new AddingThread(this, currentNum,
				(sumTo - currentNum) / (addingThreads.length - i));
			currentNum += (sumTo - currentNum) / (addingThreads.length - i);
		}
	}

	public static void main(String... pumpkins) {
		ForgottenGauss fG = new ForgottenGauss(
			Integer.parseInt(pumpkins[0]) + 1, Integer.parseInt(pumpkins[1]));
		fG.runThreads();
	}

	public void runThreads() {
		startTime = System.nanoTime();

		for (AddingThread addingThread : addingThreads)
			addingThread.start();
	}

	public synchronized void doneAdding(long sum) {
		totalSum += sum;
		threadsReturned++;

		if (threadsReturned == addingThreads.length) {
			// All the threads have returned
			double endTime = System.nanoTime();
			double elapsedTime = (endTime - startTime) / 1E9;
			System.out.printf("The sum was found as %,.0f in %f seconds.\n",
				(float)totalSum, elapsedTime);
		}
	}
}

class AddingThread extends Thread {

	private ForgottenGauss runner;
	private int startNum, numbersToAdd;

	private Thread thread;

	public AddingThread(ForgottenGauss runner, int startNum, int numbersToAdd) {
		this.runner = runner; // Instance of class that called this
		this.startNum = startNum;
		this.numbersToAdd = numbersToAdd;
	}

	/**
	 * Starts thread following convention.
	 */
	public void start() {
		if (thread == null) {
			thread = new Thread(this, "Thread Starting From: " + startNum);
				// Put your thread name there ^^ (some unique identifier)
			thread.start();
		}
	}

	public void run() {
		long sum = 0;
		for (int i = 0; i < numbersToAdd; i++)
			sum += (long)(startNum + i);
		runner.doneAdding(sum);
	}
}
```
If that didn't make sense, feel free to contact me, or look at [this article][multithreading example]—albeit in Allman style formatting.

#### Lambda Functions
Ever since Java 8, Java has had lambda functions implemented, using the -> operator. 

```java
public class TestLambdas {

	interface StringParser {
		String parseString(String str);
	}

	public static void main(String... pumpkins) {
		StringParser sayHello = (String name) -> "Heya " + name;

		StringParser formatString = (String str) ->
			String.format("%s is loko", str);

		StringParser reverseString = (String str) -> {
			String temp = "";
			for (char c : str.toCharArray())
				temp = c + temp;
			return temp;
		};

		printParsedString(sayHello, "ofekih"); // Heya ofekih
		printParsedString(formatString, "Joey"); // Joey is loko
		printParsedString(reverseString, "A man, a plan, a canal, Panama.");
			// .amanaP ,lanac a ,nalp a ,nam A
		printParsedString((String str) -> "Inline works too. " + str,
			"Thanks, I didn't know that!");
			// Inline works too. Thanks, I didn't know that!
	}

	public static void printParsedString(StringParser parser, String str) {
		System.out.println(parser.parseString(str));
	}
}
```
If you think that's pretty cool (and useful), be sure to check out [another example][lambda function example] or a [more in-depth explanation][oracle lambda function].

#### Reflection
I already touched on this before in the custom annotations section, but reflection allows your program to parse methods, classes, and other members of programs. [Oracle's tutorial][oracle reflection tutorial] covers this very well, so I'll just include a quick snippet into what's possible.

```java
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
...
Object obj = new Object();
Class c = obj.getClass();

for (Method method : c.getDeclaredMethods())
	if (Modifier.isPublic(method.getModifiers()) &&
		method.getParameterCount() == 0)
		runMethod(method);
...
public void runMethod(Method method) {
	try {
		method.invoke(this);
	} catch (InvocationTargetException | IllegalAccessException ie) {
		ie.printStackTrace();
	}
}
```

#### Dynamic Typing
Last but not least, I can't make a post about cool Java features without including dynamic typing. It's possible to parse JavaScript natively using Java. This is so bizarre, and I can't think of any practical use for this, but enjoy nonetheless.

```java
import javax.script.ScriptEngineManager;
import javax.script.ScriptEngine;
import javax.script.ScriptException;

import java.util.Scanner;

public class JavaJavaScript {

	public static void main(String... pumpkins) {
		ScriptEngineManager manager = new ScriptEngineManager();
		ScriptEngine engine = manager.getEngineByName("nashorn");

		try {
			engine.eval("print('Heya ofekih, start typing JavaScript!')");
			while (1 == 1)
				engine.eval(new Scanner(System.in).nextLine());
		} catch (ScriptException se) {
			se.printStackTrace();
		}
	}
}
```
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
