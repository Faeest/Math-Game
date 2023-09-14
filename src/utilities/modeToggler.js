export default function modeToggler() {
    localStorage.theme = document.documentElement.classList.toggle("dark") ? "dark" : "light";
}
