import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase-config';

const uploadImage = async (file, userID) => {
  if (!file) throw new Error('No file selected.');
  if (!userID) throw new Error('User ID not found.');

  try {
    const fileNameWithoutExtension = file.name
      .split('.')
      .slice(0, -1)
      .join('.');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filePath = `${userID}/${fileNameWithoutExtension}-${timestamp}.jpg`;

    const fileRef = ref(storage, filePath);
    await uploadBytes(fileRef, file);

    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('File upload failed.');
  }
};

export { uploadImage };
