import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  const searchImages = async (query) => {
    try {
      setError(null);
      const response = await axios.get('https://www.flickr.com/services/rest/', {
        params: {
          method: 'flickr.photos.search',
          api_key: '7ec866bbcaf86bc2de443c1942a459c1',
          text: query,
          format: 'json',
          nojsoncallback: 1,
          per_page: 12,
          sort: 'relevance', 
        },
      });

      const fetchedImages = response.data.photos.photo.map((photo) => ({
        id: photo.id,
        title: photo.title,
        url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`,
      }));

      setImages(fetchedImages);
    } catch (err) {
      setError('Nie udało się pobrać obrazów. Spróbuj ponownie później.');
    }
  };

  return (
    <div className="bg-slate-800 min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center text-white mb-8">Wyszukiwarka Obrazów Flickr</h1>
      <div className="flex justify-center mb-8">
        <button className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 mx-2 rounded" onClick={() => searchImages('animals')}>Zwierzęta</button>
        <button className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 mx-2 rounded" onClick={() => searchImages('landscapes')}>Krajobrazy</button>
        <button className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 mx-2 rounded" onClick={() => searchImages('cities')}>Miasta</button>
        <button className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 mx-2 rounded" onClick={() => searchImages('others')}>Inne</button>
      </div>
      {error && <p className="text-red-500 font-bold text-center">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div key={image.id} className="overflow-hidden rounded-lg shadow-lg w-full h-48">
            <img className="w-full h-full object-cover" src={image.url} alt={image.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
