import React from "react";

const UserCard2 = ({ user }) => {
  return (
    <div
    // class={`py-2 px-4 mb-2 max-h-max max-w-sm mx-auto ${
    //   user.role === "Manager" ? " bg-blue-300 bg-opacity-10" : "bg-white"
    // } rounded-xl shadow-lg sm:flex sm:items-center sm:space-y-0 sm:space-x-6 hover:cursor-pointer hover:shadow-md hover:shadow-sky-600`}
    >
      <img
        class="block mx-auto h-16 rounded-full sm:mx-0 sm:shrink-0"
        src="https://marketplace.canva.com/EAFYx69xVOI/1/0/1600w/canva-orange-modern-linkedin-profile-picture-k54C2cqH5tg.jpg"
        alt="Woman's Face"
      />
      <div class="text-center  sm:text-left">
        <div class="space-y-0.5">
          <p class=" text-base text-black font-semibold">
            {user === null ? "Tamer" : user.firstName}
          </p>
          <p class=" text-sm text-slate-500 font-medium">
            {user === null ? "ADMIN" : user.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard2;
