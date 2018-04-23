// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require jquery
//= require bootstrap-sprockets
//= require froala_editor.min.js
//= require plugins/align.min.js
//= require plugins/char_counter.min.js
//= require plugins/code_beautifier.min.js
//= require plugins/code_view.min.js
//= require plugins/colors.min.js
//= require plugins/emoticons.min.js
//= require plugins/entities.min.js
//= require plugins/file.min.js
//= require plugins/font_family.min.js
//= require plugins/font_size.min.js
//= require plugins/fullscreen.min.js
//= require plugins/help.min.js
//= require plugins/image.min.js
//= require plugins/image_manager.min.js
//= require plugins/inline_style.min.js
//= require plugins/line_breaker.min.js
//= require plugins/link.min.js
//= require plugins/lists.min.js
//= require plugins/paragraph_format.min.js
//= require plugins/paragraph_style.min.js
//= require plugins/print.min.js
//= require plugins/quick_insert.min.js
//= require plugins/quote.min.js
//= require plugins/save.min.js
//= require plugins/table.min.js
//= require plugins/special_characters.min.js
//= require plugins/url.min.js
//= require plugins/video.min.js
//= require turbolinks
//= require_tree .

$(document).on('turbolinks:load', function() {
	$('.froalaEditor').froalaEditor({
		codeMirror: true
	});

	//Handle button CLAP
	var numberTap = 0;
	var url = $('.clap-button').data('urlpath')
	var method = $('.clap-button').data('methodaction')

	var isUpdate = (method == "PUT")
	var token = $('meta[name="csrf-token"]').attr('content');
	var clapped = $('.number-clap').data("clapped")

	$('.clap-button').click(function(e) {
		if (isUpdate) {
			numberTap += 1
			$('.number-clap').html(clapped + numberTap)
		}
	})

	$('.clap-button').mouseout(function() {
		if (numberTap > 0 && isUpdate) {
			$.ajax({
				url: url,
				type: method,
				headers: {
			    'X-CSRF-Token': token
			  },
				dataType: "json",
				data: {
					number_tap: numberTap
				},
				success: function(data) {
					// $('.number-clap').html(data["number_tap"])
					location.reload();
					clapped = data["number_tap"]
				}, error: function(data) {
					console.log(data)
				}
			})

		} else if (numberTap > 0 && !isUpdate) {
			$.ajax({
				url: url,
				type: method,
				headers: {
			    'X-CSRF-Token': token
			  },
				dataType: "json",
				data: {
					number_tap: 1
				},
				success: function(data) {
					location.reload();
				}, error: function(data) {
					console.log(data)
				}
			})
		}

		numberTap = 0
	})


	 var simplemde = new SimpleMDE({ element: document.getElementById("markdown") });
});
