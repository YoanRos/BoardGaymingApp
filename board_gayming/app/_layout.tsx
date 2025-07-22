import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '../provider/AuthProvider';
import "../global.css"

// Define a type for the segments
type Segment = '(tabs)' | 'community' | '_sitemap' | 'explore' | '+not-found' | '(auth)';

// Makes sure the user is authenticated before accessing protected pages
const InitialLayout = () => {
  const { session, initialized } = useAuth();
  const segments = useSegments() as Segment[];
  const router = useRouter();

  useEffect(() => {
    if (!initialized) return;

    // Check if the path/url is in the (auth) group
    const inAuthGroup = segments[0] === '(auth)';

    if (session && !inAuthGroup) {
      // Redirect authenticated users to the list page
      router.replace('/list' as any);
    } else if (!session && !inAuthGroup) {
      // Redirect unauthenticated users to the login page
      router.replace('/' as any);
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
