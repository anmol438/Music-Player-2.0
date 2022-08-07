module.exports.playlist =  (req, res) => {
    return res.render('song_playlist', {
        album:req.params.album,
    });
}