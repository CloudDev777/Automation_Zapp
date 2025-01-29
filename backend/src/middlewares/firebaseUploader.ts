import {
  getStorage,
  ref,
  deleteObject,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Cloud Storage
const storage = getStorage();

export const FirebaseImageHandler = {
  uploadImage: async (file: Express.Multer.File) => {
    try {
      const dateTime = giveCurrentDateTime();
      const storageRef = ref(
        storage,
        `images/${file.originalname + " " + dateTime}`
      );

      const metadata = {
        contentType: file.mimetype,
      };

      // Upload the file
      const snapshot = await uploadBytesResumable(
        storageRef,
        file.buffer,
        metadata
      );

      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);

      return {
        name: file.originalname,
        type: file.mimetype,
        downloadURL: downloadURL,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  },
  // Delete a single image from Firebase Storage
  deleteImage: async (imageUrl: string) => {
    try {
      if (!imageUrl) return;

      // Get storage reference
      const storage = getStorage();

      // Extract the full path from the URL
      // Firebase Storage URLs typically look like:
      // https://firebasestorage.googleapis.com/v0/b/[project-id].appspot.com/o/[path]?[query-params]
      const urlPath = decodeURIComponent(
        imageUrl.split("/o/")[1].split("?")[0]
      );

      const imageRef = ref(storage, urlPath);

      // Delete the file
      await deleteObject(imageRef);
      return true;
    } catch (error) {
      throw error;
    }
  },

  // Update image - deletes old image and returns true if successful
  updateImage: async ({
    oldImageUrl,
    newImage,
  }: {
    oldImageUrl: string;
    newImage: Express.Multer.File;
  }) => {
    try {
      if (!oldImageUrl) return false;
      if (!newImage) return false;

      await FirebaseImageHandler.deleteImage(oldImageUrl);
      const image = await FirebaseImageHandler.uploadImage(newImage);

      return image;
    } catch (error) {
      throw error;
    }
  },
};

// Helper function to get current date and time
const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return date + " " + time;
};
