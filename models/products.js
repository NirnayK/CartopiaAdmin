import mongoose, { model, Schema, models } from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        uppercase: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true,
    },
    properties: [{ type: Object }]
});

module.exports = models.Product || mongoose.model('Product', productSchema);