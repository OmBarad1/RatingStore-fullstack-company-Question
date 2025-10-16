import React, { useEffect, useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../AuthContext';

export default function UserDashboard() {
  const [stores, setStores] = useState([]);
  const [stats, setStats] = useState({ stores: 0, ratings: 0 });
  const { user } = useContext(AuthContext); // to identify logged-in user

  // Load stores
  const loadStores = async () => {
    try {
      const res = await api.get('/stores/list');

      // Attach userRating for each store if already rated by this user
      const storesWithUserRating = res.data.map(store => ({
        ...store,
        userRating: store.userRating || 0, // default 0 if not rated
      }));

      setStores(storesWithUserRating);

      // Calculate stats
      const totalRatings = storesWithUserRating.filter(s => s.userRating > 0).length;
      setStats({ stores: storesWithUserRating.length, ratings: totalRatings });
    } catch (err) {
      console.error('Failed to fetch stores', err);
    }
  };

  useEffect(() => {
    loadStores();
  }, []);

  // Submit rating for a store
  const rateStore = async (storeId, rating) => {
    try {
      await api.post('/ratings/submit', { storeId, rating });

      // Update local store data
      setStores(prev =>
        prev.map(s => (s.id === storeId ? { ...s, userRating: rating } : s))
      );

      // Optionally reload stores to update avgRating
      loadStores();
    } catch (err) {
      console.error('Failed to rate store', err);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">User Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-100 p-4 rounded">Total Stores: {stats.stores}</div>
        <div className="bg-yellow-100 p-4 rounded">Rated Stores: {stats.ratings}</div>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-2">All Stores</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stores.map(store => (
            <div key={store.id} className="border p-4 rounded shadow">
              <h3 className="font-semibold">{store.name}</h3>
              <p className="text-sm">{store.address}</p>
              <p className="mt-1">
                Average Rating: {store.avgRating ? store.avgRating.toFixed(1) : 'N/A'}
              </p>
              <p>Your Rating: {store.userRating || 'Not rated'}</p>

              {/* Rating selector */}
              <div className="mt-2 flex gap-2">
                <select
                  value={store.userRating}
                  onChange={e => rateStore(store.id, Number(e.target.value))}
                  className="border p-1 rounded"
                >
                  <option value={0}>Rate</option>
                  {[1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
