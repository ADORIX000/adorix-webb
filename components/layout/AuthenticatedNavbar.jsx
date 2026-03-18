'use client';

import { useUser } from '@clerk/nextjs';
import Navbar from './navbar';

export default function AuthenticatedNavbar() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return null;
  }

  return <Navbar />;
}
