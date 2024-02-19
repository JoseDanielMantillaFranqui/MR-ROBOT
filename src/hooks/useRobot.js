import { useState, useEffect, useRef } from "react";

export const useRobot = () => {
    const [generatedContent, setGeneratedContent] = useState({});
    const [respuesta, setRespuesta] = useState({})
    const [obtenerRespuesta, setObtenerRespuesta] = useState(false)
    const [promptUsuario, setPromptUsuario] = useState('')
    const [obteniendoRespuestaIntervalo, setObteniendoRespuestaIntervalo] = useState()
    const textareaChatRef = useRef(null)
    const scrollableDivRef = useRef(null)
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
        setRespuesta({status: 'IN_QUEUE'})
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

    useEffect(() => {
      if (scrollableDivRef.current) {
        const scrollableDiv = scrollableDivRef.current;
        scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
      }
    },[messages])

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

    return {
        respuesta,
        promptUsuario,
        textareaChatRef,
        scrollableDivRef,
        isEmptyPromptUsuario,
        messages,
        handleInputPromptUser,
        handleSubmitGetResponse
    }
}