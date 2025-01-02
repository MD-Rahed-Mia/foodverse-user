import React from "react";

function Header({ title }) {

  return (
    <header className="bg-gradient-to-r z-50 from-purple-200 to-blue-200 p-4 w-full fixed top-0 left-0">
      <div className="flex flex-col items-center mb-2 mt-2 justify-between">
        <div className="w-full text-center">
          <span className="font-bold text-blue-700">{title}
     
      </span>

        </div>
      </div>
    </header>
  );
}

export default Header;
