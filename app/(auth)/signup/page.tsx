import React from 'react';
import { SignUpForm } from './SignUpForm';

export default function page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <SignUpForm />
      </div>
    </main>
  );
}
