
const SearchForm = (props) => {

    const {
        search,
        setSearch,
        categories,
        selectedCategory,
        handleSubmit,
        handleCategoryChange,
        selectedCategoryValues,
        properties,
        setProperties,
    } = props;
    return (
        <form className="md:flex md:items-baseline w-auto flex-wrap flex-col space-y-2 md:flex-row md:gap-2" onSubmit={handleSubmit}>

            <input
                className="w-auto"
                type="text"
                id="name"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <section className='flex items-baseline gap-2'>
                <label htmlFor="category">Category:</label>
                <select
                    className="w-auto"
                    id="category"
                    name="category"
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e)}
                >
                    <option value="">ALL</option>
                    {categories && categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </section>

            {selectedCategoryValues && (
                <div className='flex flex-col md:items-baseline md:flex-row md:flex-wrap md:gap-3 p-2'>
                    {selectedCategoryValues.map((property) => (
                        <div className='flex flex-wrap gap-3' key={property.name}>
                            <label htmlFor={property.name}>{property.name}:</label>
                            <select
                                className="w-auto"
                                id={property.name}
                                name={property.name}
                                value={properties[[property.name]]}
                                onChange={(e) => setProperties((prev) => {
                                    const prevProperties = { ...prev };
                                    prevProperties[property.name] = e.target.value;
                                    return prevProperties;
                                })}
                            >
                                <option value=''>ALL</option>
                                {property.values.map((val) => (
                                    <option key={val} value={val}>
                                        {val}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
            )
            }
            <button className="purplegradient opacity-80 hover:opacity-100 btn flex-grow-0" type="submit">
                Search
            </button>

        </form>


    )
}

export default SearchForm