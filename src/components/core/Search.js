import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';
import ProductCard from './ProductCard';
import { getCategories } from '../../apiMethods/category';
import { getFilteredProducts } from '../../apiMethods/product';

function Search() {

    const [categories, setCategories] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(5);
    const priceRange = [0,100];
    const [error, setError] = useState(false);

    const [searchFilters, setSearchFilters] = useState( { filters: { price:priceRange, categories:[] } });
    const [filteredProducts, setFilteredProducts] = useState({});

    const loadFilteredProducts = filters => {
        getFilteredProducts(skip, limit, filters)
                    .then(data => {
                        if(data.err)
                            setError(data.err);
                        else
                            setFilteredProducts(data);
                    })
    }

    const handleFilters = (filters, filterBy) => {
        const filterObj = searchFilters.filters;
        filterObj[filterBy]=filters;
        setSearchFilters({filters:{...filterObj}});
        loadFilteredProducts(searchFilters.filters);
    }


    const init = () => {
        getCategories()
            .then(data => {
                if(data.err) 
                    setError(data.err);
                else 
                    setCategories(data);
            });
        loadFilteredProducts(searchFilters.filters);
    }

    useEffect(() => {
        init();   
    },[]);

    
    const showError = () => <div className="text-danger">{JSON.stringify(error)}</div>;

    return <Layout 
                title="Seach Page" 
                description="Search and find movies of your choice"
                className="conatiner"
            >
                {error && showError()}
                <div className="row">
                    <div className="card col-3">
                        {JSON.stringify(searchFilters)};
                        <div className="card-header" style={{fontSize:'20px'}}><b>Filters</b></div>
                        <div className="card-body">
                            <CategoryFilter 
                                categories={categories} 
                                handleFilters={filters => handleFilters(filters, 'categories')}     
                            />
                            <PriceFilter 
                                priceRange={priceRange}
                                handleFilters={filters => handleFilters(filters,'price')}
                            />
                        </div>
                    </div>

                    <div className="col-9">
                        Products {JSON.stringify(filteredProducts)}
                        
                    </div>

                </div>
            </Layout>;
}

export default Search;