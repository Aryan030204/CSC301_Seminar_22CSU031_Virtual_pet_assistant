import { Link } from "react-router-dom"

const DogProfileBtn = () => {
  return (
    <div className="bg-blue-400 p-1 rounded-lg font-bold text-white">
        <button><Link to={"/dog/profile/create"}>Create Dog Profile</Link></button>
    </div>
  )
}

export default DogProfileBtn
