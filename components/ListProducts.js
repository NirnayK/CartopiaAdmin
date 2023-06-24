'use client';
import { useState, useEffect } from 'react';
import SearchForm from '@/components/SearchForm';
import DisplayProducts from '@/components/DisplayProducts';
import axios from 'axios';


const ListProducts = () => {
    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await axios.get('/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error getting categories:', error);
            }
        };

        const getCompanies = async () => {
            try {
                const response = await axios.get('/api/companies');
                setCompanies(response.data);
            } catch (error) {
                console.error('Error getting companies:', error);
            }
        };

        const getProducts = async () => {
            try {
                const response = await axios.get('/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error getting products:', error);
            }
        };

        getCategories();
        getCompanies();
        getProducts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            search,
            category: selectedCategory,
            company: selectedCompany,
        };
        try {
            await axios.get('/api/products', data);
            // Display success message or perform any desired actions
        } catch (error) {
            console.error('Error submitting product:', error);
            // Display error message or perform any error handling
        }
    };

    const formProps = {
        search: search,
        setSearch: setSearch,
        categories: categories,
        selectedCategory: selectedCategory,
        setSelectedCategory: setSelectedCategory,
        companies: companies,
        selectedCompany: selectedCompany,
        setSelectedCompany: setSelectedCompany,
        handleSubmit: handleSubmit,
    };

    return (
        <>
            <SearchForm {...formProps} className="mb-2" />
            <DisplayProducts products={products} />
        </>
    );
};

export default ListProducts;