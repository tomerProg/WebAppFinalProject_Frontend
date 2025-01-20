import React, { useState, useRef } from 'react';
import { IconButton, Avatar, Box, Button} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const IconUpload: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={2}>
      <IconButton sx={{width: 100, height: 100, padding: 0}}
        onClick={() => inputRef.current?.click()}>
        <Avatar sx={{ width: '100%', height: '100%',
            bgcolor: selectedImage ? 'transparent' : 'action.selected'}}>
          {selectedImage ? (
            <img style={{ width: '100%', height: '100%', objectFit: 'cover',}}
              src={selectedImage}
              alt="Selected icon"/>
          ) : (
            <CameraAltIcon sx={{ fontSize: 32, color: 'action.active' }} />
          )}
        </Avatar>
      </IconButton>

      <input type="file" accept="image/*" style={{clip: 'rect(0 0 0 0)', position: 'absolute'}}
        ref={inputRef}
        onChange={handleImageChange}/>

      {selectedImage && (
        <Button variant="text" color="error" size="small"
          onClick={() => setSelectedImage(null)}>
          Remove Icon
        </Button>
      )}
    </Box>
  );
};

export default IconUpload;