import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Card from "../components/Card";


const Home = () => {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState('');

  const loodData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    // console.log(response[0], response[1]);

    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loodData();
  }, []);

  return (
    <div>
      <div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        style={{ objectFit: "contain !important" }}
      >
        <div className="carousel-inner">
          <div
            className="carousel-caption"
            id="carousal"
            style={{ zIndex: "10" }}
          >
            <div className="d-flex justify-content-center" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e)=>{setSearch(e.target.value)}}
              />
              
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="https://source.unsplash.com/random/300×300/?burger"
              className=" w-100 h-3/4"
              style={{ filter: "brightness(30%)" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/300×300/?pizza"
              className="d-block w-100"
              style={{ filter: "brightness(30%)" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/300×300/?barbeque"
              className="d-block w-100"
              style={{ filter: "brightness(30%)" }}
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </div>
      <div className="container">
        {
          foodCat !== [] ? foodCat.map((data)=>{
             return ( 
            
               <div className="row mb-3">
                   <div key={data._id} className="fs-3 m-3">
                      {data.CategoryName}
                   </div>
                   <hr/>
                   {foodItem !== [] ? foodItem.filter((item)=>
                    ( item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())) ) 
                     .map(fiterItems=>{
                          return(
                            <div key={fiterItems._id} className="col-12 col-md-6 col-lg-4">
                              <Card foodItem ={fiterItems}
                              options={fiterItems.options[0]}
                              // Imgsrc ={fiterItems.img}

                                
                                ></Card>
                            </div>
                          )
                     })
                   : <div>No such data found</div> }
              </div>
              
             )
              
          }): ""
        }
      
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
