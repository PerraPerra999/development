import {leagueData} from "./assets/league-data";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
leagueData.forEach((item) => {
    item.image = process.env.PUBLIC_URL + "/" + item.image;
});
  /* ############################################################## */


function Champions(){

    return(

        

        <div class = "itemContainer">
            {leagueData.map((item, index) => ( // TODO: map bakeryData to BakeryItem components
            
            
            <div class = "LeagueItem">
            
            {leagueData[index].name}

            <img
                src = {leagueData[index].image}
                alt = "LeagueItem"
            />

            <p>{leagueData[index].description}</p>
            {/* <button onClick ={() => updateCart(leagueData[index].name, leagueData[index].price)}>Add to Cart</button> */}

            <p>
                ${leagueData[index].price}
            </p>
            
            </div>
            
            ))}

        </div>

    );
}

export default Champions;