import { useState, useEffect, useRef } from "react";

export const useRobot = () => {
    const [respuesta, setRespuesta] = useState({})
    const [loadingResponse, setLoadingResponse] = useState(false)
    const [obtenerRespuesta, setObtenerRespuesta] = useState(false)
    const [promptUsuario, setPromptUsuario] = useState('')
    const textareaChatRef = useRef(null)
    const scrollableDivRef = useRef(null)
    const [isEmptyPromptUsuario, setIsEmptyPromptUsuario] = useState(false)
    const [messages, setMessages] = useState([])
    const apiAuthorization = import.meta.env.VITE_API_KEY

    useEffect(() => {
      
      const url = 'https://chat-gpt26.p.rapidapi.com/';
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': apiAuthorization,
          'X-RapidAPI-Host': 'chat-gpt26.p.rapidapi.com'
        },
        body:JSON.stringify ({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: promptUsuario
            }
          ]
        })
      };

      const fetchingData = async () => {
      try {
        setLoadingResponse(true)
        const data =  await fetch(url, options);
        const json = await data.json();
        if (json) {
          setRespuesta(json)
          setLoadingResponse(false)
        }      
      }

      catch (error) {
        console.error(error);
      }
    }

      if (obtenerRespuesta === true) {
        fetchingData()    
      }

    }, [obtenerRespuesta]);


    useEffect(() => {
      
        setObtenerRespuesta(false)

      if (respuesta?.choices) {
          const newIAMessage = {
          user: `MR. ROBOT`,
          message: respuesta.choices[0].message.content
        }

        setMessages([...messages, newIAMessage])
        setPromptUsuario('')
        setIsEmptyPromptUsuario(false)
      }


      
    },[respuesta])

    useEffect(() => {
      if (scrollableDivRef.current) {
        const scrollableDiv = scrollableDivRef.current;
        scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
      }
    },[messages])

    const handleSubmitGetResponse = (e) => {
      e.preventDefault()


      if (isEmptyPromptUsuario === false || loadingResponse === true) return;
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

    return {
        respuesta,
        promptUsuario,
        loadingResponse,
        textareaChatRef,
        scrollableDivRef,
        isEmptyPromptUsuario,
        messages,
        handleInputPromptUser,
        handleSubmitGetResponse
    }
}