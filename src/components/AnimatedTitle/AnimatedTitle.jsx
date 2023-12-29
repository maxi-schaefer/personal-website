import React from 'react';
import { useEffect } from "react";

function AnimatedTitle(props) {
    useEffect(() => {
        const { titles, time } = props
        const updateTitle = () => {
            let index = 0;
            setInterval(() => {
                index %= titles.length-1
                index >= titles.length ? index=0 : index++;
                if (document.title !== titles[index]) {
                    document.title = titles[index];
                }
            }, time)
        }
    

        updateTitle();
    }, [])

    return(<></>)
}

export default AnimatedTitle;