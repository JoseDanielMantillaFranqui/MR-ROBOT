import styled from "styled-components";
import CircularProgress from '@mui/material/CircularProgress';
import { IoSend } from "react-icons/io5";
import { useRobot } from "../hooks/useRobot";
import { useEffect, useState } from "react";

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

const Main = () => {

  const {
    respuesta,
    promptUsuario,
    textareaChatRef,
    scrollableDivRef,
    isEmptyPromptUsuario,
    messages,
    handleInputPromptUser,
    handleSubmitGetResponse
} = useRobot()

const [dataURL, setDataURL] = useState('');

useEffect(() => {
    const canvas = document.getElementById('canv');
    const ctx = canvas.getContext('2d');
    const w = canvas.width = document.body.offsetWidth;
    const h = canvas.height = document.body.offsetHeight;
    const cols = Math.floor(w / 20) + 1;
    const ypos = Array(cols).fill(0);
    const characters = '0123456789'; // Solo números

    function matrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.09)';
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = '#e8efe825';
        ctx.font = '15pt monospace';

        ypos.forEach((y, ind) => {
            const text = characters[Math.floor(Math.random() * characters.length)];
            const x = ind * 20;
            ctx.fillText(text, x, y);
            if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
            else ypos[ind] = y + 20;
        });

        const dataURL = canvas.toDataURL();
        setDataURL(dataURL);
    }

    const intervalId = setInterval(matrix, 100);

    return () => clearInterval(intervalId);
}, []);

return <ContenedorPrincipal>
<canvas id="canv" style={{ width: 200, height: 200, display: 'none'}}></canvas>
<TituloPrincipal>MR ROBOT</TituloPrincipal>
<ContenedorChat style={{background: `url(${dataURL})`}}>
  <ContenedorMensajes ref={scrollableDivRef}  >
    {
      messages[0]?.user ? messages.map((message, index) => {
        return message.user === 'Tú' ? <MensajeUsuario key={index}><TituloMensaje>{message.user}</TituloMensaje>{message.message}</MensajeUsuario> : <MensajeIA key={index}><TituloMensaje><ImgMensajeIA src="icon_mr_robot.svg"/></TituloMensaje>{message.message}</MensajeIA>
      })
      :
      <ImagenChat src='/img_mr_robot.svg' />
    }
  </ContenedorMensajes>
  <FormularioChat onSubmit={handleSubmitGetResponse}>
    <InputPrompt placeholder="Escribe algo para preguntar" ref={textareaChatRef} cols='1' rows='1' value={promptUsuario} onChange={handleInputPromptUser} />
    <BotonObtenerRespuesta type="submit" propbackground={isEmptyPromptUsuario.toString()}>{ (respuesta.status === 'IN_QUEUE' || respuesta.status === 'IN_PROGRESS') ? <IconoCargando /> : <IconoEnviar propcolor={isEmptyPromptUsuario.toString()} /> }</BotonObtenerRespuesta>
  </FormularioChat>     
</ContenedorChat>
</ContenedorPrincipal>
}

export default Main
