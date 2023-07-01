import React from 'react'

const ListCategories = () => {
    const [search, setSearch] = useState('');
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);




    return (
        <>
            <SearchForm className="mb-2" />
            <DisplayItems />
        </>
    );
}

export default ListCategories