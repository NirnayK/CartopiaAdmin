
const SearchForm = (props) => {

    const {
        search,
        setSearch,
        categories,
        selectedCategory,
        setSelectedCategory,
        companies,
        selectedCompany,
        setSelectedCompany,
        handleSubmit,
    } = props;

    return (
        <form className="flex justify-between gap-2 items-center" onSubmit={handleSubmit}>
            <input
                type="text"
                id="name"
                placeholder="Search Products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <>
                <label htmlFor="category">Category:</label>
                <select
                    id="category"
                    name="Category"
                    required
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="ALL">All</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category.name}>
                            {category.name}
                        </option>
                    ))}

                </select>
            </>
            < >
                <label htmlFor="company">Company:</label>
                <select
                    id="company"
                    name="Company"
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                    required
                >
                    <option value="ALL">All</option>
                    {companies.map((company) => (
                        <option key={company._id} value={company.name}>
                            {company.name}
                        </option>
                    ))}

                </select>
            </>
            <button className="bg-green-500 text-white active:bg-green-600 mr-2" type="submit">
                Search
            </button>
        </form >
    )
}

export default SearchForm