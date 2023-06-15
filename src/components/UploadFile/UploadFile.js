import { useEffect, useRef } from "react";

// const [url, setUrl] = useState("");
// const handleUpload = (error, result) => {
//   if (result && result.event === "success") {
//     setUrl(result.info.secure_url);
//     console.log(result.info.secure_url);
//   }
// };

{
  /* <UploadFile handleUpload={handleUpload} folder={'user'}/> */
}

const UploadFile = ({ handleUpload, folder }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const config = {
    cloud_name: "finalproject123",
    uploadPreset: "usersPictures",
    folder,
  };
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      config,
      handleUpload
    );
  }, []);
  return (
    <button
      onClick={() => {
        widgetRef.current.open();
      }}
    >
      Upload
    </button>
  );
};

export default UploadFile;
