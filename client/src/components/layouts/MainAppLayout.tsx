import React from 'react';
import { Outlet } from '@tanstack/react-router';
import { UserSessionNavbar } from '@/components/custom/UserSessionNavbar';

export function MainAppLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <UserSessionNavbar />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        {/* 
          'flex-grow' ensures this main content area expands to fill available vertical space.
          'container mx-auto' centers the content with a max-width, responsive by default.
          'p-4 sm:p-6 lg:p-8' provides responsive padding.
        */}
        <Outlet />
      </main>
      {/* 
        A footer could be added here if desired in the future.
        <footer className="p-4 bg-gray-100 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} MyApp. All rights reserved.
        </footer> 
      */}
    </div>
  );
}
