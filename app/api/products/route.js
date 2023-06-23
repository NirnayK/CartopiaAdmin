import { mongooseConnect } from "@/lib/mongoose.js";
import Product from "@/models/products.js";
import Category from "@/models/categories.js";
import Company from "@/models/company.js";

export const POST = async (req) => {
    try {
        const jsonData = await req.json();
        const { name, price, description, category, company } = jsonData;
        await mongooseConnect();

        try {
            const NewProduct = await Product.create({
                name,
                price,
                description,
                category,
                company
            });
            return new Response(JSON.stringify(NewProduct), { status: 201 });
        }
        catch (error) {
            console.log("Error in creating a new product");
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
        // if (req.queryString == "") {
        try {
            const product = await Product.find();
            const category = await Category.find();
            const company = await Company.find();
            const reformattedProducts = { product, category, company };
            // console.log("reformattedProducts:", reformattedProducts);
            return new Response(JSON.stringify(reformattedProducts), { status: 200 });
        }
        catch (error) {
            console.error(error);
            return new Response(JSON.stringify(error), { status: 500 });
        }
        // }
    }
    catch (error) {
        console.error(error);
        return new Response(JSON.stringify(error), { status: 501 });
    }
}