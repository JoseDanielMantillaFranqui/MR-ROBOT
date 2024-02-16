import styled from "styled-components";

const StyledFooter = styled.footer`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 0;
    border-top: 2px solid white;
    background-color: black;
`

const LinkPortafolio = styled.a`
    width: 70%;
    display: grid;
    place-items: center;
`

const LogoFooter = styled.img`
    width: 90%;
    border-radius: 30px;
    box-shadow: 0 0 20px #ffffff3d;

    @media screen and (min-width: 901px) and (max-width:1600px) {
        width: 30%;
    }
`

const Footer = () => {
    return <StyledFooter>
        <LinkPortafolio href="https://josedanielmantillafranqui.github.io/PORTAFOLIO/">
          <LogoFooter src='logo-footer.jpeg' alt="Logo de Daniel Franqui" />
        </LinkPortafolio>
    </StyledFooter>
}

export default Footer