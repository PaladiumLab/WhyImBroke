const mongoose = require('mongoose');

const accountsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    password: {      // Store hashed passwords and don't include in any queries!
        type: String,
        required: true,
        select: false
    },
    name: {
        type: String,
        required: true
    },
});
module.exports = mongoose.model('Accounts', accountsSchema);