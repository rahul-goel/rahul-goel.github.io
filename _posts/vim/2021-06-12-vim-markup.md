---
layout: post
title: "Markup Formatting using gq"
date: 2021-06-12
categories: vim
---

It had been such a pain to format lines when I was writing Latex/Markdown/HTML.  Since single line breaks are ignored, we can write all that we have to in a single line or multple lines. Writing in a single line always makes it tough to read later in a text editor. Since sentences are broken in between words and you have to move your eyes all across the screen. And if you want to use multiple lines, it is tough to decide where to break the lines manually. If you follow the 79 character limit, it is again hard to keep track of the characters.

But with the `gq` family of commands in vim, now I write everything in a single line and then run the `gqq` key bind to autoformat the text into multiple lines. One can also write in any haphazard manner in multiple lines and then visually select them and run `gq` to format them again. By default it follows the 79 character limit but it can be changed in the vimrc.

It is a command every Vim user should use to simplify writing markup text anywhere.

Below is this blog written in markdown in Vim - first without the formatting and then with the formatting.

<div>
<pre id='vimCodeElement'>
<span id="L1" class="LineNr">1 </span><span class="Special">#</span><span class="Title"> Markup Formatting using </span><span class="Special">`</span>gq<span class="Special">`</span>
<span id="L2" class="LineNr">2 </span>
<span id="L3" class="LineNr">3 </span>It had been such a pain to format lines when I was writing Latex/Markdown/HTML.  Since single line breaks are ignored, we can write all that we have to in a single line or multple lines. Writing in a single line always makes it tough to read later in a text editor. Since sentences are broken in between words and you have to move your eyes all across the screen. And if you want to use multiple lines, it is tough to decide where to break the lines manually. If you follow the 79 character limit, it is again hard to keep track of the characters.
<span id="L4" class="LineNr">4 </span>
<span id="L5" class="LineNr">5 </span>But with the <span class="Special">`</span>gq<span class="Special">`</span> family of commands in vim, now I write everything in a single line and then run the <span class="Special">`</span>gqq<span class="Special">`</span> key bind to autoformat the text into multiple lines. One can also write in any haphazard manner in multiple lines and then visually select them and run <span class="Special">`</span>gq<span class="Special">`</span> to format them again. By default it follows the 79 character limit but it can be changed in the vimrc.
<span id="L6" class="LineNr">6 </span>
<span id="L7" class="LineNr">7 </span>It is a command every Vim user should use to simplify writing markup text anywhere.
<span id="L8" class="LineNr">8 </span>
<span id="L9" class="LineNr">9 </span>Below is this same blog written in Vim
</pre>

<pre id='vimCodeElement'>
<span id="L1" class="LineNr"> 1 </span><span class="Special">#</span><span class="Title"> Markup Formatting using </span><span class="Special">`</span>gq<span class="Special">`</span>
<span id="L2" class="LineNr"> 2 </span>
<span id="L3" class="LineNr"> 3 </span>It had been such a pain to format lines when I was writing Latex/Markdown/HTML.
<span id="L4" class="LineNr"> 4 </span>Since single line breaks are ignored, we can write all that we have to in a
<span id="L5" class="LineNr"> 5 </span>single line or multple lines. Writing in a single line always makes it tough to
<span id="L6" class="LineNr"> 6 </span>read later in a text editor. Since sentences are broken in between words and
<span id="L7" class="LineNr"> 7 </span>you have to move your eyes all across the screen. And if you want to use
<span id="L8" class="LineNr"> 8 </span>multiple lines, it is tough to decide where to break the lines manually. If you
<span id="L9" class="LineNr"> 9 </span>follow the 79 character limit, it is again hard to keep track of the
<span id="L10" class="LineNr">10 </span>characters.
<span id="L11" class="LineNr">11 </span>
<span id="L12" class="LineNr">12 </span>But with the <span class="Special">`</span>gq<span class="Special">`</span> family of commands in vim, now I write everything in a single
<span id="L13" class="LineNr">13 </span>line and then run the <span class="Special">`</span>gqq<span class="Special">`</span> key bind to autoformat the text into multiple
<span id="L14" class="LineNr">14 </span>lines. One can also write in any haphazard manner in multiple lines and then
<span id="L15" class="LineNr">15 </span>visually select them and run <span class="Special">`</span>gq<span class="Special">`</span> to format them again. By default it follows
<span id="L16" class="LineNr">16 </span>the 79 character limit but it can be changed in the vimrc.
<span id="L17" class="LineNr">17 </span>
<span id="L18" class="LineNr">18 </span>It is a command every Vim user should use to simplify writing markup text anywhere.
</pre>
</div>
