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

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await axios.get('/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error getting categories:', error);
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
        getProducts();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const filtered = products.filter((product) => {
            const isMatch =
                (search === '' || category.name.toUpperCase().startsWith(search.toUpperCase())) &&
                (selectedCategory === 'ALL' || product.category._id === selectedCategory);
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
            <DisplayItems items={filteredProducts} source={"products"} headings={["Product Name", "Category", "Company"]} />
        </>
    );
};

export default ListProducts;