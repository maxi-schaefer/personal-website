export default function changeTheme() {
    const main = document.body
    if(main.classList.contains('light')) {
        window.localStorage.setItem('Theme', '')
        main.classList.remove('light')
    } else {
        window.localStorage.setItem('Theme', 'light')
        main.classList.add('light')
    }
} 