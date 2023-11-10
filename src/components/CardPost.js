import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { API_URL } from '../config';
import { Link } from 'react-router-dom';

export default function CardPost({ post }) {
  // Fonction pour traiter le contenu textuel complexe et retourner une chaîne
  const getTextFromContent = (content) => {
    let fullText = '';
    if (content && Array.isArray(content)) {
      content.forEach((item) => {
        if (item.type === "paragraph") {
          item.children.forEach((child) => {
            fullText += child.text;
          });
        }
      });
    }
    return fullText;
  };

  // Obtenez le texte complet à partir de la structure de contenu complexe
  const fullText = getTextFromContent(post.attributes.content);

  // Maintenant, vous pouvez prendre les 100 premiers caractères
  const shortenedText = fullText.substring(0, 100);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={post.image !== null ? `${API_URL}${post.attributes.image.data.attributes.formats.small.url}` : 'default-placeholder-image.jpg'}
        title={post.attributes.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.attributes.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" component="p">
          {shortenedText}...
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/post/${post.id}`}>
            <Button size="small">Learn More</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
