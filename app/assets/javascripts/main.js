$(document).ready(function() {

  initMap(); 
  
  var map;
  function initMap() {
    console.log("main.js called");
    map = new google.maps.Map(document.getElementById('main_map'), {
      center: {lat: 43.670, lng: -79.444},
      zoom: 12
    });

    var artworks = gon.artworks
    for (var i = 0; i < artworks.length; i++)  {
      var latitude = artworks[i].latitude;
      var longitude = artworks[i].longitude; 
      var latlong = {lat: latitude, lng: longitude}
      var marker = new google.maps.Marker({
        position: latlong
      });
    marker.setMap(map);
    } 

  }
  

})