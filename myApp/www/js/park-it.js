var storage;

function init(){
    document.addEventListener("deviceready", onDeviceReady,false);
    storage = window.localStorage;
}

$("document").ready(init);

function onDeviceReady() {
    // var node = document.createElement("link");
    // node.setAttribute("rel","stylesheet");
    // node.setAttribute("type", "text/css");

    if(cordova.platformid == 'ios'){
        //node.setAttribute("href","css/park-it-ios.css");

        $('head').append('<link rel="stylesheet" href="css/park-it-ios.css" type="text/css" />');
        window.StatusBar.overlaysWebView(false);
        window.StatusBar.styleDefault();
    } else {
        //node.setAttribute("href", "css/park-it-android.css");
        $('head').append('<link rel="stylesheet" href="css/park-it-android.css" type="text/css" />');
        window.StatusBar.backgroundColorByHexString("#1565C0");
    }

    //$('head').appendChild(node);
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

function setParkingLocation(){
    navigator.geolocation.getCurrentPosition(setParkingLocationSuccess,
        setParkingLocationError, {enableHighAccuracy:true});
}

function setParkingLocationSuccess(position){
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    storage.setItem("parkedLatitude", latitude);
    storage.setItem("parkedLongitude", longitude);

    navigator.notification.alert("Parking Location Saved. (Lat: " + latitude + ", Long: " + longitude + ")");

    showParkingLocation();
}

function setParkingLocationError(error){
    navigator.notification.alert("Error code: " + error.code + "\nError Message: " + error.message);
}

function showParkingLocation(){
    navigator.notification.alert("You are parked at Lat: " + storage.getItem("parkedLatitude")
        + ", Long: " + storage.getItem("parkedLongitude"));
}

$("#park").click(function () {
    setParkingLocation();
});

$("#retrieve").click(function() {
    showParkingLocation();
    $("#instructions").slideUp();
    $("#directions").slideUp();
});

$("#gotIt").click(function () {
    $("#instructions").slideUp();

});