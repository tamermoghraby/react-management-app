import React from "react";
import { Box } from "@mui/material";
import KanbanTest from "../scenes/kanban/KanbanTest";

const NewCard = ({ user }) => {
  return (
    <div>
      <div className="group card m-full w-full h-40 bg-sky-950 rounded-lg relative shadow-md  shadow-orange-500 transition-all duration-300 ease-in hover:h-60 hover:cursor-pointer hover:opacity-80 ">
        <div className="imgBx absolute left-1/2 -top-0 -translate-x-1/2 rounded-3xl  w-20 h-20 bg-white shadow-md shadow-slate-400 transition-all duration-300 ease-in overflow-hidden group-hover:w-28 group-hover:h-28">
          <img
            className=" absolute top-0 left-0 w-full h-full object-cover"
            src="https://marketplace.canva.com/EAFYx69xVOI/1/0/1600w/canva-orange-modern-linkedin-profile-picture-k54C2cqH5tg.jpg"
          />
        </div>

        <div className="content translate-y-8 absolute w-full h-full flex justify-end items-end transition-all duration-300 ease-in group-hover:translate-y-0">
          <div className="details p-10 text-center w-full transition-all duration-300 overflow-hidden">
            <h1 className=" text-2xl text-gray-300 font-semibold ">Tamer Mg</h1>
            <span className=" text-sm text-green-600 font-medium opacity-75 ">
              Software Developer
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCard;
