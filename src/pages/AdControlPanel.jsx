import React, { useState, useRef } from "react";
import axios from "axios";
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CiVideoOn } from "react-icons/ci";
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';

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
      toast.success("Ad upload Success.");
    } catch (error) {
      console.error("Ad upload failed:", error);
      toast.error("Ad upload failed.");
    }
  };

  return (
    <CssVarsProvider defaultMode="light">
      <div className="w-full">
        <ToastContainer />
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

        <Card orientation="horizontal" variant="outlined" sx={{ width: 260 }} className="mx-1 mt-2 shadow-lg">
          <CardOverflow>
            <AspectRatio ratio="1" sx={{ width: 90 }}>
              <CiVideoOn />
            </AspectRatio>
          </CardOverflow>
          <CardContent>
            <Typography fontWeight="md" textColor="success.plainColor">
              11903842.mp4
            </Typography>
          </CardContent>
          <CardOverflow
            variant="soft"
            color="primary"
            sx={{
              px: 0.2,
              writingMode: 'vertical-rl',
              justifyContent: 'center',
              fontSize: 'xs',
              fontWeight: 'xl',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              borderLeft: '1px solid',
              borderColor: 'divider',
            }}
          >
            Video
          </CardOverflow>
        </Card>
      </div>

    </CssVarsProvider>
  );
}

export default AdControlPanel;
