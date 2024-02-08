
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


function Tag({ tag }) {
  return <Chip label={tag.title} size="small" variant="outlined"  />
}

export default function Tags({ tags }) {
  return (
    <Stack style={{ display: 'inline' }} direction="row" spacing={1}>
      { tags?.length == 0 && <Typography variant='caption' display={'inline'} > Na. </Typography> }
      { tags.map(tag => <Tag key={tag.id} {...tag} />) }
    </Stack>    
  )
}