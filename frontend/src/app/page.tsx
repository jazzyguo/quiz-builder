"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { HOME_URL } from "@/config";

const IndexPage = () => {
  const router = useRouter();
  const { user } = useAuth();

  if (user.uid) {
    router.push(HOME_URL);
    return null;
  }

  return (
    <div className="text-center page-container">
      Log in to get started!
    </div>
  )
}

export default IndexPage

