// import React, {useEffect, useState} from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getProductDetails, ClearError, getProduct } from '../../actions/productActions'
// import Product from '../Product'
// import ResponsivePagination from 'react-responsive-pagination';
// import 'react-responsive-pagination/themes/classic.css';
// import Loader from '../Loader'
// // Typography
// import { useParams } from 'react-router-dom'
// import { Slider, Typography } from '@mui/material';
// const categories = [
//   "Laptop",
//   "Footwear",
//   "Bottom",
//   "Tops",
//   "Attire",
//   "Camera",
//   "SmartPhones",
// ];
// const AllProduct = (props) => {
//     const {keyword} = useParams()
//     // useState
//     const [ratings, setRatings] = useState(0);
//     const [category, setCategory] = useState("");
//     const [currentpage, setcurrentpage] = useState(1)
//     const dispatch = useDispatch()
//         const { products, loading, error, resultperpage, productCount } = useSelector(
//             (state) => state.products
//           );
//     const setCurrentPageNo = (e)=>{
//       setcurrentpage(e)
//     }
//     const [price, setPrice] = useState([0, 25000]);
//     const priceHandler = (event, newPrice) => {
//     if (Array.isArray(newPrice)) {
//     setPrice(newPrice);
//   }
//   };
//         useEffect(()=>{
//             if(error){
//                 setStatus(true);
//                 setType("error");
//                 setTitle(error)
//                 dispatch(ClearError())
//             }
//             dispatch(getProduct(keyword, currentpage, price, category, ratings))
//         }, [dispatch, keyword, currentpage, price, category, ratings])
//   return (
//     <>
//     <div  className ={`${props.mode==='dark'?'bg-gray-900 text-white':'bg-white'} text-center`} >
//     <h1 className='text-center text-xl flex justify-center m-auto w-30 border-b-3 pt-6'>All Products</h1>
    
//     {loading?<Loader mode={props.mode}/>:

//     <div className ={`flex py-6 mx-auto w-[80vw] flex-wrap justify-center`} >
//         <div className="filterBox text-indigo-500 text-left mt-12 h-[40vh] absolute left-10">
//             <Typography>Price</Typography>
//             <Slider
//             size='small'
//               value={price}
//               onChange={priceHandler}
//               valueLabelDisplay="auto"
//               aria-labelledby="range-slider"
//               min={0}
//               color='red'
//               max={25000}
//             />
//             <Typography>Categories</Typography>
//             <ul className="categoryBox text-left mb-3">
//               {categories.map((category) => (
//                 <li
//                   className="category-link"
//                   key={category}
//                   onClick={() => setCategory(category)}
//                 >
//                   {category}
//                 </li>
//               ))}
//             </ul>

//             <fieldset className='mb-2'>
//               <Typography component="legend">Ratings Above</Typography>
//               <Slider
//               className='text-indigo-500'
//               size='small'
//                 value={ratings}
//                 onChange={(e, newRating) => {
//                   setRatings(newRating);
//                 }}
//                 aria-labelledby="continuous-slider"
//                 valueLabelDisplay="auto"
//                 min={0}
//                 max={5}
//                 color='red'
//               />
//             </fieldset>
//              </div>
//         {products && products.map(product=><Product key={product._id} product={product}></Product>)}
//         </div>}
//     <ResponsivePagination
//       current={currentpage}
//       total={Math.ceil(productCount/resultperpage)}
//       onPageChange={setCurrentPageNo}
//     />
//     </div>
    
//     </>
//   )
// }

// export default AllProduct

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, ClearError, getProduct } from '../../actions/productActions';
import Product from '../Product';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import Loader from '../Loader';
import { useParams } from 'react-router-dom';
import { Slider, Typography } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
{deepPurple}

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];
const col = deepPurple[600]

const AllProduct = (props) => {
  const { keyword } = useParams();
  const [ratings, setRatings] = useState(0);
  const [category, setCategory] = useState("");
  const [currentpage, setcurrentpage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);

  const dispatch = useDispatch();
  const { products, loading, error, resultperpage, productCount } = useSelector(
    (state) => state.products
  );

  const setCurrentPageNo = (e) => {
    setcurrentpage(e);
  };

  const priceHandler = (event, newPrice) => {
    if (Array.isArray(newPrice)) {
      setPrice(newPrice);
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(ClearError());
    }
    dispatch(getProduct(keyword, currentpage, price, category, ratings));
  }, [dispatch, keyword, currentpage, price, category, ratings, error]);

  return (
    <div className={`${props.mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-white'} min-h-screen py-8`}> 
      <h1 className="text-center text-2xl font-semibold pb-4 mb-6 text-indigo-500">All Products</h1>

      {loading ? (
        <Loader mode={props.mode} />
      ) : (
        <div className="flex flex-col md:flex-row md:items-start w-[90vw] mx-auto">
          <div className={`${props.mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'} w-full md:w-1/4 md:sticky top-20 z-10 p-4 mb-4 mt-10 md:mb-0`}>
            <div className="p-4 rounded">
              <Typography className="text-indigo-500">Price</Typography>
              <Slider color=''
                size="small"
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={25000}
              />
              <Typography className="text-indigo-500 mt-4">Categories</Typography>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="w-full mt-2 p-2 rounded border focus:outline-none focus:ring focus:ring-indigo-500 "
                value={category}
              >
                <option value="">All</option>
                {categories.map((cat) => (
                  <option className={`${props.mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-white'}`} key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <fieldset className='mt-4'>
                <Typography component="legend" className="text-indigo-500">Ratings Above</Typography>
                <Slider
                color=''
                  size="small"
                  value={ratings}
                  onChange={(e, newRating) => setRatings(newRating)}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                />
              </fieldset>
            </div>
          </div>

          <div className="w-full md:w-3/4 flex flex-wrap gap-6 justify-center">
            {products && products.map(product => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
      {/* {console.log(category)} */}

      <div className="mt-8 flex justify-center">
        <ResponsivePagination
          current={currentpage}
          total={Math.ceil(productCount / resultperpage)}
          onPageChange={setCurrentPageNo}
        />
      </div>
    </div>
  );
};

export default AllProduct;
