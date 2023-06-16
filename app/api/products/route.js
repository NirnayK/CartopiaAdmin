import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
    const client = clientPromise;
    try {
        const db = client.db('products');
        const itemsCollection = db.collection('items');

        if (req.method === 'GET') {
            // Handle GET request to fetch all items
            try {
                const items = await itemsCollection.find().toArray();

                res.status(200).json(items);
            } catch (error) {
                console.error('Error fetching items:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
        else if (req.method === 'POST') {
            // Handle POST request to create an item
            const { name, price, description, category, company } = req.body;

            try {
                // Check if the product with the same name already exists
                const existingItem = await itemsCollection.findOne({ name });
                if (existingItem) {
                    res.status(400).json({ message: 'Product already exists' });
                    return;
                }

                const newItem = {
                    name,
                    price,
                    description,
                    category,
                    company,
                };

                await itemsCollection.insertOne(newItem);

                res.status(201).json({ message: 'Item created successfully' });
            } catch (error) {
                console.error('Error creating item:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
        else if (req.method === 'PUT') {
            // Handle PUT request to update an item
            const { id, name, price, description, category, company } = req.body;

            try {
                const updatedItem = {
                    name,
                    price,
                    description,
                    category,
                    company,
                };

                await itemsCollection.updateOne({ _id: id }, { $set: updatedItem });

                res.status(200).json({ message: 'Item updated successfully' });
            } catch (error) {
                console.error('Error updating item:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
        else if (req.method === 'DELETE') {
            // Handle DELETE request to delete an item
            const { id } = req.body;

            try {
                await itemsCollection.deleteOne({ _id: id });

                res.status(200).json({ message: 'Item deleted successfully' });
            } catch (error) {
                console.error('Error deleting item:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
        else {
            res.status(405).json({ message: 'Method Not Allowed' });
        }
    }
    catch (error) {
        console.error('Error connecting to database:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
