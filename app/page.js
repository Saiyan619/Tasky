"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import GlobalApi from "@/app/_utils/GlobalApi";
import Link from "next/link";
import { useRouter } from "next/navigation"; 

export default function Home() {
  const router = useRouter();
  const { user } = useUser();
  const [allowClick, setAllowClick] = useState(false);

  const navigateToHomePage = () => {
    router.push("/home"); 
  };

  useEffect(() => {
    if (user) {
      createUsers();
      console.log("This is home");
    }
  }, [user]);

  const createUsers = async () => {
    if (user) {
      navigateToHomePage();
    }

    setAllowClick(true);

      
    try {
      const data = {
        clerkId: user?.id,
        name: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        createdAt: user?.createdAt,
      };

      const resp = await GlobalApi.createUser(data);
      console.log(resp);
      console.log("User created");
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setAllowClick(false); 
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello 👋</h1>
          <span className="text-2xl font-bold">Welcome to Tasky</span>
          <p className="py-6">
            Make collaboration and organization of tasks easier
          </p>

          {!allowClick ? (
            <button className="btn btn-primary">
              <Link href="/home">Get Started📝</Link>
            </button>
          ) : (
            <button disabled className="btn">
              <span className="loading loading-spinner"></span>
              <Link href="/home">Please wait...</Link>
            </button>
          )}

          {allowClick && (
            <div>
              <span className="text-sm font-bold text-gray-600">
                Please wait, saving user profile, might take a minute...
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
