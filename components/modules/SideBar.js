import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { MdSpaceDashboard } from "react-icons/md";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { FaSolarPanel, FaRegistered, FaListAlt, FaHome } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { useAuth } from "@/context/AuthContext";

export default function SideBar() {
  const { isLoggedIn, isAdmin, setIsLoggedIn, setIsAdmin } = useAuth();
  const router = useRouter();

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isAdmin, setIsAdmin] = useState(false);

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
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-yellow-200">
      <ToastContainer />
      <aside className="h-full w-72 bg-white shadow-xl p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-amber-600 mb-10 text-center">
            MENU
          </h2>
          <ul className="space-y-6">
            <li>
              <Link
                href="/"
                className="flex items-center gap-3 text-lg font-semibold text-gray-700 hover:text-amber-500 transition"
              >
                <FaHome className="text-2xl" />
                Home
              </Link>
            </li>

            {isAdmin && (
              <li>
                <Link
                  href="/p-admin"
                  className="flex items-center gap-3 text-lg font-semibold text-gray-700 hover:text-amber-500 transition"
                >
                  <FaSolarPanel className="text-2xl" />
                  Admin Panel
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <>
                <li>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 text-lg font-semibold text-gray-700 hover:text-amber-500 transition"
                  >
                    <MdSpaceDashboard className="text-2xl" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/todos"
                    className="flex items-center gap-3 text-lg font-semibold text-gray-700 hover:text-amber-500 transition"
                  >
                    <FaListAlt className="text-2xl" />
                    Todos
                  </Link>
                </li>
                <li>
                  <button
                    onClick={signOut}
                    className="flex items-center gap-3 text-lg font-semibold text-gray-700 hover:text-red-500 transition w-full text-left"
                  >
                    <IoIosLogOut className="text-2xl" />
                    Logout
                  </button>
                </li>
              </>
            )}

            {!isLoggedIn && (
              <>
                <li>
                  <Link
                    href="/signin"
                    className="flex items-center gap-3 text-lg font-semibold text-gray-700 hover:text-amber-500 transition"
                  >
                    <IoIosLogIn className="text-2xl" />
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="flex items-center gap-3 text-lg font-semibold text-gray-700 hover:text-amber-500 transition"
                  >
                    <FaRegistered className="text-2xl" />
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <footer className="text-sm text-gray-400 text-center mt-10">
          &copy; {new Date().getFullYear()} Toomaj Inc.
        </footer>
      </aside>
    </div>
  );
}
