import { Send as SendIcon } from '@mui/icons-material';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Input,
  InputLabel,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { PhotoCamera as PhotoCameraIcon } from '@mui/icons-material';

export default function CardCreacionPosts({
  newPostText,
  handlePostSubmit,
  setNewPostText,
  handleImageUpload,
}) {
  return (
    <>
      {/* Área para crear un nuevo post */}
      <Card>
        <CardContent>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="¿Qué estás pensando?"
            variant="outlined"
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
          />
          <InputLabel htmlFor="input-image">
            Subir imagen
            <Input
              id="input-image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end" component="label" htmlFor="input-image">
                    <PhotoCameraIcon />
                  </IconButton>
                </InputAdornment>
              }
              style={{ display: 'none' }}
            />
          </InputLabel>
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
    </>
  );
}
