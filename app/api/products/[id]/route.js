import { mongooseConnect } from "@/lib/mongoose.js";
import Product from "@/models/products.js";

export const GET = async (req, { params }) => {
    try {
        await mongooseConnect();
        try {
            const product = await Product.findById(params.id);
            if (!product) return new Response("Prdouct Not Found", { status: 404 });
            return new Response(JSON.stringify(product), { status: 200 });
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
};

export const PUT = async (req, { params }) => {
    try {
        await mongooseConnect();
        try {
            const product = await Product.findById(params.id);
            if (!product) return new Response("Prdouct Not Found", { status: 404 });
            const data = await req.json();
            product.name = data.name;
            product.price = data.price;
            product.description = data.description;
            product.category = data.category;
            product.company = data.company;
            await product.save();
            return new Response(JSON.stringify(product), { status: 200 });
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
};

export const DELETE = async (req, { params }) => {
    try {
        await mongooseConnect();
        try {
            await Product.deleteOne({ _id: params.id });
            return new Response("Product deleted successfully", { status: 200 });
        }
        catch (error) {
            console.log('here 1');
            console.error(error);
            return new Response(JSON.stringify(error), { status: 500 });
        }

    }
    catch (error) {
        console.log('here 2');
        console.error(error);
        return new Response(JSON.stringify(error), { status: 501 });
    }
};
