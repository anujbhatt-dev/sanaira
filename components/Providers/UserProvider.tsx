"use client";

import { useEffect } from "react";
import { useUser as useClerkUser } from "@clerk/nextjs";
import axios from "axios";



export const UserProvider = () => {
  const { isLoaded, isSignedIn, user } = useClerkUser();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (isSignedIn && user) {
          const res = await axios.post("/api/user/user-details", {
            user
          });
          console.log("User details response:", res.data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (isLoaded) {
      fetchUser();
    }
  }, [isLoaded, isSignedIn, user]);

  return null;
};
