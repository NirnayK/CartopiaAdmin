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
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products');
                console.log('response.data:', response.data);
                const { company, category, product } = response.data;
                setCompanies(company);
                setCategories(category);
                const reformattedProducts = await formatProducts(product);
                setProducts(reformattedProducts);
                console.log(products);
            }
            catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const formatProducts = (products) => {
        return products.map((product) => {
            return {
                ...product,
                category_name: getCategoryName(product.category),
                company_name: getCompanyName(product.company),
            };
        });
    };

    const getCategoryName = (categoryId) => {
        const category = categories.find((category) => category._id === categoryId);
        return category ? category.name : '';
    };

    const getCompanyName = (companyId) => {
        const company = companies.find((company) => company._id === companyId);
        return company ? company.name : '';
    };

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


