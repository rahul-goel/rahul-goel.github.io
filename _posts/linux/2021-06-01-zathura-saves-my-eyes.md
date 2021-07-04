---
layout: post
title: "Zathura Saves My Eyes"
date: 2021-06-01
categories: linux
---

Zathura is a document viewer and I use it to view PDFs. Until now, I was using
the default inverted color mode (called recolor in zathura). It basically
flipped black to white and white to black. It was dark mode but the contrast
was so high that it still hurt my eyes. I wanted a dark mode with a dark
greyish background and a pale-brownish white foreground color.

And it was just one search away. Basically I only have to set the
`recolor-darkcolor` and `recolor-lightcolor` values and done. I used the two
gruvbox colors for the document and changed a the colors of the statusbar,
inputbar and completion bar too to gruvbox. So easy on eyes. Such a huge
relief. It was only one search away. I could have done it before and saved
myself from a lot of strain I guess.

Anyway here is my zathurrc as of now.
```
set sandbox none
set statusbar-h-padding 0
set statusbar-v-padding 0
set page-padding 1
set selection-clipboard clipboard

set default-bg "#555555"

set recolor-keephue
set recolor-lightcolor "#282828"
set recolor-darkcolor "#ebdbb2"

set statusbar-bg "#282828"
set statusbar-fg "#8ec07c"
set completion-bg "#282828"
set completion-fg "#8ec07c"
set completion-highlight-bg "#add8e6"
set inputbar-bg "#282828"
set inputbar-fg "#8ec07c"

map u scroll half-up
map d scroll half-down
map D toggle_page_mode
map r reload
map R rotate
map K zoom in
map J zoom out
map i recolor
map p print
```
