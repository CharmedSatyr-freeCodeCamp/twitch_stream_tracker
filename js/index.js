//Add a twitcher here, and everything else will automatically update
var twitchers = ['freeCodeCamp', 'food', 'Bethesda', 'Boogie2988', 'GopherGaming', 'TotalBiscuit', 'brunofin', 'comster404'];

//This creates a new html spot when a twitcher is added
var spot = '';
for (var j = 0; j < twitchers.length; j++) {
	spot += '<p id="' + twitchers[j] + '"></p>';
	$('#content').html(spot);
}

//This function pulls information for each twitcher and surrounds them with basic formatting
function run(x) {
	$.ajax({
		type: 'GET',
		url: 'https://api.twitch.tv/kraken/streams/' + x,
		headers: {
			'Client-ID': 'dljpg29n975qglwr0d7f2iea27fagd4'
		},
		success: function(data) {
			if (data.stream !== null) {
				$('#' + x).html('<a href="' + data.stream.channel.url + '" target="_blank"><div class="channel_online well"><img src="' + data.stream.channel.logo + '"></img><strong> ' + data.stream.channel.display_name + '</strong><br>' + data.stream.game + ': ' + data.stream.channel.status + '</div></a>');
			} else if (data.stream === null) {
				$('#' + x).html('<a href="https://www.twitch.tv/' + x + '" target="_blank"><div class="channel_offline well"><strong>' + x + '</strong> is offline</div></a>');
			}
		},
		error: function(data) {
			$('#' + x).html('<div class="channel_disabled well">The channel <strong>' + x + '</strong> does not exist</div>');
		}
	});
}
//This fills the spots with the information from the run function
for (var i = 0; i < twitchers.length; i++) {
	run(twitchers[i]);
}
