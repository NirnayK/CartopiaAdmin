'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import CategoryForm from '@/components/CategoryForm';

const CategoryDelete = ({ params }) => {
    const [category, setCategory] = useState(null);
    useEffect(() => {
        const getCategory = async () => {
            try {
                const res = await axios.get('/api/categories/' + params.id);
                setCategory(res.data);
            }
            catch (error) {
                console.error('Error fetching category:', error);
            }
        }
        getCategory();
    }, [params.id]);

    return (
        <>
            {category &&
                <>
                    <h1 className="text-xl font-semibold mb-2">Delete Category</h1>
                    <CategoryForm data={category} method="DELETE" />
                </>}
        </>
    )
}

export default CategoryDelete