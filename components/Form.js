import Link from "next/link";

const Form = (props) => {
    const {
        title,
        name,
        setName,
        price,
        setPrice,
        description,
        setDescription,
        categories,
        selectedCategory,
        setSelectedCategory,
        companies,
        selectedCompany,
        setSelectedCompany,
        handleSubmit,
        enableCategory,
        enableCompany,
        enablePrice,
        enableDescription,
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
                            <label htmlFor="category">Category</label>
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
                            <label htmlFor="company">Company</label>
                            <select
                                id="company"
                                name="Company"
                                value={selectedCompany}
                                onChange={(e) => setSelectedCompany(e.target.value)}
                                required
                            >
                                <option value="">Select a company</option>
                                {companies.map((company) => (
                                    <option key={company._id} value={company._id}>
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

                <button className={standard + "mr-2"} type="submit">
                    Save
                </button>

                <Link className={standard + " ml-2"} href="/admin/products">Back</Link>
            </form>
        </>

    )
}

export default Form