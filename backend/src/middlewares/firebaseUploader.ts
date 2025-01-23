import {
  getStorage,
  ref,
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

// Define TypeScript types
export interface UploadedFile {
  name: string;
  type: string;
  downloadURL: string;
}

export const uploadFileToFirebase = async (
  file: Express.Multer.File
): Promise<UploadedFile> => {
  try {
    const dateTime = giveCurrentDateTime();
    const storageRef = ref(
      storage,
      `files/${file.originalname + " " + dateTime}`
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
    throw new Error(error.message);
  }
};

// Helper function to get current date and time
const giveCurrentDateTime = (): string => {
  const today = new Date();
  const date = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  return `${date} ${time}`;
};
