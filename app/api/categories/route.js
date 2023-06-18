import { mongooseConnect } from "@/lib/mongoose.js"
import Category from "@/models/categories.js"

export const POST = async (req) => {
    try {
        const jsonData = await req.json();
        const { nameCategory } = jsonData;
        await mongooseConnect();

        try {
            const newCategory = await Category.create({ name: nameCategory });
            return new Response(JSON.stringify(newCategory), { status: 201 });
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

export const GET = async (req) => {
    try {
        await mongooseConnect();
        // if req.body === null then return all categories
        try {
            const categories = await Category.find();
            return new Response(JSON.stringify(categories), { status: 200 });
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
