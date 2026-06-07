# Solar-Web-backup-distribution-SWBD-
SWBD (Solar Web Backup Distribution) est un réseau intelligent de partage d'énergie solaire reliant les maisons. Il redistribue les surplus d'électricité vers les foyers en manque afin de réduire les coupures, limiter le gaspillage énergétique et renforcer l'accès à une énergie propre.

╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   SWBD — Solar Web Backup Distribution                                       ║
║   Réseau intelligent de distribution d'énergie solaire pair-à-pair           ║
║   Lomé, République Togolaise                                                 ║
║   Version 1.0 — Juin 2026                                                    ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  TABLE DES MATIÈRES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  1. Description du projet
  2. Contexte et motivation
  3. Architecture du système
  4. Structure des fichiers
  5. Interfaces utilisateur
  6. Installation et démarrage
  7. Technologies utilisées
  8. Fonctionnalités clés
  9. Modèle économique
  10. Roadmap
  11. Équipe
  12. Licence et contact


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  1. DESCRIPTION DU PROJET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  SWBD (Solar Web Backup Distribution) est un réseau intelligent de partage
  d'énergie solaire reliant des maisons et micro-stations de redistribution.
  Il collecte les surplus d'électricité solaire produits par les foyers
  équipés de panneaux, et les redistribue automatiquement vers les foyers
  en manque — réduisant ainsi les coupures, limitant le gaspillage énergétique
  et renforçant l'accès à une énergie propre et abordable.

  Inspiré du protocole BitTorrent, chaque maison est un nœud du réseau :
    • Maison avec surplus  →  "seed"  (injecteur d'énergie)
    • Maison en déficit    →  "leech" (récepteur d'énergie)
    • Micro-station        →  "routeur" intelligent local
    • Station centrale     →  supervision globale du réseau

  Potentiel de réussite estimé : 8.5 / 10


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  2. CONTEXTE ET MOTIVATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Le Togo présente un contexte énergétique critique :

    [!] Délestages fréquents    2 à 6 heures de coupure par jour (CEET)
    [!] Prix élevé              120–150 FCFA/kWh sur le réseau national
    [!] Faible électrification  ~40% des zones rurales non électrifiées
    [+] Ensoleillement          4.5 à 5.5 kWh/m²/jour (parmi les meilleurs)
    [+] Mobile Money            Taux de pénétration >60% (Flooz, TMoney, Wave)
    [+] Culture tontine         Mentalité naturellement coopérative et P2P

  SWBD répond directement à ces trois problèmes en créant un réseau local
  autonome, indépendant de la CEET, où chaque kilowattheure produit localement
  est valorisé et partagé équitablement.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  3. ARCHITECTURE DU SYSTÈME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Le réseau SWBD est organisé en 3 couches physiques :

  ┌──────────────────────────────────────────────────────────────────────┐
  │  COUCHE 1 — MAISONS (nœuds)                                          │
  │                                                                      │
  │  Chaque maison est équipée de :                                      │
  │    • Panneau solaire (250W–500W)                                     │
  │    • Batterie locale (5–10 kWh)                                      │
  │    • Smart meter IoT bidirectionnel                                  │
  │    • Onduleur micro + régulateur MPPT                                │
  │    • Module LoRaWAN ou WiFi                                          │
  │                                                                      │
  │  Connexion aux stations : PARALLÈLE (tension constante 48V DC)       │
  └──────────────────────────────────────────────────────────────────────┘
                              │  câble DC 48V
                              ▼
  ┌──────────────────────────────────────────────────────────────────────┐
  │  COUCHE 2 — MICRO-STATIONS DE REDISTRIBUTION                         │
  │                                                                      │
  │  Rayon de couverture : 500m à 2 km par station                      │
  │  Capacité : 10 à 30 maisons en parallèle                            │
  │                                                                      │
  │  Équipements :                                                       │
  │    • Banque de batteries 20–50 kWh (LiFePO4)                        │
  │    • Onduleur central 10–30 kVA                                      │
  │    • Smart Distribution Board (relais par nœud)                     │
  │    • Module IoT LoRaWAN + 4G backup                                  │
  │    • Algorithme de routage SWBD Router                               │
  └──────────────────────────────────────────────────────────────────────┘
                              │  backbone inter-stations
                              ▼
  ┌──────────────────────────────────────────────────────────────────────┐
  │  COUCHE 3 — STATION CENTRALE PHYSIQUE                                │
  │                                                                      │
  │  Bâtiment physique au cœur du réseau. Fonctionne HORS LIGNE.        │
  │                                                                      │
  │  Équipements :                                                       │
  │    • Serveur local (edge computing)                                  │
  │    • Banque de batteries 100–200 kWh                                 │
  │    • Terminal Mobile Money (Flooz / TMoney / Wave)                   │
  │    • Dashboard administrateur tactile                                │
  │    • Connexion 4G/fibre (synchronisation optionnelle)                │
  └──────────────────────────────────────────────────────────────────────┘

  Algorithme de routage (priorités) :
    1. Alimentation locale (production > consommation locale)
    2. Stockage local (batterie locale < 80%)
    3. Transfert vers station déficitaire (balance > +20 kW)
    4. Stockage station centrale (toutes stations équilibrées)
    5. Alerte et action manuelle (déséquilibre non résolvable)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  4. STRUCTURE DES FICHIERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  SWBD/
  │
  ├── README.txt                   ← Ce fichier
  │
  ├── index.html                   ← App mobile prosumer (interface foyer)
  ├── script.js                    ← Logique app mobile (charts, nav, domotique)
  ├── style.css                    ← Styles app mobile (thème vert/glassmorphism)
  │
  └── admin-ui/                    ← Interface administrateur réseau
      ├── centre de control.html   ← Dashboard admin (carte Lomé temps réel)
      ├── script.js                ← Logique admin (Leaflet, stations, transferts)
      └── style.css                ← Styles admin (thème blanc minimaliste)
      


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  5. INTERFACES UTILISATEUR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ── 5.1  APP MOBILE PROSUMER (index.html) ──────────────────────────────

  Interface destinée à chaque foyer connecté au réseau SWBD.
  Design glassmorphism sur fond vert naturel, 4 pages :

    [Page 1 — Dashboard]
      • Météo et température en temps réel
      • Revenus générés par la vente de surplus
      • Graphique sparkline production/consommation
      • Niveau d'économie (jauge circulaire animée)
      • Niveau des batteries individuelles (4 barres verticales)
      • Batterie globale du foyer

    [Page 2 — Revenus]
      • Revenu journalier et mensuel prévu
      • Total des gains accumulés
      • Boutons : Acheter / Vendre / Retirer (Mobile Money)
      • Graphique production vs consommation (7 jours)
      • Courbes interactives avec tooltip au survol

    [Page 3 — Réseau SWBD]
      • Grille des 12 nœuds voisins avec niveau d'énergie (%)
      • Visualisation flux entre Maison A (surplus) et Maison B (déficit)
      • Bouton de redistribution manuelle avec animation
      • Graphique flux temps réel

    [Page 4 — Domotique]
      • Plan de maison interactif (4 pièces)
      • Toggle on/off par pièce au clic
      • Batterie globale de la maison
      • 3 modes : Économie maximale / Charge prioritaire / Performance


  ── 5.2  INTERFACE ADMINISTRATEUR (admin-ui/) ──────────────────────────

  Interface destinée à l'opérateur de la coopérative SWBD.
  Design minimaliste blanc professionnel, plein écran.

    [Sidebar gauche]
      • KPI globaux : Réserve totale / Déficit total (temps réel)
      • Liste scrollable de toutes les stations avec statut coloré
        - SURPLUS  (vert)  : énergie disponible à redistribuer
        - DEFICIT  (rouge) : énergie manquante à combler
        - ÉQUILIBRÉ (gris) : station stable
      • Formulaire de routage : sélection source → cible + bouton transfert

    [Carte principale — Lomé temps réel]
      • Fond CartoDB Positron (carte minimaliste claire)
      • 73 stations représentées sur la géographie réelle de Lomé
      • Maisons rattachées visibles en pointillés colorés
      • Liaison backbone inter-stations (câble HT)
      • Animation de flux électrique lors d'un transfert
      • Popups d'information au clic sur chaque station
      • Légende interactive en bas à droite

    [Interactions]
      • Clic sur station carte ou sidebar → sélection auto source/cible
      • Bouton "Initier la redistribution" → animation + rééquilibrage
      • Actualisation automatique des charges toutes les 7 secondes
      • Désactivation automatique si réseau équilibré


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  6. INSTALLATION ET DÉMARRAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Prérequis :
    • Navigateur web moderne (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
    • Connexion internet (pour charger Leaflet.js et les tuiles de carte)
    • Aucun serveur backend nécessaire pour le prototype (tout en front-end)

  Démarrage rapide :

    1. Cloner ou télécharger le projet
       git clone https://github.com/[org]/swbd.git
       cd swbd

    2. Ouvrir l'app prosumer (foyer)
       → Ouvrir index.html dans un navigateur

    3. Ouvrir l'interface administrateur
       → Ouvrir admin-ui/centre de control.html dans un navigateur

    4. (Optionnel) Serveur local pour éviter les restrictions CORS
       python -m http.server 8080
       → http://localhost:8080/
       → http://localhost:8080/admin-ui/centre%20de%20control.html

  Note : Les ressources images (resources/BG.jpg, resources/PANEL.png,
  resources/icon 1.png ... icon 4.png) doivent être présentes dans le
  dossier resources/ pour le rendu complet de l'app mobile.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  7. TECHNOLOGIES UTILISÉES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Frontend
  ─────────────────────────────────────────────────
  HTML5 / CSS3 / JavaScript ES6+   Base du projet
  Leaflet.js v1.9.4                Cartographie interactive (admin)
  Canvas API                       Graphiques dynamiques (charts)
  CSS Animations & Transitions     Micro-interactions et flux électrique
  Google Fonts                     Orbitron + Exo 2 (app) / Inter (admin)

  Cartographie
  ─────────────────────────────────────────────────
  CartoDB Positron                 Fond de carte minimaliste (admin)
  OpenStreetMap                    Données géographiques
  Coordonnées GPS réelles          73 stations géolocalisées sur Lomé

  Communications (production future)
  ─────────────────────────────────────────────────
  LoRaWAN                          Télémétrie smart meters longue portée
  MQTT                             Protocole IoT temps réel
  REST API                         Échanges données serveur/client
  Mobile Money API                 Flooz (Moov) + TMoney (Togocom) + Wave

  Infrastructure (production future)
  ─────────────────────────────────────────────────
  Node.js + PostgreSQL             Serveur backend
  InfluxDB + Grafana               Time-series & monitoring
  SQLite                           Stockage local edge (station centrale)
  Docker                           Conteneurisation déploiement


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  8. FONCTIONNALITÉS CLÉS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  [✓] Monitoring temps réel des 73 stations sur carte de Lomé
  [✓] Détection automatique surplus / déficit par station
  [✓] Algorithme de routage énergétique automatique
  [✓] Redistribution manuelle avec animation de flux électrique
  [✓] Mise à jour dynamique des charges toutes les 7 secondes
  [✓] Visualisation des maisons rattachées à chaque station
  [✓] Liaison backbone inter-stations sur la carte
  [✓] Dashboard prosumer avec 4 modules (énergie, revenus, réseau, domotique)
  [✓] Graphiques interactifs production vs consommation
  [✓] Gestion domotique par pièce (on/off)
  [✓] 3 modes énergétiques (Économie / Charge / Performance)
  [✓] Simulation Mobile Money (achat/vente/retrait)
  [✓] Interface 100% offline-capable (pas de cloud requis)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  9. MODÈLE ÉCONOMIQUE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Grille tarifaire :

    Acteur              Prix SWBD         Prix CEET       Gain
    ─────────────────────────────────────────────────────────────
    Consommateur        80 FCFA/kWh       120–150 FCFA    −33% à −47%
    Producteur          60 FCFA/kWh       0 FCFA          Revenu net
    Coopérative SWBD    20 FCFA/kWh       —               Commission

  Structure juridique : Coopérative énergétique (cadre OHADA — Togo)

  Sources de financement envisagées :
    • BOAD / BIDC          Prêt développement    50M–200M FCFA
    • GIZ / AFD            Subvention impact     30M–100M FCFA
    • Impact investors     Equity                20M–80M FCFA
    • Revenus pilote       Autofinancement       dès l'an 1


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  10. ROADMAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Phase 0 — Hackathon (Juin 2026)
    [✓] Prototype logiciel complet (app prosumer + dashboard admin)
    [✓] Cahier des charges (15 chapitres, 5 pages synthèse)
    [✓] Interface admin avec carte temps réel de Lomé
    [ ] Pitch deck investisseurs

  Phase 1 — Pilote (Mois 1–12)
    [ ] Sélection zone pilote hors réseau CEET
    [ ] Déploiement 3 micro-stations physiques
    [ ] Connexion 20–50 foyers
    [ ] Intégration Mobile Money réelle (Flooz/TMoney)
    [ ] Validation algorithme de routage sur terrain
    [ ] Rapport pilote + ouverture dialogue ARSE

  Phase 2 — Expansion (Mois 13–36)
    [ ] 50 stations, 500 foyers connectés
    [ ] Création coopérative légale OHADA
    [ ] Levée de fonds BOAD/GIZ
    [ ] Accord-cadre réglementaire ARSE

  Phase 3 — Industrialisation (Mois 37–60)
    [ ] 500 stations, 10 000+ foyers
    [ ] Standard national microgrid Togo
    [ ] Export modèle Bénin / Ghana / Burkina Faso


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  11. ÉQUIPE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Poste                   Profil                  Responsabilités
  ─────────────────────────────────────────────────────────────────────
  jordankpetonkou9-afk   dev-full stack          crateur de l'interface admin
  amiabolosewovi-star    dev-full stack          createur de línterfacce user
  


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  12. LICENCE ET CONTACT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Licence     : MIT — Open Source, usage libre avec attribution
  Contact     : contact@swbd-togo.io
  GitHub      : https://github.com/[org]/Solar-Web-backup-distribution-SWBD-
  Ville       : Lomé, République Togolaise
  Année       : 2026

  "Faire de chaque toit solaire togolais un nœud actif d'un réseau
   d'énergie intelligent, autonome et équitable, accessible à tous."

                                                        — Équipe NEW-GEN INNOVATION


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  SWBD v1.0 — Solar Web Backup Distribution — Lomé, Togo — 2026
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
