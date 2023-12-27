import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    IconButton,
    Typography,
    CardMedia,
  } from '@mui/material';
  
  export default function CardPost({ posts }) {
    return (
      <>
        {/* Lista de posts */}
        {posts.map((post) => (
          <Card key={post.id} style={{ width: '100%', maxWidth: '600px', margin: '16px auto' }}>
            <CardContent>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src={post.avatar} alt="Avatar" />
                <Typography variant="subtitle1" style={{ marginLeft: '8px' }}>
                  {post.author}
                </Typography>
              </div>
              <Typography variant="body1" style={{ marginTop: '8px' }}>
                {post.text}
              </Typography>
              {post.image && (
                <CardMedia component="img" alt="Post Image" height="150" image={post.image} />
              )}
            </CardContent>
            <CardActions>
              <IconButton>
                {/* Puedes añadir más iconos para acciones en los posts si lo necesitas */}
              </IconButton>
            </CardActions>
            <Typography variant="caption" color="textSecondary" style={{ margin: '8px' }}>
              {post.date}
            </Typography>
          </Card>
        ))}
      </>
    );
  }
  