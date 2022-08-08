const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        },

        name:{
            type: String,
            required: true
        },
        recently_played:[
            {
                type:String,
            }
        ],
        queued:[
            {
                type:String,
            }
        ],
        favourites:[
            {
                type:String,
            }
        ],
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('user', userSchema);

module.exports = User;