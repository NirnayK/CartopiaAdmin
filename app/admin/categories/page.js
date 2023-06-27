import Link from 'next/link'
const page = () => {
    const standard = "bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150";
    return (
        <div className="flex flex-col gap-4 p-2">
            <div className="flex flex-row items-center gap-2">
                <h1 className="text-2xl font-bold">Add a New Company or Category:</h1>
                <Link className={standard} href={"/admin/categories/new"}>
                    New Company or Category
                </Link>
            </div>
        </div>
    )
}

export default page