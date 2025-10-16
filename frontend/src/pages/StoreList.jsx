import React, { useEffect, useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../AuthContext';


function StoreCard({ store, onRate }) {
const [userRating, setUserRating] = useState(store.userRating || 0);
const [editing, setEditing] = useState(false);


const submit = async () => {
await onRate(store.id, userRating);
setEditing(false);
};


return (
<div className="border p-4 rounded">
<h3 className="font-semibold">{store.name}</h3>
<div className="text-sm">{store.address}</div>
<div className="mt-2">Average: {store.averageRating ?? 'N/A'}</div>
<div className="mt-2">Your rating: {userRating || 'Not rated'}</div>
{editing ? (
<div className="mt-2 flex gap-2">
<select value={userRating} onChange={(e)=>setUserRating(Number(e.target.value))}>
<option value={0}>Select</option>
{[1,2,3,4,5].map(n=> <option key={n} value={n}>{n}</option>)}
</select>
<button onClick={submit} className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
<button onClick={()=>setEditing(false)} className="px-3 py-1 border rounded">Cancel</button>
</div>
) : (
<div className="mt-2 flex gap-2">
<button onClick={()=>setEditing(true)} className="px-3 py-1 bg-indigo-600 text-white rounded">{userRating? 'Edit Rating' : 'Rate'}</button>
</div>
)}
</div>
);
}


export default function StoreList() {
const [stores, setStores] = useState([]);
const [q, setQ] = useState('');
const { user } = useContext(AuthContext);


const load = async () => {
const res = await api.get('/stores/list');
setStores(res.data);
};
}