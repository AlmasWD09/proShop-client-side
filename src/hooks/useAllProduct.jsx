import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useAllProduct = () => {
    const axiosPublic = useAxiosPublic();

    const {data: allProducts = [],refetch} = useQuery({
        queryKey: ['categories'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/all-products');
            return res.data;
        }
    })
    return [allProducts,refetch]
}
export default useAllProduct;