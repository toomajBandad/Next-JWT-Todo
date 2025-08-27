import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MdSpaceDashboard } from "react-icons/md";
import { IoIosLogIn } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { FaRegistered } from "react-icons/fa";
import { FaSolarPanel } from "react-icons/fa";

function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userAuth = async () => {
      const res = await fetch("/api/auth/me");
      if (res.status === 200) {
        setIsLoggedIn(true);
        const user = await res.json();

        if (user.role === "ADMIN") {
          setIsAdmin(true);
        }
      }
    };

    userAuth();
  }, []);

  const signOut = async () => {
    const res = await fetch("/api/auth/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <ul className="sidebar-links">
          {isLoggedIn && (
            <>
              <li>
                <Link href="/dashboard" className="iconWrapper">
                  <span>
                    <MdSpaceDashboard />
                  </span>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="#" className="iconWrapper" onClick={signOut}>
                  <span>
                    <IoIosLogOut />
                  </span>
                  Logout
                </Link>
              </li>
            </>
          )}

          {!isLoggedIn && (
            <>
              <li>
                <Link href="/signin" className="iconWrapper">
                  <span>
                    <IoIosLogIn />
                  </span>
                  Sign in
                </Link>
              </li>
              <li>
                <Link href="/signup" className="iconWrapper">
                  <span>
                    <FaRegistered />
                  </span>
                  Sign up
                </Link>
              </li>
            </>
          )}

          {isAdmin && (
            <li>
              <Link href="/p-admin" className="iconWrapper">
                <span>
                  <FaSolarPanel />
                </span>
                Admin panel
              </Link>
            </li>
          )}
        </ul>
      </aside>
      <main className="main"></main>
    </div>
  );
}

export default Index;
