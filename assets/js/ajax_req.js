{
    let album_id = $('.album-description').prop('id');
    let song_list;

    $.ajax({
        type:'get',
        url:'/users/api/v1/song-list',
        success:(data) => {
            let album = data.data[album_id];
            song_list = album.song_list;
            create_album_dom(album);
            for(let [key, song] of Object.entries(song_list)){
                let song_dom = create_song_dom(song);
                $('#song-container').append(song_dom);
                $(`#song-container #song-${song.id} .song-info`).click((e) => {
                    if(prev_song != song.id){
                        add_to_queue(song_list);
                    }
                    play_song(song);
                });
                $(`#song-container #song-${song.id} .song-options .fa-plus`).click((e) => {
                    add_to_queue({song:song});
                });
                $(`#song-container #song-${song.id} .song-options .fa-heart-o`).click((e) => {
                    add_to_fav(song);
                })

            }
        },
        error:(error) => {
            console.log(error.responseText);
        }
    });

    

    let create_album_dom = (album) => {
        let album_container = $('.album-description');
        let album_dom = `
        <div class="album-image"></div>
        <div class="album-content">
            <div class="showcase-heading">
                <h3>${album.name}</h3>
            </div>
            <p>${album.content}</p>
        </div>
        `;

        $(album_container).append(album_dom);
        $('.album-image').css('background-image', `linear-gradient(transparent, transparent, #1b205ee6 120%), url(${album.image})`);

        return;
    }

    let create_song_dom = (song) => {
        return(`
        <div class="song ${song.id}" id="song-${song.id}">
            <div class="song-info">
                <div class="song-image"><i class="fa-solid fa-circle-play"></i>
                    <i class="fa-solid fa-circle-pause"></i></div>
                <div class="song-details">
                    <div class="song-name">
                        ${song.name}
                    </div>
                    <div class="song-artists">
                        ${song.artists}
                    </div>
                </div>

            </div>

            <div class="song-options">
                <i class="fa fa-heart-o" aria-hidden="true"></i>
                <i class="fa fa-plus" aria-hidden="true"></i>
            </div>
        </div>
        
        `);
    }


    let add_to_recently_played = (curr_song) => {
        $.ajax({
            type:'post',
            url:'/users/songs/recently-played',
            data:{song:curr_song.id},
            success:(data)=>{
                if(data.done){
                    $(`.recently-played-content #song-${curr_song.id}`).remove();
                    let song_dom = create_song_dom(curr_song);
                    $('.recently-played-content').append(song_dom);
                    $(`.recently-played-content #song-${curr_song.id} .song-info`).click((e) => {
                        play_song(curr_song);
                    });
                    $(`.recently-played-content #song-${curr_song.id} .song-options .fa-plus`).click((e) => {
                        add_to_queue({song:curr_song});
                    });
                }else{

                }
            },
            error:(error) => {
                console.log("Error in recently played ---> ", error);
            }
        });
    }

    $.ajax({
        type:'get',
        url:'/users/songs/recently-played',
        success:(data) => {
            if(data.done){
                for(let song of data.recently_played){
                    let song_dom = create_song_dom(song);
                    $('.recently-played-content').append(song_dom);
                    $(`.recently-played-content #song-${song.id} .song-info`).click((e) => {
                        play_song(song);
                    });
                    $(`.recently-played-content #song-${song.id} .song-options .fa-plus`).click((e) => {
                        add_to_queue({song:song});
                    });
                }
            }else{

            }
        },
        error:(error) => {
            console.log(error.responseText);
        }
    });

    let add_to_queue = (song_list) => {
        console.log('add')
        $.ajax({
            type:'post',
            url:'/users/songs/queued',
            data:{song_list:song_list},
            success: (data) => {
                for(let [key, song] of Object.entries(song_list)){
                    $(`.queue-songs #song-${song.id}`).remove();
                    let song_dom = create_song_dom(song);
                    $('.queue-songs').append(song_dom);
                    $(`.queue-songs #song-${song.id} .song-info`).click((e) => {
                        play_song(song);
                    });
                    $(`.queue-songs #song-${song.id} .song-options .fa-plus`).click((e) => {
                        add_to_queue({song:song});
                    });
                }
                
            },
            error:(error) => {
                console.log("Error in queue ---> ", error);
            }
        });
    }

    $.ajax({
        type:'get',
        url:'/users/songs/queued',
        success:(data) => {
            if(data.done){
                for(let song of data.queued){
                    let song_dom = create_song_dom(song);
                    $('.queue-songs').append(song_dom);
                    $(`.queue-songs #song-${song.id} .song-info`).click((e) => {
                        play_song(song);
                    });

                    $(`.queue-songs #song-${song.id} .song-options .fa-plus`).click((e) => {
                        add_to_queue({song:song});
                    });
                }
            }else{

            }
        },
        error:(error) => {
            console.log(error.responseText);
        }
    });

    let add_to_fav = (song) => {
        console.log('fav')
        $.ajax({
            type:'post',
            url:'/users/songs/favourites',
            data:{song:song.id},
            success:(data) => {
                if(data.done){
                    let song_dom = create_song_dom(song);
                    $('.favourite-songs').append(song_dom);
                    $(`.favourite-songs #song-${song.id} .song-info`).click((e) => {
                        play_song(song);
                    });
                    $(`.favourite-songs #song-${song.id} .song-options .fa-plus`).click((e) => {
                        add_to_queue({song:song});
                    });      
                }else{
                    
                }
            },
            error:(error) => {
                console.log(error);
            }
        });
    };

    $.ajax({
        type:'get',
        url:'/users/songs/favourites',
        success:(data) => {
            if(data.done){
                for(let song of data.favourites){
                    let song_dom = create_song_dom(song);
                    $('.favourite-songs').append(song_dom);
                    $(`.favourite-songs #song-${song.id} .song-info`).click((e) => {
                        play_song(song);
                    });

                    $(`.favourite-songs #song-${song.id} .song-options .fa-plus`).click((e) => {
                        add_to_queue({song:song});
                    });
                }     
            }else{
                
            }
        },
        error:(error) => {
            console.log(error);
        }
    });

    

    let play_song = async (curr_song) => {
        var player_play = document.querySelector(".bottom-player .fa-circle-play");
        var player_pause = document.querySelector(".bottom-player .fa-circle-pause");

        var song_play = document.querySelectorAll(".playing .fa-circle-play");
        var song_pause = document.querySelectorAll(".playing .fa-circle-pause");


        if (prev_song == curr_song.id) {


            // console.log(curr_song.id)
            if (song_track.paused) {
                await song_track.play();
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
            song_track.src = curr_song.path;
            await song_track.play();

            update_player(curr_song);

            add_to_recently_played(curr_song);
            // add_to_queue(curr_song.id);

            player_pause.style.display = 'block';
            player_play.style.display = 'none';

            var prev_play = document.querySelectorAll('.' + prev_song);
            var curr_play = document.querySelectorAll('.' + curr_song.id);
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
        prev_song = curr_song.id;
        return;
        
    }

    let update_player = (curr_song) => {
        var bottom_player = document.querySelector('.bottom-player');

        bottom_player.style.display = 'flex';

        var song_img = document.querySelector('.bottom-player .song-image');
        var song_name = document.querySelector('.bottom-player .song-name');
        var curr_time = document.querySelector('.bottom-player .current-time');
        var song_duration = document.querySelector('.bottom-player .song-duration');
        var time_slider = document.querySelector('.bottom-player .time-slider');

        clearInterval(timer);
        curr_time.textContent = '00:00';
        time_slider.value = 0;


        song_name.textContent = curr_song.name;
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

    let time_conversion = (time) => {
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

    var prev_song = null;
    // var curr_song.id = null;
    var song_track = new Audio("");
    var timer;

    // $('.profile-icon').click((e) => {
    //     e.preventDefault();
    //     // console.log($(this).attr('href'))
    //     history.pushState(null, 'profile', $('.profile-icon a').prop('href'));
    //     $.ajax({
    //         type:'get',
    //         url:$('.profile-icon a').prop('href'),
    //         success: async (data) => {
    //             // console.log(data);
    //             console.log($(data))
    //             // $('.container *').remove()
    //             // $('.container').append(data)
    //         }
    //     })
    // })
}