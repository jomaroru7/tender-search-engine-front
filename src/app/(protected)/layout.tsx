'use client';

import { ReactNode } from 'react';
import AuthGuard from '@/components/auth-guard/AuthGuard';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}