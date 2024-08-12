import { useEffect, useState } from "react";
import axios from "axios";
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Carousel, IconButton } from "@material-tailwind/react";
import CustomCarousel from "../Component/CustomCarousel";

function AdDisplay() {
  const [imageAdUrl, setImageAdUrl] = useState(null);
  const [videoAdUrl, setVideoAdUrl] = useState(null);

  const images = [
    "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
  ];


  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get("https://localhost:7154/api/ad/latest");
        setImageAdUrl(response.data.imageAdUrl);
        setVideoAdUrl(response.data.videoAdUrl);
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
    <>
      {/* <Box
        component="ul"
        sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', p: 0, m: 0, mt: 1 }}
      >
        <Card component="li" sx={{ minWidth: 300, flexGrow: 1, boxShadow: 5, height: 300 }}>
          <CardCover>
            <img
              src={`https://localhost:7154${imageAdUrl}`}
              loading="lazy"
              alt=""
              className="w-full h-full object-fill"
            />
          </CardCover>
        </Card>

        <Card component="li" sx={{ minWidth: 300, flexGrow: 1, boxShadow: 5, height: 300 }}>
          <CardCover>
            <video
              autoPlay
              loop
              muted
            >
              <source
                src={`https://localhost:7154${videoAdUrl}`}
                type="video/mp4"
              />
            </video>
          </CardCover>
        </Card>
      </Box> */}
      <CustomCarousel images={images} interval={3000} />
      <div className="overflow-hidden h-16 bg-gray-900 flex items-center rounded-lg shadow-lg p-6  mt-1 mb-1">
        <marquee direction="right"
          behavior="scroll"
          truespeed="true"
          className="text-xl md:text-2xl lg:text-4xl font-bold text-white">
          AARKAY TECHNO CONSULTANTS PVT. LTD.
        </marquee>
      </div>


    </>

  );
}

export default AdDisplay;
