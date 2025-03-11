import React from "react";
import ReactMarkdown from "react-markdown";
import '../App.css';
import CodigoResaltado from "../components/CodigoResaltado";

const FormattedMessage = ({ message }) => {
    return <div className='textoFormateado'>
    <ReactMarkdown components={{
        code: CodigoResaltado,
        }}>
        {message}
    </ReactMarkdown>
    </div>
};

export default FormattedMessage;