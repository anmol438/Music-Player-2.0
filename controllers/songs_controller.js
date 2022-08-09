const User = require('../models/user');
const track_data = require('../models/api/v1/track_data');

module.exports.playlist =  (req, res) => {
    return res.render('song_playlist', {
        album:req.params.album,
    });
};

module.exports.post_recently_played = async (req, res) => {
    if(req.xhr){
        if(req.isAuthenticated()){
            let song = req.body.song;
            let user = await User.findById(req.user._id);
            await user.updateOne({$pull:{recently_played:song}});
            await user.updateOne({$push:{recently_played:song}});
            
            return res.status(200).json({
               done:true,
               recently_played:user.recently_played
            });
        }else{
            return res.status(200).json({
                done:false
            });
        }
        
    }
}

module.exports.get_recently_played = async (req, res) => {
    if(req.xhr){
        if(req.isAuthenticated()){
            let user = await User.findById(req.user._id);
            let recently_played = user.recently_played;
            let data = [];
            for(let song_id of recently_played){
                for(let album in track_data){
                    if(track_data[album].song_list.hasOwnProperty(song_id)){
                        data.push(track_data[album].song_list[song_id]);
                    }
                }
            }            
            return res.status(200).json({
               done:true,
               recently_played:data
            });
        }else{
            return res.status(200).json({
                done:false
            });
        }
        
    }
}