import React from "react";

const formatBold = (text) => {
    // Separa el texto por el patrón **...**
    return text.split(/(\*\*.*?\*\*)/g).map((part, idx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            // Se quitan los dobles asteriscos y se eliminan los asteriscos simples restantes dentro
            const inner = part.slice(2, -2).replace(/\*/g, "");
            return (
                <strong key={idx}>
                    {inner}
                </strong>
            );
        }
        // Eliminar los asteriscos simples restantes
        return part.replace(/\*/g, "");
    });
};

const FormattedMessage = ({ message }) => {
    return message.split("\n").map((line, index) => {
        // Si la línea empieza con un asterisco se interpreta como línea de lista
        if (line.startsWith("*")) {
            // Se elimina el asterisco y los espacios iniciales
            const lineWithoutBullet = line.replace(/^\*\s*/, "");
            return (
                <React.Fragment key={index}>
                    
                    {formatBold(lineWithoutBullet)}
                </React.Fragment>
            );
        } else {
            return <p key={index}>{formatBold(line)}</p>;
        }
    });
};

export default FormattedMessage;