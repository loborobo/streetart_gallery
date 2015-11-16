$(document).on('page:change', function(event) {
  
  $('#artist_signup').hide();

  $('#artist_checkbox').change(function() {
    if (this.checked) {
      $('#artist_signup').slideDown();
    } else {
      $('#artist_signup').slideUp();
    };
  });
}); 
