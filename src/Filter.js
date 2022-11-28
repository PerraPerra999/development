import {leagueData} from "./assets/league-data";
import React, { useState } from "react";
import "./filter.css";
import {useEffect} from 'react';
import {buttons} from "./assets/league-data";
import {priceButtons} from "./assets/league-data";
import {attackButtons} from "./assets/league-data";

leagueData.forEach((item) => {
    item.image = process.env.PUBLIC_URL + "/" + item.image;
});

let filter = "All";
let attackFilter = "All";
let sortFilter = 1;

function Filter(){

    let [cart, setCart] = useState([]);
    let [total, setTotal] = useState(0);


    function addTotal(cost){
        
        setTotal(total + cost)
    }

    function subtractTotal(cost){
        setTotal(total - cost)
    }

    
    
    function checkforInstance(type){
        
        const index = cart.findIndex(item => {
            if (item === type) {
              return true;
            }
          
            return false;
          });

        if(index !== -1){
            return true;
        }

        return false;
        
        
    }

    function addItemToCart(type) {

        if(checkforInstance(type) == false){
            addTotal(type.price);
            setCart([...cart, type]);
        }
        
    }

    function removeItemCart(type){
        setCart((current) => current.filter((item) => item !== type))
        subtractTotal(type.price);

    }


    let [filtredChampions, setFiltredChampions] = useState([]);
    
    useEffect(() => {
        setFiltredChampions(leagueData);
    }, []);

    function filterChampions(championClass){
        
        
        let filteredChampions = leagueData.filter(type => type.class[0] === championClass);
        
        return filteredChampions;
    }


    function handleChampions(e) {
        let typeChampion = e.target.value;

        filter = typeChampion;
        
        typeChampion !== "All"
          ? setFiltredChampions(filterChampions(typeChampion))
          : setFiltredChampions(leagueData);
    }

    function handleAttack(e){
        let attackType = e.target.value;

        attackFilter = attackType;


        if(attackType == "ranged"){
            setFiltredChampions(rangedChampions)
        }else if(attackType == "melee"){
            setFiltredChampions(meleeChampions)
        }else{
            sortFilter == 1
            ? setFiltredChampions(sortNormal)
            : setFiltredChampions(sortReverse)
        }

    }

    function rangedChampions(){
        let filteredChampions;

        if(filter!== "All"){
            filteredChampions = leagueData.filter(type => type.class[0] === filter).filter(type => type.attack === "ranged");
        }else{
            // filteredChampions = leagueData.sort((a,b) => a.price > b.price ? -1: 1);
            filteredChampions = leagueData.filter(type => type.class[1] === filter).filter(type => type.attack === "ranged");
        }
         
        //let normalSort = filteredChampions.sort((a,b) => a.price > b.price ? -1: 1);
        
        return filteredChampions;

    }

    function meleeChampions(){
        let filteredChampions;

        if(filter!== "All"){
            filteredChampions = leagueData.filter(type => type.class[0] === filter).filter(type => type.attack === "melee");
        }else{
            // filteredChampions = leagueData.sort((a,b) => a.price > b.price ? -1: 1);
            filteredChampions = leagueData.filter(type => type.class[1] === filter).filter(type => type.attack === "melee");
        }

        return filteredChampions;
    }


    function sortChampions(e){

        let sortType = e.target.value;

        // sortType == 1
        // ? setFiltredChampions(sortNormal)
        // : setFiltredChampions(sortReverse);

        sortFilter = sortType;


        if(sortType == 1){
            setFiltredChampions(sortNormal)
            
        }else{
            setFiltredChampions(sortReverse);
        }
        
    }

    function sortNormal(){
        let filteredChampions;

        if(filter!== "All"){
            filteredChampions = leagueData.filter(type => type.class[0] === filter).sort((a,b) => a.price > b.price ? -1: 1);
        }else{
            // filteredChampions = leagueData.sort((a,b) => a.price > b.price ? -1: 1);
            attackFilter == "All"
            ? filteredChampions = leagueData.filter(type => type.class[1] === filter).sort((a,b) => a.price > b.price ? -1: 1)
            : filteredChampions = leagueData.filter(type => type.class[1] === filter).filter(type => type.attack === attackFilter).sort((a,b) => a.price > b.price ? -1: 1)
        }
         
        //let normalSort = filteredChampions.sort((a,b) => a.price > b.price ? -1: 1);
        
        return filteredChampions;
    }

    function sortReverse(){
        let filteredChampions;

        if(filter!== "All"){
            filteredChampions = leagueData.filter(type => type.class[0] === filter).sort((a,b) => a.price > b.price ? 1: -1)
        }else{
            // filteredChampions = leagueData.sort((a,b) => a.price > b.price ? 1: -1);
            attackFilter == "All"
            ? filteredChampions = leagueData.filter(type => type.class[1] === filter).sort((a,b) => a.price > b.price ? 1: -1)
            : filteredChampions = leagueData.filter(type => type.class[1] === filter).filter(type => type.attack === attackFilter).sort((a,b) => a.price > b.price ? 1: -1)
        }

        

        return filteredChampions;
    }

    

    return(

        <div>

        

        <div class = "filterContainer">

                <div>
                    <h2>
                        Filter:
                    </h2>
                </div>


                <div>
                    <h5>
                        Class:
                    </h5>
                </div>


                <div>
                    {buttons &&
                    buttons.map((type, index) => (
                    <>
                        <button key={index} value={type.value} onClick={handleChampions}>
                        {type.name}
                        </button>
                    </>
                    ))}

                </div>


                <div>
                    <h5>
                        Attack:
                    </h5>
                </div>

                <div>
                    {attackButtons && attackButtons.map(type => (
                        <>
                        <button value = {type.value} onClick = {handleAttack}>
                            {type.name}
                        </button>
                        </>
                    ))}
                </div>


                <div>
                    <h5>Price:</h5>
                </div>

                <div>
                    {priceButtons &&
                    priceButtons.map((type, index) => (
                        <>
                            <button key = {index} value = {type.value} onClick = {sortChampions}>
                                {type.name}
                            </button>
                        </>
                    ))
                    
                    }
                </div>
            
            
        </div>


        <div class = "itemContainer">


            {filtredChampions && filtredChampions.map(type => ( 
            
            
                <div class = "LeagueItem">
                
                    {type.name}

                    <img
                        src = {type.image}
                        alt = "LeagueItem"
                    />

                    <p>{type.description}</p>
                    {/* <button onClick ={() => updateCart(type.name, type.price)}>Add to Cart</button> */}
                    <p>{type.attack}</p>

                    <p>
                        Price: {type.price}
                    </p>

                    <div>
                        <button onClick ={() => addItemToCart(type)}>Add to Cart</button>
                        <button onClick = {() => removeItemCart(type)}>Remove from Cart</button>
                    </div>
                
                
                </div>
            
            ))}

        </div>

        <div class = "cart">
            <ol>
            
            {cart && cart.map(item => (
                
                <li>{item.name}: {item.price}</li>
            ))}
            </ol>

            Total: {total}

            <div>
                *******************************
                *******************************
            </div>
            <div>
                *******************************
                *******************************
            </div>
        </div>

        
        </div>
    );


}

export default Filter;

