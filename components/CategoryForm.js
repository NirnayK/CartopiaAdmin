'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import DynamicPropertyInput from './DynamicPropertyInput';

const CategoryForm = ({ data, method }) => {
    const [name, setName] = useState(data ? data.name : '');
    const [values, setValues] = useState(data ? data.values : [{ name: 'Brand', values: [''] }]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        try {
            await axios.delete('/api/categories/' + data._id);
            router.push('/admin/categories');
        } catch (error) {
            console.error('Error deleting category:', error);
            // Display error message or perform any error handling
        }
    };

    const handleConfirmation = (confirmed) => {
        setShowConfirmation(false);
        if (confirmed) {
            handleDelete();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (method === 'DELETE') {
            setShowConfirmation(true);
        } else {
            const DATA = { name, values };
            if (method === 'POST') {
                try {
                    await axios.post('/api/categories', DATA);
                    setName('');
                    setValues([{ name: '', values: [''] }]);
                } catch (error) {
                    console.error('Error creating category:', error);
                    // Display error message or perform any error handling
                }
            }
            else {
                try {
                    await axios.put('/api/categories/' + data._id, DATA);
                    router.push('/admin/categories');
                } catch (error) {
                    console.error('Error updating category:', error);
                    // Display error message or perform any error handling
                }
            }
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                onKeyDown={(e) => { e.key === "Enter" && e.preventDefault(); }}
            >

                <label className="block mb-1" htmlFor="CategoryName">
                    Category Name:
                </label>
                <input
                    className="mb-4 w-full"
                    type="text"
                    id="CategoryName"
                    placeholder="Category Name"
                    required
                    value={name}
                    readOnly={method === 'DELETE'}
                    onChange={(e) => setName(e.target.value)}
                />

                <DynamicPropertyInput values={values} setValues={setValues} method={method} />

                <div className="mt-4">
                    <button className="bg-green-500 text-white hover:bg-green-600 w-28 btn mr-2" type="submit">
                        {method === 'POST' ? 'Create' : method === 'PUT' ? 'Update' : 'Delete'}
                    </button>
                    <button type="button" className="bg-gray-500 text-white hover:bg-gray-600 w-28 btn" onClick={() => router.back()}>
                        Back
                    </button>
                </div>

            </form>

            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-20 z-50">
                    <div className="bg-slate-200 p-4 rounded-xl">
                        <p className="text-center mb-1">Are you sure you want to delete?</p>
                        <b>
                            <h2 className="text-center text-lg mb-4">{name}</h2>
                        </b>
                        <div className="flex gap-2 justify-evenly">
                            <button className="bg-red-500 text-white hover:bg-red-600 btn mr-2" onClick={() => handleConfirmation(true)}>
                                Yes
                            </button>
                            <button className="bg-green-500 text-white hover:bg-green-600 btn" onClick={() => handleConfirmation(false)}>
                                Go Back
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CategoryForm;

