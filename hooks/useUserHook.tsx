"use client"
import { useUser } from '@clerk/nextjs'

export default function useUserHook() {
    const {user} = useUser();
  return user;
}
