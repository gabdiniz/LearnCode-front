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


export function Profile() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token")
  const { userLogout } = useContext(AuthContext);

  useEffect(() => {
    if (!token) navigate("/entrar");
  }, [navigate, token]);

  const info = JSON.parse(localStorage.getItem('userInfo'));
  const nome = info?.first_name + " " + info?.last_name;
  const initials = info?.first_name[0] + info?.last_name[0];

  const [telaDadosPessoais, setTelaDadosPessoais] = useState(true);
  const formDados = useForm();
  const formSenha = useForm();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_IP}:3001/account`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        const { first_name, last_name, email, phone } = response.data;
        formDados.reset({ first_name, last_name, email, phone });
      })

  }, [token, formDados])

  function onSubmitDados(data) {
    axios.put(`${process.env.REACT_APP_IP}:3001/account`, data, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        return toast.success(response.data.message, { position: "bottom-right", duration: 2500, });
      })
      .catch((err) => {
        return toast.error(err.response.data.message, { position: "bottom-right", duration: 2500, });
      })
  }

  function onSubmitSenha(data) {
    if (data.newPassword !== data.newPassword2) {
      return toast.error("As senhas devem ser iguais.", { position: "bottom-right", duration: 2500, });
    }
    delete data.newPassword2;

    axios.put(`${process.env.REACT_APP_IP}:3001/accountPassword`, data, { headers: { Authorization: `Bearer ${token}` } })
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
              <InputDefault placeholder="Nome" {...formDados.register("first_name")} />
              <InputDefault placeholder="Sobrenome" {...formDados.register("last_name")} />
            </div>
            <InputDefault placeholder="E-mail" type="email" {...formDados.register("email")} />
            <InputDefault placeholder="Telefone" {...formDados.register("phone")} />
            <div className="d-flex justify-content-center div-btn-register">
              <Button type="submit" variant="transparent" className="btn-register">Salvar Alterações</Button>
            </div>
            <Button variant="transparent" className="btn-sair" onClick={onLogout}><BsBoxArrowRight className="icons-navbar"/></Button>
          </Form>
          :
          <Form className="d-flex flex-column div-inputs gap-3 p-5" onSubmit={formSenha.handleSubmit(onSubmitSenha)}>
            <div className="d-flex justify-content-center align-items-center gap-4 div-avatar-profile">
              <span className="avatar-initials-profile" to="/perfil">{initials}</span>
              <span className="text-white span-nome-profile">{nome}</span>
            </div>
            <InputDefault placeholder="Senha atual" {...formSenha.register("currentPassword")} />
            <div className="d-flex gap-3">
              <InputDefault placeholder="Nova senha" {...formSenha.register("newPassword")} />
              <InputDefault placeholder="Repetir nova senha" {...formSenha.register("newPassword2")} />
            </div>
            <div className="d-flex justify-content-center div-btn-register">
              <Button type="submit" variant="transparent" className="btn-register">Salvar Alterações</Button>
            </div>
          </Form>
      }
    </Container>
  );
};