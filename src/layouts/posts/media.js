import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';

export default function PostMedia({ media }) {
  return (
    <ImageList cols={3} >
      { media?.length == 0 && <Typography variant="caption"> No Media on post. </Typography> }
      {media.map((item, i) => (
        <ImageListItem key={item.asset}>
          <img
            srcSet={`${item.asset}`}
            src={`${item.asset}`}
            alt={`Post Image ${i + 1}`}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
