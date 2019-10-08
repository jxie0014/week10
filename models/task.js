let mongoose = require('mongoose');

let taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    assignto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developer'
    },
    due: Date,
    status: {
        type: String,
        validate: {
            validator: function (status) {
                if (status === 'Complete' || status ==='In Progress'){
                    return true;
                }
                else{
                    return false;
                }

            },
        }
    },
    desc: String
});

module.exports = mongoose.model('Task', taskSchema);