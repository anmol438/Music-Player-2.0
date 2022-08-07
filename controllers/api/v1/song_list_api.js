const data = require('../../../models/api/v1/track_data');

module.exports.song = (req, res) => {
    if(req.xhr){
        return res.status(200).json({
            data:data,
            message:"succes"
        });
    }
}