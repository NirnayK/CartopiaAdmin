import mongoose, { model, models, Schema } from "mongoose";

const CategorySchema = new Schema({
    CategoryName: { type: String, required: true },
    parent: { type: mongoose.Types.ObjectId, ref: 'Category' },
    SubCategories: [{ type: Object }]
});

module.exports = models.Category || mongoose.model('Category', CategorySchema);
