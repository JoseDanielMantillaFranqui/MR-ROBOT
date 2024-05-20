import { useState, useEffect, useRef } from "react";

export const useRobot = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [respuesta, setRespuesta] = useState({})
    const [obtenerRespuesta, setObtenerRespuesta] = useState(false)
    const [promptUsuario, setPromptUsuario] = useState('')
    const textareaChatRef = useRef(null)
    const scrollableDivRef = useRef(null)
    const [isEmptyPromptUsuario, setIsEmptyPromptUsuario] = useState(false)
    const [messages, setMessages] = useState([])
    const apiAuthorization = import.meta.env.VITE_API_KEY

    useEffect(() => {
      



      if (obtenerRespuesta === true) {


        const obtenerResultado = async () => {
          
        setIsLoading(true)
        const response = await fetch('https://api.deepinfra.com/v1/openai/chat/completions', {
          method: 'POST',
          body: JSON.stringify({
              model: "meta-llama/Llama-2-70b-chat-hf",
              messages: [{role: "user", content: promptUsuario}],
          }),
          headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${apiAuthorization}`,
          }
        });

        const data = await response.json()
        setRespuesta(data.choices[0].message.content)
        respuesta === true ? setIsLoading(false) : setIsLoading(true)
        }

        obtenerResultado()
      }

    }, [obtenerRespuesta]);

    useEffect(() => {
        if (obtenerRespuesta === false) return

        const newIAMessage = {
          user: 'MR. ROBOT',
          message: respuesta,
          isCopied: false
        }
        setObtenerRespuesta(false)
        setMessages([...messages, newIAMessage])
        setPromptUsuario('')
        setIsLoading(false)
        setIsEmptyPromptUsuario(false)
      
    },[respuesta])

    useEffect(() => {

      if (scrollableDivRef.current) {
        const scrollableDiv = scrollableDivRef.current;
        scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
      }

      const allMessagesNotCopied = messages.every(message => message?.isCopied ? message.isCopied === false : true);

      if (allMessagesNotCopied === false) {
        const disabledCopied = messages.map((message, index) => {
        if (message.isCopied === true) {
          return { ...message, isCopied: false }
        }

        return message
      })
      const timer = setTimeout(() => {
        setMessages(disabledCopied)
      }, 4000) 


      return () => clearTimeout(timer)
      }



    },[messages])

    const handleSubmitGetResponse = (e) => {
      e.preventDefault()

      if ((isEmptyPromptUsuario === false) || (isLoading === true)) return

      const newUserMessage = {
        user: 'Tú',
        message: promptUsuario
      }
      setObtenerRespuesta(true)
      setMessages([...messages, newUserMessage])
    }

    const validatePromptUser = (value) => {
      const isValid = ((value.length >  0) && (!(value.trim() === ''))) ? true : false 

      return isValid
    }

    const handleInputPromptUser = (e) => {
      setPromptUsuario(e.target.value)
      setIsEmptyPromptUsuario(validatePromptUser(e.target.value))
      if (textareaChatRef.current.scrollHeight > 60) {
        textareaChatRef.current.style.height = 'auto';
        textareaChatRef.current.style.height = `${textareaChatRef.current.scrollHeight}px`;
      }
    }

    const handleCopiarMensajeIA = (textoIA) => {
      var elementoTemporal = document.createElement("textarea")
      elementoTemporal.value = textoIA
      document.body.appendChild(elementoTemporal)
      elementoTemporal.select()
      document.execCommand("copy")
      document.body.removeChild(elementoTemporal)
      
      const enabledCopied = messages.map((message, index) => {
        if ((message.isCopied === false) && message.message === textoIA) {
          return { ...message, isCopied: true } 
        }

        return message
      })

      setMessages(enabledCopied)
  }


    return {
        isLoading,
        promptUsuario,
        textareaChatRef,
        scrollableDivRef,
        isEmptyPromptUsuario,
        messages,
        handleInputPromptUser,
        handleSubmitGetResponse,
        handleCopiarMensajeIA,
    }
}