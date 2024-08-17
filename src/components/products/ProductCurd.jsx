
import PropTypes from 'prop-types';

const ProductCurd = ({ singleProduct }) => {
    const { image, name, price, ratings,bandName, category, creationDate, description } = singleProduct || {};
    return (
        <>
            <div className="w-full  bg-gray-200 rounded-lg shadow-lg dark:bg-gray-800">
                <img
                    className="object-cover w-full h-56"
                    src={image}
                    alt="avatar"
                    />
                    <div className="py-5 text-center">
                        <p>{new Date(creationDate).toLocaleDateString()}</p>
                        <a href="#" className="block text-xl font-bold text-gray-800 dark:text-white" tabIndex={0} role="link">
                            {name}
                        </a>
                        <p className="text-sm text-gray-700 dark:text-gray-200">Band:<span className='font-bold'>{bandName}</span></p>
                        <p className="text-sm text-gray-700 dark:text-gray-200">category:<span className='font-bold'>{category}</span></p>
                        <p>price:{price}</p>
                        <p>rating:{ratings}</p>
                    </div>

            </div>
        </>
    );
};
// prop-types validation
ProductCurd.propTypes = {
    singleProduct: PropTypes.object,
};
export default ProductCurd;