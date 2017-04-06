//Add a twitcher here, and everything else will automatically update
var twitchers = [
    'freeCodeCamp',
    'food',
    'CouchWarriorTV',
    'Boogie2988',
    'GopherGaming',
    'Bethesda',
    'lexyeevee',
    'comster404'
];

//This creates a new html spot when a twitcher is added
var spot = '';
for (var j = 0; j < twitchers.length; j++) {
    spot += '<p id="' + twitchers[j] + '"></p>';
    $('#content').html(spot);
}

//This function pulls information for each twitcher and surrounds them with basic formatting
function run(x) {
    //Checks if the user exists and styles well if they don't - sometimes gets overwritten by the below!!!
    $.ajax({
        type: 'GET',
        url: 'https://api.twitch.tv/kraken/users/' + x,
        headers: {
            'Client-ID': 'dljpg29n975qglwr0d7f2iea27fagd4'
        },
        success: function(data) {
            console.log('Valid user:', x);
        },
        error: function(data) {
            console.error('Invalid user:', x);
            function updateInvalid() {
                $('#' + x).html('<div class="channel_disabled well">The channel <strong>' + x + '</strong> does not exist</div>');
            }
            //This is a terrible hack to make sure these appear disabled rather than not streaming
            setInterval(updateInvalid, 200);
            clearInterval(updateInvalid);
        }
    });
    //Pulls information for existing user streams
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
            console.log('Stream error:', x);
        }
    });
}
//This fills the spots with the information from the run function
for (var i = 0; i < twitchers.length; i++) {
    run(twitchers[i]);
}
