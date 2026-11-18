// Espera o HTML carregar completamente
document.addEventListener("DOMContentLoaded", () => {

    // 1) Efeito de digitação
    const frases = [
        "Bem-vinda ao meu cantinho.",
        "Aprendendo um pouquinho a cada dia.",
        "Tecnologia, fotos e muita música." 
    ];
    const alvo = document.getElementById("digitando");
    let frase = 0;
    let letra = 0;
    let apagando = false;

    function digitar() {
        if (!alvo) return;
        alvo.textContent = frases[frase].slice(0, letra);
        if (!apagando && letra < frases[frase].length) {
            letra++;
            setTimeout(digitar, 70);
        } else if (!apagando) {
            apagando = true;
            setTimeout(digitar, 1500);
        } else if (letra > 0) {
            letra--;
            setTimeout(digitar, 35);
        } else {
            apagando = false;
            frase = (frase + 1) % frases.length;
            setTimeout(digitar, 400);
        }
    }
    digitar();

    // 2) Animação das seções ao rolar a página
    const observador = new IntersectionObserver((itens) => {
        itens.forEach(item => {
            if (item.isIntersecting) {
                item.target.classList.add("visivel");
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".animar").forEach(el => observador.observe(el));

    // 3) Barra de progresso no topo
    const barra = document.getElementById("barra");
    window.addEventListener("scroll", () => {
        if (!barra) return;
        const total = document.documentElement.scrollHeight - window.innerHeight;
        barra.style.width = (window.scrollY / total * 100) + "%";
    });

});

// 4) Clicar numa foto da galeria abre ela em tamanho grande
const lightbox = document.getElementById("lightbox");
const fotoGrande = lightbox.querySelector("img");

document.querySelectorAll(".galeria img").forEach(foto => {
    foto.addEventListener("click", () => {
        fotoGrande.src = foto.src;
        fotoGrande.alt = foto.alt;
        lightbox.classList.add("aberto");
    });
});

// clicar em qualquer lugar da tela escura (ou apertar Esc) fecha a foto
lightbox.addEventListener("click", () => lightbox.classList.remove("aberto"));
document.addEventListener("keydown", e => {
    if (e.key === "Escape") lightbox.classList.remove("aberto");
});