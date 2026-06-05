// 1. Initialisation de la Map Leaflet configurée sur la topologie de Lomé
const map = L.map('map', { zoomControl: false }).setView([6.1650, 1.2250], 13);

// Utilisation du fond de carte minimaliste clair CartoDB Positron
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap &copy; CARTO'
}).addTo(map);

L.control.zoom({ position: 'topright' }).addTo(map);

// Couches d'affichage Leaflet dédiées
const networkLayerGroup = L.layerGroup().addTo(map);
const animationLayerGroup = L.layerGroup().addTo(map);
let selectedSourceId = '';
let selectedTargetId = '';

// 2. Base de données : 74 Stations interconnectées réparties dans Lomé (Quartiers clés et extensions)
const stationsDataset = [
    { id: "ST_KOD", name: "Hub Kodjoviakopé", location: "Kodjoviakopé", lat: 6.1210, lon: 1.2050 },
    { id: "ST_GMR", name: "Station Grand Marché", location: "Grand Marché", lat: 6.1242, lon: 1.2274 },
    { id: "ST_BEB", name: "Relais Bè Bassin", location: "Bè Bassin", lat: 6.1350, lon: 1.2380 },
    { id: "ST_TOK", name: "Station Tokoin Central", location: "Tokoin Central", lat: 6.1480, lon: 1.2180 },
    { id: "ST_HED", name: "Hub Hédzranawoé", location: "Hédzranawoé", lat: 6.1620, lon: 1.2400 },
    { id: "ST_KEG", name: "Station Kégué Complexe", location: "Kégué", lat: 6.1750, lon: 1.2550 },
    { id: "ST_AGO", name: "Relais Agoè Assiyéye", location: "Agoè Assiyéye", lat: 6.2050, lon: 1.2080 },
    { id: "ST_ADI", name: "Station Adidogomé", location: "Adidogomé", lat: 6.1700, lon: 1.1700 },
    { id: "ST_AVE", name: "Relais Avédji Carrefour", location: "Avédji", lat: 6.1880, lon: 1.1870 },
    { id: "ST_AER", name: "Hub Aéroport International", location: "Aéroport", lat: 6.1660, lon: 1.2610 },
    { id: "ST_DJI", name: "Relais Djidjolé", location: "Djidjolé", lat: 6.1600, lon: 1.1950 },
    { id: "ST_TOT", name: "Station Totsi Fontaine", location: "Totsi", lat: 6.1780, lon: 1.1920 },
    { id: "ST_MEN", name: "Relais Menwonouvo", location: "Menwonouvo", lat: 6.1550, lon: 1.2100 },
    { id: "ST_ZOE", name: "Station Zoé Industrial", location: "Zoé Industrial", lat: 6.1900, lon: 1.2300 },
    { id: "ST_GLA", name: "Hub Glanou Central", location: "Glanou", lat: 6.1400, lon: 1.1950 },
    { id: "ST_BEL", name: "Relais Bélèkpè", location: "Bélèkpè", lat: 6.2100, lon: 1.2200 },
    { id: "ST_WIY", name: "Station Wiyi Commerce", location: "Wiyi", lat: 6.1300, lon: 1.2450 },
    { id: "ST_KOL", name: "Hub Kolokopé Technopole", location: "Kolokopé", lat: 6.1650, lon: 1.1800 },
    { id: "ST_PEL", name: "Relais Pelipeli", location: "Pelipeli", lat: 6.1800, lon: 1.2000 },
    { id: "ST_NUN", name: "Station Nyunuvé Quartier", location: "Nyunuvé", lat: 6.1450, lon: 1.2600 },
    { id: "ST_AKO", name: "Relais Akodessèwè", location: "Akodessèwè", lat: 6.2000, lon: 1.1900 },
    { id: "ST_YEC", name: "Hub Yéchakpa Est", location: "Yéchakpa", lat: 6.1550, lon: 1.1750 },
    { id: "ST_KAO", name: "Station Kaolè Suburb", location: "Kaolè", lat: 6.1900, lon: 1.1650 }
];

