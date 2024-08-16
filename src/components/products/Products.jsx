import { useEffect, useState } from "react";
import useAllProduct from "../../hooks/useAllProduct";
import Container from "../shared/Container";
import ProductCurd from "./ProductCurd";


const Products = () => {
    const [allProducts, setAllProducts] = useState([]);
    // const [allProducts,refetch] = useAllProduct();
    // console.log(allProducts);


    useEffect(() => {
        fetch('http://localhost:5000/all-products')
            .then(res => res.json())
            .then(data => setAllProducts(data))
    }, [])

    console.log(allProducts);

    const pages = [1,2,3,4,5]
    return (
        <div>
            <Container>
                <h1 className="text-2xl font-bold text-center">product here....</h1>
                <div className="flex justify-between items-center">
                    {/* filter by data */}
                    <div className="flex  gap-4 pt-8">
                        <button className="bg-gray-200 px-6 py-1 rounded">Brand</button>
                        <button className="bg-gray-200 px-6 py-1 rounded">Category</button>
                        <button className="bg-gray-200 px-6 py-1 rounded">Price Range</button>
                    </div>
                    {/* sort for data */}
                    <div>
                        <select
                            value=''
                            name='sort'
                            id='sort'
                            className='border p-4 rounded-md'>
                            <option value=''>Sort By Deadline</option>
                            <option value='dsc'>Descending Order</option>
                            <option value='asc'>Ascending Order</option>
                        </select>
                    </div>
                </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16">
                        {
                            allProducts.map((singleProduct, index) => {
                                return (
                                    <ProductCurd
                                        key={index}
                                        singleProduct={singleProduct}
                                    />
                                )
                            })
                        }
                    </div>

                {/* pagination here... */}
                <div className="flex justify-center mt-20">
                    {/* previous button */}
                    <a
                        href="#"
                        className="px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md cursor-not-allowed dark:bg-gray-800 dark:text-gray-600"
                    >
                        <div className="flex items-center -mx-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 mx-1 rtl:-scale-x-100"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                                />
                            </svg>
                            <span className="mx-1">previous</span>
                        </div>
                    </a>

                    {/* numbers */}
                    {
                        pages.map((btnNum,idx)=>{
                            return(
                                <button key={idx} className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200">{btnNum}</button>
                            )
                        })
                    }
                    {/* next button */}
                    <a
                        href="#"
                        className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
                    >
                        <div className="flex items-center -mx-1">
                            <span className="mx-1">Next</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 mx-1 rtl:-scale-x-100"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </div>
                    </a>
                </div>

                <div>
                </div>
            </Container>
        </div>
    );
};

export default Products;