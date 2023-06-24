import Link from "next/link";
// import { ReactSortable } from "react-sortablejs";
import Image from "next/image";

const Form = (props) => {
    const {
        title,
        name,
        setName,
        categories,
        selectedCategory,
        setSelectedCategory,
        companies,
        selectedCompany,
        setSelectedCompany,
        price,
        setPrice,
        description,
        setDescription,
        photos,
        setPhotos,
        uploadPhotos,
        updatePhotoOrder,
        handleSubmit,
        enableCategory,
        enableCompany,
        enablePrice,
        enableDescription,
        enablePhotos,
    } = props;

    const standard = "bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150";
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1 className="text-xl font-semibold mb-2">New {title}</h1>

                <label htmlFor="name">{title} Name</label>
                <input
                    type="text"
                    id="name"
                    placeholder={title + " Name"}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                {(enableCategory || enableCompany) && (<div className="flex pl-0 p-4 gap-4">

                    {enableCategory && (
                        <>
                            <label htmlFor="category">Category:</label>
                            <select
                                id="category"
                                name="Category"
                                required
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </>
                    )}

                    {enableCompany && (
                        <>
                            <label htmlFor="company">Company:</label>
                            <select
                                id="company"
                                name="Company"
                                value={selectedCompany}
                                onChange={(e) => setSelectedCompany(e.target.value)}
                                required
                            >
                                <option value="">Select a company</option>
                                {companies.map((company) => (
                                    <option key={company._id} value={company}>
                                        {company.name}
                                    </option>
                                ))}
                            </select>
                        </>)}
                </div>)}

                {enablePrice && (
                    <>
                        <label htmlFor="price">Price in INR</label>
                        <input
                            type="number"
                            id="price"
                            placeholder="Product Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </>)}

                {enableDescription && (
                    <>
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="Description"
                            placeholder="Description"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </>)}
                {enablePhotos && (<>
                    <label htmlFor="image">Photos</label>
                    <div className="mb-2 flex flex-wrap gap-1">
                        <label className="w-24 h-24 rounded-lg bg-gray-200 cursor-pointer text-gray-400 flex flex-col justify-center items-center ">
                            <svg
                                className="w-8 h-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6">
                                </path>
                            </svg>
                            <span>Add Photo</span>
                            <input type="file" id="image" name="image" multiple className="hidden" onChange={uploadPhotos} />
                        </label>
                    </div>
                </>)}

                <button className={standard + "mr-2"} type="submit">
                    Save
                </button>

                <Link className={standard + " ml-2"} href="/admin/products">Back</Link>
            </form>
        </>

    )
}

export default Form