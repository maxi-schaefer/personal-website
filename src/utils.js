import { toast } from 'react-toastify'
import { TbMail } from 'react-icons/tb'
import "./toastify.css"

export function setDarkMode() {
    localStorage.setItem("selectedTheme", "dark")
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
    var today = new Date()
    const start = Date.parse(`01 Dec ${today.getFullYear()} 00:00:00 GMT`);
    const end = Date.now();
    const d = Date.parse(`31 Dec ${today.getFullYear()} 00:00:00 GMT`);

    return d >= start && d <= end // true
}

export function EmailToastify(text) {
    toast.success(text, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        icon: ({}) => <TbMail color='var(--primary)' />,
        progress: undefined,
        theme: `${localStorage.getItem("selectedTheme")}`,
    });
}

export function CustomToastify(text, icon) {
    toast.info(text, {
        position: "top-right",
        autoClose: false,
        closeOnClick: true,
        draggable: true,
        icon: ({}) => icon,
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
