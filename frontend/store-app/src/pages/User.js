import { useEffect, useState } from "react";
import API from "../utils/api";
import Navbar from "../components/Navbar";

export default function User() {
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    API.get("/user/stores")
      .then((res) => setStores(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (storeId, value) => {
    setRatings({ ...ratings, [storeId]: value });
  };

  const rateStore = (storeId) => {
    API.post("/user/rate", {
      storeId,
      rating: ratings[storeId] || 5,
    })
      .then(() => alert("Rating submitted!"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Store Listings</h1>

        {stores.length === 0 && (
          <p className="text-gray-500">No stores available.</p>
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

              <p className="text-gray-600 mb-3">
                Average Rating: {store.averageRating || 0}
              </p>

              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  max="5"
                  className="border p-1 w-16 rounded"
                  onChange={(e) =>
                    handleChange(store._id, e.target.value)
                  }
                />

                <button
                  onClick={() => rateStore(store._id)}
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                >
                  Rate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
