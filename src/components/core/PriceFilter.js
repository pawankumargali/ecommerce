import React, { Fragment, useState } from 'react';
import Slider from '@material-ui/core/Slider';

function PriceFilter({priceRange, handleFilters}) {

  const [range, setRange] = useState(priceRange);
  const handleChange = (e, newRange) => {
     setRange(newRange);
     handleFilters(range);
  }

    return  <Fragment>
                <div className="card-header" style={{fontSize:'18px'}}>Filter by Price (USD)</div>
                <div className="card-body">
                <Slider
                  value={range}
                  min={priceRange[0]}
                  max={priceRange[1]}
                  onChange={(e,newRange) => handleChange(e,newRange)}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                />
                </div>
                  
            </Fragment>
}

export default PriceFilter;