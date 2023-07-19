import { Button, Container, Form } from "react-bootstrap";
import { InputDefault } from "../../components/InputDefault/InputDefault";
import "./Login.scss";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { HeaderLoginRegister } from "../../components/HeaderLoginRegister/HeaderLoginRegister";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

export function Login() {

  const schema = object({
    email: string().required("O e-mail é obrigatório.").email("Inseria um e-mail valido."),
    password: string().required("A senha é obrigatória").min(8, "Minímo de 8 caracteres")
  });

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
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
    <div className="div-maior-login d-flex flex-column justify-content-between">
      <HeaderLoginRegister path="/cadastrar" button="Cadastre-se" />
      <Container className="container-login d-flex justify-content-center align-items-center">

        <Form className="form-login" onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center  div-span-login">
            <h4 className="text-white span-login">Entre com sua conta!</h4>
          </div>
          <InputDefault classNameControl={errors.email && " is-invalid"} classNameGroup="mb-5" placeholder="E-mail" err={errors?.email?.message} {...register("email")} />
          <InputDefault classNameControl={errors.password && " is-invalid"} type="senha" placeholder="Senha" err={errors?.password?.message}{...register("password")} />
          <div className="d-flex justify-content-center div-btn-login">
            <Button type="submit" variant="transparent" className="btn-login">Entrar</Button>
          </div>
        </Form>
      </Container>
      <div></div>
    </div>
  );
}