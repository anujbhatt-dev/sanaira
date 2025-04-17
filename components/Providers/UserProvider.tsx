"use client";

import { useEffect } from "react";
import { useUser as useClerkUser } from "@clerk/nextjs";
import { useUserStore } from "@/store/useUserStore";
import axios from "axios";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded, isSignedIn, user } = useClerkUser();

  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    const syncUser = async () => {
      if (!isSignedIn || !user) {
        clearUser();
        return;
      }

      try {
        const res = await axios.get("/api/user", {
          params: {
            clerkUserId: user.id,
          },
        });

        if (res.data?.user) {
          setUser(res.data.user);
        } else {
          // fallback to base user format if not found
          setUser({
            clerkUserId: user.id,
            createdAt: user.createdAt?.toISOString?.(),
            lastActiveAt: user.lastActiveAt?.toISOString?.(),
            imageUrl: user.imageUrl,
            firstName: user.firstName,
            lastName: user.lastName,
            primaryEmail: user.primaryEmailAddress?.emailAddress,
            phone: user.phoneNumbers?.[0]?.phoneNumber,
            shippingDetails: {},
            wishlist: [],
            recentlyViewed: [],
            orders: [],
          });
        }
      } catch (err) {
        console.error("Failed to fetch user from Sanity:", err);
      }
    };

    if (isLoaded) {
      syncUser();
    }
  }, [isLoaded, isSignedIn, user, setUser, clearUser]);

  return <>{children}</>;
};
