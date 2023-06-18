import mongoose, { model, Schema, models } from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        uppercase: true,
        unique: true,
        required: true
    }
});

module.exports = models.Category || mongoose.model('Category', categorySchema);