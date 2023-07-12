import ListProducts from "@/components/ListProducts";
import Link from "next/link"

const Products = () => {
    return (
        <div className="flex flex-col gap-4 p-2">
            <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">Add a New Product:</h1>
                <Link className="bg-green-500 hover:bg-green-600 btn" href={"/admin/products/new"}>
                    New Product
                </Link>
            </div>
            <ListProducts />
        </div>
    )
}

export default Products