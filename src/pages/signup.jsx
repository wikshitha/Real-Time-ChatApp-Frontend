import { useState } from "react";

export default function SignUpPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function validateForm() {

  }

  function handleSubmit (e) {
    e.preventDefault();
  }

  return (
  <div className="min-h-screen grid lg:grid-cols-2">
  {/* left side */}
  <div className="flex flex-col items-center justify-center sm:p-12">
    <div className="w-full max-w-md space-y-8">
    {/* LOGO */}
    <div className="text-center mb-8">

    </div>
    </div>

  </div>
  </div>
  )
}