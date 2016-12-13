$(function(){
	var search = $("#search-field");
	$(search).on('focus',function(){
		$(this).animate({
			width: '40%',
			border: '5px solid #33d6ff'
		}, 500);

	});
	/*$(search).on('blur',function(){
		alert('blured');
		$(this).animate({
			width: '30%'
		}, 500);
	});*/

	$('#go-btn').on('click',function(e){
		e.preventDefault();
	});

	
})

 function myFunc(){
		$('#results').html('');
		$('#buttons').html('');

		q = $('#search-field').val();
		$.get(
			"https://www.googleapis.com/youtube/v3/search",{
				part: 'snippet, id',
				q: q,
				type: 'video',
				key: 'AIzaSyCkzXBI_TiFdMfsQ6T0e9YyX4Zj32_K8S8'},
				function(data){
					/*var nextPageToken = data.nextPageToken;
					var prevPageToken = data.prevPageToken;*/

					console.log(data);

					$.each(data.items, function(i, item){
						var output = getOutput(item);
						$('#results').append(output);
					});
				}
			);

	}

	function getOutput(item){
	var videoId = item.id.videoId;
	var title = item.snippet.title;
	var description = item.snippet.description;
	var thumb = item.snippet.thumbnails.high.url;
	var channelTitle = item.snippet.channelTitle;
	var videoDate = item.snippet.publishedAt;
	
	// Build Output String
	var output = '<li>' +
	'<div class="list-left">' +
	'<img src="'+thumb+'">' +
	'</div>' +
	'<div class="list-right">' +
	'<h3><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+videoId+'">'+title+'</a></h3>' +
	'<small>By <span class="cTitle">'+channelTitle+'</span> on '+videoDate+'</small>' +
	'<p>'+description+'</p>' +
	'</div>' +
	'</li>' +
	'<div class="clearfix"></div>' +
	'';
	
	return output;
}