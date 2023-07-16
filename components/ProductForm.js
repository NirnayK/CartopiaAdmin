'use client';
import axios from 'axios';
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { CldUploadButton, CldImage } from 'next-cloudinary';


const Form = (props) => {

    const {
        _id,
        name: existingName,
        price: existingPrice,
        description: existingDescription,
        category: existingCategory,
        properties: existingProperties,
        images: existingImages,
        method,
    } = props;

    const [name, setName] = useState(existingName || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setselectedCategory] = useState(existingCategory || '');
    const [selectedCategoryValues, setSelectedCategoryValues] = useState(null);
    const [properties, setProperties] = useState(existingProperties || {});
    const [images, setImages] = useState(existingImages || []);
    const [deletedImages, setDeletedImages] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/categories');
                setCategories(response.data);
                if (existingCategory) {
                    const currentSelectedCategory = response.data.find((category) => category._id === existingCategory);
                    setSelectedCategoryValues(currentSelectedCategory.values);
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
                properties,
                images,
            };
            try {
                await axios.post('/api/images', deletedImages);
                if (method === 'POST') {
                    await axios.post('/api/products', data);
                    setName('');
                    setPrice('');
                    setDescription('');
                    setselectedCategory('');
                    setSelectedCategoryValues(null);
                    setProperties({});
                    setImages([]);
                    setDeletedImages([]);

                }
                else if (method === 'PUT') {
                    await axios.put('/api/products/' + _id, data);
                    router.push('/admin/products');
                }
            }
            catch (error) {
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

        if (selectedCategoryId === '') {
            setSelectedCategoryValues(null);
            setProperties({});
            return;
        }

        // Find the selected category
        const currentSelectedCategory = categories.find((category) => category._id === selectedCategoryId);
        setSelectedCategoryValues(currentSelectedCategory.values);

        // Create properties object with empty values
        const updatedProperties = {};
        currentSelectedCategory.values.forEach((property) => {
            updatedProperties[property.name] = '';
        });

        setProperties(updatedProperties);
    };

    const uploadPhotos = async (e) => {

        setImages((prev) => [...prev, e.info.public_id])
    }

    const removePhoto = (e) => {

        setDeletedImages((prev) => [...prev, e]);
        const newPhotos = images.filter((image) => image !== e);
        setImages(newPhotos);
    }

    const handleBack = async () => {
        setDeletedImages((prev) => [...prev, ...images]);
        try {
            if (deletedImages.length > 0) {
                await axios.post('/api/images', deletedImages)
            }
            router.back();
        }
        catch (error) {
            console.error('Error deleting images:', error);
        }
    }

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


                <CldUploadButton className="bg-slate-200 cursor-pointer text-gray-600 btn" uploadPreset="qhcyym20" onUpload={(e) => uploadPhotos(e)} />

                <div className='flex flex-wrap gap-5 p-2'>

                    {images && images.map((image) => (
                        <div key={image} className='relative w-[200px] h-[200px] rounded-md overflow-hidden p-1 border-2 border-current'>
                            <div className='z-10 absolute top-2 right-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6 hover:cursor-pointer" onClick={() => removePhoto(image)}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </div>
                            <CldImage
                                src={image}
                                alt={image}
                                width={800}
                                height={800}
                                crop='fill'
                                gravity='auto'
                                sizes='(max-width:500px)50vw, (min-width:500px)33vw'
                                className='rounded-lg'
                            />
                        </div>
                    ))}
                </div>


                <div className='flex items-baseline gap-2 '>

                    <label htmlFor="category">Category:</label>
                    <select
                        className='w-auto mb-2'
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
                        <div className='p-2 flex-row gap-2' key={property.name}>
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

                <button type="submit" className="purplegradient opacity-80 hover:opacity-100 w-28 btn mr-2" >
                    {method === 'POST' ? 'Create' : method === 'PUT' ? 'Update' : 'Delete'}
                </button>
                <button type="button" className="purplegradient opacity-80 hover:opacity-100 w-28 btn" onClick={handleBack}>
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
                            <button className="purplegradient opacity-80 hover:opacity-100 btn" onClick={() => handleConfirmation(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default Form