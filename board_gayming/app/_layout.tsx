import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../provider/AuthProvider";
import "../global.css";

// Define a type for the segments
type Segment =
  | "(tabs)"
  | "community"
  | "_sitemap"
  | "explore"
  | "+not-found"
  | "(auth)"
  | "channelMain";

// Makes sure the user is authenticated before accessing protected pages
const InitialLayout = () => {
  const { session, initialized } = useAuth();
  const segments = useSegments() as Segment[];
  const router = useRouter();

  useEffect(() => {
    console.log(initialized, "vvrrf");
    if (!initialized) return;

    const inAuthGroup = segments[0] === "(tabs)";
    console.log(inAuthGroup);
    const currentRoute = segments.join("/");
    console.log("krofkref", currentRoute);

    // Si pas de session et qu'on essaie d'accéder à une route hors (auth), rediriger vers /login
    if (!session && !inAuthGroup) {
      router.replace("/" as any);
    }
    // Si session et qu'on essaie d'accéder à une route dans (auth), rediriger vers /community
    else if (session && inAuthGroup) {
      router.replace("/community" as any);
    }
  }, [session, initialized, segments]);

  return <Slot />;
};

// Wrap the app with the AuthProvider
const RootLayout = () => {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
};

export default RootLayout;
