'use client';
import axios from 'axios';
import { useState } from 'react';

const ComCat = () => {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { name };

        try {
            await axios.post('/api/categories', data);
            // Clear form inputs after successful submission
            setName('');
            // Display success message or perform any desired actions
        } catch (error) {
            console.log('Yes the issue is in here.');
            console.error('Error submitting company name:', error);
            // Display error message or perform any error handling
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <h1 className="text-xl font-semibold mb-2">New Company</h1>

            <label htmlFor="name">Company Name</label>
            <input
                type="text"
                id="name"
                placeholder="Company Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button className="bg-green-500 text-white active:bg-green-600" type="submit">
                Save
            </button>
        </form>
    )
}

export default ComCat