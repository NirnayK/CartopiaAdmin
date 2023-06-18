'use client';
import Form from '@/components/Form';
import axios from 'axios';
import { useState } from 'react';

const CategoryCompany = () => {
    const [nameCompany, setNameCompany] = useState('');
    const [nameCategory, setNameCategory] = useState('');

    const handleCompany = async (e) => {
        e.preventDefault();
        const data = { nameCompany };
        try {
            await axios.post('/api/companies', data);
            // Clear form inputs after successful submission
            setNameCompany('');
        }
        catch (error) {
            console.error('Error submitting companies name:', error);
        }
    };

    const handleCategory = async (e) => {
        e.preventDefault();
        const data = { nameCategory };
        console.log('data', data);
        try {
            await axios.post('/api/categories', data);
            // Clear form inputs after successful submission
            setNameCategory('');
        }
        catch (error) {
            console.error('Error submitting categories name:', error);
        }
    };

    const formdata = {
        enableCategory: false,
        enableCompany: false,
        enablePrice: false,
        enableDescription: false,
    }

    return (
        <div className='flex flex-col gap-5'>
            <Form
                {...formdata}
                title="Company"
                handleSubmit={handleCompany}
                name={nameCompany}
                setName={setNameCompany}
            />
            <Form
                {...formdata}
                title="Category"
                handleSubmit={handleCategory}
                name={nameCategory}
                setName={setNameCategory}
            />
        </div>
    )
}

export default CategoryCompany