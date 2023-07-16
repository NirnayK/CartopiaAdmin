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
        const data = await req.json();
        console.log(data.images);
        await mongooseConnect();
        try {
            const updatedProduct = await Product.findOneAndUpdate(
                { _id: params.id },
                {
                    $set: {
                        name: data.name,
                        price: data.price,
                        description: data.description,
                        category: data.category,
                        properties: data.properties,
                        images: data.images,
                    }
                },
                { new: true } // To return the updated document
            );
            console.log(updatedProduct);
            return new Response(JSON.stringify(updatedProduct), { status: 200 });
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
