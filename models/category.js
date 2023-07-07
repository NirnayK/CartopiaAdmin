import mongoose, { model, models, Schema } from "mongoose";

const CategorySchema = new Schema({
    name: { type: String, required: true },
    values: [{ type: Object, required: true }],
});

module.exports = models.Category || mongoose.model('Category', CategorySchema);
