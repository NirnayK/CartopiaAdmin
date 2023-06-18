import { mongooseConnect } from "@/lib/mongoose.js";
import Company from "@/models/company.js";

export const POST = async (req) => {
    try {
        const jsonData = await req.json();
        const { nameCompany } = jsonData;
        await mongooseConnect();

        try {
            const newCompany = await Company.create({ name: nameCompany });
            return new Response(JSON.stringify(newCompany), { status: 201 });
        }
        catch (error) {
            console.log("Error in creating a new company");
            console.error(error);
            return new Response(JSON.stringify(error), { status: 500 });
        }
    }
    catch (error) {
        console.log("Error in connecting to the database");
        console.error(error);
        return new Response(JSON.stringify(error), { status: 501 });
    }
};

export const GET = async (req) => {
    try {
        await mongooseConnect();
        try {
            const companies = await Company.find();
            return new Response(JSON.stringify(companies), { status: 200 });
        }
        catch (error) {
            console.error(error);
            return new Response(JSON.stringify(error), { status: 500 });
        }
    }
    catch (error) {
        console.error(error);
        return new Response(JSON.stringify(error), { status: 501 });
    }
}
