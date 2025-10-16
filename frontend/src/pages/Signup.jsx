import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const passwordRegex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,16}$/;

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
//   const [storeName, setStoreName] = useState('');
//   const [storeAddress, setStoreAddress] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validate = () => {
    if (name.length < 3 || name.length > 60) {
      setError('Name must be between 3 and 60 characters');
      return false;
    }
    if (address.length > 400) {
      setError('Address must be max 400 characters');
      return false;
    }
    if (!passwordRegex.test(password)) {
      setError('Password must be 8–16 chars, include uppercase and special char');
      return false;
    }
    if (!/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setError('Invalid email');
      return false;
    }
    // if (role === 'owner') {
    //   if (!storeName.trim() || !storeAddress.trim()) {
    //     setError('Please enter store name and store address');
    //     return false;
    //   }
    // }
    setError(null);
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      // ✅ Include role and store info when owner
      await api.post('/auth/register', {
        name,
        email,
        address,
        password,
        role,
        
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign up</h2>

      {error && <div className="text-red-600 mb-2 text-center">{error}</div>}

      <form onSubmit={submit} className="space-y-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="w-full border p-2 rounded"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border p-2 rounded"
        />
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          className="w-full border p-2 rounded"
        />

        {/* ✅ Role Dropdown */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border p-2 rounded bg-white"
        >
          <option value="user">User</option>
          <option value="owner">Owner</option>
          <option value="admin">Admin</option>
        </select>


        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border p-2 rounded"
        />
        <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition">
          Create Account
        </button>
      </form>
    </div>
  );
}