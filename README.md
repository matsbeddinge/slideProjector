SlideProjector
==============

This is a small and simple gallery/slideshow jQuery-plugin.

Installation
============
1. Clone or zip the files from the archive.
2. Put the js-file on your webb server at place of your own choice and link to it from your html-page by normal script tag. 
Remember that you need jQuery installed and that you have to have jQuery loaded before you load this plugin.
3. The two png images must be put in the root of your webb installation.
4. Put your images for the gallery within wrapping tags of your own choice, i.e <div id='gallery'><img src='aa.jpg'>......<img src='xx.jpg'></div>
5. In your own script you then simply call the plugin: $('#gallery').slideProjector();   

Options
=======
You can make some adjustments to the style of the gallery:
- width of gallery ('width'), number(px).
- height of gallery ('height'), number(px).
- background color of gallery ('bgcolor'), string(hex code).
- time for animation when swaping slides ('swaptime'), number(ms).
- time for showing each picture in auto slideshow ('slidetime'), number(ms).

Add the options as an object literal such as following:
$('#gallery').slideProjector('swaptime':400, 'slidetime':3000, 'bgcolor':'#011249', 'width': 600, 'height':400}); 