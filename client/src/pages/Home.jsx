import PetForm from '../components/PetForm';
import wall1 from "../assets/wall1.jpg";

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center relative">
            <img src={wall1} className='z-1 absolute' />
            <h1 className="text-4xl font-bold text-blue-600 mb-6 z-10">Pet Care Advisor</h1>
            <PetForm />
        </div>
    );
};

export default Home;
