import cloudinary from './cloudinary' 
export async function uploadToCloudinary(filePath: string, folder: string): Promise<string> {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,         
      use_filename: true,  
      unique_filename: false, 
    })

    return result.secure_url 
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    throw error;
  }
}
