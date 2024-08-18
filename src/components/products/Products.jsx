import { useEffect, useState } from "react";
import Container from "../shared/Container";
import ProductCurd from "./ProductCurd";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import LoadindSpenier from "../LoadindSpenier";
import { FcSearch } from "react-icons/fc";


const Products = () => {
    const { loading } = useAuth();
    const [allProducts, setAllProducts] = useState([]);
    const [itemsPerPage, setItemPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [sortValue, setSortValue] = useState('');
    const [categoryValue, setCategoryValue] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [bandValue, setBandValue] = useState('');
    const [rangeValue, setRangeValue] = useState(0);


    // get data by api
    useEffect(() => {
        const getData = async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/all-products?page=${currentPage}&size=${itemsPerPage}&sort=${sortValue}&search=${searchValue}&category=${categoryValue}&band=${bandValue}&range=${rangeValue}`)
            setAllProducts(data)
        }
        getData()
    }, [currentPage, itemsPerPage, sortValue, searchValue, categoryValue, bandValue, rangeValue])

    // get count by api
    useEffect(() => {
        const getCount = async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/counts?search=${searchValue}&category=${categoryValue}&band=${bandValue}&range=${rangeValue}`)
            setCount(data.count)
        }
        getCount()
    }, [searchValue, categoryValue, bandValue, rangeValue])

   
    // const handle change button
    const handleChengeButton = (value) => {
        setCurrentPage(value)
    }



    const numberOfPages = Math.ceil(count / itemsPerPage)
    const pages = [...Array(numberOfPages).keys()].map(element => element + 1)

    if (loading) return <LoadindSpenier />
    return (
        <div className="pt-36">
            <Container>
                <h1 className="text-2xl font-bold text-center">Our Shop Category</h1>
                <div className="flex flex-col md:flex-row justify-center md:justify-between items-center mt-10 gap-4 md:gap-0 md:px-24">

                    <div className="flex flex-col md:flex-row items-center gap-4">
                       <div className="flex md:flex-row items-center gap-4 md:gap-8">
                         {/* filter by band data */}
                         <div>
                            <select
                                onChange={(e) => setBandValue(e.target.value)}
                                name='band'
                                id='band'
                                className='border p-4 rounded-md'>
                                <option disabled >Brand</option>
                                <option value='teachPro'>TeachPro</option>
                                <option value='cycleFit'>CycleFit</option>
                                <option value='blendMaster'>BlendMaster</option>
                                <option value='artistry'>Artistry</option>
                                <option value='campSafe'>CampSafe</option>

                            </select>
                        </div>

                        {/* filter by category data */}
                        <div>
                            <select
                                onChange={(e) => setCategoryValue(e.target.value)}
                                name='category'
                                id='category'
                                className='border p-4 rounded-md'>
                                <option disabled >Category</option>
                                <option value='electronics'>Electronics</option>
                                <option value='fitness'>Fitness</option>
                                <option value='home appliances'>Home Appliances</option>
                                <option value='home goods'>Home Goods</option>
                                <option value='outdoor'>Outdoor</option>
                            </select>
                        </div>
                       </div>

                        {/* range by price data */}
                        <div>
                            <h1 className="text-xl font-semibold">Price Range</h1>
                            <input
                                onChange={(e) => setRangeValue(e.target.value)}
                                type="range" name="range" value={rangeValue} step={5} min={5} max={200} className={`w-full h-2 bg-gray-200 rounded-lg cursor-pointer 
                                ${rangeValue < 50 ? 'accent-green-500' : ''}
                                ${rangeValue >= 50 && rangeValue < 150 ? 'accent-yellow-500' : ''}
                                ${rangeValue >= 150 ? 'accent-red-500' : ''}`} />
                            <h4 className="text-center font-bold">{rangeValue}</h4>
                        </div>
                    </div>



                    {/* search */}
                    <form >
                        <div className='relative flex p-1 overflow-hidden border rounded-lg focus:outline-none  focus-within:ring focus-within:ring-opacity-40 focus-within:border-primary focus-within:ring-primary'>
                            <input
                                className='px-10 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                                type='text'
                                name='search'
                                value={searchValue}
                                onChange={(e)=>setSearchValue(e.target.value)}
                                placeholder='Search Category'
                            />
                            <span><FcSearch className="absolute text-3xl text-gray-300 left-2 top-[20%]" /></span>
                        </div>
                    </form>




                    {/* sort for data */}
                    <div>
                        <select
                            name='sort'
                            id='sort'
                            onChange={(e) => setSortValue(e.target.value)}
                            className='border p-4 rounded-md'>
                            <option disabled value=''>Sort By Price</option>
                            <option value='dsc'>High to Low</option>
                            <option value='asc'>Low to High</option>
                            <option value='date-added'>Date Added(Newest first)</option>
                        </select>
                    </div>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 md:px-24">
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
                        className='disabled:cursor-not-allowed disabled:bg-white disabled:text-gray-700  py-1  text-sm  sm:py-2 sm:text-base md:px-4 md:py-2 md:mx-2 md:text-lg transition-colors duration-300 transform rounded-md bg-white text-gray-700 hover:bg-primary hover:text-white'
                    >
                        <div className='flex items-center -mx-1'>
                            <span className='mx-1'>Previous</span>

                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='hidden md:block w-6 h-6 mx-1 rtl:-scale-x-100'
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
                                <button
                                    key={idx}
                                    onClick={() => handleChengeButton(btnNum)}
                                    className={`px-2 py-1 mx-1 text-sm sm:px-2 sm:py-2 sm:text-base md:px-4 md:py-2 md:mx-2 md:text-lg transition-colors duration-300 transform rounded-md ${currentPage === btnNum
                                        ? 'bg-red-600 text-white'
                                        : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-200 hover:bg-red-400 hover:text-white'
                                        }`}
                                >
                                    {btnNum}
                                </button>
                            )
                        })
                    }
                    {/* next button */}
                    <button
                        disabled={currentPage === numberOfPages}
                        onClick={() => handleChengeButton(currentPage + 1)}
                        className='disabled:cursor-not-allowed disabled:bg-white disabled:text-gray-700  py-1  text-sm  sm:py-2 sm:text-base md:px-4 md:py-2 md:mx-2 md:text-lg transition-colors duration-300 transform rounded-md bg-white text-gray-700 hover:bg-primary hover:text-white'
                    >
                        <div className='flex items-center -mx-1'>
                            <span className='mx-1'>Next</span>

                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='hidden md:block w-6 h-6 mx-1 rtl:-scale-x-100'
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