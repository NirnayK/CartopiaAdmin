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
        properties: existingProperties,
        method,
    } = props;

    const [name, setName] = useState(existingName || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setselectedCategory] = useState(existingCategory || '');
    const [selectedCategoryValues, setselectedCategoryValues] = useState(null);
    const [properties, setProperties] = useState(existingProperties || {});
    const [showConfirmation, setShowConfirmation] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/categories');
                setCategories(response.data);
                if (existingCategory) {
                    const currentSelectedCategory = response.data.find((category) => category._id === existingCategory);
                    setselectedCategoryValues(currentSelectedCategory.values);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

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
        }
        else {
            const data = {
                name,
                price,
                description,
                category: selectedCategory,
                properties
            };
            try {
                if (method === 'POST') {
                    await axios.post('/api/products', data);
                    setName('');
                    setPrice('');
                    setDescription('');
                    setselectedCategory('');
                    setselectedCategoryValues(null);
                    setProperties({});
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

    const handleCategoryChange = (e) => {
        e.preventDefault();
        const selectedCategoryId = e.target.value;
        setselectedCategory(selectedCategoryId);

        // Find the selected category
        const currentSelectedCategory = categories.find((category) => category._id === selectedCategoryId);
        setselectedCategoryValues(currentSelectedCategory.values);

        // Create properties object with empty values
        const updatedProperties = {};
        console.log(currentSelectedCategory)
        currentSelectedCategory.values.forEach((property) => {
            updatedProperties[property.name] = '';
        });

        setProperties(updatedProperties);
    };

    return (
        <>
            <form className='space-y-3' onSubmit={handleSubmit}>

                <div className='space-y-1'>
                    <label className='block' htmlFor="name">Product Name</label>
                    <input
                        className='w-2/3'
                        type="text"
                        id="name"
                        placeholder="Product Name"
                        required
                        value={name}
                        readOnly={method === 'DELETE'}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className='space-y-1'>
                    <label className='block' htmlFor="price">Price in INR</label>
                    <input
                        type="number"
                        className='mb-2 w-1/4'
                        id="price"
                        placeholder="Product Price"
                        value={price}
                        readOnly={method === 'DELETE'}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>

                <div className='flex items-baseline gap-2 '>

                    <label htmlFor="category">Category:</label>
                    <select
                        className='mb-2'
                        id="category"
                        name="category"
                        value={selectedCategory}
                        onChange={(e) => handleCategoryChange(e)}
                        required
                    >
                        <option value="">Select a category</option>
                        {categories && categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='flex flex-wrap gap-3 p-2'>

                    {selectedCategoryValues && selectedCategoryValues.map((property) => (
                        <div className='p-2 flex gap-2' key={property.name}>
                            <label htmlFor={property.name}>{property.name}:</label>
                            <select
                                id={property.name}
                                name={property.name}
                                value={properties[[property.name]]}
                                onChange={(e) => setProperties((prev) => {
                                    const prevProperties = { ...prev };
                                    prevProperties[property.name] = e.target.value;
                                    return prevProperties;
                                })}
                            >
                                <option value=''>Select a value</option>
                                {property.values.map((val) => (
                                    <option key={val} value={val}>
                                        {val}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}

                </div>

                <div className='flex-col gap-1'>

                    <label className='block' htmlFor="description">Description</label>
                    <textarea
                        className='w-full'
                        id="description"
                        name="Description"
                        placeholder="Description"
                        required
                        value={description}
                        readOnly={method === 'DELETE'}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <button className="bg-green-500 text-white hover:bg-green-600 w-28 btn mr-2" type="submit">
                    {method === 'POST' ? 'Create' : method === 'PUT' ? 'Update' : 'Delete'}
                </button>
                <button type="button" className="bg-slate-500 text-white hover:bg-slate-600 w-28 btn" onClick={() => router.back()}>
                    Back
                </button>
            </form >

            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-20 z-50">
                    <div className="bg-slate-200 p-4 rounded-xl">
                        <p className="text-center mb-1">Are you sure you want to delete?</p>
                        <b><h2 className="text-center text-lg mb-4">{name}</h2></b>
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
    )
}

export default Form