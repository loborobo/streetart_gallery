$(document).ready(function(){
  console.log('artwork.js loaded')
  $('#gps_link').click(getLocation);

  initMap();

  google.maps.event.addListener(picker_map, 'click', function(event) {
    placeMarker(event.latLng);
  });

  function getLocation() {
      if (navigator.geolocation) {
          position = navigator.geolocation.getCurrentPosition(function(position) {
            $('#artwork_latitude').val(position.coords.latitude)
            $('#artwork_longitude').val(position.coords.longitude);
          })
      } else {
          // does something better here...
          alert("Geolocation is not supported by this browser.");
      }
  }

  var picker_map;
  function initMap() {
    picker_map = new google.maps.Map(document.getElementById('mark_location'), {
      center: {lat: 43.670, lng: -79.444},
      zoom: 12
    });
    console.log("artwork.js got called");
    return picker_map;
  }

  var marker;
  function placeMarker(location) {
    if ( marker ) {
      marker.setPosition(location);
    } else {
      marker = new google.maps.Marker({
        position: location,
        map: picker_map
      });
    }
    $('#artwork_latitude').val(marker.position.lat());
    $('#artwork_longitude').val(marker.position.lng());
  } 

});