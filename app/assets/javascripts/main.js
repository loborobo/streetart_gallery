var iterate_slideshow; 

$(document).on('page:change', function(event) {
  console.log('main.js loaded')

// #artwork and #main_map div

  var map;
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
      iterate_slideshow = setInterval(pauseAndPlay, 4000);
    } else {
        clearInterval(iterate_slideshow)
        console.log(iterate_slideshow)
    };
  };

  function pauseAndPlay() {
    if (paused == false) {
      slideAway();
      setTimeout(changePictures, 1000);
      setTimeout(slideIn, 1000);
    };
  }

  function slideAway() {
    $('#artworks').hide('slide', {direction: 'left'}, 1000);
  }

  function slideIn() {
    $('#artworks').show('slide', {direction: 'right'}, 1000);
  }

  function rewind() {
    $('#artworks').hide('slide', {direction: 'right'}, 1000)
    setTimeout(changePictures, 1000)
    setTimeout($('#artworks').show('slide', {direction: 'left'}, 1000), 1000);
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
    slideAway();
    setTimeout(changePictures, 1000);
    setTimeout(slideIn, 1000);    
  });
 
  $('#previous').on('click', function(e) {
    e.preventDefault();
    prev = true
    rewind();
    setTimeout(setPrevToFalse, 2000);
  });

  function setPrevToFalse() {
    prev = false; 
  }
  
  function initPic() {
    var imageTag = "<img src="+ artworks_list[i].image.url+">"
    $('#artworks').html(imageTag)
  };

  var marker_to_change = artworks_list[0].marker; 
  function changePictures() {
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
    marker_to_change = artworks_list[i].marker
    imageTag = "<img src="+ current_art.image.url+">"
    $('#artworks').html(imageTag)
    map.panTo(new google.maps.LatLng(image_lat, image_lng));
    marker_to_change.setIcon(pinSymbol(yellow_marker))
    marker_to_change.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
  }

  // initialize map and set markers

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
    var infowindow = null; 
    for (var i = 0; i < artworks_list.length; i++)  {
      var latitude = artworks_list[i].latitude;
      var longitude = artworks_list[i].longitude; 
      var latlong = {lat: latitude, lng: longitude}
      var image_marker = [artworks_list[i].id, latlong];
      var marker = new google.maps.Marker({
        position: latlong,
        icon: pinSymbol(red_marker),
        map: map,
        zIndex: i +100
      });

      artworks_list[i].marker = marker;
    }
   setMarkerWindows(); 
  } 


  function setMarkerWindows() {
    console.log(artworks_list)
    for (var i = 0; i < artworks_list.length; i++) {
      var marker = artworks_list[i].marker;
      var art_info = '<div>'+
        '<p><b>Title: </b><a href="/artworks/'+artworks_list[i].id+'">' + artworks_list[i].name + '</a></p>'+
        '<p><b>Artist: </b>' + setArtCreator(artworks_list[i].creator) + '</p>'+
        '<div class="art_thumb"><img src="'+ artworks_list[i].image.url+'"/></div>'+
      '</div>'
      setArtInfo(marker, art_info);
    }
  }

  function setArtCreator(art_creator) {
    if (art_creator == null) {
      return "unknown"
    } else {
      return art_creator
    }
  }

  function setArtInfo(marker, art_info) {
    var infowindow = new google.maps.InfoWindow({
      content: art_info
    });
         
    google.maps.event.addListener(marker, 'click', function(){
      infowindow.open(map, this);
    });
  }

});