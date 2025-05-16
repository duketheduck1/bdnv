'use client'

import { useState } from 'react';
import { useLoginWithEmail } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';

export default function LoginWithEmail() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const { sendCode, loginWithCode } = useLoginWithEmail();
  const router = useRouter();

  const handleSendCode = async () => {
    try {
      setIsSendingCode(true);
      await sendCode({ email });
      setShowCodeInput(true);
    } catch (error) {
      console.error('Error sending code:', error);
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleLogin = async () => {
    try {
      setIsLoggingIn(true);
      await loginWithCode({ code });
      router.push('/');
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-4 p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEmail(e.currentTarget.value)}
          value={email}
        />
        <button
          onClick={handleSendCode}
          disabled={isSendingCode || !email}
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSendingCode ? 'Sending...' : 'Send Code'}
        </button>
      </div>

      {showCodeInput && (
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Enter verification code"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setCode(e.currentTarget.value)}
            value={code}
          />
          <button
            onClick={handleLogin}
            disabled={isLoggingIn || !code}
            className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoggingIn ? 'Logging in...' : 'Login'}
          </button>
        </div>
      )}
    </div>
  );
}