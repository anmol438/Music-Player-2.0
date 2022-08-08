const { use } = require('passport');
const User = require('../models/user');

module.exports.playlist =  (req, res) => {
    return res.render('song_playlist', {
        album:req.params.album,
    });
};

module.exports.recently_played = async (req, res) => {
    if(req.xhr){
        if(req.isAuthenticated()){
            let song = req.body.song;
            let user = await User.findByIdAndUpdate(req.user._id);
            await user.updateOne({$pull:{recently_played:song}});;
            await user.updateOne({$push:{recently_played:song}});
            
            return res.status(200).json({
                data:true
            });
        }else{
            return res.status(200).json({
                data:false
            });
        }
        
    }
}