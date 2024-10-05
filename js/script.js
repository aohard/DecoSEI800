function magnify(imgID) {
    let img;
    img = document.getElementById(imgID);

    // Eventos para mover el mouse
    img.addEventListener("mousemove", moveDescription);
    img.addEventListener("touchmove", moveDescription);

    function moveDescription(e) {
        let pos, x, y;
        e.preventDefault();

        // Obtener la posición del puntero dentro de la imagen
        pos = getCursorPos(e);

        // Obtener la posición del cursor en la ventana
        x = e.clientX;
        y = e.clientY;

        // Mostrar la descripción correspondiente
        showDescription(pos.x / img.width, pos.y / img.height, x, y); // Pasar las coordenadas del mouse y el tamaño relativo
    }

    function getCursorPos(e) {
        let a, x = 0, y = 0;
        e = e || window.event;
        a = img.getBoundingClientRect();
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        return { x: x, y: y };
    }

    // Mostrar la descripción basada en la posición
    function showDescription(xPercent, yPercent, mouseX, mouseY) {
        // Ocultar todas las descripciones
        const descriptions = document.querySelectorAll('.description');
        descriptions.forEach(desc => desc.style.display = 'none');

        let description;
        // Determinar cuál descripción mostrar
        if (xPercent > 0 && xPercent < 1 && yPercent > 0 && yPercent < 0.30) {
            description = document.getElementById("description1");
        } else if (xPercent > 0 && xPercent < 0.2 && yPercent > 0.33 && yPercent < 0.7) {
            description = document.getElementById("description2");
        } else if (xPercent > 0.8 && xPercent < 1 && yPercent > 0.33 && yPercent < 0.7) {
            description = document.getElementById("description3");
        } else if (xPercent > 0 && xPercent < 1 && yPercent > 0.8 && yPercent < 1) {
            description = document.getElementById("description4");
        }

        if (description) {
            description.style.display = 'block';
            // Posicionar la descripción cerca del mouse
            description.style.position = 'absolute';
            description.style.left = (mouseX + 15) + 'px'; // Mover ligeramente a la derecha del cursor
            description.style.top = (mouseY - 10) + 'px';  // Mover ligeramente arriba del cursor
        }
    }
}

magnify("imagen");
