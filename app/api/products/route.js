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