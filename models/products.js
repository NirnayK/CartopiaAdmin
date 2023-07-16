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
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    properties: {
        type: Object,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
});

module.exports = models.Product || mongoose.model('Product', productSchema);