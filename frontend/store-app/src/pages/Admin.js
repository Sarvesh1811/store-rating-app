import { useEffect, useState } from "react";
import API from "../utils/api";
import Navbar from "../components/Navbar";

export default function Admin() {
  const [stats, setStats] = useState({
    users: 0,
    stores: 0,
    ratings: 0,
  });

  const [owners, setOwners] = useState([]);
  const [storeData, setStoreData] = useState({
    name: "",
    email: "",
    address: "",
    ownerId: "",
  });

  useEffect(() => {
   
    API.get("/admin/dashboard")
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));

    
    API.get("/admin/users")
      .then((res) => setOwners(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setStoreData({ ...storeData, [e.target.name]: e.target.value });
  };

  const addStore = async () => {
    if (!storeData.ownerId) {
      return alert("Please select store owner");
    }

    try {
      await API.post("/admin/stores", storeData);
      alert("Store added successfully");

      
      const res = await API.get("/admin/dashboard");
      setStats(res.data);

      setStoreData({
        name: "",
        email: "",
        address: "",
        ownerId: "",
      });

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Create Store</h2>

          <input
            name="name"
            value={storeData.name}
            placeholder="Store Name"
            className="w-full p-2 mb-3 border rounded"
            onChange={handleChange}
          />

          <input
            name="email"
            value={storeData.email}
            placeholder="Store Email"
            className="w-full p-2 mb-3 border rounded"
            onChange={handleChange}
          />

          <input
            name="address"
            value={storeData.address}
            placeholder="Store Address"
            className="w-full p-2 mb-3 border rounded"
            onChange={handleChange}
          />

          <select
            name="ownerId"
            value={storeData.ownerId}
            className="w-full p-2 mb-3 border rounded"
            onChange={handleChange}
          >
            <option value="">Select Store Owner</option>
            {owners.map((owner) => (
              <option key={owner._id} value={owner._id}>
                {owner.name} ({owner.email})
              </option>
            ))}
          </select>

          <button
            onClick={addStore}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Store
          </button>
        </div>

        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2>Total Users</h2>
            <p className="text-3xl font-bold text-blue-600">
              {stats.users}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2>Total Stores</h2>
            <p className="text-3xl font-bold text-green-600">
              {stats.stores}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2>Total Ratings</h2>
            <p className="text-3xl font-bold text-purple-600">
              {stats.ratings}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
