const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    title: String,
    description: String,
    type: { type: String, enum: ['Book', 'CD', 'DVD'] },
    owner: String, // This could be the user's ID or email
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Offer', offerSchema);
