import styled from "styled-components"
import Footer from "./components/Footer";
import { useState, useEffect, useRef } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { IoSend } from "react-icons/io5";
import './App.css'

const ContenedorPrincipal = styled.section`
    background-color: #000;
    padding: 5rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    gap:50px;
`

const TituloPrincipal = styled.h1`
  font-family: "Bungee Shade", sans-serif;
  font-size: 3rem;
  color: #fffdfd;
  font-weight: 400;
`

const BotonObtenerRespuesta = styled.button`
  font-size: 1.4rem;
  padding: 1rem;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  background-color: white;
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  font-style: italic;
  cursor: pointer;
  border: none;
  align-self: normal;

  @media screen and (max-width:480px) {
    font-size:0.932rem;
  }
`

const InputPrompt = styled.textarea`
  font-size: 1.5rem;
  padding: 1rem 1rem 1rem 1rem;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  background-color: white;
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
  border: 2px solid #fff;
  border-bottom: none;
  border-radius: 27px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width:480px) {
    width: 90%;
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
  padding: 1rem;
`

const MensajeUsuario = styled.p`
  width: 45%;
  padding: .5rem;
  color: white;
  font-size: 1rem;
  font-style: italic;
  align-self:flex-end;
  text-align: end;
  border-radius: 20px;
  font-family: Arial, Helvetica, sans-serif;

  @media screen and (max-width:480px) {
    width: 63%;
  }
`
const MensajeIA = styled.div`
  width: 45%;
  font-size:1rem;
  color: white;
  padding: .5rem;
  border-radius: 20px;
  font-family: Arial, Helvetica, sans-serif;
  font-style: italic;

  @media screen and (max-width:480px) {
    width: 75%;
  }
`

const TituloMensaje = styled.h1`
  font-weight: bold;
`

const App = () => {

    const [generatedContent, setGeneratedContent] = useState({});
    const [respuesta, setRespuesta] = useState({})
    const [obtenerRespuesta, setObtenerRespuesta] = useState(false)
    const [promptUsuario, setPromptUsuario] = useState('')
    const [obteniendoRespuestaIntervalo, setObteniendoRespuestaIntervalo] = useState()
    const textareaChatRef = useRef(null)
    const [isEmptyPromptUsuario, setIsEmptyPromptUsuario] = useState(false)
    const [messages, setMessages] = useState([])

  
    useEffect(() => {
      
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Ijk5MjhmYzcxODAwMTc5NjRkMTA5MzM5YTY5YzkyNjgyIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDItMDZUMTY6NDA6MDYuMzE4ODIzIn0.Vcags2jzroy3jualnOz0pLCjTTTrB76PHxkqA1PbuMQ'
        },
        body: JSON.stringify({
          beam_size: 1,
          max_length: 256,
          prompt: promptUsuario,
          repetition_penalty: 1.2,
          system_prompt: 'Tú eres Elliot Alderson, sabes un poco de todo pero sobretodo de tecnología. Siempre respondes en español.',
          temp: 0.98,
          top_k: 40,
          top_p: 0.9
        })
      };

      const fetchingData = async () => {
        const data =  await fetch('https://api.monsterapi.ai/v1/generate/llama2-7b-chat', options);
        const json = await data.json();
        setGeneratedContent(json)
      }

      if (obtenerRespuesta === true) {
        fetchingData()
      }

    }, [obtenerRespuesta]);

    useEffect(() => {

      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Ijk5MjhmYzcxODAwMTc5NjRkMTA5MzM5YTY5YzkyNjgyIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDItMDZUMTY6NDA6MDYuMzE4ODIzIn0.Vcags2jzroy3jualnOz0pLCjTTTrB76PHxkqA1PbuMQ'
        }
      };

      const fetchingData = async () => {
        const data = await fetch(generatedContent.status_url, options);
        const data2JSON = await data.json();
        return data2JSON
      }


     
      if (obtenerRespuesta === true && generatedContent?.status_url) {
        const fetchDataInterval = setInterval(() => {
          console.log('funcionando intervalo')
            const setearResIA = async () => {
            const newRespuesta = await fetchingData()
            setRespuesta(newRespuesta)
      }

      setearResIA()
        }, 3000)

        setObteniendoRespuestaIntervalo(fetchDataInterval)
      }

    }, [generatedContent])

    useEffect(() => {
      console.log(respuesta)
      if (respuesta.status === 'COMPLETED') {
        setObtenerRespuesta(false)
        clearInterval(obteniendoRespuestaIntervalo)

        const newIAMessage = {
          user: `MR. ROBOT`,
          message: respuesta.result.text
        }

        setMessages([...messages, newIAMessage])
        setPromptUsuario('')
        setIsEmptyPromptUsuario(false)
      }
    },[respuesta])

    const handleSubmitGetResponse = (e) => {
      e.preventDefault()


      if (isEmptyPromptUsuario === false || respuesta.status === 'IN_QUEUE' || respuesta.status === 'IN_PROGRESS') return;
      const newUserMessage = {
        user: 'Tú',
        message: promptUsuario
      }
      setObtenerRespuesta(true)
      setMessages([...messages, newUserMessage])
    }

    const handleInputPromptUser = (e) => {
      setPromptUsuario(e.target.value)
      e.target.value.length > 0 ? setIsEmptyPromptUsuario(true) : setIsEmptyPromptUsuario(false)
      if (textareaChatRef.current.scrollHeight > 60) {
        textareaChatRef.current.style.height = 'auto';
        textareaChatRef.current.style.height = `${textareaChatRef.current.scrollHeight}px`;
      }
    }

   /* const messages = [
      {
        user: 'Tú',
        message: 'Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño.'
      },
      {
        user: 'IA',
        message: 'Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño.'
      },
      {
        user: 'Tú',
        message: 'Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño.'
      },
      {
        user: 'IA',
        message: 'Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño.'
      }
    ] */

return <>
  <ContenedorPrincipal>
      <TituloPrincipal>MR ROBOT</TituloPrincipal>
      <ContenedorChat>
        <ContenedorMensajes>
          {
            messages[0]?.user && messages.map((message, index) => {
              return message.user === 'Tú' ? <MensajeUsuario key={index}><TituloMensaje>{message.user}</TituloMensaje>{message.message}</MensajeUsuario> : <MensajeIA key={index}><TituloMensaje>{message.user}</TituloMensaje>{message.message}</MensajeIA>
            })
          }
        </ContenedorMensajes>
        <FormularioChat onSubmit={handleSubmitGetResponse}>
          <InputPrompt placeholder="Escribe algo para preguntar" ref={textareaChatRef} cols='1' rows='1' value={promptUsuario} onChange={handleInputPromptUser} />
          <BotonObtenerRespuesta type="submit">{ (respuesta.status === 'IN_QUEUE' || respuesta.status === 'IN_PROGRESS') ? <CircularProgress style={{ color: '#000'}} size={15} /> : <IoSend style={{ color: isEmptyPromptUsuario ? 'black' : '#00000087' }}/> }</BotonObtenerRespuesta>
        </FormularioChat>     
      </ContenedorChat>
  </ContenedorPrincipal>
  <Footer/>
</>


}

export default App