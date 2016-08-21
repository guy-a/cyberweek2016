
var spawn = require('child_process').spawn;
var Xray = require('x-ray');
var querystring = require('querystring');
var sanitize = require('sanitize-filename');

var xray = new Xray();

var mainVideoUrl = 'rtsp://vod.tau.ac.il:80/vod/_definst_/mp4:events/{video}.mp4';

var page = process.argv[2];
var destination = process.argv[3] || './';
var concurrent = parseInt(process.argv[4]) || 1;
var startAt = parseInt(process.argv[5]) || 1;
var videoIndex = parseInt(process.argv[5]) || -1;
var limit = parseInt(process.argv[6]) || Infinity;
var videos;


if (destination[destination.length - 1] !== '/') {
    destination += '/';
}

if (videoIndex > -1) {
    videoIndex -= 2;
}

if (page) {

    console.log('Page:', page)
    console.log('Destination:', destination);
    console.log('Concurrent:', concurrent);
    console.log('StartAt:', startAt);
    console.log('Limit:', limit);
    console.log('Downloading...');

    getVideos(page);

} else {
    console.error('Please provide a CyberWeek 2016 page');
    console.error('i.e.> node app.js "http://video.tau.ac.il/events/index.php?option=com_k2&view=itemlist&task=category&id=1189:technology-focused-track&Itemid=559"');
}


function getVideos(link) {
    xray(link, '.itemContainer.itemContainerLast h3 > a',
        [{
            file: '',
            src: '@href'
        }]
    )
    (function(err, results) {
        //console.log('results', results);
        results.forEach(function(vid, index) {
            var params = querystring.decode(vid.src);
            var id = params.id.split(':')[0];

            vid.file = destination + (++index < 10 ? '0' + index : index) + ' - ' + sanitize(vid.file.trim()) + '.mp4';
            vid.src = mainVideoUrl.replace('{video}', id);
        })

        videos = results;
        console.log('results', results);

        for (var i = 0; i < concurrent; i++) {
            downloadNext();
        }
    })

}

function downloadNext() {
    if (!isNextVideo()) {
        return;
    }

    videoIndex++;

    console.log('Downloading video (', videoIndex + 1, ')');

    var video = videos[videoIndex];

    var cmd = 'ffmpeg -i {url} -acodec copy -vcodec copy "{file}"';
    var currCmd = cmd.replace('{url}', video.src).replace('{file}', video.file);
    console.log(currCmd);

    var child = spawn('ffmpeg', ['-i', video.src, '-acodec', 'copy', '-vcodec', 'copy', video.file]);

    child.stdout.on('error', function (data) {
        console.log('error', data.toString());
    });

    child.stdout.on('data', function (data) {
        console.log('stdout', data.toString());
    });

    child.stderr.on('data', function (data) {
        console.log('stderr', data.toString());
    });

    child.on('close', function (code) {
        console.log('child process exited with code', code);

        if (code === 0){
            if (isNextVideo()) {
                downloadNext();
            } else {
                console.log('DONE!');
            }
        } else {
            console.log('NOT DONE!');
        }
    });
}

function isNextVideo() {
    return videoIndex < videos.length - 1 && videoIndex < limit + (startAt - 1);
}