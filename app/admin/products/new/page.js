'use client';
import Form from '@/components/Form';
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
            category: selectedCategory,
            company: selectedCompany
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
        }
        catch (error) {
            console.error('Error submitting product:', error);
            // Display error message or perform any error handling
        }
    };

    const formdata = {
        title: "Product",
        name: name,
        setName: setName,
        price: price,
        setPrice: setPrice,
        description: description,
        setDescription: setDescription,
        categories: categories,
        selectedCategory: selectedCategory,
        setSelectedCategory: setSelectedCategory,
        companies: companies,
        selectedCompany: selectedCompany,
        setSelectedCompany: setSelectedCompany,
        handleSubmit: handleSubmit,
        enableCategory: true,
        enableCompany: true,
        enablePrice: true,
        enableDescription: true,
    }

    return (
        <Form {...formdata} />
    );
};

export default NewProduct;
