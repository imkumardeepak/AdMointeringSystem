import React, { useState, useRef } from "react";
import axios from "axios";
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';

function AdControlPanel() {
  const [adFile, setAdFile] = useState(null);
  const [adType, setAdType] = useState('image'); // Default value set to 'image'
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);
  const { setMode } = useColorScheme();

  // Set the mode to light by default
  React.useEffect(() => {
    setMode('light');
  }, [setMode]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    setAdFile(e.dataTransfer.files[0]);
  };

  const handleFileChange = (e) => {
    setAdFile(e.target.files[0]);
  };

  const handleChange = (event, newValue) => {
    setAdType(newValue);
    console.log(newValue);
  };

  const handleAdUpload = async () => {
    const formData = new FormData();
    formData.append("file", adFile);
    formData.append("adType", adType);

    try {
      const response = await axios.post(
        "https://localhost:7154/api/ad/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Ad uploaded successfully:", response.data);
    } catch (error) {
      console.error("Ad upload failed:", error);
    }
  };

  return (
    <CssVarsProvider defaultMode="light">
      <div className="w-full">
        <div className="bg-blue-600 p-4 text-left rounded-lg shadow-lg text-white text-xl mx-1 mt-2">
          Upload Ad
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mx-1 mt-2">
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center mb-4 cursor-pointer ${dragging ? 'border-blue-600 bg-blue-50' : 'border-gray-300 bg-gray-50'
              }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()} // Trigger input click on div click
          >
            {adFile ? (
              <p className="text-gray-700">{adFile.name}</p>
            ) : (
              <p className="text-gray-500">Drag & drop a file here, or click to select a file</p>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <Select
            value={adType}
            onChange={handleChange}
            color="neutral"
            sx={{ minWidth: 200, mb: 2 }}
          >
            <Option value="image">Image</Option>
            <Option value="video">Video</Option>
          </Select>

          <button
            onClick={handleAdUpload}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg w-full"
          >
            Upload
          </button>
        </div>
      </div>
    </CssVarsProvider>
  );
}

export default AdControlPanel;
