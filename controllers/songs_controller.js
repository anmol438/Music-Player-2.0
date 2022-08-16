const User = require('../models/user');
const track_data = require('../models/api/v1/track_data');

module.exports.playlist =  (req, res) => {
    let album = track_data[req.params.album].name
    return res.render('song_playlist', {
        album:req.params.album,
        title: album
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
};

module.exports.post_queued = async (req, res) => {
    if(req.xhr){
        if(req.isAuthenticated()){
            let song_list = req.body.song_list;
            let user = await User.findById(req.user._id);
            for(let [key, song] of Object.entries(song_list)){
                await user.updateOne({$pull:{queued:song.id}});
                await user.updateOne({$push:{queued:song.id}});
            }
            return res.status(200).json({
               done:true,
               queued:user.queued
            });
        }else{
            return res.status(200).json({
                done:false
            });
        }
        
    }
};

module.exports.get_queued = async (req, res) => {
    if(req.xhr){
        if(req.isAuthenticated()){
            let user = await User.findById(req.user._id);
            let queued = user.queued;
            let data = [];
            for(let song_id of queued){
                for(let album in track_data){
                    if(track_data[album].song_list.hasOwnProperty(song_id)){
                        data.push(track_data[album].song_list[song_id]);
                    }
                }
            }            
            return res.status(200).json({
               done:true,
               queued:data
            });
        }else{
            return res.status(200).json({
                done:false
            });
        }
        
    }
};

module.exports.post_favourites = async (req, res) => {
    if(req.xhr){
        if(req.isAuthenticated()){
            let song = req.body.song;
            let user = await User.findById(req.user._id);
            if(user.favourites.findIndex((element) => {
                return (song==element);
            }) == -1){
                await user.updateOne({$push:{favourites:song}});  
                return res.status(200).json({
                    done:true,
                    favourites:user.favourites
                 });          
            }
        }
            return res.status(200).json({
                done:false
            });
        
    }
};

module.exports.get_favourites = async (req, res) => {
    if(req.xhr){
        if(req.isAuthenticated()){
            let user = await User.findById(req.user._id);
            let favourites = user.favourites;
            let data = [];
            for(let song_id of favourites){
                for(let album in track_data){
                    if(track_data[album].song_list.hasOwnProperty(song_id)){
                        data.push(track_data[album].song_list[song_id]);
                    }
                }
            }            
            return res.status(200).json({
               done:true,
               favourites:data
            });
        }else{
            return res.status(200).json({
                done:false
            });
        }
        
    }
};