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
