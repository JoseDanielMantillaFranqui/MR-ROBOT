import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const useRobot = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [respuesta, setRespuesta] = useState('');
    const [obtenerRespuesta, setObtenerRespuesta] = useState(false);
    const [promptUsuario, setPromptUsuario] = useState('');
    const [messagesPreviousLength, setMessagesPreviousLength] = useState(0);
    const textareaChatRef = useRef(null);
    const scrollableDivRef = useRef(null);
    const [isEmptyPromptUsuario, setIsEmptyPromptUsuario] = useState(false);
    const [messages, setMessages] = useState([]);
    const apiAuthorization = import.meta.env.VITE_API_KEY;
    const [historyMessagesUser, setHistoryMessagesUser] = useState([]);
    const [historyMessagesIA, setHistoryMessagesIA] = useState([{ text: "Hola, soy Mr. Robot. ¿En qué puedo ayudarte?" }]);

    const genAI = new GoogleGenerativeAI(apiAuthorization);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    useEffect(() => {
        if (!obtenerRespuesta) return;
      
        const obtenerResultado = async () => {
          // Aseguramos que el prompt no esté vacío
          if (!promptUsuario.trim()) return;
          
          setIsLoading(true);
          try {
            // Construir el nuevo historial de usuario incluyendo el mensaje actual
            const newHistoryMessagesUser = [
              ...historyMessagesUser,
              { text: promptUsuario }
            ];
            
            // Construir el historial completo combinando usuario e IA
            const chatHistory = [
              {
                role: "user",
                parts: newHistoryMessagesUser, // Aseguramos que no esté vacío
              },
              {
                role: "model",
                parts: historyMessagesIA,
              },
            ];
            
            // Iniciamos el chat con el historial actualizado
            const chat = model.startChat({
              history: chatHistory,
              generationConfig: {
                maxOutputTokens: 500,
              },
            });
            
            const result = await chat.sendMessage(promptUsuario);
            const response = await result.response;
            const text = response.text();
            
            // Actualizamos la respuesta y el historial de la IA usando el texto obtenido
            setRespuesta(text);
            setHistoryMessagesIA(prev => [...prev, { text }]);
            
            // También actualizamos el historial de usuario para mantenerlo en el estado
            setHistoryMessagesUser(newHistoryMessagesUser);
          } catch (error) {
            console.error("Error fetching response:", error);
          } finally {
            setIsLoading(false);
            textareaChatRef.current.style.height = '60px'
          }
        };
      
        obtenerResultado();
      }, [obtenerRespuesta]);
      

    useEffect(() => {
        if (!obtenerRespuesta) return;

        const respuestaFormateada = respuesta.replace(/\*/g, '<br>');

        const newIAMessage = {
            user: 'MR. ROBOT',
            message: respuesta,
            isCopied: false
        };
        setObtenerRespuesta(false);
        setMessages(prevMessages => [...prevMessages, newIAMessage]);
        setIsLoading(false);
        setIsEmptyPromptUsuario(false);
        setPromptUsuario('');

    }, [respuesta]);

    const allMessagesNotCopied = useMemo(() => {
        return messages.every(message => message?.isCopied ? message.isCopied === false : true);
    }, [messages]);

    useEffect(() => {
        if ((scrollableDivRef.current) && (messages.length > messagesPreviousLength)) {
            const scrollableDiv = scrollableDivRef.current;
            scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
        }

        if (!allMessagesNotCopied) {
            const disabledCopied = messages.map((message) => {
                if (message.isCopied) {
                    return { ...message, isCopied: false };
                }
                return message;
            });

            const timer = setTimeout(() => {
                setMessages(disabledCopied);
            }, 4000);

            return () => clearTimeout(timer);
        }

        setMessagesPreviousLength(messages.length);
    }, [messages, allMessagesNotCopied]);

    const handleSubmitGetResponse = (e) => {
        e.preventDefault();

        if (!isEmptyPromptUsuario || isLoading) return;

        const newUserMessage = {
            user: 'Tú',
            message: promptUsuario
        };
        setObtenerRespuesta(true);
        setMessages(prevMessages => [...prevMessages, newUserMessage]);
    };

    const validatePromptUser = (value) => {
        return value.length > 0 && value.trim() !== '';
    };

    const handleInputPromptUser = (e) => {
        const value = e.target.value;
        setPromptUsuario(value);
        setIsEmptyPromptUsuario(validatePromptUser(value));
        if (textareaChatRef.current.scrollHeight > 60) {
            textareaChatRef.current.style.height = 'auto';
            textareaChatRef.current.style.height = `${textareaChatRef.current.scrollHeight}px`;
        }
    };

    const handleCopiarMensajeIA = useCallback((textoIA) => {
        var elementoTemporal = document.createElement("textarea");
        elementoTemporal.value = textoIA;
        document.body.appendChild(elementoTemporal);
        elementoTemporal.select();
        document.execCommand("copy");
        document.body.removeChild(elementoTemporal);

        const enabledCopied = messages.map((message) => {
            if (!message.isCopied && message.message === textoIA) {
                return { ...message, isCopied: true };
            }
            return message;
        });

        setMessages(enabledCopied);
    }, [messages]);

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
    };
};