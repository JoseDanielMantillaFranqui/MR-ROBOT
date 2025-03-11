import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'; 

const CodigoResaltado = ({ node, ...props }) => {
    const lenguaje = props.className ? props.className.replace('language-', '') : null;
    return (
      <SyntaxHighlighter style={dracula} language={lenguaje} {...props} />
    );
};

export default CodigoResaltado;