function nombreAleatoire(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genererStationsSupplementaires(count) {
    for (let i = 1; i <= count; i++) {
        const lat = 6.1200 + Math.random() * 0.1050;
        const lon = 1.1650 + Math.random() * 0.0950;
        stationsDataset.push({
            id: `ST_EXT${String(i).padStart(2, '0')}`,
            name: `Station Extra ${i}`,
            location: `Quartier Extra ${i}`,
            lat,
            lon
        });
    }
}

function peuplerHabitations() {
    stationsDataset.forEach(station => {
        const nbMaisons = nombreAleatoire(2, 5);
        station.houses = [];
        for (let i = 0; i < nbMaisons; i++) {
            const latOffset = (Math.random() - 0.5) * 0.012;
            const lonOffset = (Math.random() - 0.5) * 0.012;
            station.houses.push({
                lat: station.lat + latOffset,
                lon: station.lon + lonOffset
            });
        }
    });
}

function initialiserChargesAleatoires() {
    stationsDataset.forEach(station => {
        let load = nombreAleatoire(-220, 220);
        if (load === 0) {
            load = nombreAleatoire(20, 120) * (Math.random() > 0.5 ? 1 : -1);
        }
        station.load = load;
    });

    const hasPos = stationsDataset.some(s => s.load > 0);
    const hasNeg = stationsDataset.some(s => s.load < 0);
    if (!hasPos) {
        stationsDataset[0].load = nombreAleatoire(60, 220);
    }
    if (!hasNeg) {
        stationsDataset[1].load = -nombreAleatoire(60, 220);
    }
}

function choisirStation(id, type) {
    if (type === 'source') {
        selectedSourceId = id;
    } else if (type === 'target') {
        selectedTargetId = id;
    }
    const sourceSelect = document.getElementById('source-station');
    const targetSelect = document.getElementById('target-station');
    if (sourceSelect) sourceSelect.value = selectedSourceId;
    if (targetSelect) targetSelect.value = selectedTargetId;
    rafraichirSysteme();
}

genererStationsSupplementaires(50);
initialiserChargesAleatoires();
peuplerHabitations();

function mettreAJourChargesDynamiques() {
    stationsDataset.forEach(station => {
        const variation = nombreAleatoire(-30, 30);
        station.load += variation;
        station.load = Math.max(-220, Math.min(220, station.load));
        if (station.load === 0) {
            station.load = nombreAleatoire(10, 120) * (Math.random() > 0.5 ? 1 : -1);
        }
    });

    const hasPos = stationsDataset.some(s => s.load > 0);
    const hasNeg = stationsDataset.some(s => s.load < 0);
    if (!hasPos) {
        stationsDataset[0].load = nombreAleatoire(60, 220);
    }
    if (!hasNeg) {
        stationsDataset[1].load = -nombreAleatoire(60, 220);
    }
}

// 3. Tracer le câble d'interconnexion principal (Dorsale Haute Tension)
function dessinerDorsaleHT() {
    const chemins = stationsDataset.map(s => [s.lat, s.lon]);
    // Fermeture de la boucle réseau interconnectée
    chemins.push(chemins[0]); 

    L.polyline(chemins, {
        color: '#cbd5e1',
        weight: 3,
        opacity: 0.7,
        lineJoin: 'round'
    }).addTo(networkLayerGroup);
}

// 4. Moteur de rendu de l'interface et calculs comptables cohérents
function rafraichirSysteme() {
    networkLayerGroup.clearLayers();
    dessinerDorsaleHT();

    const domListe = document.getElementById('stations-list');
    const selectSource = document.getElementById('source-station');
    const selectCible = document.getElementById('target-station');

    // Sauvegarde des sélections courantes pour l'UX
    const archiveSource = selectedSourceId || selectSource.value;
    const archiveCible = selectedTargetId || selectCible.value;

    domListe.innerHTML = "";
    selectSource.innerHTML = "<option value=''>Choisir une source...</option>";
    selectCible.innerHTML = "<option value=''>Choisir une cible...</option>";

    let cumulSurplus = 0;
    let cumulDeficit = 0;

    stationsDataset.forEach(station => {
        let classeEtat = "equilibre";
        let libelleEtat = "ÉQUILIBRÉ";
        let codeCouleur = "#64748b"; // Gris

        if (station.load > 0) {
            classeEtat = "surplus";
            libelleEtat = "SURPLUS";
            codeCouleur = "#10b981"; // Vert
            cumulSurplus += station.load;
        } else if (station.load < 0) {
            classeEtat = "manque";
            libelleEtat = "DEFICIT";
            codeCouleur = "#ef4444"; // Rouge
            cumulDeficit += Math.abs(station.load);
        }

        // A. CARTOGRAPHIE : Noeuds Stations
        const marqueurStation = L.circleMarker([station.lat, station.lon], {
            radius: classeEtat === "equilibre" ? 6 : 10,
            fillColor: codeCouleur,
            color: '#ffffff',
            weight: 2,
            fillOpacity: 0.95
        }).addTo(networkLayerGroup);

        marqueurStation.bindPopup(`<b>${station.name}</b><br>Localisation: ${station.location || ''}<br>Statut: ${libelleEtat}<br>Solde Énergétique: ${station.load > 0 ? '+' : ''}${station.load} kWh<br><small>Cliquez pour sélectionner cette station comme ${station.load > 0 ? 'source' : station.load < 0 ? 'cible' : 'station neutre'}.</small>`);
        marqueurStation.on('click', () => {
            if (station.load > 0) {
                choisirStation(station.id, 'source');
            } else if (station.load < 0) {
                choisirStation(station.id, 'target');
            }
        });

        // B. CARTOGRAPHIE : Abonnés / Maisons connectées en Basse Tension (Dashed)
        station.houses.forEach(house => {
            L.circleMarker([house.lat, house.lon], {
                radius: 3.5,
                fillColor: '#71717a',
                color: '#ffffff',
                weight: 1,
                fillOpacity: 0.8
            }).addTo(networkLayerGroup);

            L.polyline([[station.lat, station.lon], [house.lat, house.lon]], {
                color: codeCouleur,
                weight: 1.5,
                opacity: 0.4,
                dashArray: '4, 4'
            }).addTo(networkLayerGroup);
        });

        // C. INTERFACE SIDEBAR : Éléments HTML
        const blocStation = document.createElement('div');
        blocStation.className = 'station-item';
        if (station.id === selectedSourceId) blocStation.classList.add('selected-source');
        if (station.id === selectedTargetId) blocStation.classList.add('selected-target');
        blocStation.title = station.load > 0 ? 'Cliquez pour sélectionner cette station comme source' : station.load < 0 ? 'Cliquez pour sélectionner cette station comme cible' : 'Station équilibrée';
        blocStation.onclick = () => {
            map.setView([station.lat, station.lon], 15);
            if (station.load > 0) {
                choisirStation(station.id, 'source');
            } else if (station.load < 0) {
                choisirStation(station.id, 'target');
            }
        };
        blocStation.innerHTML = `
            <div class="station-header">
                <span>${station.name}</span>
                <span class="badge ${classeEtat}">${libelleEtat}</span>
            </div>
            <div class="station-details">
                Localisation : <b>${station.location || ''}</b><br>
                Bilan actuel : <b style="color:${codeCouleur}">${station.load > 0 ? '+' : ''}${station.load} kWh</b> | ${station.houses.length} Habitations rattachées
            </div>
        `;
        domListe.appendChild(blocStation);

        // D. OPTIONS FORMULAIRE DÉROULANT
        if (station.load > 0) {
            const option = document.createElement('option');
            option.value = station.id;
            option.textContent = `${station.name} (+${station.load} kWh)`;
            selectSource.appendChild(option);
        } else if (station.load < 0) {
            const option = document.createElement('option');
            option.value = station.id;
            option.textContent = `${station.name} (${station.load} kWh)`;
            selectCible.appendChild(option);
        }
    });

    // Restauration des sélections si toujours valides après mise à jour
    if (archiveSource && Array.from(selectSource.options).some(o => o.value === archiveSource)) selectSource.value = archiveSource;
    if (archiveCible && Array.from(selectCible.options).some(o => o.value === archiveCible)) selectCible.value = archiveCible;
    selectedSourceId = selectSource.value;
    selectedTargetId = selectCible.value;

    // Actualisation du bandeau de contrôle analytique
    document.getElementById('global-surplus').textContent = `+${cumulSurplus} kWh`;
    document.getElementById('global-deficit').textContent = `-${cumulDeficit} kWh`;

    // Désactivation automatique si réseau parfait
    const declencheurBtn = document.getElementById('action-btn');
    if (cumulSurplus === 0 || cumulDeficit === 0) {
        declencheurBtn.disabled = true;
        declencheurBtn.textContent = "Grille Équilibrée";
    } else {
        declencheurBtn.disabled = false;
        declencheurBtn.textContent = "Initier la redistribution";
    }
}

// 5. Algorithme de transfert d'énergie avec animation de charge
function executerTransfert() {
    const idSource = document.getElementById('source-station').value;
    const idCible = document.getElementById('target-station').value;

    if (!idSource || !idCible) return;

    const stationSource = stationsDataset.find(s => s.id === idSource);
    const stationCible = stationsDataset.find(s => s.id === idCible);

    // Calcul mathématique exact et logique de transfert cohérente
    const besoinCible = Math.abs(stationCible.load);
    const quotaDisponible = stationSource.load;
    const fluxTransfere = Math.min(besoinCible, quotaDisponible);

    // Déploiement visuel du câble électrique de transfert
    const ligneFluxElectrique = L.polyline([[stationSource.lat, stationSource.lon], [stationCible.lat, stationCible.lon]], {
        color: '#2563eb',
        weight: 4,
        className: 'cable-pulse-flow' // Classe CSS animée
    }).addTo(animationLayerGroup);

    // Focus caméra fluide sur le vecteur de routage
    const limitesVecteur = L.latLngBounds([stationSource.lat, stationSource.lon], [stationCible.lat, stationCible.lon]);
    map.fitBounds(limitesVecteur, { padding: [60, 60], maxZoom: 14 });

    // Verrouillage de l'UI pendant l'acheminement des charges
    const boutonAction = document.getElementById('action-btn');
    boutonAction.disabled = true;
    boutonAction.textContent = `Acheminement de ${fluxTransfere} kWh...`;

    // Équilibrage comptable après 1.8 seconde d'animation
    setTimeout(() => {
        stationSource.load -= fluxTransfere;
        stationCible.load += fluxTransfere;

        // Nettoyage de l'animation de transfert et rafraîchissement global
        animationLayerGroup.clearLayers();
        rafraichirSysteme();
    }, 1800);
}

function demarrerApplication() {
    rafraichirSysteme();

    const boutonAction = document.getElementById('action-btn');
    if (boutonAction) {
        boutonAction.addEventListener('click', executerTransfert);
    }

    const sourceSelect = document.getElementById('source-station');
    const targetSelect = document.getElementById('target-station');
    if (sourceSelect) {
        sourceSelect.addEventListener('change', () => {
            selectedSourceId = sourceSelect.value;
            rafraichirSysteme();
        });
    }
    if (targetSelect) {
        targetSelect.addEventListener('change', () => {
            selectedTargetId = targetSelect.value;
            rafraichirSysteme();
        });
    }

    setInterval(() => {
        mettreAJourChargesDynamiques();
        rafraichirSysteme();
    }, 7000);
}

// Démarrage de l'application
window.onload = demarrerApplication;