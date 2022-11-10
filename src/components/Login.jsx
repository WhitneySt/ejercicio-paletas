import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionLoginAsync } from "../redux/actions/userActions";
import { Link } from "react-router-dom";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";

const schema = yup.object({
  email: yup
    .string()
    .email("Debe ingresar un email")
    .required("Por favor ingresar su email"),
  password: yup.string().required("Por favor ingresar contraseña"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { error, errorMessage } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(actionLoginAsync(data));
    if (error) {
      Swal.fire("Oops!", `Ha ocurrido un error: ${errorMessage}`, "error");
    } else {
      Swal.fire("Good job!", "Tu cuenta se ha creado exitosamente!", "success");
    }
  };

  return (
    <div className="p-5">
      <h1>Iniciar Sesión</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FloatingLabel label="Email address" className="mb-3">
          <Form.Control
            type="email"
            autoComplete="off"
            placeholder="name@example.com"
            {...register("email")}
          />
        </FloatingLabel>
        <p>{errors.email?.message}</p>
        <FloatingLabel label="Password">
          <Form.Control
            type="password"
            autoComplete="off"
            placeholder="Password"
            {...register("password")}
          />
        </FloatingLabel>
        <p>{errors.password?.message}</p>

        <Button variant="warning" type="submit" className="mt-3 mb-3">
          Iniciar Sesión
        </Button>
      </Form>
      <Link to="/Register">¿Desea crear una cuenta?</Link>
    </div>
  );
};

export default Login;
