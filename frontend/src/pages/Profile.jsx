import React, { useContext, useState } from 'react';
import api from '../api';
import { AuthContext } from '../AuthContext';

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [newPassword, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const updatePassword = async e => {
    e.preventDefault();
    try {
      await api.put('/users/update-password', { newPassword });
      setMsg('Password updated successfully!');
      setPassword('');
    } catch {
      setMsg('Error updating password');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Address:</b> {user.address}</p>
      <p><b>Role:</b> {user.role}</p>

      <form onSubmit={updatePassword} className="mt-6 space-y-3">
        <input
          type="password"
          value={newPassword}
          onChange={e => setPassword(e.target.value)}
          placeholder="New Password"
          className="border w-full p-2 rounded"
        />
        <button className="bg-blue-600 text-white px-3 py-2 rounded w-full">Update Password</button>
      </form>
      {msg && <div className="mt-2 text-green-600">{msg}</div>}
    </div>
  );
}
