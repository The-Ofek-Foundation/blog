---
layout: default
title: How I Created ChromeDash
category: google-development
subcategory: extensions
new-tab-redirect: true
comments: true
custom-script: true
custom-style: true
custom-style-rel: chrome-webstore-item
custom-style-src: https://chrome.google.com/webstore/detail/bbpiealmmbiefhppikadopbljoppcnoa
---

## How I Created ChromeDash

### Preface

I built a [chrome extension (ChromeDash)][my extension] a week ago that allows the user to alias specific words with others, so that while they type online it will automatically switch what they type with the aliases. This was made with the intention to be able to type special characters conveniently in normal chats—including [en and em-dashes][wiki dashes], [greek characters][wiki greek], [accents][wiki accents], and other symbols in general. For example, --- could be be replace with an em-dash (—), or \alpha with α, a' with á, etc. The idea is: *instead of constantly copy pasting special symbols or switching between keyboard settings, there'd be a way to type any key with ease.* I built this extension because—to my surprise—**there was no convenient way to alias words like this anywhere online.**

### How to Create a Chrome Extension

I'm not going to go too much into this because it is [well-documented][chrome extension documentation], and there are [many online tutorials][chrome extension tutorials]. However, I should probably note that if you want your website to be hosted in the [Chrome Web Store], **you will need to pay $5 to create a google developer account.**

### How to Detect Aliases and Replace the Text

The most basic functionality of a word or string aliaser is the ability to detect when the user types an alias, and to replace what they wrote with the alias. Doing this can be broken down into four parts:

1. **Finding the Element that the User is Typing in**

  While this may seem trivial—and it sometimes is, it may be considerably harder in professional websites. You always start with **event.target** in your document.onkeydown. However, sometimes **this is misleading**, since the element returned in event.target (or document.activeElement) may be some *parent* of the true element in specific websites. For example, in facebook, event.target returns a parent that is the parent of the parent of the parent of the parent of the real element. What you end up having to do is to **find the lowest child of the element found in event.target.**

2. **Getting the Text from the Element**

    The elements found in the previous step can typically be split into two categories: Those with a .value attribute, and those without it. Those with it—such as inputs and textareas—are easy to deal with, as you can just get the string using the element.value (element.val() with jQuery). Those without it—such as editable divs and spans—usually hold the text in the inner html, so you can use element.innerHTML (element.text() with jQuery) to extract the String.

3. **Detecting the Alias from the Last Key Pressed**

  In the event listener—document.onkeypress or $(document).keypress for jQuery—with every key that is pressed, extract the corresponding letter. This can be down as follows:

{% highlight javascript %}
document.onkeypress = function(event) {
  event = event || window.event;
    var charCode = event.keyCode || event.which;
    var charString = String.fromCharCode(charCode);
    ...
}{% endhighlight %}

Now you must check if you the letter typed would complete an alias. To do this, **you must find the index of the caret.** This can be done for inputs and textareas as shown [here][get caret position value], and for others as shown [here][get caret position]. Save a local variable with the text of the element plus the letter that was just typed in the caret index. Then iterate through your list of aliases and check if any alias matches the corresponding substring of the current text.

For example, if your string was "Hello_Ofek! what is up?" with the caret right after Ofek, and you wanted to check if the alias "cookie" was just typed, you would compare "cookie" with "o_Ofek" for equality.

Here's a quick sample of the flow:

{% highlight javascript %}
document.onkeypress = function(event) {
  ...
    var curr_index = doGetCaretPosition(active_element);
    var next_str = current_string.substring(0, curr_index) + charString + current_string.substring(curr_index);
    var matching_alias = get_matching_alias(next_str, curr_index + 1); // adding one to take into account that you just added a letter
    ...
}{% endhighlight %}

4. **Replacing the Alias in the Element**

After you find the alias, replace the text in the string with that of the alias, update the content of the element, prevent the pressed character from being added to the new string and set the new caret position. Setting a a caret position can be done like [this][set caret position value] for inputs and textareas, and like [this][set caret position] for others. Here is an example of how to do that:

{% highlight javascript %}
document.onkeypress = function(event) {
  ...
    matching_alias = ...
    aliases_to = ...
    current_str = current_str.substring(0, curr_index - matching_alias.length - 1) + aliases_to + current_str.substring(curr_index);
  set_text_in_element{active_element, current_str);
    setCaretPosition(active_element, curr_index + aliases_to.length - matching_alias.length - 1);
}{% endhighlight %}

### Problems with the Extension

1. **Websites that Block Content Scripts**

    This is pretty self-explanitory. Some websites simply block content scripts from running, so the extension cannot load.

2. **Editable Divs**

    Many websites that use editable divs also save the content of the websites on the cloud. Each time the user types a character, it updates the text on the cloud. Therefore, there may be no specific element that stores the text to target with the script.

Feel free to add the extension to chrome if you're interested! <button id="add-extension">Add to Chrome</button>


[my extension]:https://chrome.google.com/webstore/detail/chromedash/bbpiealmmbiefhppikadopbljoppcnoa "ChromeDash chrome extension"
[wiki dashes]:https://en.wikipedia.org/wiki/Dashes "dashes wikipedia"
[wiki greek]:https://en.wikipedia.org/wiki/Greek_alphabet "greek alphabet wikipedia"
[wiki accents]:https://en.wikipedia.org/wiki/Diacritic
[chrome extension documentation]:https://developer.chrome.com/extensions/getstarted "create a chrome extension documentation"
[chrome extension tutorials]:https://www.google.com/search?q=how+to+create+a+chrome+extension&rlz=1C1CHWL_enUS662US662&oq=how+to+create+a+chrome+extension&aqs=chrome..69i57j69i64.5326j0j7&sourceid=chrome&es_sm=122&ie=UTF-8# "google search with tutorials"
[Chrome Web Store]:https://chrome.google.com/webstore/category/apps "the chrome web store"
[get caret position value]:http://stackoverflow.com/questions/2897155/get-cursor-position-in-characters-within-a-text-input-field "get caret position for elements with .value"
[get caret position]:http://stackoverflow.com/questions/3972014/get-caret-position-in-contenteditable-div "get caret position for elements without .value"
[set caret position value]:http://stackoverflow.com/questions/512528/set-cursor-position-in-html-textbox "set caret position for elements with .value"
[set caret position]:http://stackoverflow.com/questions/12441410/javascript-select-text-range-from-contenteditable-div "set caret position for elements without .value"