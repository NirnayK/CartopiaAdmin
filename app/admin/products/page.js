import Link from "next/link"

const Products = () => {
    const standard = "bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150";
    return (
        <div>
            <div className="flex gap-2">

                <Link className={standard} href={"/admin/products/new"}>
                    Add a New Product
                </Link>

                <Link className={standard} href={"/admin/products/new-category-company"}>
                    Add a New Category or Company
                </Link>

            </div>
        </div>
    )
}

export default Products