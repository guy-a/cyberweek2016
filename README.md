# cyberweek2016

** Leeching Streaming Videos With Node.js x-ray and ffmpg **

This is an example of how to use Node.JS with x-ray and FFMPEG to scrap a website and to download streaming videos.
This specific script is used to download the videos from [The 6th Annual International Cybersecurity Conference](http://video.tau.ac.il/events/index.php?option=com_k2&view=itemlist&task=category&id=1183:the-6th-annual-international-cybersecurity-conference&Itemid=559) but can be used to download similar content with slight modification.


*[Install node.js](https://nodejs.org/en/) simplest is to down the binary for your environment
[Install ffmpeg](https://www.ffmpeg.org/download.html) On Mac it's easy with homebrew ```brew install ffmpeg```
*Run like this:
'''
node app.js http://video.tau.ac.il/events/index.php?option=com_k2&view=itemlist&task=category&id=1190:bsides-tlv&Itemid=559
'''

'''
node app.js <subject_page> <local_directory> <concurrent_downloads> <start_at> <limit>
'''