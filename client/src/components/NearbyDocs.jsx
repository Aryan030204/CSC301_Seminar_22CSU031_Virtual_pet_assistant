import DocCard from "./DocCard";

const NearbyDocs = () => {
  const arr = [
    { name: "Dr. Raj Pathak", address: "3Vikram Nagar, Velodrome Road, New Delhi" },
    { name: "Dr. 	Jatin Batta", address: "Barakhamba Rd, Connaught Place, New Delhi" },
    { name: "Dr. Yamini Mathur", address: "	Plot No 388, Udyog vihar Phase-3, Gurugram" },
    { name: "Dr. Ritika Jawahar Thaker", address: "Mehrauli Rd, DLF Colony, Sector 14, Gurugram" },
  ];

  return (
    <div className="flex flex-col items-center justify-start gap-6 p-2 border-2 w-[30rem] h-full bg-green-100 rounded-2xl shadow-2xl shadow-black relative z-1">
      <h1 className="text-red-500 text-2xl font-bold">Doctors near you</h1>
      <DocCard arr={arr} />
    </div>
  );
};

export default NearbyDocs;
