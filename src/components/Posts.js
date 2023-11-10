import React, { useState, useEffect } from 'react';
import CardPost from './CardPost';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

function Posts() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:1337/api/posts?populate=*', {
      method: 'GET',
      headers: {
        Accept: 'Application/json',
      },
    })
    .then((res) => res.json())
    .then((response) => {
      // Assuming the API response format does not change,
      // and that the posts are contained in the response.data array
      setTimeout(()=>{
        setPosts(response.data);
        setIsLoading(false); // Set loading to false as we now have the posts
      }, 500)
     
    })
    .catch((error) => {
      console.error('Error fetching posts:', error);
      setIsLoading(false); // Also set loading to false in case of an error
    });
  }, []);




  return (
    <div>
      <h1>Liste des articles</h1>
      <Grid container spacing>
      {isLoading ? (
        (
            <Box>
                <Skeleton variant="rectangular" width={210} height={60} />
                <Skeleton width="60%"/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
            </Box>
        )
      ) : (
        posts.map((post) => <CardPost post={post} key={post.id}/>)
      )}
      </Grid>
     
  
    </div>
  );
}

export default Posts;
