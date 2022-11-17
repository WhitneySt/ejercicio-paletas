import { facebook, google } from "../Firebase/firebaseConfig";

export const inputList = [
  {
    label: "Nombre",
    type: "text",
    name: "name",
  },
  {
    label: "Categoría",
    type: "select",
    name: "category",
  },
  {
    label: "Descripción",
    type: "textarea",
    name: "description",
  },
  {
    label: "Precio",
    type: "number",
    name: "price",
  },
  {
    label: "Cantidad",
    type: "number",
    name: "quantity",
  },
  {
    label: "Imagen",
    type: "file",
    name: "image",
  },
];

export const category = [
  {
    label: "paleta de agua",
    value: 1,
  },
  {
    label: "paleta de crema",
    value: 2,
  },
  {
    label: "paleta mixta",
    value: 3,
  },
  {
    label: "paleta con relleno",
    value: 4,
  },
];

export const loginProvider = [
  {
    name: "google",
    image: "https://assets.stickpng.com/images/5847f9cbcef1014c0b5e48c8.png",
    provider: google,
  },
  {
    name: "facebook",
    image: "https://logodownload.org/wp-content/uploads/2014/09/facebook-logo-3-1.png",
    provider: facebook,
  },
];
