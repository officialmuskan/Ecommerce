import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Product
import Loader from './Loader';
import { getProduct } from '../actions/productActions';
import Product from './Product';
// import {ResponsivePagination} from 'react-responsive-pagination';
// ResponsivePaginationComponent
import ResponsivePagination from 'react-responsive-pagination';


const categories = [
  "Laptop",
  "SmartPhones",
];

const CategorySections = (props) => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      dispatch(ClearError());
    }
    dispatch(getProduct()); // Get all products once
  }, [dispatch, error]);
  const onPageChange = ()=>{
    
  }

  // Group products by category
  const groupedProducts = categories.reduce((acc, category) => {
    acc[category] = products?.filter(product => product.category === category).slice(0, 4) || [];
    return acc;
  }, {});

  return (
    <div id='container' className={`${props.mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-white'} min-h-screen py-8`}>
      

      {loading ? (
        <Loader mode={props.mode} />
      ) : (
        <div className="space-y-12">
          {categories.map((category) => (
            <div key={category} className="w-[90vw] mx-auto">
              <h1 className='text-center text-[3vmax] pt-9 font-bold text-indigo-500'>{category}</h1>

              <div className="flex flex-wrap gap-6 justify-center">
                {groupedProducts[category].length > 0 ? (
                  groupedProducts[category].map(product => (
                    <Product key={product._id} product={product} />
                        
            
    
                  )
                  
            
                )
                  
                ) : (
                  <p className="text-gray-500">No products available.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySections;
