import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../config";
import Skeleton from '@mui/material/Skeleton';

function Post() {
  const { id } = useParams();
  let [postState, setPost] = useState(null)
  let [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    console.log(id);
    fetch(`${API_URL}/api/posts/${id}`)
      .then(res => res.json())
      .then(res => {
        setTimeout(function(){
            setPost(res)
            setIsLoading(true)
        },1000)
      })
  }, [id]); // Ajoutez id ici pour vous assurer que useEffect s'exécute à nouveau lorsque id change

  return (
    <div>
      <h1>{isLoading ? postState.data.attributes.title : <Skeleton variant="text" width={300} height={80 }sx={{ fontSize: '1rem' }} />
}</h1>
    </div>
  )
}

export default Post;
