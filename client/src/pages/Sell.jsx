import '../css/Sell.css';

export default function Sell(){
    return(
        <>  
          <div className="form-container">
            <form  method='post'>
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