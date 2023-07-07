'use client';
import axios from 'axios';
import { useState, useEffect } from 'react'
import DisplayItems from '@/components/DisplayItems';


const ListCategories = () => {
    const [search, setSearch] = useState('')
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await axios.get('/api/categories');
                setCategories(response.data);
                setFilteredCategories(response.data);
            }
            catch (error) {
                console.error('Error getting categories:', error);
            }
        };

        getCategories();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const filtered = categories.filter((category) => {
            return search === '' || category.name.toUpperCase().startsWith(search.toUpperCase());
        });
        setFilteredCategories(filtered);
    };


    return (
        <>
            <form className="flex justify-between gap-2 items-center" onSubmit={handleSubmit}>
                <input
                    className="mb-2 w-full"
                    type="text"
                    id="name"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className="bg-green-500 text-white hover:bg-green-600 btn mr-2" type="submit">
                    Search
                </button>
            </form >
            {filteredCategories && <DisplayItems items={filteredCategories} source={'categories'} headings={['Category Name']} />}
        </>
    );
}

export default ListCategories