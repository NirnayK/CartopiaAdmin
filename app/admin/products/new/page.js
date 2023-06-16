'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';

const NewProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState('');

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
            category: selectedCategory._id || selectedCategory,
            company: selectedCompany._id || selectedCompany,
        };

        try {
            await axios.post('/api/products', data);
            // Clear form inputs after successful submission
            setName('');
            setPrice('');
            setDescription('');
            setSelectedCategory('');
            setSelectedCompany('');
            // Display success message or perform any desired actions
        } catch (error) {
            console.error('Error submitting product:', error);
            // Display error message or perform any error handling
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="text-xl font-semibold mb-2">New Product</h1>

            <label htmlFor="name">Product Name</label>
            <input
                type="text"
                id="name"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="category">Category</label>
            <select
                id="category"
                name="Category"
                required
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                <option value="">Select a category</option>
                {categories.map((category) => (
                    <option key={category.id} value={category}>
                        {category.name}
                    </option>
                ))}
            </select>

            <label htmlFor="company">Company</label>
            <select
                id="company"
                name="Company"
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                required
            >
                <option value="">Select a company</option>
                {companies.map((company) => (
                    <option key={company.id} value={company}>
                        {company.name}
                    </option>
                ))}
            </select>

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

            <button className="bg-green-500 text-white active:bg-green-600" type="submit">
                Save
            </button>
        </form>
    );
};

export default NewProduct;
