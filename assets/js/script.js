// function check_for_song(parent_element, curr_song) {
//     var children = parent_element.children;
//     for (let i = 0; i < children.length; i++) {
//         if (curr_song == children[i].classList[1]) {
//             return true;
//         }
//     }
//     return false;
// }

function check_for_song(song_list, song) {
    for (let i = 0; i < song_list.length; i++) {
        if (song_list[i] == song) {
            return i;
        }
    }

    return -1;
}

function disp_song(parent_element, curr_song) {
    console.log('sdf')
    var song_template = document.querySelector('#song-template .song');
    var clone = song_template.cloneNode(true);
    clone.classList.add(curr_song);
    clone.querySelector('.song-name').innerText = track_list[curr_song].name;
    parent_element.appendChild(clone);

}

function add_to_queue(songs) {

    var queue = JSON.parse(localStorage.getItem('queue'));
    // console.log(recently_played)
    if (queue == null) {
        localStorage.setItem('queue', JSON.stringify([]));
        queue = JSON.parse(localStorage.getItem('queue'));
    }

    if (typeof (songs) == 'string') {

        if (check_for_song(queue, songs) == -1) {
            queue.push(songs);
        }

    } else {
        var children = songs.children;
        var k;
        for (let i = 0; i < children.length; i++) {
            if (children[i].classList[1] == curr_song) {
                k = i;
                break;
            }
        }

        for (let i = 0; i < children.length; i++) {
            var j = check_for_song(queue, children[i].classList[1])
            if (j != -1) {
                queue.splice(j, 1);
            }
        }

        for (let i = k; i < children.length + k; i++) {
            queue.push(children[i % children.length].classList[1]);
        }

    }

    localStorage.setItem('queue', JSON.stringify(queue));
    var queue_songs = document.querySelector(".queue-songs");
    if (queue_songs != null) {
        disp_song(queue_songs, curr_song);
    }
}


function add_to_recently_played(curr_song) {

    var recently_played = JSON.parse(localStorage.getItem('recently-played'));
    // console.log(recently_played)
    if (recently_played == null) {
        localStorage.setItem('recently-played', JSON.stringify([]));
        recently_played = JSON.parse(localStorage.getItem('recently-played'));
    }
    if (check_for_song(recently_played, curr_song) == -1) {
        recently_played.push(curr_song);
        localStorage.setItem('recently-played', JSON.stringify(recently_played));
        var recently_played_content = document.querySelector(".recently-played-content");
        if (recently_played_content != null) {
            disp_song(recently_played_content, curr_song);
        }
        return true;
    }
    return false;
}

function time_conversion(time) {
    var min = 0;
    var sec = 0;

    min = Math.floor(time / 60);
    sec = Math.floor(time % 60);

    if (min < 10) {
        min = '0' + min;
    }
    if (sec < 10) {
        sec = '0' + sec;
    }

    return min + ':' + sec;
}


function update_player() {

    bottom_player.style.display = 'flex';

    var song_img = document.querySelector('.bottom-player .song-image');
    var song_name = document.querySelector('.bottom-player .song-name');
    var curr_time = document.querySelector('.bottom-player .current-time');
    var song_duration = document.querySelector('.bottom-player .song-duration');
    var time_slider = document.querySelector('.bottom-player .time-slider');

    clearInterval(timer);
    curr_time.textContent = '00:00';
    time_slider.value = 0;


    song_name.textContent = track_list[curr_song].name;
    // song_img.style.background_image = "";



    setTimeout(() => {
        time_slider.max = Math.floor(song_track.duration);
        song_duration.textContent = time_conversion(song_track.duration);

        timer = setInterval(() => {
            curr_time.textContent = time_conversion(song_track.currentTime);
            time_slider.value = song_track.currentTime;
        }, 1000);

    }, 500);

}


function play_next() {
    var queue = JSON.parse(localStorage.getItem('queue'));
    var song_index = check_for_song(queue, curr_song);
    curr_song = queue[(song_index + 1) % queue.length]
    prev_song = null;
    play_song(curr_song);

}

