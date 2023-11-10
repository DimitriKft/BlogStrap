import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API_URL } from '../config';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';

function Post() {
    const { id } = useParams();
    // Initialisez postState avec un objet ayant une propriété attributes vide
    const [postState, setPost] = useState({ attributes: { content: [], image: { data: { attributes: { formats: {} } } } } });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch(`${API_URL}/api/posts/${id}?populate=*`)
            .then((res) => res.json())
            .then((res) => {
                setTimeout(() => {
                    setPost(res.data); // Assurez-vous que la réponse correspond à la structure attendue
                    setIsLoading(false);
                }, 1000);
            })
            .catch((error) => {
                console.error('Error fetching post:', error);
                setIsLoading(false);
            });
    }, [id]);

    const renderContent = (content) => {
        return content.map((item, index) => {
            if (item.type === 'paragraph') {
                return (
                    <p key={index}>
                        {item.children.map((child, childIndex) => (
                            <span key={childIndex}>{child.text}</span>
                        ))}
                    </p>
                );
            }
            // Ajoutez d'autres types de contenu ici si nécessaire
            return null;
        });
    };

    if (isLoading) {
        return (
            <div>
                <Skeleton variant="text" width={300} height={80} />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
            </div>
        );
    }

    // Vous pouvez maintenant accéder en toute sécurité à title, content et image
    const { title, content, image } = postState.attributes;

    return (
        <div>
            <nav>
                <Link to="/">
                    <Button variant="outlined">Back</Button>
                </Link>
            </nav>
            <Grid container spacing={2}>

                <Grid item sm={6}>

                    {image.data && image.data.attributes.formats.small ? (
                        <img src={`${API_URL}${image.data.attributes.formats.small.url}`} alt={title} />
                    ) : (
                        <Skeleton variant="rect" width={210} height={118} />
                    )}
                </Grid>
                <Grid item sm={6}>
                    <h1>{title}</h1>
                    {content ? renderContent(content) : <p>No content available.</p>}
                </Grid>
            </Grid>
        </div>
    );
}

export default Post;
