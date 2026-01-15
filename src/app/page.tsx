'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-deep-navy">
      <div className="text-center">
        <div className="animate-pulse-slow">
          <h1 className="text-4xl font-bold text-medical-teal mb-4">
            NEXUS Ecosystem
          </h1>
          <p className="text-ice-gray text-lg">
            Carregando plataforma clínica inteligente...
          </p>
        </div>
      </div>
    </div>
  );
}
