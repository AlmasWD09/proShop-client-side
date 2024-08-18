import { RotatingTriangles } from "react-loader-spinner";




const LoadindSpenier = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <RotatingTriangles
                visible={true}
                height="80"
                width="80"
                color={['#1B5299', '#EF8354', '#DB5461']}
                ariaLabel="rotating-triangles-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
};

export default LoadindSpenier;