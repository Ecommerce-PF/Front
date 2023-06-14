import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

export function NoTransitionExample(props) {

    return (
        <Carousel >
            {props.coloresPrt.map((e) => {
                console.log(e)
                return (
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={e}
                            alt="First slide"
                        />
                        {/* <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                  </Carousel.Caption> */}
                    </Carousel.Item>
                )
            })}
        </Carousel>
    );
}
