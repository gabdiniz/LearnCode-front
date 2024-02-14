import { Button, Container, Form } from "react-bootstrap";
import "./Profile.scss";
import { Link, useNavigate } from "react-router-dom";
import { InputDefault } from "../../components/InputDefault/InputDefault";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { BsBoxArrowRight } from "react-icons/bs";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

export function Profile() {

  const schemaDados = object({
    first_name: string().required("O nome é obrigatório.").min(3, "Mínimo de 3 letras."),
    last_name: string().required("O sobrenome é obrigatório.").min(3, "Mínimo de 3 letras."),
    email: string().required("O e-mail é obrigatório.").email("Inseria um e-mail valido."),
    phone: string().required("O telefone é obrigatório.").min(9, "Mínimo de 9 digitos"),
  });

  const schemaSenha = object({
    currentPassword: string().required("Senha atual é obrigatória.").min(8, "Minímo de 8 caracteres"),
    newPassword: string().required("Nova senha é obrigatória.").min(8, "Minímo de 8 caracteres"),
    newPassword2: string().required("Reperir nova senha é obrigatória.").min(8, "Minímo de 8 caracteres"),
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { userLogout } = useContext(AuthContext);

  useEffect(() => {
    if (!token) navigate("/entrar");
  }, [navigate, token]);

  const info = JSON.parse(localStorage.getItem('userInfo'));
  const nome = info?.first_name + " " + info?.last_name;
  const initials = info?.first_name[0] + info?.last_name[0];

  const [telaDadosPessoais, setTelaDadosPessoais] = useState(true);
  const formDados = useForm({ resolver: yupResolver(schemaDados) });
  const formSenha = useForm({ resolver: yupResolver(schemaSenha) });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_IP}/account`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        const { first_name, last_name, email, phone } = response.data;
        formDados.reset({ first_name, last_name, email, phone });
      })
      .catch((err) => {
        return toast.error(err.response.data.message, { position: "bottom-right", duration: 2500});
      });
  }, [token, formDados]);

  function onSubmitDados(data) {
    axios.put(`${process.env.REACT_APP_IP}/account`, data, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        return toast.success(response.data.message, { position: "bottom-right", duration: 2500, });
      })
      .catch((err) => {
        return toast.error(err.response.data.message, { position: "bottom-right", duration: 2500, });
      })
  }

  function onSubmitSenha(data) {
    console.log(formSenha.errors)
    if (data.newPassword !== data.newPassword2) {
      return toast.error("As senhas devem ser iguais.", { position: "bottom-right", duration: 2500, });
    }
    delete data.newPassword2;

    axios.put(`${process.env.REACT_APP_IP}/accountPassword`, data, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        return toast.success(response.data.message, { position: "bottom-right", duration: 2500, });
      })
      .catch((err) => {
        return toast.error(err.response.data.message, { position: "bottom-right", duration: 2500, });
      })
  }

  function onLogout() {
    userLogout();
    navigate("/entrar");
  }

  return (
    <Container className="div-maior-profile d-flex gap-5 justify-content-center">
      <div className="div-opcoes-profile d-flex" >
        <Link className="opcoes-profile border-bottom-0" style={telaDadosPessoais ? { color: "#ff0044" } : {}} onClick={() => setTelaDadosPessoais(true)}>Dados Pessoais</Link>
        <Link className="opcoes-profile" style={!telaDadosPessoais ? { color: "#ff0044" } : {}} onClick={() => setTelaDadosPessoais(false)}>Senha</Link>
      </div>
      {
        telaDadosPessoais
          ?
          <Form className="d-flex flex-column div-inputs gap-3 p-5" onSubmit={formDados.handleSubmit(onSubmitDados)}>
            <div className="d-flex justify-content-center align-items-center gap-4 div-avatar-profile">
              <span className="avatar-initials-profile" to="/perfil">{initials}</span>
              <span className="text-white span-nome-profile">{nome}</span>
            </div>
            <div className="d-flex gap-3">
              <InputDefault classNameControl={formDados.formState?.errors?.first_name && " is-invalid"} placeholder="Nome" err={ formDados.formState?.errors?.first_name?.message} {...formDados.register("first_name")} />
              <InputDefault classNameControl={formDados.formState?.errors?.last_name && " is-invalid"} placeholder="Sobrenome" err={ formDados.formState?.errors?.last_name?.message} {...formDados.register("last_name")} />
            </div>
            <InputDefault classNameControl={formDados.formState?.errors?.email && " is-invalid"} placeholder="E-mail" err={ formDados.formState?.errors?.email?.message} type="email" {...formDados.register("email")} />
            <InputDefault classNameControl={formDados.formState?.errors?.phone && " is-invalid"} placeholder="Telefone" err={ formDados.formState?.errors?.phone?.message} {...formDados.register("phone")} />
            <div className="d-flex justify-content-center div-btn-register">
              <Button type="submit" variant="transparent" className="btn-register">Salvar Alterações</Button>
            </div>
            <Button variant="transparent" className="btn-sair" onClick={onLogout}><BsBoxArrowRight className="icons-navbar" /></Button>
          </Form>
          :
          <Form className="d-flex flex-column div-inputs gap-3 p-5" onSubmit={formSenha.handleSubmit(onSubmitSenha)}>
            <div className="d-flex justify-content-center align-items-center gap-4 div-avatar-profile">
              <span className="avatar-initials-profile" to="/perfil">{initials}</span>
              <span className="text-white span-nome-profile">{nome}</span>
            </div>
            <InputDefault classNameControl={formSenha.formState?.errors?.currentPassword && " is-invalid"} placeholder="Senha atual" err={formSenha.formState?.errors?.currentPassword?.message}{...formSenha.register("currentPassword")} />
            <div className="d-flex gap-3">
              <InputDefault classNameControl={formSenha.formState?.errors?.newPassword && " is-invalid"} placeholder="Nova senha" err={formSenha.formState?.errors?.newPassword?.message} {...formSenha.register("newPassword")} />
              <InputDefault classNameControl={formSenha.formState?.errors?.newPassword2 && " is-invalid"} placeholder="Repetir senha" err={formSenha.formState?.errors?.newPassword2?.message} {...formSenha.register("newPassword2")} />
            </div>
            <div className="d-flex justify-content-center div-btn-register">
              <Button type="submit" variant="transparent" className="btn-register">Salvar Alterações</Button>
            </div>
          </Form>
      }
    </Container>
  );
};