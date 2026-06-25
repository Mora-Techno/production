"use client";

import { getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useAppSelector } from "@/hooks/dispatch/dispatch";

import { APP_SESSION_COOKIE_KEY } from "@/configs/cookies.config";
import { isAuthRoute, isPublicRoute } from "@/configs/routes.config";
import { useAppDispatch } from "@/hooks/dispatch/dispatch";
import { setCurrentUser } from "@/stores/authSlice/authSlice";
import type { AuthSession } from "@/types/api/auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const dispatch = useAppDispatch();
  const [hydrated, setHydrated] = React.useState(false);
  const userTokens = useAppSelector(
    (state) => state.auth.currentUser?.user.token,
  );

  React.useEffect(() => {
    const token = getCookie(APP_SESSION_COOKIE_KEY);
    if (token && !userTokens) {
      dispatch(
        setCurrentUser({
          user: {
            id: "",
            email: "",
            fullName: "",
            role: "user",
            token: String(token),
          },
        } satisfies AuthSession),
      );
    }
    setHydrated(true);
  }, [userTokens, dispatch]);

  React.useEffect(() => {
    if (!hydrated || !pathname) return;

    const isAuthenticated = Boolean(userTokens);
    const onPublic = isPublicRoute(pathname);
    const onAuth = isAuthRoute(pathname);

    if (!isAuthenticated && !onPublic && !onAuth) {
      router.replace("/login");
      return;
    }
    // disini harus check role lagi
    if (isAuthenticated && onAuth) {
      router.replace("/home");
    }
  }, [pathname, userTokens, router, hydrated]);

  return <>{children}</>;
}
