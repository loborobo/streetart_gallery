var iterate_slideshow; 

$(document).on('page:change', function(event) {
  console.log('main.js loaded')

// #artwork and #main_map div

  var map;
  var all_markers = [];
  var i = 0;
  var red_marker = "#F74C39"
  var yellow_marker = "#F7DA36"
  var paused = false;
  var prev = false;

  if (typeof(gon)!= 'undefined') {
    var artworks_list = gon.artworks;
    initEverything()
  };
  
  function initEverything() {
    if ($('#main_map').length > 0) {
      initMainMap();
      setMarkers();
      initPic();
      iterate_slideshow = setInterval(pauseAndPlay, 3000);
    } else {
        clearInterval(iterate_slideshow)
        console.log(iterate_slideshow)
    };
  };

  function pauseAndPlay() {
    if (paused == false) { 
      showPictures()
    };
  }

  $('#pause').on('click', function(e) {
    e.preventDefault();
    paused = true;
  });

  $('#play').on('click', function(e) {
    e.preventDefault();
    paused = false;
  });

  $('#next').on('click', function(e) {
    e.preventDefault();
    showPictures();    
  });
 
  $('#previous').on('click', function(e) {
    e.preventDefault();
    prev = true
    showPictures();
    prev = false; 
  });

  function initMainMap() {
    console.log("init map called");
    map = new google.maps.Map($('#main_map')[0], {
      center: {lat: 43.660, lng: -79.402},
      zoom: 13
    });
  }

  function pinSymbol(color) {
    return {
        path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
        fillColor: color,
        fillOpacity: 1,
        strokeColor: '#000',
        strokeWeight: 2,
        scale: 1,
    };
  }

  function setMarkers() {
    console.log("setting markers")
    for (var i = 0; i < artworks_list.length; i++)  {
      var latitude = artworks_list[i].latitude;
      var longitude = artworks_list[i].longitude; 
      var latlong = {lat: latitude, lng: longitude}
      var image_marker = [artworks_list[i].id, latlong]
      var marker = new google.maps.Marker({
        position: latlong,
        icon: pinSymbol(red_marker)
      });
    marker.setMap(map);
    marker.setZIndex(i + 100);
    all_markers.push({id: artworks_list[i].id, marker: marker});
    }
  }
  
  function initPic() {
    var imageTag = "<img src="+ artworks_list[i].image.url+">"
    $('#artworks').html(imageTag)
  };

  var marker_to_change = all_markers[0].marker; 
  function showPictures() {
    marker_to_change.setIcon(pinSymbol(red_marker))
    marker_to_change.setZIndex(i + 100)
    if (prev == true) {
      if (i == 0) {
        i = artworks_list.length;
      };
      i--;
    } else {
      i++;
    }

    if (i == artworks_list.length) {
      i = 0;
    };
    var current_art = artworks_list[i]
    var image_lat = current_art.latitude;
    var image_lng = current_art.longitude;
    marker_to_change = _.result(_.findWhere(all_markers, {'id' : current_art.id}), 'marker')
    imageTag = "<img src="+ current_art.image.url+">"
    $('#artworks').html(imageTag).show('slide', {direction: 'right'}, 1000);
    map.panTo(new google.maps.LatLng(image_lat, image_lng));
    marker_to_change.setIcon(pinSymbol(yellow_marker))
    marker_to_change.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
  }

});