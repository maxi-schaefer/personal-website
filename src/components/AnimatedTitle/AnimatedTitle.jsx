import React, { useState } from 'react';
import { useEffect } from "react";

function AnimatedTitle({ text, time }) {
    const [title, setTitle] = useState(text);

    useEffect(() => {
        const interval = setInterval(() => {
            setTitle(prevTitle => {
                const newTitle = prevTitle.slice(1) + prevTitle[0];
                return newTitle;
            });
        }, time);

        document.title = title;

        return () => clearInterval(interval);
    }, [ title, text ]);

    return(<></>)
}

export default AnimatedTitle;