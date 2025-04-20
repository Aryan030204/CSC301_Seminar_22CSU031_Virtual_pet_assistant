import DocCard from "./DocCard";

const NearbyDocs = () => {
  const arr = [
    { name: "Dr. Raj Pathak", address: "33, Wall Street, New York" },
    { name: "Dr. Susan Miller", address: "12, Oak Avenue, San Francisco" },
    { name: "Dr. John Doe", address: "56, Pine Road, Los Angeles" },
    { name: "Dr. Emma Davis", address: "88, Maple Street, Chicago" },
  ];

  return (
    <div className="flex flex-col items-center justify-start gap-6 p-2 border-2 w-[30rem] h-full bg-green-100 rounded-2xl">
      <h1 className="text-red-500 text-2xl font-bold">Doctors near you</h1>
      <DocCard arr={arr} />
    </div>
  );
};

export default NearbyDocs;
