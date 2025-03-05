"use client";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from '@/services/userService';


export default function ClientOnly({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Fetch dữ liệu người dùng và dispatch action
    const fetchUserData = async () => {
        await getUser(dispatch);
    };

      fetchUserData();
  }, [dispatch]);

  if (!mounted) return null;

  return <>{children}</>;
}
