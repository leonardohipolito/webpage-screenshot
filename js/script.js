$(document).ready(function() {
  var inputURL = $('#inputURL').val();
  var inputFile = '';

  $('#inputURL').on("click", function () {
     $(this).select();
  });

  $("#inputURL").change(function() {
      inputURL = $('#inputURL').val();
  });

  $('#submit').click(function() {
    if (isUrlValid(inputURL)) {
      var encodedURI = encodeURI(inputURL);
      $.ajax({
        type: "GET",
        url: "curl.php",
        data: "requestURI=" + encodedURI,
        dataType: "json",
        success: function (data) {
          //alert(data.base64);
          $('#screenshotURL').html(inputURL);
          $('#screenshotWrapper').html('<img class="screenshot" id="screenshotImage" src="data:image/png;base64,' + data.base64 + '" alt="Screenshot Placeholder">');
        }
      })
    } else {
      alert('Invalid URL!');
    }
  });

  $('#inputFile').change(function() {
    renderImage(this.files[0]);
  });

  $('#downloadImage').click(function() {
    html2canvas($('.chrome-window'), {
      allowTaint: true,
      logging: true,
      onrendered: function(canvas) {
        var data = canvas.toDataURL();
        //window.open(img);
        // var img = document.createElement('img');
        // img.src = data;
        // var a = document.createElement('a');
        // a.setAttribute("download", "screenshot.png");
        // a.setAttribute("href", data);
        // a.appendChild(img);
        // var w = open();
        // w.document.title = 'Export Image';
        // w.document.body.innerHTML = '<span style="color:#ff0000">Left-click on the image to save it.</span><br>';
        // w.document.body.appendChild(a);
        download(data, "screenshot.png", "image/png");
      }
    });
  });

});

function isUrlValid(url) {
    return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}

function renderImage(file) {
  var reader = new FileReader();
  reader.onload = function(event) {
    inputFile = event.target.result;
    $('#screenshotURL').html('');
    $('#screenshotWrapper').html('<img class="screenshot" id="screenshotImage" src="' + inputFile + '" alt="Screenshot Placeholder">');
  }
  reader.readAsDataURL(file);
}

// Code taken from MatthewCrumley (http://stackoverflow.com/a/934925/298479)
function getBase64Image(img) {
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to guess the
    // original format, but be aware the using "image/jpg" will re-encode the image.
    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}
