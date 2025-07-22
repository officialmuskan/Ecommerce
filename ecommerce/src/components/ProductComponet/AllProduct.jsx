

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, ClearError, getProduct } from '../../actions/productActions';
import Product from '../Product';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import Loader from '../Loader';
import { useParams } from 'react-router-dom';
import { Slider, Typography, RadioGroup,Radio, FormLabel, FormControl, FormControlLabel } from '@mui/material';
import { deepPurple,indigo,pink } from '@mui/material/colors';
{deepPurple}

const categories = [
  "Laptop",
  "SmartPhones",
];
const col = indigo[500]

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
    dispatch(getProduct(keyword, currentpage, price, category === "All"? "":category, ratings));
  }, [dispatch, keyword, currentpage, price, category, ratings, error]);

  return (
    <div className={`${props.mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen py-8`}> 
      <h1 className="text-center text-2xl font-semibold pb-4 mb-6 text-indigo-500">All Products</h1>

      {loading ? (
        <Loader mode={props.mode} />
      ) : (
        <div className="flex flex-col md:flex-row md:items-start w-[90vw] mx-auto">
          <div className={`${props.mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'} w-full md:w-1/4 md:sticky top-20 z-10 p-4 mb-4 mt-10 md:mb-0`}>
            <div className="px-4 rounded">
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
              <FormControl onChange={(e) => setCategory(e.target.value)}>
                  <FormLabel sx={{color:col}} id="demo-radio-buttons-group-label">Categories</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={category}
                    name="radio-buttons-group"
                  >
                    <FormControlLabel onChange={(e) => setCategory(e.target.value)} value="All" control={<Radio sx={{
    color: indigo[800],
    '&.Mui-checked': {
      color: indigo[600],
    },
  }}  />} label="All" />
                    
                    {categories.map((cat)=>(
                        <FormControlLabel onChange={(e) => setCategory(e.target.value)} key={cat} value={cat} control={<Radio sx={{
    color: indigo[800],
    '&.Mui-checked': {
      color: indigo[600],
    },
  }}/>} label={cat} />
                    
                    ))}
                    </RadioGroup>
                </FormControl>
            



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
              <Product key={product._id} product={product} mode={props.mode}/>
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
