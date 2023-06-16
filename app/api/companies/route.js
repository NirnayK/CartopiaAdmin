import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
    const client = clientPromise;
    try {
        const db = client.db('products');
        const companiesCollection = db.collection('company_names');

        if (req.method === 'GET') {
            // Handle GET request to fetch all companies
            try {
                const companies = await companiesCollection.find().toArray();
                res.status(200).json(companies);
            } catch (error) {
                console.error('Error fetching companies:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
        else if (req.method === 'POST') {
            // Handle POST request to create a company
            const { name } = req.body;

            try {
                const newCompany = { name };
                await companiesCollection.insertOne(newCompany);
                res.status(201).json({ message: 'Company created successfully' });
            } catch (error) {
                console.error('Error creating company:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
        else if (req.method === 'PUT') {
            // Handle PUT request to update a company
            const { id, name } = req.body;

            try {
                const updatedCompany = { name };
                await companiesCollection.updateOne({ _id: id }, { $set: updatedCompany });
                res.status(200).json({ message: 'Company updated successfully' });
            } catch (error) {
                console.error('Error updating company:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
        else if (req.method === 'DELETE') {
            // Handle DELETE request to delete a company
            const { id } = req.body;

            try {
                await companiesCollection.deleteOne({ _id: id });
                res.status(200).json({ message: 'Company deleted successfully' });
            } catch (error) {
                console.error('Error deleting company:', error);
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
