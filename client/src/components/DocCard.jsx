/* eslint-disable react/prop-types */
const DocCard = ({ arr }) => {
  return (
    <>
      {arr.map((i) => {
        return (
          <>
            <div className="flex w-full p-2 h-[5rem] shadow-2xl bg-green-700 rounded-xl items-center">
              <div className="flex flex-col w-full justify-between">
                <h1 className="font-bold text-white">{i.name}</h1>
                <h2 className="text-white">{i.address}</h2>
              </div>
              <div className="bg-red-500 w-40 text-white font-semibold p-1 rounded-xl">
                <button>Schedule a call</button>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default DocCard;
