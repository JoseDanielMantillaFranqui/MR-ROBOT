import styled from "styled-components";
import CircularProgress from '@mui/material/CircularProgress';
import { IoSend } from "react-icons/io5";
import { useRobot } from "../hooks/useRobot";

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
  font-size: 1.35rem;
  padding: 1rem;
  border-bottom-right-radius: 30px;
  background-color: #E3E3E3;
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  font-style: italic;
  cursor: ${props => props.propbackground === 'true' ? 'pointer' : 'default' };
  border: none;
  align-self: normal;

  &:active {
    background-color: ${props => props.propbackground === 'true' ? '#1d1d1d' : '#E3E3E3'};
  }

  @media screen and (max-width:480px) {
    font-size:0.932rem;
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

  @media screen and (max-width:480px) {
    font-size:1rem;
  }
`

const ContenedorChat = styled.div`
  width: 60%;
  min-height: 400px;
  height: max-content;
  border: 2px solid #E3E3E3;
  border-bottom: none;
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  

  @media screen and (max-width:480px) {
    width: 90%;
  }

  &::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(1px); /* Ajusta el valor de desenfoque según tu preferencia */
  z-index: -1;
}
`

const ImagenChat = styled.img`
width: 50%;
align-self: center;

@media screen and (max-width:480px) {
  width: 90%;
  margin-bottom: 2rem;
}
`

const FormularioChat = styled.form`
  width: 102%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: max-content;

  @media screen and (min-width:901px) and (max-width:1600px) {
    width: 111.5%;
  }
`

const ContenedorMensajes = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
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
  text-align: end;
  border-radius: 20px;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #ffffff2f;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  

  @media screen and (max-width:480px) {
    max-width: 63%;
  }
`
const MensajeIA = styled.div`
  max-width: 45%;
  width: max-content;
  font-size:1rem;
  color: white;
  padding: .5rem;
  border-radius: 20px;
  font-family: Arial, Helvetica, sans-serif;
  font-style: italic;
  background-color: #ffffff2f;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media screen and (max-width:480px) {
    max-width: 75%;
  }
`

const TituloMensaje = styled.h1`
  font-weight: bold;
`

const ImgMensajeIA = styled.img`
  width: 20%;
`

const IconoEnviar = styled(IoSend)`
  color: ${props => props.propcolor === 'true' ? '#000' : '#00000087' };

  ${BotonObtenerRespuesta}:active & {
    color: ${props => props.propcolor === 'true' ? '#fff' : '#00000087'};
  }
`

const Main = () => {

    const {
        respuesta,
        promptUsuario,
        loadingResponse,
        textareaChatRef,
        scrollableDivRef,
        isEmptyPromptUsuario,
        messages,
        handleInputPromptUser,
        handleSubmitGetResponse
    } = useRobot()


    return <ContenedorPrincipal>
    <TituloPrincipal>MR ROBOT</TituloPrincipal>
    <ContenedorChat>
      <ContenedorMensajes ref={scrollableDivRef}>
        {
          messages[0]?.user ? messages.map((message, index) => {
            return message.user === 'Tú' ? <MensajeUsuario key={index}><TituloMensaje>{message.user}</TituloMensaje>{message.message}</MensajeUsuario> : <MensajeIA key={index}><TituloMensaje><ImgMensajeIA src="icon_mr_robot.svg"/></TituloMensaje>{message.message}</MensajeIA>
          })
          :
          <ImagenChat src="img_mr_robot.svg" alt="Imagen de Mr Robot presentándose"/>
        }
      </ContenedorMensajes>
      <FormularioChat onSubmit={handleSubmitGetResponse}>
        <InputPrompt placeholder="Escribe algo para preguntar" ref={textareaChatRef} cols='1' rows='1' value={promptUsuario} onChange={handleInputPromptUser} />
        <BotonObtenerRespuesta type="submit" propbackground={isEmptyPromptUsuario.toString()}>{ (loadingResponse === true) ? <CircularProgress style={{ color: '#000'}} size={15} /> : <IconoEnviar propcolor={isEmptyPromptUsuario.toString()} /> }</BotonObtenerRespuesta>
      </FormularioChat>     
    </ContenedorChat>
</ContenedorPrincipal>
}

export default Main
