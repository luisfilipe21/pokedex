
export const handledarkMode = () => {
    const html = document.querySelector('html');
    const button = document.querySelector('button');
    const icon = document.querySelector('.btn__icon');

    const pageTheme = localStorage.getItem('@pokedex:theme');

    if(pageTheme){
        html.classList.add('dark');
        icon.classList.add('fa-sun');
        icon.classList.add('fa-solid');
        
        icon.classList.remove('fa-moon');
    }

    button.addEventListener('click', () => {
        html.classList.toggle('dark');

        if (icon.classList.contains('fa-moon')) {
            icon.classList.remove('fa-moon');
            icon.classList.remove('fa-regular');

            icon.classList.add('fa-sun');
            icon.classList.add('fa-solid');
        } else {
            icon.classList.add('fa-moon');
            icon.classList.add('fa-regular');

            icon.classList.remove('fa-sun');
            icon.classList.remove('fa-solid');
        }

        html.classList.contains('dark') ? localStorage.setItem('@pokedex:theme', 'dark') : localStorage.removeItem("@pokedex:theme");
    })
}
