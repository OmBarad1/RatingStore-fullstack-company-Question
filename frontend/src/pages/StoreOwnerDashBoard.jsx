import React, { useEffect, useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../AuthContext';

const StoreOwnerDashBoard = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get('/stores/list'); // same endpoint
      setStores(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch stores.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading)
    return (
      <p className="text-center text-gray-600 mt-8 text-lg animate-pulse">
        Loading stores...
      </p>
    );

  if (error)
    return (
      <p className="text-center text-red-500 mt-8 text-lg font-medium">
        {error}
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto mt-12 bg-white p-8 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-semibold text-center text-[#009688] mb-8">
        My Stores
      </h1>

      {stores.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No stores found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-[#009688] text-white">
              <tr>
                <th className="py-3 px-5 text-left text-sm uppercase font-semibold">
                  Store Name
                </th>
                <th className="py-3 px-5 text-left text-sm uppercase font-semibold">
                  Email
                </th>
                <th className="py-3 px-5 text-left text-sm uppercase font-semibold">
                  Address
                </th>
                <th className="py-3 px-5 text-left text-sm uppercase font-semibold">
                  Average Rating
                </th>
              </tr>
            </thead>
            <tbody>
              {stores.map((store, index) => (
                <tr
                  key={store.id}
                  className={`${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } hover:bg-gray-100 transition`}
                >
                  <td className="py-3 px-5 border-t border-gray-200">
                    {store.name}
                  </td>
                  <td className="py-3 px-5 border-t border-gray-200">
                    {store.email}
                  </td>
                  <td className="py-3 px-5 border-t border-gray-200">
                    {store.address}
                  </td>
                  <td className="py-3 px-5 border-t border-gray-200 font-medium text-gray-700">
                    {store.avgRating ? store.avgRating.toFixed(1) : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StoreOwnerDashBoard;
