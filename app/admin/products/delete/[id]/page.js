'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ProductForm from '@/components/ProductForm';

const ProductDelete = ({ params }) => {
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
                    <h1 className="text-xl font-semibold mb-2">Delete Product</h1>
                    <ProductForm {...product} method="DELETE" />
                </>}
        </>
    )
}

export default ProductDelete;