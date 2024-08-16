import { useEffect, useState } from "react";
import Container from "../shared/Container";
import ProductCurd from "./ProductCurd";
import axios from "axios";


const Products = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [itemsPerPage, setItemPerPage] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0)

    // get data by api
    useEffect(() => {
        const getData = async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/all-products?page=${currentPage}&size=${itemsPerPage}`)
            setAllProducts(data)
        }
        getData()
    }, [currentPage, itemsPerPage])

    // get count by api
    useEffect(() => {
        const getCount = async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/counts`)
            setCount(data.count)
        }
        getCount()
    }, [])

    // const handle change button
    const handleChengeButton = (value) => {
        setCurrentPage(value)
    }



    const numberOfPages = Math.ceil(count / itemsPerPage)
    const pages = [...Array(numberOfPages).keys()].map(element => element + 1)
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
                    <button
                        disabled={currentPage === 1}
                        onClick={() => handleChengeButton(currentPage - 1)}
                        className='disabled:cursor-not-allowed disabled:bg-white disabled:text-gray-700 px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-red-400  hover:text-white'
                    >
                        <div className='flex items-center -mx-1'>
                            <span className='mx-1'>Previous</span>

                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='w-6 h-6 mx-1 rtl:-scale-x-100'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M17 8l4 4m0 0l-4 4m4-4H3'
                                />
                            </svg>
                        </div>
                    </button>

                    {/* numbers */}
                    {
                        pages.map((btnNum, idx) => {
                            return (
                                <button key={idx}
                                    onClick={() => handleChengeButton(btnNum)}
                                    className={currentPage === btnNum ? 'px-4 py-2 mx-1 text-white transition-colors duration-300 transform bg-red-600 rounded-md' : 'px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-red-400  hover:text-white'}>{btnNum}</button>
                            )
                        })
                    }
                    {/* next button */}
                    <button
                        disabled={currentPage === numberOfPages}
                        onClick={() => handleChengeButton(currentPage + 1)}
                        className='disabled:cursor-not-allowed disabled:bg-white disabled:text-gray-700 px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-red-400  hover:text-white'
                    >
                        <div className='flex items-center -mx-1'>
                            <span className='mx-1'>Next</span>

                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='w-6 h-6 mx-1 rtl:-scale-x-100'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M17 8l4 4m0 0l-4 4m4-4H3'
                                />
                            </svg>
                        </div>
                    </button>
                </div>

                <div>
                </div>
            </Container>
        </div>
    );
};

export default Products;