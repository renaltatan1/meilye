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
dynamicLoading.css('/Metro/style.css')
dynamicLoading.css('/Metro/player.css')
dynamicLoading.css('/Metro/phoneTemplate.css')
dynamicLoading.css('/Metro/template.css')
dynamicLoading.css('/Metro/hiSlider2.min.css')
dynamicLoading.css('/Metro/FlipBookPlugins.min.css')
dynamicLoading.js('/Metro/jquery-3.5.1.min.js', function () {
    dynamicLoading.js('/Metro/main.js', function () {
    })
    dynamicLoading.js('/Metro/visitinfo.js')
    dynamicLoading.js('/Metro/flipHtml5.hiSlider2.min.js')
    dynamicLoading.js('/Metro/FlipBookPlugins.min.js')
})