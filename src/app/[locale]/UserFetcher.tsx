"use client";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "@/services/userService";

export default function UserFetcher({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      await getUser(dispatch);
    };

    fetchUserData();
  }, [dispatch]);

  return <>{children}</>;
}
