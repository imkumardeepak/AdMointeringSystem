import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import { CssVarsProvider } from '@mui/joy/styles';



function Screen1() {
  const [imageAdUrl, setImageAdUrl] = useState(null);
  const [videoAdUrl, setVideoAdUrl] = useState(null);
  const [pdfAdUrl, setpdfAdUrl] = useState(null);
  const { setMode } = useColorScheme();
  // Set the mode to dark by default
  React.useEffect(() => {
    setMode('dark');
  }, [setMode]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get("https://localhost:7154/api/ad/latest");
        setImageAdUrl(response.data.imageAdUrl);
        setVideoAdUrl(response.data.videoAdUrl);
        setpdfAdUrl(response.data.pdfUrl);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching the latest ads:", error);
      }
    };

    // Fetch the latest ads initially
    fetchAds();

    // Optionally, refetch the ads periodically (e.g., every minute)
    const interval = setInterval(fetchAds, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!imageAdUrl && !videoAdUrl) return null;

  return (
    <CssVarsProvider>
      <CssBaseline />
      <div className="flex flex-col justify-between h-screen">
        <Box
          component="ul"
          sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', p: 0, m: 0, mt: 1, mb: 1, flex: '1 1 auto' }}
        >
          <Card component="li" sx={{ minWidth: 300, flexGrow: 1, boxShadow: 5, height: 'auto', flex: 2 }}>
            <CardCover>
              <video
                autoPlay
                loop
                muted
                className="w-full h-full object-fill"
              >
                <source
                  src={`https://localhost:7154${videoAdUrl}`}
                  type="video/mp4"
                />
              </video>
            </CardCover>
          </Card>
          <Card component="li" sx={{ minWidth: 300, flexGrow: 1, boxShadow: 5, height: 'auto', flex: 1 }}>
            <CardCover>
              <img
                src={`https://localhost:7154${imageAdUrl}`}
                loading="lazy"
                alt=""
                className="w-full h-full object-fill"
              />
            </CardCover>
          </Card>
        </Box>

        <div className="overflow-hidden h-16 bg-blue-900 dark:bg-gray-800 flex items-center rounded-lg shadow-lg p-6 mb-1">
          <marquee direction="right"
            behavior="scroll"
            truespeed="true"
            className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
            AARKAY TECHNO CONSULTANTS PVT. LTD.
          </marquee>
        </div>
      </div>
    </CssVarsProvider>
  );
}

export default Screen1;
