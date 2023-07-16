import ProductForm from '@/app/admin/products/ProductForm';

const NewProduct = () => {

    return (
        <>
            <h1 className="text-xl font-semibold mb-2">New Product</h1>
            <ProductForm method="POST" />
        </>
    );
};

export default NewProduct;
