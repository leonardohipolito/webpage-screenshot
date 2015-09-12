# webpage-screenshot

Webpage Screenshot Mockup Generator for Blog

### The Idea

To create a webpage screenshot generater with a Google Chrome browser-like frame mockup to be used as a web screenshot image in a blog post or website content.

### Note

I have to use PHP cURL due to limitation in [html2canvas](http://html2canvas.hertzen.com/documentation.html) where all the images that the script uses need to reside under the [same origin](http://en.wikipedia.org/wiki/Same_origin_policy) for it to be able to read them without the assistance of a proxy.

### App Workflow

1. User inserts a webpage URL.
2. OR user uploads a webpage screenshot image.
3. A webpage screenshot image is generated in the Google Chrome browser-like frame mockup.
4. OR A webpage screenshot image is previewed in the Google Chrome browser-like frame mockup.
5. A big button appears in the below to download a new generated webpage screenshot image which covers together with the Google Chrome browser-like frame mockup.

### TODO

* [x] Google Chrome browser-like frame mockup as the screenshot wrapper.
* [x] Control to input a webpage URL for automatic screenshot generation.
* [ ] Create self-hosted web screenshot service. Currently using `http://s.wordpress.com/mshots/v1/` with image width `?w=1200`.
* [ ] OR looking for better web screenshot API service?
* [x] Generate/preview web screenshot in the Google Chrome browser-like frame mockup.
* [x] Upload web screenshot and preview in the Google Chrome browser-like frame mockup.
* [ ] A big button for download new generated screenshot with the Google Chrome browser-like frame mockup.
* [x] **Module for generating a new screenshot image with the Google Chrome browser-like frame mockup which able to select particular `div` element in the HTML DOM.**
* [x] Output new screenshot image in `PNG` format.

### Project Status

In progress.

### License

MIT License
