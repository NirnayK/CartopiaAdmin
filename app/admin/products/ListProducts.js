'use client';
import { useState, useEffect } from 'react';
import SearchForm from './SearchForm';
import DisplayItemsTable from '@/components/DisplayItemsTable';
import axios from 'axios';


const ListProducts = () => {
    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategoryValues, setSelectedCategoryValues] = useState(null);
    const [properties, setProperties] = useState({});


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

    };

    const handleCategoryChange = (e) => {
        e.preventDefault();
        const selectedCategoryId = e.target.value;
        setSelectedCategory(selectedCategoryId);

        // Find the selected category
        if (selectedCategoryId === '') {
            setSelectedCategoryValues(null);
            setProperties({});
            return;
        }
        const currentSelectedCategory = categories.find((category) => category._id === selectedCategoryId);

        setSelectedCategoryValues(currentSelectedCategory.values);

        // Create properties object with empty values
        const updatedProperties = {};
        currentSelectedCategory.values.forEach((property) => {
            updatedProperties[property.name] = '';
        });

        setProperties(updatedProperties);
    };

    const formProps = {
        search: search,
        setSearch: setSearch,
        categories: categories,
        selectedCategory: selectedCategory,
        handleSubmit: handleSubmit,
        handleCategoryChange: handleCategoryChange,
        selectedCategoryValues: selectedCategoryValues,
        properties: properties,
        setProperties: setProperties,
    };

    return (
        <div className='space-y-3'>
            <SearchForm {...formProps} />
            <DisplayItemsTable items={filteredProducts} source={"products"} headings={["Product Name", "Category", "Company"]} />
        </div>
    );
};

export default ListProducts;