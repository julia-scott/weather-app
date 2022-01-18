import React from "react";
import { Card } from 'react-bootstrap';

type CardProps = {
    date: string,
    image: string,
    temp: number,
    desc: string
};

export default function CardComponent({ date, image, temp, desc }: CardProps) {
    return (
        <>
            <Card className="dateCard" border="dark" style={{ width: '18rem' }}>
                <Card.Header>{date}</Card.Header>
                <Card.Body>
                    <img src={`https://openweathermap.org/img/wn/${image}@2x.png`} alt="weather"/>
                    <Card.Title>
                        {Math.round(temp)}&deg;C
                    </Card.Title>
                </Card.Body>
                <Card.Footer className="text-muted">{desc}</Card.Footer>
            </Card>
        </>
    );
}