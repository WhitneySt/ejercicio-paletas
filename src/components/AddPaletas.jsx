import React from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { fileUpLoad } from "../services/fileUpLoad";
import { useDispatch } from "react-redux";
import { actionAddPaletaAsync } from "../redux/actions/paletasActions";

const inputList = [
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

const category = [
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

const schema = yup.object({
  name: yup.string().required("Debe ingresar el nombre de la paleta"),
  category: yup.string().required("Debe seleccionar una categoría"),
  description: yup
    .string()
    .required("Debe incluir una descripción de la paleta"),
  price: yup.number().required("Debe incluir el precio de la paleta"),
  quantity: yup
    .number()
    .required("Debe incluir la cantidad disponible de paletas"),
});

const AddPaletas = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const image = await fileUpLoad(data.image[0]);
    const newPaleta = {
      name: data.name,
      category: data.category,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      image: image,
    };
    console.log(newPaleta);
    dispatch(actionAddPaletaAsync(newPaleta));
  };
  return (
    <div className="p-5">
      <h1>Agregar nueva paleta a la collección</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {inputList.map((item, index) => {
          if (item.type === "select") {
            return (
              <FloatingLabel key={index} label={item.label} className="mb-3">
                <Form.Select
                  aria-label="Default select example"
                  {...register(item.name)}
                >
                  <option value="">Open this select menu</option>
                  {category.map((item) => (
                    <option
                      key={item.value}
                      value={item.label}
                      className="text-capitalize"
                    >
                      {item.label}
                    </option>
                  ))}
                </Form.Select>
                <p>{errors[item.name]?.message}</p>
              </FloatingLabel>
            );
          }
          if (item.type === "textarea") {
            return (
              <FloatingLabel key={index} label={item.label} className="mb-3">
                <Form.Control as="textarea" {...register(item.name)} />
                <p>{errors[item.name]?.message}</p>
              </FloatingLabel>
            );
          }

          return (
            <FloatingLabel key={index} label={item.label} className="mb-3">
              <Form.Control
                type={item.type}
                size={item.type === "file" ? "sm" : ""}
                {...register(item.name)}
              />
              <p>{errors[item.name]?.message}</p>
            </FloatingLabel>
          );
        })}

        <Button variant="warning" type="submit" className="mb-3">
          Agregar paleta
        </Button>
      </Form>
    </div>
  );
};

export default AddPaletas;
