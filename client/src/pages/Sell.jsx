import '../css/Sell.css';

import { useState } from 'react';
import { useEffect } from 'react';

export default function Sell(){

    return(
        <>  
          <div className="form-container">
            <form action='../../server/post' method='post'>
                <div>
                    <input type="text" placeholder="Product Name"/>
                </div>
                <div>
                    <textarea placeholder="Product Description" rows="4" cols="74">

                    </textarea>
                </div>
                <div>
                    <input type="text" name="" id="" placeholder="Starting Bid"/>
                </div>
                <div>
                    <input type="Submit" value="Create Auction"/>
                </div>
            </form>
          </div>
        </>
    )
}