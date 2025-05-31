import React, { useEffect, useState } from 'react';
import service from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    async function fetchImageUrl() {
      console.log('Featured Image ID:', featuredImage);
      if (featuredImage) {
        try {
          const url = await service.getFileView(featuredImage);
          console.log('File view URL:', url);
          setImageUrl(url);
        } catch (error) {
          console.error('Error fetching file view URL:', error);
        }
      }
    }
    fetchImageUrl();
  }, [featuredImage]);

  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full mb-4 justify-center'>
          {imageUrl ? (
            <img src={imageUrl} alt={title} className='rounded-xl' />
          ) : (
            <div className="h-48 bg-gray-300 rounded-xl flex items-center justify-center">
              Loading image...
            </div>
          )}
        </div>
        <h2 className='text-xl font-bold'>{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
