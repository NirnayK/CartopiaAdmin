import Link from "next/link"
import ListProducts from "./ListProducts"

const Products = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <h1 className="font-bold">Add a New Product:</h1>
                <Link className="purplegradient opacity-80 hover:opacity-100 text-w  btn" href={"/admin/products/new"}>
                    New Product
                </Link>
            </div>
            <ListProducts />
        </div>
    )
}

export default Products