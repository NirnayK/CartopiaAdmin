'use client';
import Form from '@/components/Form';
import axios from 'axios';
import { useState } from 'react';

const ComCat = () => {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { name };
        console.log(data);
        try {
            await axios.post('/api/companies', data);
            console.log(data);
            // Clear form inputs after successful submission
            setName('');
        }
        catch (error) {
            console.error('Error submitting companies name:', error);
        }
    };

    const formdata = {
        name: name,
        setName: setName,
        enableCategory: false,
        enableCompany: false,
        enablePrice: false,
        enableDescription: false,
    }


    return (
        <div className='flex flex-col gap-5'>
            <Form {...formdata} title="Company" />
            <Form {...formdata} title="Category" />
        </div>
    )
}

export default ComCat