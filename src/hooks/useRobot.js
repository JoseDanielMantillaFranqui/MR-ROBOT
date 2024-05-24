import { useState, useEffect, useRef, useMemo, useCallback } from "react";

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

    useEffect(() => {
        if (!obtenerRespuesta) return;

        const obtenerResultado = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('https://api.deepinfra.com/v1/openai/chat/completions', {
                    method: 'POST',
                    body: JSON.stringify({
                        model: "meta-llama/Llama-2-70b-chat-hf",
                        messages: [{ role: "user", content: promptUsuario }],
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${apiAuthorization}`,
                    },
                });
                const data = await response.json();
                setRespuesta(data.choices[0].message.content);
            } catch (error) {
                console.error("Error fetching response:", error);
            } finally {
                setIsLoading(false);
            }
        };

        obtenerResultado();
    }, [obtenerRespuesta]);

    useEffect(() => {
        if (!obtenerRespuesta) return;

        const newIAMessage = {
            user: 'MR. ROBOT',
            message: respuesta,
            isCopied: false
        };
        setObtenerRespuesta(false);
        setMessages(prevMessages => [...prevMessages, newIAMessage]);
        setPromptUsuario('');
        setIsLoading(false);
        setIsEmptyPromptUsuario(false);

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