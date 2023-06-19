import { useEffect, useRef } from "react";

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
/******************************************************* */
  const handleClick = (event) => {  // para que no se recargue la pagina al apretar el boton
    
    event.preventDefault();
    widgetRef.current.open();
  };

/*****************************************************   */
  return (
    <button 
    className={styles.enviar}
    onClick={handleClick}>
      Upload Image
    </button>
  );
};

export default UploadFile;
