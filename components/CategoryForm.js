'use client';
import axios from 'axios';
import { useRouter } from "next/navigation"
import { useState } from "react"
import DynamicValueInput from './DynamicValueInput'

const CategoryForm = (props) => {
    // console.log('props', props)
    const { data, slug, method } = props
    const [name, setName] = useState('')
    const [subCategoryName, setSubCategoryName] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(undefined)
    const [categories, setCategories] = useState([])
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [values, setValues] = useState([""])
    const router = useRouter()

    const handleDelete = async () => {
        try {
            await axios.delete('/api/categories/' + data._id)
            router.push('/admin/categories')
        } catch (error) {
            console.error('Error deleting category:', error)
            // Display error message or perform any error handling
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (method === 'DELETE') {
            setShowConfirmation(true)
        }
        else {
            const data = {
                name,
                subCategoryName,
                category: selectedCategory,
            }
            try {
                if (method === 'POST') {
                    await axios.post('/api/categories', data)
                    setName('')
                    setSubCategoryName('')
                    setSelectedCategory('')
                }
                else if (method === 'PUT') {
                    await axios.put('/api/categories/' + slug.slug, data)
                }
                router.push('/admin/categories')
            }
            catch (error) {
                console.error('Error submitting category:', error)
                // Display error message or perform any error handling
            }
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label className='block mb-1' htmlFor="name">
                    {slug === 'new-sub-category' ? 'Parent ' : ''}
                    Category Name
                </label>
                {slug !== 'new-sub-category' ? (
                    <input
                        className='mb-2 w-full'
                        type="text"
                        id="name"
                        placeholder="Category Name"
                        required
                        value={name}
                        readOnly={method === 'DELETE'}
                        onChange={(e) => setName(e.target.value)}
                    />
                ) : (
                    <select
                        id="name"
                        name="Category"
                        required
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Select a category</option>
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
                )}

                {/* subcategory */}
                <label
                    className='block mb-1'
                    htmlFor="subCategoryName"
                >
                    Sub-Category Name:
                </label>
                <input
                    className='mb-2'
                    type="text"
                    id="subCategoryName"
                    placeholder="Sub-Category Name"
                    required
                    value={subCategoryName}
                    readOnly={method === 'DELETE'}
                    onChange={(e) => setSubCategoryName(e.target.value)}
                />
                <DynamicValueInput values={values} setValues={setValues} />

                <div className='mt-4'>
                    <button className="bg-green-500 text-white active:bg-green-600 w-28 btn mr-2" type="submit">
                        {method === 'POST' ? 'Create' : method === 'PUT' ? 'Update' : 'Delete'}
                    </button>
                    <button type="button" className="bg-green-500 text-white active:bg-green-600 w-28 btn" onClick={() => router.back()}>
                        Back
                    </button>
                </div>
            </form>
        </>
    )
}

export default CategoryForm