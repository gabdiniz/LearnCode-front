import { Button, Container, Form } from "react-bootstrap";
import './Register.scss';
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { InputDefault } from "../../components/InputDefault/InputDefault";
import { HeaderLoginRegister } from "../../components/HeaderLoginRegister/HeaderLoginRegister";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

export function Register() {

  const schema = object({
    first_name: string().required("O nome é obrigatório.").min(3, "Mínimo de 3 letras."),
    last_name: string().required("O sobrenome é obrigatório.").min(3, "Mínimo de 3 letras."),
    email: string().required("O e-mail é obrigatório.").email("Inseria um e-mail valido."),
    phone: string().required("O telefone é obrigatório.").min(9, "Mínimo de 9 digitos"),
    password: string().required("A senha é obrigatória").min(8, "Minímo de 8 caracteres"),
    confirm_password: string().required("A confirmação é obrigatória").min(8, "Minímo de 8 caracteres")
  });

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate()

  function onSubmit(data) {
    if (data.password !== data.confirm_password) {
      return toast.error("As senhas devem ser iguais.", {
        position: "bottom-right",
        duration: 2500,
      });
    }

    axios.post(`${process.env.REACT_APP_IP}/auth/register`, data)
      .then(() => {
        navigate("/entrar");
        return toast.success("Conta criada!", { position: "bottom-right", duration: 2500 });
      })
      .catch((err) => {
        return toast.error(err.response?.data.message, { position: "bottom-right", duration: 2500, });
      });
  };

  return (
    <div className="div-maior-register d-flex flex-column justify-content-between">
      <HeaderLoginRegister path="/entrar" button="Entrar" />
      <Container className="container-register d-flex flex-column align-items-center justify-content-center">
        <Form onSubmit={handleSubmit(onSubmit)} className="form-register">
          <div className="text-center  div-span-register">
            <h4 className="text-white span-register">Faça sua conta!</h4>
          </div>
          <div className="d-flex gap-3 mb-3">
            <InputDefault classNameControl={errors.first_name && " is-invalid"} placeholder="Nome" err={errors?.first_name?.message} {...register("first_name")} />
            <InputDefault classNameControl={errors.last_name && " is-invalid"} placeholder="Sobrenome" err={errors?.last_name?.message}  {...register("last_name")} />
          </div>
          <InputDefault classNameControl={errors.email && " is-invalid"} classNameGroup="mb-3" err={errors?.email?.message}  placeholder="E-mail" {...register("email")} />
          <InputDefault classNameControl={errors.phone && " is-invalid"} classNameGroup="mb-3" err={errors?.phone?.message}  placeholder="Telefone" {...register("phone")} />
          <div className="d-flex gap-3">
            <InputDefault classNameControl={errors.password && " is-invalid"} type="password" placeholder="Senha" err={errors?.password?.message}  {...register("password")} />
            <InputDefault classNameControl={errors.first_name && " is-invalid"} type="password" placeholder="Confirmar senha" err={errors?.confirm_password?.message}  {...register("confirm_password")} />
          </div>
          <div className="d-flex justify-content-center div-btn-register">
            <Button type="submit" variant="transparent" className="btn-register">Cadastrar</Button>
          </div>
        </Form>
      </Container>
      <div></div>
    </div>
  );
};