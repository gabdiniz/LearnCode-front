import { Button, Container, Form } from "react-bootstrap";
import './Register.scss';
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";

export function Register() {

  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(data)
    if (data.password !== data.confirm_password) {
      return toast.error("As senhas devem ser iguais.", {
        position: "bottom-right",
        duration: 2500,
      });
    }
    axios.post("http://localhost:3001/auth/register", data)
      .then(() => {
        return toast.success("Conta criada!", { position: "bottom-right", duration: 2500 });
      })
      .catch((err) => {
        console.log(err)
        return toast.error(err.response?.data.message, { position: "bottom-right", duration: 2500, });
      });
  }

  return (
    <Container className="container-register d-flex flex-column align-items-center justify-content-center">
      <Form onSubmit={handleSubmit(onSubmit)} className="form-register">
        <div className="text-center  div-span-register">
          <h4 className="text-white span-register">faça sua conta!</h4>
        </div>
        <div className="d-flex gap-3 mb-3">
          <Form.Group>
            <Form.Control className="input-padrao" type="text" placeholder="Nome" {...register("first_name")} />
          </Form.Group>
          <Form.Group>
            <Form.Control className="input-padrao" type="text" placeholder="Sobrenome" {...register("last_name")} />
          </Form.Group>
        </div>
        <Form.Group className="mb-3">
          <Form.Control className="input-padrao" type="text" placeholder="E-mail" {...register("email")} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control className="input-padrao" type="text" placeholder="Telefone" {...register("phone")} />
        </Form.Group>
        <div className="d-flex gap-3">
          <Form.Group>
            <Form.Control className="input-padrao" type="password" placeholder="Senha" {...register("password")} />
          </Form.Group>
          <Form.Group>
            <Form.Control className="input-padrao" type="password" placeholder="Confirmar senha" {...register("confirm_password")} />
          </Form.Group>
        </div>
        <div className="d-flex justify-content-center div-btn-register">
          <Button type="submit" variant="transparent" className="btn-register">Cadastrar</Button>
        </div>
      </Form>
    </Container>
  )
}