import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Avatar,
  Typography,
  IconButton,
  Container,
  Grid,
  Modal,
  Backdrop,
  Fade,
  Badge,
} from '@mui/material';
import {
  Send as SendIcon,
  Photo as PhotoIcon,
  VideoLibrary as VideoIcon,
  ThumbUp as ThumbUpIcon,
  Chat as ChatIcon,
} from '@mui/icons-material';

export default function PagePublicaciones() {
  const [newPostText, setNewPostText] = useState('');
  const [newPostImages, setNewPostImages] = useState([]);
  const [newPostVideos, setNewPostVideos] = useState([]);
  const [posts, setPosts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]);

  const handlePostSubmit = () => {
    if (newPostText.trim() !== '' || newPostImages?.length > 0 || newPostVideos?.length > 0) {
      // Simulamos la creación de un nuevo post
      const newPost = {
        id: posts?.length + 1,
        author: 'Nombre del Autor',
        avatar: 'URL del Avatar',
        text: newPostText,
        images: [...newPostImages],
        videos: [...newPostVideos],
        likes: 0,
        comments: [],
        date: new Date().toLocaleString(),
      };

      // Actualizamos la lista de posts
      setPosts((prevPosts) => [newPost, ...prevPosts]);

      // Limpiamos los campos después de crear el post
      setNewPostText('');
      setNewPostImages([]);
      setNewPostVideos([]);
    }
  };

  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleComment = (postId, commentText) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, { author: 'Nombre del Comentador', text: commentText }] }
          : post
      )
    );
  };

  const handleOpenModal = (images) => {
    setModalImages(images);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalImages([]);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      {/* Área para crear un nuevo post */}
      <Card>
        <CardContent>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src="URL del Avatar" alt="Avatar" />
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="¿Qué estás pensando?"
              variant="outlined"
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              style={{ marginLeft: '8px' }}
            />
          </div>
          <Grid container spacing={1} style={{ marginTop: '8px' }}>
            <Grid item>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewPostImages([...newPostImages, ...e.target.files])}
                style={{ display: 'none' }}
                id="image-input"
                multiple
              />
              <label htmlFor="image-input">
                <IconButton component="span">
                  <PhotoIcon />
                </IconButton>
              </label>
            </Grid>
            <Grid item>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setNewPostVideos([...newPostVideos, ...e.target.files])}
                style={{ display: 'none' }}
                id="video-input"
                multiple
              />
              <label htmlFor="video-input">
                <IconButton component="span">
                  <VideoIcon />
                </IconButton>
              </label>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            onClick={handlePostSubmit}
          >
            Publicar
          </Button>
        </CardActions>
      </Card>

      {/* Lista de posts */}
      {posts.map((post) => (
        <Card key={post.id} style={{ marginTop: '16px' }}>
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
            <Grid container spacing={1} style={{ marginTop: '8px' }}>
              {post.images?.length > 0 && (
                <Grid item xs={12}>
                  <img
                    src={URL.createObjectURL(post.images[0])}
                    alt={`PostImage-0`}
                    style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
                  />
                </Grid>
              )}
              {post.images?.length > 1 && (
                <Grid item xs={6}>
                  <img
                    src={URL.createObjectURL(post.images[1])}
                    alt={`PostImage-1`}
                    style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
                  />
                </Grid>
              )}
              {post.images?.length > 2 && (
                <Grid item xs={6}>
                  <img
                    src={URL.createObjectURL(post.images[2])}
                    alt={`PostImage-2`}
                    style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
                  />
                </Grid>
              )}
              {post.images?.length > 3 && (
                <Grid item xs={12}>
                  <Button onClick={() => handleOpenModal(post.images.slice(3))}>Ver más</Button>
                </Grid>
              )}
              {post.videos.map((video, index) => (
                <Grid item key={index} xs={12 / post.videos?.length}>
                  <video
                    controls
                    src={URL.createObjectURL(video)}
                    alt={`PostVideo-${index}`}
                    style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
                  />
                </Grid>
              ))}
            </Grid>
          </CardContent>
          <CardActions>
            <IconButton onClick={() => handleLike(post.id)}>
              <Badge badgeContent={post.likes} color="primary">
                <ThumbUpIcon />
              </Badge>
            </IconButton>
            <IconButton>
              <ChatIcon />
            </IconButton>
          </CardActions>
          {post.comments?.length > 0 && (
            <CardContent>
              <Typography variant="subtitle2">Comentarios:</Typography>
              {post.comments.map((comment, index) => (
                <Typography key={index} variant="body2">
                  <strong>{comment.author}:</strong> {comment.text}
                </Typography>
              ))}
            </CardContent>
          )}
          <TextField
            fullWidth
            placeholder="Añadir un comentario..."
            variant="outlined"
            size="small"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleComment(post.id, e.target.value);
                e.target.value = '';
              }
            }}
          />
          <Typography variant="caption" color="textSecondary" style={{ margin: '8px' }}>
            {post.date}
          </Typography>
        </Card>
      ))}

      {/* Modal para mostrar más imágenes */}
      <Modal
  open={modalOpen}
  onClose={handleCloseModal}
  closeAfterTransition
  BackdropComponent={(props) => (
    <Backdrop {...props} style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }} />
  )}
  BackdropProps={{
    timeout: 500,
  }}
>
  <Fade in={modalOpen}>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div>
        {modalImages.map((image, index) => (
          <img
            key={index}
            src={URL.createObjectURL(image)}
            alt={`ModalImage-${index}`}
            style={{
              maxWidth: '100%',
              maxHeight: '80vh',
              objectFit: 'contain',
              margin: '8px',
            }}
          />
        ))}
      </div>
    </div>
  </Fade>
</Modal>

    </Container>
  );
}
