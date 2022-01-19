import styled from "styled-components";

export const LoadingStyle = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
`;

export const Title = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    margin: 5vh;
    color: white;
`;

export const Logo = styled.img`
    float: left;
    height: calc(25px + 2vmin);
    padding-right: 1vw;
`;

export const TableTitle = styled.h4`
    text-align: left;
    margin: 5vh 0 2vh 0;
`;

export const TableStyle = styled.div`
    align-content: center;
    width: 70vw;
    max-width: 870px;
`;