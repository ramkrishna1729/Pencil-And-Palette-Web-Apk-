import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [artworks, setArtworks] = useState([]);
  const [artistName, setArtistName] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/artworks")
      .then(response => setArtworks(response.data))
      .catch(error => console.error("Error fetching artworks:", error));
  }, []);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("artistName", artistName);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/upload", formData);
      alert("Artwork uploaded successfully!");
      setArtistName("");
      setImage(null);
      window.location.reload();
    } catch (error) {
      alert("Failed to upload artwork");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Pencil & Palette</h1>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Artist Name"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 w-full mb-4"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Upload Artwork
        </button>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {artworks.map((art, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <img src={`http://localhost:5000${art.imageUrl}`} alt={art.artistName} className="w-full h-48 object-cover rounded" />
            <p className="text-center mt-2 font-bold">{art.artistName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
