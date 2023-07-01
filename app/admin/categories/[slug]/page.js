'use client';
import axios from "axios"
import { useEffect, useState } from "react"
import CategoryForm from "@/components/CategoryForm"

const NewCategory = ({ params }) => {
    const [fetchedCategory, setFetchedCategory] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [data, setData] = useState(null)
    // for products we dont create a brand new json to be stored in collection
    // instead we store category data based on sample structure and info

    // for categories we create a new json to be stored in collection
    // const [data, setData] = useState() 

    // for normal new category

    // its name + 1 subcategory or more

    // for new subcategory
    // select main category
    // the we get name option
    // then we get values option
    // also make it possible to add multiple sub cat at the same time 
    // so each new pme should bew a new iv
    // button for add value
    // button for add new sub cat


    // useEffect(() => {
    //     if (params.slug === 'new-sub-category') {
    //         // Run the get axios function or any other desired logic
    //         const fetchData = async () => {
    //             try {
    //                 const response = await axios.get('/api/categories/');
    //                 setFetchedCategory(response.data);
    //             }
    //             catch (error) {
    //                 console.error(error);
    //             }
    //         };
    //         fetchData();
    //     }
    // }, [params.slug]);

    return (
        <>
            {params.slug === 'new-sub-category' ? (fetchedCategory && <CategoryForm {...params} method="POST" />) : (<CategoryForm {...params} method="POST" />)}
        </>
    )
}
export default NewCategory