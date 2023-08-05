import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("https://panorbit.in/api/users.json");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const responseData = await response.json();
      const users = responseData.users;
      console.log("API Response Data:", users);
      setData(users);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err.message || "Error fetching data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-[url('../public/curve.jpg')] object-cover bg-cover bg-no-repeat ">
      <div className="w-[700px] overflow-hidden p-10 rounded-3xl drop-shadow-2xl">
        <div className="bg-slate-100 py-6 rounded-3xl">
          <p className="text-center font-semibold text-[24px]">
            Select an account
          </p>
        </div>

        <div className="max-h-[500px] ml-6 overflow-y-auto bg-whiye">
          {data.map((val, i) => (
            <Link to={`/profile/${val.id}`} key={val.id}>
              <div className="mt-7" key={val.id}>
                <div className="flex text-[20px] mb-3 font-semibold">
                  <img
                    src={val.profilepicture}
                    alt=""
                    className="rounded-[50%] w-[30px] h-[30px] mr-6"
                  />
                  <p>{val.name}</p>
                </div>
                <hr className="mt-3 border-none h-[1px] bg-black w-full" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
