import styled from "styled-components";

const ContenedorPrincipal = styled.main`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url(https://cdn3.whatculture.com/images/2015/08/gFYGKzCe.gif);
    background-color: #380101;
    background-blend-mode: overlay;
    gap:2rem;
    padding: 1rem;
`

const TituloPrincipal = styled.h1`
    color: #ff7676;
    font-size: 5rem;
    font-weight: 600;
    text-align: center;
    font-family: "Orbitron", serif;
    padding: 1rem;
    background-color:#d50a0a29;
    text-shadow: 0 0 7px #ff0000;
    border-radius: 50px;
    backdrop-filter: blur(3px);
`

const Enunciado = styled.p`
    color: #ff7676;
    text-align: center;
    font-size: 2rem;
    font-weight: 500;
    font-family: "Orbitron", serif;
    padding: 0.8rem;
    background-color:#d50a0a29;
    text-shadow: 0 0 7px #ff0000;
    border-radius: 50px;
    backdrop-filter: blur(3px);
`

const Page404 = () => {
   return <ContenedorPrincipal>
        <TituloPrincipal>ERROR 404</TituloPrincipal>
        <Enunciado>Recurso no encontrado</Enunciado>
    </ContenedorPrincipal>
}

export default Page404