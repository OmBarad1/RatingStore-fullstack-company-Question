import React, { useEffect, useState } from 'react';
import api from '../api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, stores: 0, ratings: 0 });
  const [stores, setStores] = useState([]);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const load = async () => {
      const [s2, s3] = await Promise.all([
        // api.get('/admin/users'),
        api.get('/stores/list'),
        api.get('/users/list'),
      ]);
      // setStats(s1.data);
      setUsers(s3.data);
      setStores(s2.data);
    };
    load();
  }, []);

  const filteredUsers = users.filter(
    u =>
      u.name.toLowerCase().includes(filter.toLowerCase()) ||
      u.email.toLowerCase().includes(filter.toLowerCase()) ||
      u.address.toLowerCase().includes(filter.toLowerCase()) ||
      u.role.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded">Total Users: {stats.users}</div>
        <div className="bg-green-100 p-4 rounded">Total Stores: {stats.stores}</div>
        <div className="bg-yellow-100 p-4 rounded">Total Ratings: {stats.ratings}</div>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-2">All Stores</h3>
        <table className="w-full border text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Address</th>
              <th className="p-2">Rating</th>
            </tr>
          </thead>
          <tbody>
            {stores.map(s => (
              <tr key={s.id} className="border-t">
                <td className="p-2">{s.name}</td>
                <td className="p-2">{s.email}</td>
                <td className="p-2">{s.address}</td>
                <td>{s.avgRating ? Number(s.avgRating).toFixed(1) :'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-2">All Users</h3>
        <input
          placeholder="Filter users..."
          className="border p-2 mb-4 rounded w-full"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
        <table className="w-full border text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Address</th>
              <th className="p-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(u => (
              <tr key={u.id} className="border-t">
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.address}</td>
                <td className="p-2">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
