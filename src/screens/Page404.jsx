import styled from "styled-components";

const ContenedorPrincipal = styled.main`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url(https://cdn3.whatculture.com/images/2015/08/gFYGKzCe.gif);
    gap:2rem;
    padding: 1rem;
`

const TituloPrincipal = styled.h1`
    color: #E5E5E5;
    font-size: 5rem;
    font-weight: 400;
    text-align: center;
    font-family: "MR_ROBOT", sans-serif;
    padding: 1rem;
    background-color:#ffffff29;
    border-radius: 50px;

`

const Enunciado = styled.p`
    color: #E5E5E5;
    text-align: center;
    font-size: 2rem;
    font-weight: 400;
    font-family: "MR_ROBOT", sans-serif;
    padding: 0.8rem;
    background-color:#ffffff29;
    border-radius: 50px;
`

const Page404 = () => {
   return <ContenedorPrincipal>
        <TituloPrincipal>ERROR 404</TituloPrincipal>
        <Enunciado>Recurso no encontrado</Enunciado>
    </ContenedorPrincipal>
}

export default Page404