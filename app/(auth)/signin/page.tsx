import React from 'react';
import { SignInForm } from './SignInForm';

export default function page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <SignInForm />
      </div>
    </main>
  );
}
