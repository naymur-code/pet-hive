import React from "react";
import styled from "styled-components";
import Card from "./Card";

const Category = () => {
  return (
    <div className=" container mx-auto px-5 my-20">
    <div className="text-center my-10">
        <h1 className="md:text-4xl text-3xl font-bold my-2">Shop by Category</h1>
        <p>find everything your pet needs in one place.</p>
    </div>
    <StyledWrapper>
      <div className="cards md:flex-row flex-col md:justify-between items-center">
    
        <div className="card red">
          <p className="tip">🐶 Pets (Adoption)</p>
        </div>
        <div className="card blue">
          <p className="tip">🍖 Pet Food</p>
        </div>
        <div className="card green">
          <p className="tip">🧸 Accessories</p>
        </div>
        <div className="card new">
          <p className="tip">💊 Pet Care Products</p>
        </div>
      </div>
    </StyledWrapper>
    </div>
  );
};

const StyledWrapper = styled.div`
  .cards {
    display: flex;
    gap: 15px;
  }

  .cards .red {
    background-color: #f43f5e;
  }

  .cards .blue {
    background-color: #3b82f6;
  }

  .cards .green {
    background-color: #22c55e;
  }
  .cards .new {
    background-color:#51a2ff;
  }

  .cards .card {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    height: 100px;
    width: 250px;
    border-radius: 10px;
    color: white;
    cursor: pointer;
    transition: 400ms;
  }

  .cards .card p.tip {
    font-size: 1em;
    font-weight: 700;
  }

  .cards .card p.second-text {
    font-size: 0.7em;
  }

  .cards .card:hover {
    transform: scale(1.1, 1.1);
  }

  .cards:hover > .card:not(:hover) {
    filter: blur(10px);
    transform: scale(0.9, 0.9);
  }
`;

export default Category;
