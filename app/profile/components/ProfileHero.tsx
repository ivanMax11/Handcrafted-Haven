import React, { useState, ChangeEvent } from "react";

const ProfileHero = () => {
  const [backgroundImage, setBackgroundImage] = useState("path_to_image.jpg");

  // Función para manejar el cambio de imagen de fondo
  const handleBackgroundImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBackgroundImage(imageUrl); // Actualiza el estado con la nueva imagen
    }
  };

  return (
    <div className="relative bg-blue-600 text-white">
      {/* Fondo de la sección */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Contenido */}
      <div className="relative z-10 p-8 text-center">
        <h1 className="text-4xl font-semibold">Welcome to my Shop</h1>
        <p className="mt-4 text-xl">Discover our products, unique and made with love.</p>

        {/* Botón CTA */}
        {/* <a href="#products" className="mt-6 inline-block bg-yellow-500 text-black py-2 px-6 rounded-full hover:bg-yellow-400">
          See Products
        </a> */}

        {/* Botón para cambiar la imagen de fondo */}
        {/* <label hidden htmlFor="background-image-upload" className="mt-6 inline-block bg-blue-700 text-white py-2 px-6 rounded-full cursor-pointer hover:bg-blue-600">
          Change Background Image
        </label>
        <input
          type="file"
          id="background-image-upload"
          accept="image/*"
          className="hidden"
          onChange={handleBackgroundImageChange}
        /> */}
      </div>
    </div>
  );
};

export default ProfileHero;
