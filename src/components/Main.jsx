import styled from "styled-components";
import CircularProgress from '@mui/material/CircularProgress';
import { IoSend } from "react-icons/io5";
import { useRobot } from "../hooks/useRobot";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { FaCopy } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

const ContenedorPrincipal = styled.main`
    padding: 5rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    gap:50px;
    width: 100%;
`

const TituloPrincipal = styled.h1`
  font-family: "MR_ROBOT", sans-serif;
  font-size: 5rem;
  color: #E3E3E3;
  font-weight: 400;
  filter: drop-shadow(0 0 100px #fff);

  @media screen and (max-width:480px) {
    font-size: 3.5rem;
  }
`

const BotonObtenerRespuesta = styled.button`
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.3rem;
  padding: 0.3rem;
  border-bottom-right-radius: 30px;
  background-color: #E3E3E3;
  font-family: Arial, Helvetica, sans-serif;
  font-style: italic;
  cursor: ${props => props.propbackground === 'true' ? 'pointer' : 'default' };
  border: none;
  align-self: normal;

  &:hover {
    background-color: ${props => props.propbackground === 'true' ? '#1d1d1d' : '#E3E3E3'};
  }

  @media screen and (max-width:480px) {
    font-size:1.5rem;
  }

  @media screen and (min-width:481px) and (max-width:900px) {
    font-size: 2rem;
  }

  @media screen and (min-width:901px) and (max-width:1600px) {
    width: 10%;
  }
`

const InputPrompt = styled.textarea`
  font-size: 1.5rem;
  padding: 1rem 1rem 1rem 1rem;
  border-bottom-left-radius: 30px;
  background-color: #E3E3E3;
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  font-style: italic;
  width: 85%;
  border:none;
  resize: none;
  outline:none;
  overflow: hidden;

  @media screen and (max-width:369px) {
    font-size: 1rem;
  }

  @media screen and (min-width: 370px) and (max-width:480px) {
    font-size:1.3rem;
  }
  @media screen and (min-width:901px) and (max-width:1600px) {
    width: 90%;
  }
`

const ContenedorChat = styled.div`
  width: 60%;
  min-height: 380px;
  height: max-content;
  border: 2px solid #E3E3E3;
  border-bottom: none;
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  background: url('https://64.media.tumblr.com/55e02dda2e448752f7f09b3f99889725/8f6427e8419a0bf9-91/s400x600/c40615db97de26bc75edb40ade8da202d4da566c.gifv');
  background-size: cover;
  background-color: #000000e3;
  background-blend-mode: soft-light;  

  @media screen and (max-width:480px) {
    width: 90%;
    background-color: #000000d4;
  }

`

const ImagenChat = styled.img`
width: 50%;
align-self: center;


@media screen and (max-width:480px) {
  width: 90%;
  margin: 1rem 0;
}

@media screen and (min-width: 481px) and (max-width: 900px) {
  width: 70%;
}
`

const FormularioChat = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: max-content;
`

const ContenedorMensajes = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
  border-radius: 32px;
  gap: 10px;
  padding: 1rem;
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;

  /* width */
&::-webkit-scrollbar {
  width: 5px;
  border-radius: 10px;
}

/* Track */
&::-webkit-scrollbar-track {
  background: #282828;
}

/* Handle */
&::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
&::-webkit-scrollbar-thumb:hover {
  background: #fffdfd;
}
`

