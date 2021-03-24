import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useSelector, useDispatch } from 'react-redux';
import { QUERY_CATEGORIES } from "../../utils/queries";
import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {
  const dispatch = useDispatch();
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);
  const categories = useSelector(state => state.categories.categories);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: 'categories/UPDATE_CATEGORIES',
        payload: categoryData.categories
      });
      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then(categories => {
        dispatch({
          type: 'categories/UPDATE_CATEGORIES',
          payload: categories
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = id => {
    dispatch({
      type: 'categories/UPDATE_CURRENT_CATEGORY',
      payload: id
    });
  };


  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map(item => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
