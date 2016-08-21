# cyberweek2016

**Leeching Streaming Videos With Node.js x-ray and ffmpg**

This is an example of how to use Node.JS with x-ray and FFMPEG to scrap a website and to download its streaming videos.
This specific script is used to download the videos from [The 6th Annual International Cybersecurity Conference](http://video.tau.ac.il/events/index.php?option=com_k2&view=itemlist&task=category&id=1183:the-6th-annual-international-cybersecurity-conference&Itemid=559) but can be used to download similar content with slight modification.


* [Install node.js](https://nodejs.org/en/) simplest is to download the installer for your environment
* [Install ffmpeg](https://www.ffmpeg.org/download.html) On Mac it's easy with homebrew ```brew install ffmpeg```
* Clone this repository
* Run: ```npm install```
* Use like this (this example will download all 14 videos of the BSides event):
```
node app.js "http://video.tau.ac.il/events/index.php?option=com_k2&view=itemlist&task=category&id=1190:bsides-tlv&Itemid=559"
```

```
node app.js <subject_page> <local_directory> <concurrent_downloads> <start_at> <limit>
```

Blog post:
[https://blog.guya.net/2016/08/21/leeching-streaming-videos-with-node-js-x-ray-and-ffmpeg/](https://blog.guya.net/2016/08/21/leeching-streaming-videos-with-node-js-x-ray-and-ffmpeg/)