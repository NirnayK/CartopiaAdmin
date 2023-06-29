'use client';
import axios from 'axios';
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Form = (props) => {

    const {
        _id,
        name: existingName,
        price: existingPrice,
        description: existingDescription,
        category: existingCategory,
        company: existingCompany,
    } = props;

    const [name, setName] = useState(existingName || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [selectedCategory, setSelectedCategory] = useState(existingCategory || undefined);
    const [selectedCompany, setSelectedCompany] = useState(existingCompany || undefined);
    const [companies, setCompanies] = useState([]);
    const [categories, setCategories] = useState([]);
    const router = useRouter();

    console.log('existingName', existingName);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchCompanies = async () => {
            try {
                const response = await axios.get('/api/companies');
                setCompanies(response.data);
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        };

        fetchCategories();
        fetchCompanies();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name,
            price,
            description,
            category: selectedCategory,
            company: selectedCompany,
        };
        try {
            if (!_id) {
                await axios.post('/api/products', data);
                setName('');
                setPrice('');
                setDescription('');
                setSelectedCategory('');
                setSelectedCompany('');
            }
            else {
                await axios.put('/api/products/' + _id, data);
                router.push('/admin/products');
            }
        }
        catch (error) {
            console.error('Error submitting product:', error);
            // Display error message or perform any error handling
        }
    };



    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Product Name</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Product Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <div className="flex pl-0 p-4 gap-4">

                    <label htmlFor="category">Category:</label>
                    <select
                        id="category"
                        name="Category"
                        required
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>


                    <label htmlFor="company">Company:</label>
                    <select
                        id="company"
                        name="Company"
                        value={selectedCompany}
                        onChange={(e) => setSelectedCompany(e.target.value)}
                        required
                    >
                        <option value="">Select a company</option>
                        {companies.map((company) => (
                            <option key={company._id} value={company._id}>
                                {company.name}
                            </option>
                        ))}
                    </select>

                </div>


                <label htmlFor="price">Price in INR</label>
                <input
                    type="number"
                    id="price"
                    placeholder="Product Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />

                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="Description"
                    placeholder="Description"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button className="bg-green-500 text-white active:bg-green-600 btn mr-2" type="submit">
                    Save
                </button>
                <button type="button" className="bg-green-500 text-white active:bg-green-600 btn mr-2" onClick={() => router.back()}>
                    Back
                </button>
            </form >
        </>

    )
}

export default Form