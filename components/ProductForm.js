'use client';
import axios from 'axios';
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Form = (props) => {

    const {
        _id,
        name: existingName,
        price: existingPrice,
        description: existingDescription,
        category: existingCategory,
        method,
    } = props;

    const [name, setName] = useState(existingName || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(existingCategory || undefined);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const router = useRouter();

    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         try {
    //             const response = await axios.get('/api/categories');
    //             setCategories(response.data);
    //         } catch (error) {
    //             console.error('Error fetching categories:', error);
    //         }
    //     };

    //     fetchCategories();
    // }, []);

    const handleDelete = async () => {
        try {
            await axios.delete('/api/products/' + _id);
            router.push('/admin/products');
        }
        catch (error) {
            console.error('Error deleting product:', error);
            // Display error message or perform any error handling
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (method === 'DELETE') {
            setShowConfirmation(true);
        } else {
            const data = {
                name,
                price,
                description,
                category: selectedCategory,
                company: selectedCompany,
            };
            try {
                if (method === 'POST') {
                    await axios.post('/api/products', data);
                    setName('');
                    setPrice('');
                    setDescription('');
                    setSelectedCategory('');
                    setSelectedCompany('');
                } else if (method === 'PUT') {
                    await axios.put('/api/products/' + _id, data);
                    router.push('/admin/products');
                }
            } catch (error) {
                console.error('Error submitting product:', error);
                // Display error message or perform any error handling
            }
        }
    };

    const handleConfirmation = (confirmed) => {
        setShowConfirmation(false);
        if (confirmed) {
            handleDelete();
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                <label className='block mb-1' htmlFor="name">Product Name</label>
                <input
                    className='mb-2 w-full'
                    type="text"
                    id="name"
                    placeholder="Product Name"
                    required
                    value={name}
                    readOnly={method === 'DELETE'}
                    onChange={(e) => setName(e.target.value)}
                />

                <div className="flex pl-0 p-4 gap-4">

                    <label className='block mb-1' htmlFor="category">Category:</label>
                    <select
                        id="category"
                        name="Category"
                        required
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option
                            value=""
                            disabled={method === 'DELETE'}
                        >
                            Select a category
                        </option>
                        {categories.map((category) => (
                            <option
                                key={category._id}
                                value={category._id}
                                disabled={method === 'DELETE'}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>


                <label className='block mb-1' htmlFor="price">Price in INR</label>
                <input
                    type="number"
                    className='mb-2'
                    id="price"
                    placeholder="Product Price"
                    value={price}
                    readOnly={method === 'DELETE'}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />

                <label className='block mb-1' htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="Description"
                    placeholder="Description"
                    required
                    value={description}
                    readOnly={method === 'DELETE'}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button className="bg-green-500 text-white active:bg-green-600 w-28 btn mr-2" type="submit">
                    {method === 'POST' ? 'Create' : method === 'PUT' ? 'Update' : 'Delete'}
                </button>
                <button type="button" className="bg-green-500 text-white active:bg-green-600 w-28 btn" onClick={() => router.back()}>
                    Back
                </button>
            </form >


            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-20 z-50">
                    <div className="bg-slate-200 p-4 rounded-xl">
                        <p className="text-center mb-1">Are you sure you want to delete?</p>
                        <b><h2 className="text-center text-lg mb-4">{name}</h2></b>
                        <div className="flex gap-2 justify-evenly">
                            <button className="bg-red-500 text-white active:bg-red-600 btn mr-2" onClick={() => handleConfirmation(true)}>
                                Yes
                            </button>
                            <button className="bg-green-500 text-white active:bg-green-600 btn" onClick={() => handleConfirmation(false)}>
                                Go Back
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>

    )
}

export default Form