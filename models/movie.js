const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema (
    {
        image: {
            type: String,
            required: true,
        },
        movie_title: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
    }
)