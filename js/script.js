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
        pos = getCursorPos(e);
        x = pos.x;
        y = pos.y;

        // Restringir el área de la lupa dentro de la imagen
        if (x > img.width - (w / zoom)) { x = img.width - (w / zoom); }
        if (x < w / zoom) { x = w / zoom; }
        if (y > img.height - (h / zoom)) { y = img.height - (h / zoom); }
        if (y < h / zoom) { y = h / zoom; }

        // Posicionar la lupa directamente sobre el mouse
        glass.style.left = x + "px"; // La lupa sigue exactamente el cursor
        glass.style.top = y + "px";  // La lupa sigue exactamente el cursor

        // Ajustar el zoom de la imagen en la lupa
        glass.style.backgroundPosition = "-" + ((x * zoom) - w) + "px -" + ((y * zoom) - h) + "px";

        // Mostrar la descripción correcta
        showDescription(x / img.width, y / img.height); // Pasar las coordenadas como porcentaje
    }

    function getCursorPos(e) {
        let a, x = 0, y = 0;
        e = e || window.event;
        a = img.getBoundingClientRect();
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
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
