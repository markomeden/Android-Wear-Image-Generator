$(function() {

	var	maxWidth = 600,
		maxHeight = 600,
		photo = $('#photo'),
		originalCanvas = null,
		filters = $('#filters li a'),
		filterContainer = $('#filterContainer');

	// Use the fileReader plugin to listen for
	// file drag and drop on the photo div:

	photo.fileReaderJS({
		on:{
			load: function(e, file){

				// An image has been dropped.

				var img = $('<img>').appendTo(photo),
					imgWidth, newWidth,
					imgHeight, newHeight,
					ratio;	

				// Remove canvas elements left on the page
				// from previous image drag/drops.

				photo.find('canvas').remove();
				filters.removeClass('active');

				// When the image is loaded successfully,
				// we can find out its width/height:

				img.load(function() {

					imgWidth  = this.width;
					imgHeight = this.height;

					originalCanvas = $('<canvas>');
					var originalContext = originalCanvas[0].getContext('2d');
					// Set the attributes for centering the canvas

					originalCanvas.attr({
						width: 600,
						height: 600
					}).css({
						marginTop: -308,
						marginLeft: -308
					});

					var image2 = new Image();
					image2 = document.getElementById("ozadje");
					image2.crossOrigin = "anonymous";

					
					originalContext.drawImage(this, 189, 201, 230, 190);
					originalContext.drawImage(image2, 0, 0, 600, 600);
					
					img.remove();
						
		var f = $(this);

		var clone = originalCanvas.clone();

		clone[0].getContext('2d').drawImage(originalCanvas[0],0,0);

		photo.find('canvas').remove().end().append(clone);
			showDownload(clone[0]);
				});

				img.attr('src', e.target.result);
			},

			beforestart: function(file){

				// Accept only images.
				// Returning false will reject the file.

				return /^image/.test(file.type);
			}
		}
	});

	var downloadImage = $('a.downloadImage');

	function showDownload(canvas){


		downloadImage.off('click').click(function(){
			
			// When the download link is clicked, get the
			// DataURL of the image and set it as href:
			
			var url = canvas.toDataURL("image/png;base64;");
			downloadImage.attr('href', url);
			
		}).fadeIn();

	}

	function hideDownload(){
		downloadImage.fadeOut();
	}

});
