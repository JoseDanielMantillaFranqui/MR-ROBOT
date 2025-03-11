import React from "react";
import ReactMarkdown from "react-markdown";
import '../App.css';

const FormattedMessage = ({ message }) => {
    return <div className='textoFormateado'>
        <ReactMarkdown>
        {message}
    </ReactMarkdown>
    </div>
};

export default FormattedMessage;