const MensajeUsuario = styled.div`
  width: max-content;
  max-width: 45%;
  padding: .5rem .8rem .5rem .5rem;
  color: white;
  font-size: 1rem;
  font-style: italic;
  align-self:flex-end;
  text-align: start;
  border-radius: 20px;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #ffffff2f;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  backdrop-filter: blur(2px);

  &::after {
    content: "";
    position: absolute;
    bottom: 17px; /* Ajusta esto según sea necesario */
    right: -11px; /* Ajusta esto según sea necesario para que la cola se alinee con el borde del mensaje */
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-left: 11px solid #ffffff2f; /* El mismo color de fondo del mensaje */
    border-bottom: 10px solid transparent;
    z-index: -1;
    backdrop-filter: blur(2px);
  }
  

  @media screen and (max-width:480px) {
    max-width: 63%;
  }
`
const MensajeIA = styled.div`
  max-width: 45%;
  width: max-content;
  font-size:1rem;
  color: white;
  padding: 1rem;
  border-radius: 20px;
  font-family: Arial, Helvetica, sans-serif;
  font-style: italic;
  background-color: #ffffff2f;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  backdrop-filter: blur(2px);

  &::after {
    content: "";
    position: absolute;
    bottom: 17px; /* Ajusta esto según sea necesario */
    left: -11px; /* Ajusta esto según sea necesario para que la cola se alinee con el borde del mensaje */
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-right: 11px solid #ffffff2f; /* El mismo color de fondo del mensaje */
    border-bottom: 10px solid transparent;
  }

  @media screen and (max-width:480px) {
    max-width: 75%;
  }
`

const TituloMensaje = styled.h1`
  font-weight: bold;
`

const ImgMensajeIA = styled.img`
  width: 20%;
  min-width: 60px;
`

const IconoEnviar = styled(IoSend)`
  color: ${props => props.propcolor === 'true' ? '#000' : '#00000087' };

  ${BotonObtenerRespuesta}:hover & {
    color: ${props => props.propcolor === 'true' ? '#fff' : '#00000087'};
  }
`

const IconoCargando = styled(CircularProgress)`

${BotonObtenerRespuesta} &{
  color: black;
}

  ${BotonObtenerRespuesta}:hover & {
    color: white
  }
`

const BotonCopiar = styled(Button)`
  && {
    min-width: 30px;
    align-self: flex-end;
    color: ${props => props.iscopied === 'true' ? '#5aab0e' : '#fff'};
    border-color: ${props => props.iscopied === 'true' ? '#5aab0e' : '#ffffff84'};
  }

  &&:hover {
    border-color: ${props => props.iscopied === 'true' ? '#5aab0e' : '#fff'};
  }
`

const IconoCopiar = styled(FaCopy)`
  
`

const Main = () => {

  const {
    isLoading,
    promptUsuario,
    textareaChatRef,
    scrollableDivRef,
    isEmptyPromptUsuario,
    messages,
    handleInputPromptUser,
    handleSubmitGetResponse,
    handleCopiarMensajeIA,
} = useRobot()

return <ContenedorPrincipal>
<TituloPrincipal>MR ROBOT</TituloPrincipal>
<ContenedorChat >
  <ContenedorMensajes ref={scrollableDivRef}  >
    {
      messages[0]?.user ? messages.map((message, index) => {
        return message.user === 'Tú' ? <MensajeUsuario key={index}><TituloMensaje>{message.user}</TituloMensaje>{message.message}</MensajeUsuario> : <MensajeIA key={index}><TituloMensaje><ImgMensajeIA src="icon_mr_robot.svg"/></TituloMensaje>{message.message}<BotonCopiar onClick={() => { handleCopiarMensajeIA(message.message)} } variant="outlined" iscopied={message.isCopied.toString()} >{ message.isCopied === true ? <FaCheckCircle /> : <FaCopy /> }</BotonCopiar></MensajeIA>
      })
      :
      <ImagenChat src='/img_mr_robot.svg' alt="Img Presentación Mr Robot" />
    }
  </ContenedorMensajes>
  <FormularioChat onSubmit={handleSubmitGetResponse}>
    <InputPrompt placeholder="Escribe algo para preguntar" ref={textareaChatRef} cols='1' rows='1' value={promptUsuario} onChange={handleInputPromptUser} />
    <BotonObtenerRespuesta type="submit" propbackground={isEmptyPromptUsuario.toString()}>{ (isLoading === true) ? <IconoCargando /> : <IconoEnviar propcolor={isEmptyPromptUsuario.toString()} /> }</BotonObtenerRespuesta>
  </FormularioChat>     
</ContenedorChat>
</ContenedorPrincipal>
}

export default Main
