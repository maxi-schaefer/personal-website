import { toast } from 'react-toastify'
import "./toastify.css"

export function setDarkMode() {
    localStorage.setItem("selectedTheme", "dark")
}

export function delay(ms) {
    new Promise(res => setTimeout(res, ms));
}

export function setLightMode() {
    localStorage.setItem("selectedTheme", "light")
} 

export function changeTheme() {
    if(localStorage.getItem("selectedTheme") === "light")
        setDarkMode();
    else
        setLightMode();

    document.body.setAttribute('data-theme', localStorage.getItem("selectedTheme"));
}

export function isChristmas() {
    var today = new Date();
    let d1 = new Date(today.getFullYear(), 12, 1);
    let d2 = new Date(today.getFullYear(), 12, 31);

    return d1 < today && d2 > today;
}

export function CustomToastify(text, icon) {
    toast.info(text, {
        position: "top-right",
        autoClose: false,
        closeOnClick: true,
        draggable: true,
        icon: ({i}) => icon,
        theme: `${localStorage.getItem("selectedTheme")}`,
    });
}

export function getLanguageColor(language) {
    const colors = [
        { 
            name: "python",
            color: "#2b84ff"
        },
        { 
            name: "javascript",
            color: "#f4ff2b"
        },
        { 
            name: "java",
            color: "#eb8634"
        },
    ]

    for(var i = 0; i < colors.length; i++) {
        if(colors.at(i).name === language)
            return colors.at(i).color
    }
    return "var(--primary)"
}
