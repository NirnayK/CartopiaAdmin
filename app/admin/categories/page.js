import Link from 'next/link'
import ListCategories from '@/components/ListCategories'
const page = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">Add a New Category:</h1>
                <Link className="bg-green-500  hover:bg-green-600 btn" href={"/admin/categories/new"}>
                    New Category
                </Link>
            </div>
            <ListCategories />
        </div>
    )
}

export default page