function play_prev() {
    var queue = JSON.parse(localStorage.getItem('queue'));
    var song_index = check_for_song(queue, curr_song);
    song_index--;
    if (song_index == -1) {
        song_index = queue.length - 1;
    }
    curr_song = queue[song_index];
    prev_song = null;
    play_song(curr_song);

}


function play_song(curr_song) {
    var player_play = document.querySelector(".bottom-player .fa-circle-play");
    var player_pause = document.querySelector(".bottom-player .fa-circle-pause");

    var song_play = document.querySelectorAll(".playing .fa-circle-play");
    var song_pause = document.querySelectorAll(".playing .fa-circle-pause");

    // var song = document.querySelectorAll('.'+curr_song);
    // for(let i=0; i<song.length; i++){
    //     song[i].classList.add('playing');
    // }

    if (prev_song == curr_song) {


        // console.log(curr_song)
        if (song_track.paused) {
            song_track.play();
            player_pause.style.display = 'block';
            player_play.style.display = 'none';

            for (let i = 0; i < song_play.length; i++) {
                song_pause[i].style.display = 'block';
                song_play[i].style.display = 'none';
            }

        } else {
            song_track.pause();
            player_play.style.display = 'block';
            player_pause.style.display = 'none';

            for (let i = 0; i < song_play.length; i++) {
                song_play[i].style.display = 'block';
                song_pause[i].style.display = 'none';
            }

        }
    } else {
        // song_track.pause();
        song_track.src = track_list[curr_song].path;
        song_track.play();

        update_player()

        add_to_recently_played(curr_song);
        // add_to_queue(curr_song);

        player_pause.style.display = 'block';
        player_play.style.display = 'none';

        var prev_play = document.querySelectorAll('.' + prev_song);
        var curr_play = document.querySelectorAll('.' + curr_song);
        for (let i = 0; i < prev_play.length; i++) {
            prev_play[i].classList.remove('playing');
        }
        for (let i = 0; i < curr_play.length; i++) {
            curr_play[i].classList.add('playing');
        }

        song_play = document.querySelectorAll(".playing .fa-circle-play");
        song_pause = document.querySelectorAll(".playing .fa-circle-pause");

        for (let i = 0; i < song_play.length; i++) {
            song_pause[i].style.display = 'block';
            song_play[i].style.display = 'none';
        }



    }
    prev_song = curr_song;
}

function display(element, song_list) {
    if (element == null) {
        return false;
    }

    for (let i = 0; i < song_list.length; i++) {
        disp_song(element, song_list[i]);
    }

    return true;
}

function disp_queue() {
    var queue_songs = document.querySelector(".queue-songs");

    var queue = JSON.parse(localStorage.getItem('queue'));
    if (queue != null) {
        return display(queue_songs, queue);
    }
    return true;
}

function disp_recently_played() {
    var recently_played_content = document.querySelector(".recently-played-content");

    var recently_played = JSON.parse(localStorage.getItem('recently-played'));
    if (recently_played != null) {
        return display(recently_played_content, recently_played);
    }
    return true;
}




