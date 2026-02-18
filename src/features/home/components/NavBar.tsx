import React from "react";

const NavBar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 w-full z-50">
      {/* Left Section */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-56 p-2 shadow"
          >
            <li>
              <a href="/">Home</a>
            </li>

            <li>
              <a>About</a>
              <ul className="p-2">
                <li>
                  <a href="/about">About Us</a>
                </li>
                <li>
                  <a href="/achievements">Achievements</a>
                </li>
              </ul>
            </li>

            <li>
              <a>Programs</a>
              <ul className="p-2">
                <li>
                  <a href="/programs">All Programs</a>
                </li>
                <li>
                  <a href="/programs?type=education">Education</a>
                </li>
                <li>
                  <a href="/programs?type=health">Health</a>
                </li>
                <li>
                  <a href="/programs?type=social">Social Support</a>
                </li>
              </ul>
            </li>

            <li>
              <a>Projects</a>
              <ul className="p-2">
                <li>
                  <a href="/projects?status=active">Active Projects</a>
                </li>
                <li>
                  <a href="/projects?status=completed">Completed Projects</a>
                </li>
                <li>
                  <a href="/projects?status=upcoming">Upcoming Projects</a>
                </li>
              </ul>
            </li>

            <li>
              <a>Events</a>
              <ul className="p-2">
                <li>
                  <a href="/events?type=upcoming">Upcoming Events</a>
                </li>
                <li>
                  <a href="/events?type=past">Past Events</a>
                </li>
              </ul>
            </li>

            <li>
              <a>Media</a>
              <ul className="p-2">
                <li>
                  <a href="/news">News</a>
                </li>
                <li>
                  <a href="/gallery">Gallery</a>
                </li>
              </ul>
            </li>

            <li>
              <a href="/donate">Donate</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <a className="btn btn-ghost text-xl">Debo Ethiopia</a>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          <li>
            <a href="/">Home</a>
          </li>

          <li>
            <details>
              <summary>About</summary>
              <ul className="p-2 bg-base-100 w-44 shadow">
                <li>
                  <a href="/about">About Us</a>
                </li>
                <li>
                  <a href="/achievements">Achievements</a>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <details>
              <summary>Programs</summary>
              <ul className="p-2 bg-base-100 w-52 shadow">
                <li>
                  <a href="/programs">All Programs</a>
                </li>
                <li>
                  <a href="/programs?type=education">Education</a>
                </li>
                <li>
                  <a href="/programs?type=health">Health</a>
                </li>
                <li>
                  <a href="/programs?type=social">Social Support</a>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <details>
              <summary>Projects</summary>
              <ul className="p-2 bg-base-100 w-52 shadow">
                <li>
                  <a href="/projects?status=active">Active Projects</a>
                </li>
                <li>
                  <a href="/projects?status=completed">Completed Projects</a>
                </li>
                <li>
                  <a href="/projects?status=upcoming">Upcoming Projects</a>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <details>
              <summary>Events</summary>
              <ul className="p-2 bg-base-100 w-52 shadow">
                <li>
                  <a href="/events?type=upcoming">Upcoming Events</a>
                </li>
                <li>
                  <a href="/events?type=past">Past Events</a>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <details>
              <summary>Media</summary>
              <ul className="p-2 bg-base-100 w-44 shadow">
                <li>
                  <a href="/news">News</a>
                </li>
                <li>
                  <a href="/gallery">Gallery</a>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <a href="/donate" className="font-semibold text-primary">
              Donate
            </a>
          </li>

          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </div>

      {/* Right Section */}
      <div className="navbar-end">
        <a href="/login" className="btn btn-outline btn-primary">
          Login
        </a>
      </div>
    </div>
  );
};

export default NavBar;
