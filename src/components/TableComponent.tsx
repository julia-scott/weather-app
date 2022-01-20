import React from "react";
import { TableTitle, TableStyle } from "./../styles/StyledComponents";

type TableProps = {
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
        timeZone: 'UTC'
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
            <TableTitle>{day}</TableTitle>
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
