import Link from 'next/link'
import ListCategories from './ListCategories'
const page = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">Add a New Category:</h1>
                <Link className="purplegradient opacity-80 hover:opacity-100 btn" href={"/admin/categories/new"}>
                    New Category
                </Link>
            </div>
            <ListCategories />
        </div>
    )
}

export default page