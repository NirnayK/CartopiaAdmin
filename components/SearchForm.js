
const SearchForm = (props) => {

    const {
        search,
        setSearch,
        categories,
        selectedCategory,
        setSelectedCategory,
        handleSubmit,
    } = props;

    return (
        <form className="flex justify-between gap-2 items-center" onSubmit={handleSubmit}>
            <input
                className="mb-2 w-full"
                type="text"
                id="name"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <>
                <label className='block mb-1' htmlFor="category">Category:</label>
                <select
                    id="category"
                    name="Category"
                    required
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="ALL">All</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}

                </select>
            </>
            {
                selectedCategory !== "ALL" && false &&
                <div className="flex wrap">

                    {categories.map((category) => (
                        <div className="flex items-center gap-1">
                            <label className='block mb-1' htmlFor={category.name}>{category.name}</label>
                            <select>
                                <option value="ALL">All</option>
                                {category.subCategories.map((subCategory) => (
                                    <option key={subCategory._id} value={subCategory._id}>
                                        {subCategory.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
            }
            <button className="bg-green-500 text-white active:bg-green-600 btn mr-2" type="submit">
                Search
            </button>
        </form >
    )
}

export default SearchForm