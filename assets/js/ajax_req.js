{
    let album_id = $('.album-description').prop('id');

    $.ajax({
        type:'get',
        url:'/users/api/v1/song-list',
        success:(data) => {
            // console.log(album_id)
            let album = data.data[album_id];
            console.log(album)
            song_list = album.song_list;
            // console.log(song_list);
            let song_container = $('#song-container');
            // console.log(song_container)
            create_album_dom(album);
            for(let [key, song] of Object.entries(song_list)){
                let song_dom = create_song_dom(song);
                $(song_container).append(song_dom);
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

}