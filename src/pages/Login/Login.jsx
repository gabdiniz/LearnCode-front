import { Button, Container, Form } from "react-bootstrap";
import { InputDefault } from "../../components/InputDefault/InputDefault";
import "./Login.scss";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function Login() {

  const { register, handleSubmit } = useForm();
  const { userLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  async function onSubmit(data) {
    const err = await userLogin(data);
    if (err) {
      toast.error(err.response.data.message, {
        position: "bottom-right",
        duration: 2500
      });
    }
    else {
      navigate("/home");
    }
  }

  return (
    <Container className="container-login d-flex justify-content-center align-items-center">
      <Form className="form-login" onSubmit={handleSubmit(onSubmit)}>
        <div className="text-center  div-span-login">
          <h4 className="text-white span-login">Entre com sua conta!</h4>
        </div>
        <InputDefault classNameGroup="mb-5" placeholder="E-mail" {...register("email")} />
        <InputDefault type="senha" placeholder="Senha" {...register("password")} />
        <div className="d-flex justify-content-center div-btn-login">
          <Button type="submit" variant="transparent" className="btn-login">Entrar</Button>
        </div>
      </Form>
    </Container>
  );
}