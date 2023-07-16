import { mongooseConnect } from "@/lib/mongoose.js";
import Product from "@/models/products.js";

export const POST = async (req) => {
    try {
        const jsonData = await req.json();
        const { name, price, description, category, properties, images } = jsonData;
        console.log(images);
        await mongooseConnect();

        try {
            const NewProduct = await Product.create({
                name,
                price,
                description,
                category,
                properties,
                images,
            });
            console.log("New Product Created", NewProduct);
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
            const products = await Product.find().populate({ path: 'category', select: 'name', });
            return new Response(JSON.stringify(products), { status: 200 });
        }
        catch (error) {
            console.error(error);
            return new Response(JSON.stringify(error), { status: 500 });
        }
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify(error), { status: 501 });
    }
};

