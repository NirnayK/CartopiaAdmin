import { mongooseConnect } from "@/lib/mongoose.js"
import Company from "@/models/company.js"
import { json } from "express";

export const POST = async (req) => {
    console.log("I am here");
    try {
        const jsonData = await req.json();
        const { name } = jsonData;
        console.log(jsonData);
        await mongooseConnect();
        try {
            const newCompany = await Company.create({ name: name });
            console.log(JSON.stringify(newCompany));
            return new Response(JSON.stringify(newCompany), { status: 201 });
        }
        catch (error) {
            console.error("Schema failed");
            console.error(error);
            return new Response(JSON.stringify(error), { status: 500 });
        }
    }
    catch (error) {
        console.error("Connect failed");
        return new Response(JSON.stringify(error), { status: 501 });
    }
}
