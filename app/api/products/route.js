import { mongooseConnect } from "@/lib/mongoose.js";
import Product from "@/models/products.js";

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
        try {
            const { categoryId, companyId } = req.query;

            let products;

            if (categoryId) {
                // Fetch products filtered by category ID and populate the associated category and company details
                products = await Product.find({ category: categoryId }).populate('category').populate('company');
            } else if (companyId) {
                // Fetch products filtered by company ID and populate the associated category and company details
                products = await Product.find({ company: companyId }).populate('category').populate('company');
            } else {
                // Fetch all products and populate the associated category and company details
                products = await Product.find().populate('category').populate('company');
            }

            return new Response(JSON.stringify(products), { status: 200 });
        } catch (error) {
            console.error(error);
            return new Response(JSON.stringify(error), { status: 500 });
        }
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify(error), { status: 501 });
    }
};

