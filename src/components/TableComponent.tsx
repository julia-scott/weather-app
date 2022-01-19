import React from "react";
import styled from "styled-components";

const Title = styled.h4`
    text-align: left;
    margin: 5vh 0 2vh 0;
`;

const TableStyle = styled.div`
    align-content: center;
    width: 70vw;
    max-width: 870px;
`;

interface TableProps {
    day: string,
    myArray: {
        date: string,
        icon: string,
        max: number, 
        min: number
    }[]
}

export default function TableComponent({ day, myArray }: TableProps) {
    const date = new Date(day); // Selected date
    var formatedDate = date.toLocaleString('sv-SE', {
        day: '2-digit',
        year: 'numeric',
        month: '2-digit',
        timeZone: 'CET'
    });
    const newArray = myArray.filter(e => {
        // Filter array to include only the selected date
        return e.date.includes(formatedDate);
    }).map(e => {
        // Return only the hour, icon, max and min temps
        return { hour: e.date.split(" ")[1], icon: e.icon, max: e.max, min: e.min };
    });

    return (
        <>
            <Title>{day}</Title>
            <TableStyle>
                <div className="row">
                    {
                        newArray.map(e => {
                            return(
                                <div className="col">
                                    {e.hour}
                                    <img src={`https://openweathermap.org/img/wn/${e.icon}.png`} alt="weather"/>
                                    <p>
                                        <b>{e.max}&deg;C</b>
                                    </p>
                                    <p>
                                        {e.min}&deg;C
                                    </p>
                                </div>
                            );
                        })
                    }
                </div>
            </TableStyle>
        </>
    );
}
