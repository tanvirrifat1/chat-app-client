import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

function Navbar() {
  const { logout, authUser } = useAuthStore();

  return (
    <div className="mx-auto container">
      <div className="navbar bg-base-100 shadow-2xl">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            Chat App
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={authUser?.profileImage || ""}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {authUser && (
                <>
                  <li>
                    <Link to="/profile">
                      <p className="justify-between">Profile</p>
                    </Link>
                  </li>
                  <li>
                    <Link to="/setting">
                      <p className="justify-between">Setting</p>
                    </Link>
                  </li>
                  <li onClick={logout}>
                    <p>Logout</p>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
