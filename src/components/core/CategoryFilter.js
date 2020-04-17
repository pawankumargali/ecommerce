import React, {Fragment, useState} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { getCategories } from '../../apiMethods/category';

function CategoryFilter({categories,handleFilters}) {

    const [checkedCats, setCheckedCats] = useState([]);


    const handleChange = e => {
        const cat = e.target.value;
        const checked = checkedCats;
        const index = checked.indexOf(cat);
        if(index===-1) 
            checked.push(cat);
        else 
            checked.splice(index,1);
        setCheckedCats(checked);
        handleFilters(checkedCats);
    };    

    return  <Fragment>
                <div className="card-header" style={{fontSize:'18px'}}>Filter by category</div>
                <div className="card-body">
                   {categories.map((cat, ind) => 
                       <li key={ind} className="list-unstyled">
                           <Checkbox 
                                value={cat._id}
                                color="primary"
                                onChange={e => handleChange(e)}
                            />
                           <label className="form-check-label">{cat.name}</label>
                       </li>
                   )}
                </div>
            </Fragment>
}

export default CategoryFilter;
