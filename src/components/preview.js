import React, { useState } from 'react';
import './ImageUploadPreview.css'; // Import your CSS file

function ImageUploadPreview() {
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const previews = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
    });

    Promise.all(previews).then((images) => {
      setImagePreviews(images);
    });
  };

  return (
    <div className="image-upload-preview">
      <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
      <div className="previews-container">
        {imagePreviews.map((preview, index) => (
          <div key={index} className="preview">
            <img src={preview} alt="Image Preview" className="preview-image" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUploadPreview;


import React, { useState } from 'react';

function ImageUploadPreview() {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {imagePreview && (
        <div>
          <img src={imagePreview} alt="Image Preview" style={{ width: '100px', height: '100px' }} />
        </div>
      )}
    </div>
  );
}

export default ImageUploadPreview;
