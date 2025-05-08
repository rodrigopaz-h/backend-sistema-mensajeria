const { getDownloadURL, ref, uploadBytes } = require("firebase/storage");
const storage = require("../firebase");
const { v4: uuidv4 } = require("uuid");

const uploadToFirebase = async (file) => {
  const fileExtension = file.originalname.split(".").pop();
  const fileName = `${uuidv4()}.${fileExtension}`;
  const storageRef = ref(storage, `uploads/${fileName}`);

  await uploadBytes(storageRef, file.buffer);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

module.exports = uploadToFirebase;
