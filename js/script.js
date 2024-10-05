function magnify(imgID, zoom) {
    let img, glass, w, h;
    img = document.getElementById(imgID);

    // Crear el elemento de lupa
    glass = document.createElement("DIV");
    glass.setAttribute("class", "img-magnifier-glass");

    img.parentElement.insertBefore(glass, img);

    // Función para actualizar el tamaño del fondo de la lupa cuando cambie la imagen
    function updateMagnifier() {
        glass.style.backgroundImage = "url('" + img.src + "')";
        glass.style.backgroundRepeat = "no-repeat";
        glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
        w = glass.offsetWidth / 2;
        h = glass.offsetHeight / 2;
    }

    updateMagnifier(); // Inicializa el tamaño de la lupa
    window.addEventListener('resize', updateMagnifier); // Recalcular el tamaño cuando la ventana cambie

    // Eventos para mover la lupa
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);

    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);

    function moveMagnifier(e) {
        let pos, x, y;
        e.preventDefault();

        // Obtener la posición del puntero dentro de la imagen
        pos = getCursorPos(e);

        // Ajustar el zoom de la imagen en la lupa
        glass.style.backgroundPosition = "-" + ((pos.x * zoom) - w) + "px -" + ((pos.y * zoom) - h) + "px";

        // Obtener la posición del cursor en la ventana
        x = e.clientX;
        y = e.clientY;

        // Posicionar la lupa siempre al lado del puntero, ajustando en función del tamaño del viewport
        glass.style.left = (x + 15) + "px";  // Lupa ligeramente a la derecha del cursor
        glass.style.top = (y - h) + "px";    // Lupa centrada verticalmente respecto al cursor

        // Mostrar la descripción correcta
        showDescription(pos.x / img.width, pos.y / img.height); // Pasar las coordenadas como porcentaje
    }

    function getCursorPos(e) {
        let a, x = 0, y = 0;
        e = e || window.event;
        a = img.getBoundingClientRect();
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        return { x: x, y: y };
    }

    // Mostrar la descripción correcta basada en la posición porcentual
    function showDescription(xPercent, yPercent) {
        // Ocultar todas las descripciones
        const descriptions = document.querySelectorAll('.description');
        descriptions.forEach(desc => desc.style.display = 'none');

        // Mostrar la descripción correspondiente usando porcentajes
        if (xPercent > 0 && xPercent < 0.5 && yPercent > 0 && yPercent < 0.33) {
            document.getElementById("description1").style.display = "block";
        } else if (xPercent > 0 && xPercent < 0.2 && yPercent > 0.33 && yPercent < 0.66) {
            document.getElementById("description2").style.display = "block";
        } else if (xPercent > 0.83 && xPercent < 1 && yPercent > 0.33 && yPercent < 0.66) {
            document.getElementById("description3").style.display = "block";
        } else if (xPercent > 0 && xPercent < 1 && yPercent > 0.66 && yPercent < 1) {
            document.getElementById("description4").style.display = "block";
        }
    }
}

magnify("imagen", 2);
