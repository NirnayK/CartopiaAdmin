import clientPromise from "@/lib/mongodb";

const client = clientPromise;

export async function GET(req) {
    try {
        const db = client.db('products');
        const categoriesCollection = db.collection('category_names');

        const categories = await categoriesCollection.find().toArray();
        res.status(200).json(categories);
    }
    catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function POST(req, res) {
    const { name } = req.body;

    try {
        // Check if the category with the same name already exists
        const dab = client.db('products');
        const categoriesCollection = dab.collection('category_names');
        const existingCategory = await categoriesCollection.findOne({ name });

        if (existingCategory) {
            res.status(400).json({ message: 'Category already exists' });
            return;
        }

        const newCategory = { name };
        await categoriesCollection.insertOne(newCategory);
        res.status(201).json({ message: 'Category created successfully' });
    }
    catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function PUT(req, res) {
    const { id, name } = req.body;

    try {
        const db = client.db('products');
        const categoriesCollection = db.collection('category_names');
        const updatedCategory = { name };

        await categoriesCollection.updateOne({ _id: id }, { $set: updatedCategory });
        res.status(200).json({ message: 'Category updated successfully' });
    }
    catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function DELETE(req, res) {
    const { id } = req.body;

    try {
        const db = client.db('products');
        const categoriesCollection = db.collection('category_names');

        await categoriesCollection.deleteOne({ _id: id });
        res.status(200).json({ message: 'Category deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
