import { Button, Container, Form } from "react-bootstrap";
import './Register.scss';
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { InputDefault } from "../../components/InputDefault/InputDefault";

export function Register() {

  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    if (data.password !== data.confirm_password) {
      return toast.error("As senhas devem ser iguais.", {
        position: "bottom-right",
        duration: 2500,
      });
    }

    axios.post(`${process.env.REACT_APP_IP}:3001/auth/register`, data)
      .then(() => {
        return toast.success("Conta criada!", { position: "bottom-right", duration: 2500 });
      })
      .catch((err) => {
        return toast.error(err.response?.data.message, { position: "bottom-right", duration: 2500, });
      });
  };

  return (
    <Container className="container-register d-flex flex-column align-items-center justify-content-center">
      <Form onSubmit={handleSubmit(onSubmit)} className="form-register">
        <div className="text-center  div-span-register">
          <h4 className="text-white span-register">faça sua conta!</h4>
        </div>
        <div className="d-flex gap-3 mb-3">
          <InputDefault placeholder="Nome" {...register("first_name")} />
          <InputDefault placeholder="Sobrenome" {...register("last_name")} />
        </div>
        <InputDefault classNameGroup="mb-3" placeholder="E-mail" {...register("email")} />
        <InputDefault classNameGroup="mb-3" placeholder="Telefone" {...register("phone")} />
        <div className="d-flex gap-3">
          <InputDefault type="password" placeholder="Senha" {...register("password")} />
          <InputDefault type="password" placeholder="Confirmar senha" {...register("confirm_password")} />
        </div>
        <div className="d-flex justify-content-center div-btn-register">
          <Button type="submit" variant="transparent" className="btn-register">Cadastrar</Button>
        </div>
      </Form>
    </Container>
  );
};