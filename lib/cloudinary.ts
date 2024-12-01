export async function uploadToCloudinary(file: File) {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'wardrobe-wizard');

    const response = await fetch(
      'https://api.cloudinary.com/v1_1/dia5ivuqq/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Failed to upload to Cloudinary');
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
}

export async function deleteFromCloudinary(publicId: string) {
  try {
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/dia5ivuqq/image/destroy',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          public_id: publicId,
          upload_preset: 'wardrobe-wizard',
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to delete from Cloudinary');
    }

    return await response.json();
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw error;
  }
} 