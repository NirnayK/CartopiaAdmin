import mongoose, { model, Schema, models } from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        uppercase: true
    }
});

module.exports = models.Category || mongoose.model('Category', categorySchema);