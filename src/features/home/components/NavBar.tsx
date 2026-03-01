import { useState, useEffect, useRef } from "react";
import logo from "@/assets/images/image copy.png";

const NavBar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (menuId: string) => {
    setOpenMenu((prev) => (prev === menuId ? null : menuId));
  };

  return (
    <nav
      ref={navRef}
      className="navbar bg-base-100 shadow-sm fixed top-0 left-0 w-full z-50"
      aria-label="Main Navigation"
    >
      {/* Left Section */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
            aria-label="Open Mobile Menu"
            aria-haspopup="true"
          >
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
              <a role="button">About</a>
              <ul className="p-2">
                <li>
                  <a href="/about">About Us</a>
                </li>
                <li>
                  <a href="/BoardLeadership">BoardLeadership</a>
                </li>

                <li>
                  <a href="/achievements">Achievements</a>
                </li>
              </ul>
            </li>

            <li>
              <a href="/programs">Programs</a>
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
        <a href="/" className="btn btn-ghost px-2 hover:bg-transparent">
          <img
            src={logo}
            alt="Debo Ethiopia"
            className="h-10 w-auto object-contain"
          />
        </a>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          <li>
            <a href="/">Home</a>
          </li>

          <li>
            <details open={openMenu === "about"}>
              <summary
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu("about");
                }}
                aria-expanded={openMenu === "about"}
                aria-haspopup="true"
              >
                About
              </summary>
              <ul className="p-2 bg-base-100 w-44 shadow">
                <li>
                  <a href="/about" onClick={() => setOpenMenu(null)}>
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/achievements" onClick={() => setOpenMenu(null)}>
                    Achievements
                  </a>
                </li>
                <li>
                  <a href="/BoardLeadership" onClick={() => setOpenMenu(null)}>
                    Board Leadership
                  </a>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <a href="/programs" onClick={() => setOpenMenu(null)}>
              Programs
            </a>
          </li>

          <li>
            <details open={openMenu === "projects"}>
              <summary
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu("projects");
                }}
                aria-expanded={openMenu === "projects"}
                aria-haspopup="true"
              >
                Projects
              </summary>
              <ul className="p-2 bg-base-100 w-52 shadow">
                <li>
                  <a
                    href="/projects?status=active"
                    onClick={() => setOpenMenu(null)}
                  >
                    Active Projects
                  </a>
                </li>
                <li>
                  <a
                    href="/projects?status=completed"
                    onClick={() => setOpenMenu(null)}
                  >
                    Completed Projects
                  </a>
                </li>
                <li>
                  <a
                    href="/projects?status=upcoming"
                    onClick={() => setOpenMenu(null)}
                  >
                    Upcoming Projects
                  </a>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <details open={openMenu === "events"}>
              <summary
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu("events");
                }}
                aria-expanded={openMenu === "events"}
                aria-haspopup="true"
              >
                Events
              </summary>
              <ul className="p-2 bg-base-100 w-52 shadow">
                <li>
                  <a
                    href="/events?type=upcoming"
                    onClick={() => setOpenMenu(null)}
                  >
                    Upcoming Events
                  </a>
                </li>
                <li>
                  <a href="/events?type=past" onClick={() => setOpenMenu(null)}>
                    Past Events
                  </a>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <details open={openMenu === "media"}>
              <summary
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu("media");
                }}
                aria-expanded={openMenu === "media"}
                aria-haspopup="true"
              >
                Media
              </summary>
              <ul className="p-2 bg-base-100 w-44 shadow">
                <li>
                  <a href="/newsletter" onClick={() => setOpenMenu(null)}>
                    News
                  </a>
                </li>
                <li>
                  <a href="/gallery" onClick={() => setOpenMenu(null)}>
                    Gallery
                  </a>
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
        {/* Login button removed as requested */}
      </div>
    </nav>
  );
};

export default NavBar;
