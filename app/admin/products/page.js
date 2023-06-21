import SearchNSort from "@/components/SearchNSort";
import Link from "next/link"

const Products = () => {
    const standard = "bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150";
    return (
        <div className="flex flex-col gap-2 p-2">
            <div className="flex flex-row gap-2">
                <h1 className="text-3xl font-bold">Add a New Product:</h1>
                <Link className={standard} href={"/admin/products/new"}>
                    New Product
                </Link>
            </div>
            <div className="flex flex-row gap-2">
                <h1 className="text-3xl font-bold">Add a New Category or Company:</h1>
                <Link className={standard} href={"/admin/products/new-category-company"}>
                    New Category or Company
                </Link>
            </div>
            <SearchNSort />
        </div>
    )
}

export default Products