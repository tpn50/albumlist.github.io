import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "https://jsonplaceholder.typicode.com/albums";

const App = () => {
  const [albums, setAlbums] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    const response = await axios.get(API_URL);
    setAlbums(response.data);
  };

  const addAlbum = async () => {
    if (title.trim() !== "") {
      const response = await axios.post(API_URL, { title });
      setAlbums([...albums, response.data]);
      setTitle("");
    }
  };

  const updateAlbum = async (id) => {
    const updatedTitle = prompt("Enter the new album title:");
    if (updatedTitle.trim() !== "") {
      await axios.put(`${API_URL}/${id}`, { title: updatedTitle });
      const updatedAlbums = albums.map((album) =>
        album.id === id ? { ...album, title: updatedTitle } : album
      );
      setAlbums(updatedAlbums);
    }
  };

  const deleteAlbum = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setAlbums(albums.filter((album) => album.id !== id));
  };

  return (
    <div className="App">
      <h1>Albums List</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter album title"
      />
      <button onClick={addAlbum}>Add Album</button>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            {album.title}
            <div>
              <button onClick={() => updateAlbum(album.id)}>Update</button>
              <button onClick={() => deleteAlbum(album.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
