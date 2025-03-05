"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "@/services/userService";

export default function UserFetcher() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      await getUser(dispatch);
    };

    fetchUserData();
  }, [dispatch]);

  return null; // This component doesn't render anything
}
