import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Profile = () => {
  const [isOpens, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [drawer, setDrawer] = useState(false);

  const { id } = useParams();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOverlayClick);

    return () => {
      document.removeEventListener("mousedown", handleOverlayClick);
    };
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("https://panorbit.in/api/users.json");
        const data = await response.json();
        const users = data.users;
        const userById = data.users.find((u) => u.id.toString() === id);
        setData(users);
        setUser(userById);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex w-screen p-16">
      {/* slider start*/}

      <div className="w-[340px] px-6 flex flex-col justify-center rounded-3xl bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 text-[24px] font-medium text-white">
        <Link to={`/profile/${id}`}>
          <p>Profile</p>
        </Link>
        <hr className="mt-3 border-none h-[2px] bg-white w-full" />
        <Link to={`/post/${id}`}>
          <p>Posts</p>
        </Link>
        <hr className="mt-3 border-none h-[2px] bg-white w-full" />
        <Link to={`/gallery/${id}`}>
          <p>Gallery</p>
        </Link>
        <hr className="mt-3 border-none h-[2px] bg-white w-full" />
        <Link to={`/todo/${id}`}>
          <p>ToDo</p>
        </Link>
      </div>
      {/* slider ends */}

      {/*  body */}

      <div className="ml-[40px] w-full">
        {/* profile and popup start */}
        <div className="flex justify-between">
          <p className="font-medium text-[22px]">Profile</p>
          <button onClick={openModal} className="font-normal flex text-[20px]">
            <img
              src={user.profilepicture}
              className="rounded-[50%] w-[30px] h-[30px] mr-3"
              alt=""
            />
            <p>{user.name}</p>
          </button>
          {isOpens && (
            <div className="modal-overlay fixed inset-0 flex items-center  justify-center z-50 drop-shadow-2xl">
              <div className="modal-content w-[320px] flex flex-col items-center  bg-white rounded-3xl p-8 z-10 absolute right-0 mr-20 top-[148px]">
                <img
                  src={user.profilepicture}
                  alt=""
                  className="rounded-[50%] w-[90px] h-[90px]"
                />
                <p>{user.name}</p>
                <p>{user.email}</p>
                <hr className="mt-3 border-none h-[1px] bg-black w-full" />
                <div className="flex mt-2">
                  <img
                    src="/profiles.jpg"
                    alt=""
                    className="rounded-[50%] w-[30px] h-[30px] mr-3"
                  />
                  <p>Ervin Howell</p>
                </div>
                <hr className="mt-3 border-none h-[1px] bg-black w-full" />
                <div className="flex mt-2">
                  <img
                    src="/profile.jpg"
                    alt=""
                    className="rounded-[50%] w-[30px] h-[30px] mr-3"
                  />
                  <p>Clementine Bauch</p>
                </div>
                <Link to={"/"}>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-4 rounded-3xl"
                    onClick={closeModal}
                  >
                    Sign Out
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
        <hr className="mt-10 border-none h-[1px] bg-gray-500 w-full" />
        {/* profile and popup end*/}

        <div className="flex text-[24px] font-semibold text-gray-700 mt-6 ">
          {/* profile Details start*/}
          <div className="flex flex-col items-start border-r-[2px] border-gray-200 pr-9 leading-[44px]">
            <div className="ml-28">
              <img
                src={user.profilepicture}
                alt=""
                className="mt-11 rounded-[50%] w-[180px] h-[180px]"
              />
              <p className="pt-5">{user.name}</p>
            </div>
            <div className="flex">
              <div className="text-right">
                <p className="text-gray-400  w-[150px] font-medium">
                  Username :
                </p>
              </div>
              <div className="pl-4">{user.username}</div>
            </div>
            <div className="flex">
              <div className="text-right">
                <p className="text-gray-400  w-[150px] font-medium">email : </p>
              </div>
              <div className="pl-4">{user.email}</div>
            </div>
            <div className="flex">
              <div className="text-right">
                <p className="text-gray-400  w-[150px] font-medium">Phone : </p>
              </div>
              <div className="pl-4"> {user.phone}</div>
            </div>
            <div className="flex">
              <div className="text-right">
                <p className="text-gray-400  w-[150px] font-medium">
                  Website :{" "}
                </p>
              </div>
              <div className="pl-4">{user.website}</div>
            </div>

            <hr className="my-6 bg-gray-500 w-[300px] h-[1px]" />
            <p className="pl-24">Company</p>
            <div className="flex">
              <div className="text-right">
                <p className="text-gray-400  w-[150px] font-medium">Name : </p>
              </div>
              <div className="pl-4">{user.company.name}</div>
            </div>
            <div className="flex">
              <div className="text-right">
                <p className="text-gray-400 w-[150px] font-medium">
                  catchphrase :{" "}
                </p>
              </div>
              <div className="pl-4">{user.company.catchPhrase}</div>
            </div>
            <div className="flex">
              <div className="text-right">
                <p className="text-gray-400 w-[150px] font-medium">bs : </p>
              </div>
              <div className="pl-4">{user.company.bs}</div>
            </div>
          </div>
          {/* profile Details end */}

          {/* profile Address start*/}

          <div className="flex w-full flex-col font-semibold text-gray-700 text-[24px] pl-[70px] pt-[20px] leading-[44px]">
            <p>Address:</p>

            <div className="pl-[40px] ">
              <div className="flex">
                <div className="text-right">
                  <p className="text-gray-400 w-[120px] font-medium">
                    Street :
                  </p>
                </div>
                <div className="pl-4">{user.address.street}</div>
              </div>
              <div className="flex">
                <div className="text-right">
                  <p className="text-gray-400 w-[120px] font-medium">
                    Suite :{" "}
                  </p>
                </div>
                <div className="pl-4">{user.address.suite}</div>
              </div>
              <div className="flex">
                <div className="text-right">
                  <p className="text-gray-400 w-[120px] font-medium">City : </p>
                </div>
                <div className="pl-4"> {user.address.city}</div>
              </div>
              <div className="flex">
                <div className="text-right">
                  <p className="text-gray-400 w-[120px] font-medium">
                    Zipcode :
                  </p>
                </div>
                <div className="pl-4"> {user.address.zipcode}</div>
              </div>
              <img
                src="/map.png"
                alt=""
                className="w-[90%] h-[80%] rounded-2xl mt-6"
              />
              <div className="flex justify-end pr-28 text-[14px]">
                <p>
                  Lat:
                  <span className="font-bold text-[18px]">
                    {user.address.geo.lat}
                  </span>
                </p>
                <p className="ml-4">
                  Long:
                  <span className="font-bold text-[18px]">
                    {user.address.geo.lng}
                  </span>
                </p>
              </div>

              {/* chat box start */}

              <div className="relative">
                <div
                  className={`absolute bottom-[-215px]  right-12 cursor-pointer ${
                    drawer ? "h-[485px]" : "h-[15px]"
                  } w-[250px] transition-all ease-in duration-[400ms] text-center text-white`}
                  onClick={() => setDrawer(!drawer)}
                >
                  <p className="bg-blue-500">Chat</p>
                  {drawer && (
                    <div className="bg-white text-black text-[18px] font-normal">
                      {data.map((value) => (
                        <div className="flex pt-3" key={value.name}>
                          <img
                            src={value.profilepicture}
                            className="rounded-[50%] w-[30px] h-[30px] mx-3"
                            alt=""
                          />
                          <p className="mt-[-9px]">{value.name}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* chat box end*/}
              {/* profile Address end*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
