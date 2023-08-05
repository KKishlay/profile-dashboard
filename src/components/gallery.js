import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Gallery = () => {
  const [isOpens, setIsOpen] = useState(false);
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

  // Add an event listener when the component mounts
  useEffect(() => {
    document.addEventListener("mousedown", handleOverlayClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleOverlayClick);
    };
  }, []);

  return (
    <div className="flex w-screen h-screen p-16">
      {/* slider start */}
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
      <div className="ml-[40px] w-full">
        {/* header start */}
        <div className="flex justify-between">
          <p className="font-medium text-[22px]">Gallery</p>
          <button onClick={openModal} className="font-normal flex text-[20px]">
            <img
              src={"/images.jpg"}
              className="rounded-[50%] w-[30px] h-[30px] mr-3"
              alt=""
            />
            <p>Leanne Graham</p>
          </button>
          {isOpens && (
            <div className="modal-overlay fixed inset-0 flex items-center  justify-center z-50 drop-shadow-2xl">
              <div className="modal-content w-[320px] flex flex-col items-center  bg-white rounded-3xl p-8 z-10 absolute right-0 mr-20 top-[148px]">
                <img
                  src={"/images.jpg"}
                  alt=""
                  className="rounded-[50%] w-[90px] h-[90px]"
                />
                <p>Leanne Graham</p>
                <p>Sincere@april.biz</p>
                <hr className="mt-3 border-none h-[1px] bg-black w-full" />
                <div className="flex mt-2">
                  <img
                    src="/profiles.jpg"
                    alt=""
                    className="rounded-[50%] w-[30px] h-[30px] mr-3"
                  />
                  <p>Clementine Bauch</p>
                </div>
                <hr className="mt-3 border-none h-[1px] bg-black w-full" />
                <div className="flex mt-2">
                  <img
                    src="/profile.jpg"
                    alt=""
                    className="rounded-[50%] w-[30px] h-[30px] mr-3"
                  />
                  <p>Ervin Howell</p>
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
        {/* header end */}
        <hr className="mt-10 border-none h-[1px] bg-gray-500 w-full" />
        <div className="text-[94px] h-[100%] text-gray-400 font-bold flex items-center justify-center">
          <p className="text-center">Coming Soon</p>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
