/*

    Use https://codewise-fe-api.herokuapp.com/photos endpoint, to get list of objects that contain photos data, e.g.:

    {
        "width":5616,
        "height":3744,
        "author":"Alejandro Escamilla",
        "url":"https://unsplash.com/photos/N7XodRrbzS0/download"
    }

    This endpoint accepts two query parameters: 'offset' and 'limit'. If you use endpoint like this:
    https://codewise-fe-api.herokuapp.com/photos?offset=0&limit=5
    it will return first 5 records from the database,

    if you use it like this:
    https://codewise-fe-api.herokuapp.com/photos?offset=10&limit=5
    it will return records no. 10-14 end so on.

    If you don't pass any parameters, offset is set to 0 end limit is set to 50.
    
    To use lightweight placeholder images instead of real photos, set truthy value for 'placeholders' parameter, e.g.
    https://codewise-fe-api.herokuapp.com/photos?placeholders=1, or
    https://codewise-fe-api.herokuapp.com/photos?offset=10&limit=5&placeholders=1

    Good luck!

*/
let currOffset = 0;
let maxWidth = 450;
let maxHeight = 300;
//console.log('inner' + innerHeight);
let currWidth = 0;
let currHeight = 0;

function loadPictures() {
    $.getJSON('https://codewise-fe-api.herokuapp.com/photos?offset=' + currOffset + '&limit=50', function (pictures) {
        for (let i = 0; i < pictures.length && currHeight <= window.innerHeight; i++) {
            console.log(currWidth)
            if (currWidth + maxWidth > window.innerWidth) {
                currWidth = 0;
                currHeight += maxHeight + 10;
            }
            currWidth += maxWidth;
                console.log(pictures[i]);
                currOffset += 1;
                var pic = document.createElement('img');
                pic.src = pictures[i].url;
                document.getElementsByTagName('body')[0].appendChild(pic);
                console.log($(document).innerHeight());
        }    
    //console.log(pictures);
    });
};

loadPictures();

window.onscroll = function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        loadPictures();
        console.log(':)');
    }
};