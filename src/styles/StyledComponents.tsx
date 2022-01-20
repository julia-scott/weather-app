import styled from "styled-components";

export const AppStyle = styled.div`
    text-align: center;
    background-color: #87ceeb;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Title = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    margin: 4vh;
    h1 {
        color: white;
    }
`;

export const CityTitle = styled.div`
    display: flex;
    margin-top: 5vh;
    h4 {
        padding-right: 1vw;
        color: white;
    }
`;

export const Logo = styled.img`
    float: left;
    height: calc(25px + 2vmin);
    padding-right: 1vw;
`;

export const CarouselStyle = styled.div`
    align-content: center;
    max-width: 870px;
    cursor: pointer;
`;

export const TableTitle = styled.h4`
    text-align: left;
    margin: 5vh 0 2vh 0;
`;
