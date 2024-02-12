import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import moment from "moment";



function Comment({ comment, user, createdAt }) {

  function getFullName() {
    return `${user.firstName} ${user.lastName}`.trim();
  }


  return (<ListItem style={{ marginTop: '6px' }} alignItems="flex-start">
  <ListItemAvatar>
    <Avatar alt={getFullName()} src={"/static/images/avatar/1.jpg"} />
  </ListItemAvatar>
  <ListItemText
    primary={getFullName()}
    secondary={
      <React.Fragment>
        <Typography variant="caption" component="p">
          Posted: { moment(createdAt).fromNow() }
        </Typography>
        { comment }
      </React.Fragment>
    }
  />
</ListItem>);
}

export default function Comments({ comments }) {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      { comments?.length == 0 && <Typography variant="caption"> No Comments on post. </Typography> }
      { comments.map(comment => <Comment key={comment.id} {...comment} />) }
    </List>
  )
}