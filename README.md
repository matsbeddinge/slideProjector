SlideProjector
==============

This is a small and simple gallery/slideshow jQuery-plugin.

Installation
============
1. Clone or zip the files from the github archive.
2. Place the js-file in a directory on your webb server and link to it from your html-page by a normal script tag. 
You need to have jQuery installed and loaded before this plugin.
3. The two png images must be placed in the root of your webb installation.
4. Place images for the gallery within wrapping tags of your own choice like &lt;div id="gallery"&gt;
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