'use client';

import { useAuth } from '@clerk/nextjs';
import Navbar from './navbar';

export default function AuthenticatedNavbar() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return null;
  }

  return <Navbar />;
}
