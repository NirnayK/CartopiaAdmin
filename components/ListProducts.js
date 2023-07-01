'use client';
import { useState, useEffect } from 'react';
import SearchForm from '@/components/SearchForm';
import DisplayItems from '@/components/DisplayItems';
import axios from 'axios';


const ListProducts = () => {
    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    // useEffect(() => {
    //     const getCategories = async () => {
    //         try {
    //             const response = await axios.get('/api/categories');
    //             setCategories(response.data);
    //         } catch (error) {
    //             console.error('Error getting categories:', error);
    //         }
    //     };

    //     const getCompanies = async () => {
    //         try {
    //             const response = await axios.get('/api/companies');
    //             setCompanies(response.data);
    //         } catch (error) {
    //             console.error('Error getting companies:', error);
    //         }
    //     };

    //     const getProducts = async () => {
    //         try {
    //             const response = await axios.get('/api/products');
    //             setProducts(response.data);
    //             setFilteredProducts(response.data);
    //         } catch (error) {
    //             console.error('Error getting products:', error);
    //         }
    //     };

    //     getCategories();
    //     getCompanies();
    //     getProducts();
    // }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const filtered = products.filter((product) => {
            const isMatch =
                (search === '' || product.name.includes(search.toUpperCase())) &&
                (selectedCompany === 'ALL' || product.company._id === selectedCompany) &&
                (selectedCategory === 'ALL' || product.category._id === selectedCategory);
            // console.log('search', (search === '' || product.name.includes(search.toUpperCase())))
            // console.log('company', (selectedCompany === 'ALL' || product.company._id === selectedCompany))
            // console.log('category', (selectedCategory === 'ALL' || product.category._id === selectedCategory))
            return isMatch;
        });
        setFilteredProducts(filtered);
    };


    const formProps = {
        search: search,
        setSearch: setSearch,
        categories: categories,
        selectedCategory: selectedCategory,
        setSelectedCategory: setSelectedCategory,
        handleSubmit: handleSubmit,
    };

    return (
        <>
            <SearchForm {...formProps} className="mb-2" />
            <DisplayItems products={filteredProducts} />
        </>
    );
};

export default ListProducts;