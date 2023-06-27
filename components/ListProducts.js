'use client';
import { useState, useEffect } from 'react';
import SearchForm from '@/components/SearchForm';
import DisplayProducts from '@/components/DisplayProducts';
import axios from 'axios';


const ListProducts = () => {
    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState('ALL');
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

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
                setFilteredProducts(response.data);
            } catch (error) {
                console.error('Error getting products:', error);
            }
        };

        getCategories();
        getCompanies();
        getProducts();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const filtered = products.filter((product) => {

            const isMatch =
                (search === '' || product.name.toLowerCase().includes(search.toLowerCase())) &&
                (selectedCategory === 'ALL' || product.category === selectedCategory) &&
                (selectedCompany === 'ALL' || product.company === selectedCompany);
            // console.log('isMatch:', isMatch);
            // console.log('selectedCategory:', selectedCategory);
            return isMatch;
        });
        // console.log('filtered:', filtered);
        // console.log('selectedCategory:', selectedCategory);
        setFilteredProducts(filtered);
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
            <DisplayProducts products={filteredProducts} />
        </>
    );
};

export default ListProducts;