var track_list = {
    'faded': {
        'name': "Faded",
        'path': './assets/songs/alan_walker/faded.mp3',
        'artists': 'Alan Walker'
    },
    'alone': {
        'name': 'Alone',
        'path': './assets/songs/alan_walker/alone.mp3',
        'artists': 'Alan Walker'
    },
    'sing-me-to-sleep': {
        'name': 'Sing Me To Sleep',
        'path': './assets/songs/alan_walker/sing-me-to-sleep.mp3',
        'artists': 'Alan Walker'
    },
    'all-falls-down': {
        'name': 'All falls down',
        'path': './assets/songs/alan_walker/all-falls-down.mp3',
        'artists': 'Alan Walker, Noah Cyrus, Juliander, Digital Farm Animals (Nicholas Gale)'
    },
    'darkside': {
        'name': 'Darkside',
        'path': './assets/songs/alan_walker/darkside.mp3',
        'artists': 'Alan Walker, Au/Ra, Tomine Harket'
    },
    'diamond-heart': {
        'name': 'Diamond Heart',
        'path': './assets/songs/alan_walker/diamond-heart.mp3',
        'artists': 'Alan Walker, Sophia Somajo'
    },
    'different-world': {
        'name': 'Different World',
        'path': './assets/songs/alan_walker/different-world.mp3',
        'artists': 'Alan Walker, K-391, Sofia Carson, CORSAK'
    },
    'lost-control': {
        'name': 'Lost Control',
        'path': './assets/songs/alan_walker/lost-control.mp3',
        'artists': 'Alan Walker, Sorana'
    },
    'on-my-way': {
        'name': 'On My Way',
        'path': './assets/songs/alan_walker/on-my-way.mp3',
        'artists': 'Alan Walker, Sabrina Carpenter, Farruko'
    },
    'heading-home': {
        'name': 'Heading Home',
        'path': './assets/songs/alan_walker/heading-home.mp3',
        'artists': 'Alan Walker, Ruben'
    }

};


var prev_song = null;
var curr_song = null;
var song_track = new Audio("");
var timer;
disp_recently_played();
disp_queue();

/// Event Listener for playing a song ////

var song_info = document.querySelectorAll(".song .song-info");
for (let i = 0; i < song_info.length; i++) {
    // console.log(song_info[i].parentElement.classList[1])
    if (song_info[i].parentElement.parentElement.id != 'song-template') {
        song_info[i].querySelector('.song-name').textContent = track_list[song_info[i].parentElement.classList[1]].name;
        song_info[i].querySelector('.song-artists').textContent = track_list[song_info[i].parentElement.classList[1]].artists;
    }
    song_info[i].addEventListener('click', function (event) {
        curr_song = song_info[i].parentElement.classList[1];

        var song_list = song_info[i].parentElement.parentElement
        if (song_list.classList[0] == 'song-list') {
            add_to_queue(song_list);
        } else {
            add_to_queue(curr_song);
        }
        play_song(curr_song);
        event.stopPropagation();
    });
}

var song

/// Event Listener to add to queue ///

var add_song = document.querySelectorAll(".song .song-options .fa-plus");
for (let i = 0; i < add_song.length; i++) {
    add_song[i].addEventListener('click', function (event) {
        var curr_song = add_song[i].parentElement.parentElement.classList[1];
        add_to_queue(curr_song);
        event.stopPropagation();
    });
}


/// Event listener for song end ///

song_track.addEventListener('ended', () => {
    setTimeout(() => {
        play_next();
    }, 1000);
})


/// Bottom player display ////

var bottom_player = document.querySelector('.bottom-player');

if (localStorage.getItem('queue') == null) {
    bottom_player.style.display = 'none';
} else {
    curr_song = JSON.parse(localStorage.getItem('queue'))[0];
    song_track.src = track_list[curr_song].path;
    update_player()
}


//// Event listener for change in time slider ////

var time_slider = document.querySelector('.bottom-player .time-slider');
time_slider.addEventListener('change', function () {
    song_track.currentTime = time_slider.value;
    document.querySelector('.bottom-player .current-time').textContent = time_conversion(song_track.currentTime);
});


/// Event listner for change in volume slider ///

var volume_slider = document.querySelector('.bottom-player .volume-slider');

volume_slider.addEventListener('change', function () {
    song_track.volume = volume_slider.value / 100;
});

/// Event listener for play-pause button ///

var play_pause = document.querySelector('.bottom-player .play-pause');
play_pause.addEventListener('click', function () {
    play_song(curr_song);
});

/// Event listner for next button ///

var next = document.querySelector('.bottom-player .fa-step-forward');
next.addEventListener('click', play_next);

/// Event listner for prev button ///

var prev = document.querySelector('.bottom-player .fa-step-backward');
prev.addEventListener('click', play_prev);