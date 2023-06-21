import mongoose, { model, Schema, models } from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        uppercase: true,
        unique: true,
        required: true
    }
});

const Company = models.Company || mongoose.model('Company', companySchema);

export default Company;