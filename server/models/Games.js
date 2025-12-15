const mongoose = require('mongoose')

const GamesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    originalTitle: { type: String },
    category: { type: String },
    players: { type: String },
    time: { type: String },
    image: { type: String },
    icon: { type: String },
    description: { type: String },
    recommended: { type: Boolean }
}, {collection: 'games'})

const Games = mongoose.model('games', GamesSchema)

module.exports = Games