import { useEffect, useState } from "react";
import API from "../utils/api";
import Navbar from "../components/Navbar";

export default function Owner() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    API.get("/owner/stores")
      .then((res) => setStores(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Owner Dashboard</h1>

        {stores.length === 0 && (
          <p className="text-gray-500">No stores assigned.</p>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {stores.map((store) => (
            <div
              key={store._id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold mb-2">
                {store.name}
              </h2>

              <p className="text-gray-600 mb-2">
                Average Rating: {store.averageRating || 0}
              </p>

              <p className="text-gray-500 text-sm">
                Total Ratings: {store.totalRatings || 0}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
