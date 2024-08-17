
import PropTypes from 'prop-types';

const ProductCurd = ({ singleProduct }) => {
    const { image, name, price, ratings, category, creationDate, description } = singleProduct || {};
    return (
        <>
            <div className="w-full  bg-gray-200 rounded-lg shadow-lg dark:bg-gray-800">
                <img
                    className="object-cover w-full h-56"
                    src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                    alt="avatar"
                    />
                    <div className="py-5 text-center">
                        <p>{new Date(creationDate).toLocaleDateString()}</p>
                        <a href="#" className="block text-xl font-bold text-gray-800 dark:text-white" tabIndex={0} role="link">
                            {name}
                        </a>
                        <span className="text-sm text-gray-700 dark:text-gray-200">category:<span className='font-bold'>{category}</span></span>
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