let mongoose = require('mongoose');

let developerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstName:{
            type: String,
            required: true
        },
        lastName:String
        },
    level: {
        type: String,
        required: true,
        validate: {
            validator: function (level) {
                if (level === 'Beginner' || level ==='Expert'){
                    return true;
                }
                else{
                    return false;
                }

            },
        }
    },
    address: {
        state:String,
        suburb: String,
        street: String,
        unit: Number
    }
});

developerSchema.pre('save',function(){
    this.level=this.level.toUpperCase();
});

module.exports = mongoose.model('Developer', developerSchema);