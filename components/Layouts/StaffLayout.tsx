'use client';
import React, { useState } from 'react';
import NSideBar from '../NSideBar';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="relative flex h-screen bg-gray-100">
        {/*Sidebar*/}
        <aside className="absolute z-10 bg-white shadow-md p-4 h-full">
          <NSideBar />
        </aside>
     
      {/*Main Section*/}
      <main className="flex flex-col w-full p-4 pl-15">
        <div className="flex flex-grow">{children}</div>
      </main>
      </div>
    </>
  );
}
