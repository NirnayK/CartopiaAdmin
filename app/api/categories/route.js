import { mongooseConnect } from "@/lib/mongoose.js"
import { Category } from "@/models/categories.js"


export const POST = async (req) => {
    console.log("I am here");
    try {
        await mongooseConnect();
        try {
            const newCategory = await Category.create(req.body);
            await newCategory.save();
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
