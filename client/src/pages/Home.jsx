import React from 'react';
import PetForm from '../components/PetForm';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-blue-600 mb-6">Pet Care Advisor</h1>
            <PetForm />
        </div>
    );
};

export default Home;
