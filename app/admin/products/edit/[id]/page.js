'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ProductForm from '@/components/ProductForm';

const ProductEdit = ({ params }) => {
    const [product, setProduct] = useState(null);
    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get('/api/products/' + params.id);
                setProduct(res.data);
            }
            catch (error) {
                console.error('Error fetching product:', error);
            }
        }
        getProduct();
    }, [params.id]);
    return (
        <>
            {product &&
                <>
                    <h1 className="text-xl font-semibold mb-2">Edit Product</h1>
                    <ProductForm {...product} method="PUT" />
                </>}
        </>
    )
}

export default ProductEdit