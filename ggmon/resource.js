var dynamicLoading = {
    css: function (path) {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.href = path;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        head.appendChild(link);
    },
    js: function (path, callback) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.src = path;
        script.type = 'text/javascript';
        script.async = false
        script.onload = script.onreadystatechange = function () {
            callback && callback()
        };
        head.appendChild(script);
    },
    type: 't2022022201',
    time: '1649663375'
}
dynamicLoading.css('https://renaltatan.github.io/meilye/ggmon/Metro/style.css')
dynamicLoading.css('https://renaltatan.github.io/meilye/ggmon/Metro/player.css')
dynamicLoading.css('https://renaltatan.github.io/meilye/ggmon/Metro/phoneTemplate.css')
dynamicLoading.css('https://renaltatan.github.io/meilye/ggmon/Metro/template.css')
dynamicLoading.css('https://renaltatan.github.io/meilye/ggmon/Metro/hiSlider2.min.css')
dynamicLoading.css('https://renaltatan.github.io/meilye/ggmon/Metro/FlipBookPlugins.min.css')
dynamicLoading.js('https://renaltatan.github.io/meilye/ggmon/Metro/jquery-3.5.1.min.js', function () {
    dynamicLoading.js('https://renaltatan.github.io/meilye/ggmon/Metro/main.js', function () {
    })
    dynamicLoading.js('https://renaltatan.github.io/meilye/ggmon/Metro/visitinfo.js')
    dynamicLoading.js('https://renaltatan.github.io/meilye/ggmon/Metro/flipHtml5.hiSlider2.min.js')
    dynamicLoading.js('https://renaltatan.github.io/meilye/ggmon/Metro/FlipBookPlugins.min.js')
})
