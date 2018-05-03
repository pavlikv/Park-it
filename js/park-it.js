var storage;

function init(){
    document.addEventListener("deviceready", onDeveiceReady,false);
    storage = window.localStorage;
}

function onDeviceReady() {
    var node = document.createElement("link");
    node.setAttribute("rel","stylesheet");
    node.setAttribute("type", "text/css");

    if(cordova.platformid == 'ios'){
        node.setAttribute("href","styles/park-it-ios.css");

        window.StatusBar.overlaysWebView(false);
        window.StatusBar.styleDefault();
    } else {
        node.setAttribute("href", "styles/park-it-android.css");
        window.StatusBar.backgroundColorByHexString("#1565C0");
    }

    $('head').appendChild(node);
}

function initMap() {
    var grc = {lat: 47.313582, lng: -122.1800072};
    var chernobyl = {lat: 51.2763, lng: 30.2219};
    var mapDiv = new google.maps.Map(document.getElementById('map'), {
        center: grc,
        zoom: 8
    });
    var marker = new google.maps.Marker({
        position: grc,
        map: mapDiv
    });
}

$("#park").click(function () {
    alert("Set parking location");
});

$("#retrieve").click(function() {
    alert("Get parking location");
});

$("#gotIt").click(function () {
    $("#instructions").slideUp();
});