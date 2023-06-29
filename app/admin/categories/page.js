import Link from 'next/link'
const page = () => {
    return (
        <div className="flex flex-col gap-4 p-2">
            <div className="flex flex-row items-center gap-2">
                <h1 className="text-2xl font-bold">Add a New Company or Category:</h1>
                <Link className="bg-green-500 text-white active:bg-green-600 btn" href={"/admin/categories/new"}>
                    New Company or Category
                </Link>
            </div>
        </div>
    )
}

export default page