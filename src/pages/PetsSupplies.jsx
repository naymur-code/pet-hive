import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PetCard from '../components/PetCard';

const PetSupplies = () => {
    const [pets,setPets]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:3000/petssupplies')
        .then(result=>setPets(result.data))
        .catch(error=>console.log(error))
    },[])
    return (
        <div className='container mx-auto px-5'>
            <h1 className='text-5xl font-bold py-6'>Pets & Supplies </h1>
            <div className='grid md:grid-cols-3 grid-cols-1 justify-between gap-10'>
                {
                    pets.map(pet=><PetCard key={pet._id} pet={pet}/>)
                }
            </div>
        </div>
        
    );
};

export default PetSupplies;