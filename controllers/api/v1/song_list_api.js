const songs = require('../../../models/api/v1/song_list');

module.exports.song = (req, res) => {
    console.log(songs);
    return res.redirect('back');
    // return res.status(200).json(songs.song_list);
}