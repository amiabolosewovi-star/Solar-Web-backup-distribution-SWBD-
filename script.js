// SWBD - Solar Web Backup Distribution

document.addEventListener("DOMContentLoaded", () => {

    console.log("SWBD lancé avec succès");

    // ==========================
    // Navigation entre pages
    // ==========================
    window.showPage = function(pageId) {

        const pages = document.querySelectorAll(".page");

        pages.forEach(page => {
            page.classList.remove("active");
        });

        const selectedPage = document.getElementById(pageId);

        if (selectedPage) {
            selectedPage.classList.add("active");
        }

    };

    // ==========================
    // Redistribution énergie
    // ==========================
    const transferButton =
        document.querySelector(".transfer-btn");

    if (transferButton) {

        transferButton.addEventListener("click", () => {

            alert(
                "✅ Redistribution effectuée !\n\n" +
                "Maison A ➜ Maison B : 3 kWh\n" +
                "Maison D ➜ Maison C : 2 kWh"
            );

        });

    }

    // ==========================
    // Gestion domotique
    // ==========================
    const rooms =
        document.querySelectorAll(".room");

    rooms.forEach(room => {

        room.addEventListener("click", () => {

            const roomName =
                room.innerText
                    .replace("ON", "")
                    .replace("OFF", "")
                    .trim();

            if (room.classList.contains("on")) {

                room.classList.remove("on");
                room.classList.add("off");

                room.innerHTML =
                    `OFF<br>${roomName}`;

            } else {

                room.classList.remove("off");
                room.classList.add("on");

                room.innerHTML =
                    `ON<br>${roomName}`;

            }

        });

    });

    // ==========================
    // Batterie globale dynamique
    // ==========================
    const batteryDisplay =
        document.querySelector(".global-battery");

    let batteryLevel = 90;

    if (batteryDisplay) {

        setInterval(() => {

            batteryLevel--;

            if (batteryLevel < 50) {
                batteryLevel = 90;
            }

            batteryDisplay.textContent =
                batteryLevel + "%";

        }, 5000);

    }

    // ==========================
    // Revenus dynamiques
    // ==========================
    const totalRevenue =
        document.querySelector(".revenus h2");

    let revenue = 62625;

    if (totalRevenue) {

        setInterval(() => {

            revenue += 25;

            totalRevenue.textContent =
                "Total acquis : " +
                revenue.toLocaleString() +
                " FCFA";

        }, 3000);

    }

});