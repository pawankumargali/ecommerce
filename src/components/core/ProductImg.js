import React from 'react';
import { API } from '../../config';

function ProductImg({productId, name}) {
    return <div className="prod-img mx-auto">
              <img src={`${API}/product/image/${productId}`} 
                   alt={name}
                   className="mb-3"
                   style={{maxWidth:'100%', maxHeight:'100%'}}
                   />
            </div>
}

export default ProductImg;