document.addEventListener("DOMContentLoaded", function () {
    // Game variables
    let stings = 0;
    let sps = 0;
    let totalClicks = 0;
    let totalStings = 0;
    let upgradesps = 0;
    let totalPlaytime = 0;

    // Timer variables
    let startTime = Date.now();
    let timerInterval = null;

    // Achievement tracking
    let achievements = {
        first_click: {
            id: 'first_click',
            name: 'First Click',
            description: 'Make your first click!',
            unlocked: false,
            notified: false,
            condition: () => totalClicks >= 1
        },
        clicks100: {
            id: 'clicks100',
            name: '100 Clicks',
            description: 'Get 100 clicks!',
            unlocked: false,
            notified: false,
            condition: () => totalClicks >= 100
        },
        clicks1000: {
            id: 'clicks1000',
            name: '1000 Clicks',
            description: 'Get 1000 clicks!',
            unlocked: false,
            notified: false,
            condition: () => totalClicks >= 1000
        },
        clicks10k: {
            id: 'clicks10k',
            name: '10,000 Clicks',
            description: 'Get 10,000 clicks!',
            unlocked: false,
            notified: false,
            condition: () => totalClicks >= 10000
        },
        clicks100k: {
            id: 'clicks100k',
            name: '100,000 Clicks',
            description: 'Get 100,000 clicks!',
            unlocked: false,
            notified: false,
            condition: () => totalClicks >= 100000
        },
        sting_operation: {
            id: 'sting_operation',
            name: 'Sting Operation',
            description: 'Reach 100 stings!',
            unlocked: false,
            notified: false,
            condition: () => totalStings >= 100
        },
        sting_operation1k: {
            id: 'sting_operation1k',
            name: 'Sting Operation 1k',
            description: 'Reach 1,000 stings!',
            unlocked: false,
            notified: false,
            condition: () => totalStings >= 1000
        },
        sting_operation10k: {
            id: 'sting_operation10k',
            name: 'Sting Operation 10k',
            description: 'Reach 10,000 stings!',
            unlocked: false,
            notified: false,
            condition: () => totalStings >= 10000
        },
        sting_operation100k: {
            id: 'sting_operation100k',
            name: 'Sting Operation 100k',
            description: 'Reach 100,000 stings!',
            unlocked: false,
            notified: false,
            condition: () => totalStings >= 100000
        },
        sting_operation1M: {
            id: 'sting_operation1M',
            name: 'Sting Operation 1M',
            description: 'Reach 1 Million stings!',
            unlocked: false,
            notified: false,
            condition: () => totalStings >= 1000000
        },
        get_jim: {
            id: 'get_jim',
            name: 'Get Jim',
            description: 'Get 1 pair of Jimmy\'s glasses!',
            unlocked: false,
            notified: false,
            condition: () => upgrades && upgrades.jimmyglass && upgrades.jimmyglass >= 1
        },
        get_jim100: {
            id: 'get_jim100',
            name: 'Get 100 Jimmy\'s Glasses',
            description: 'Get 100 pairs of Jimmy\'s glasses!',
            unlocked: false,
            notified: false,
            condition: () => upgrades && upgrades.jimmyglass && upgrades.jimmyglass >= 100
        },
        get_hs: {
            id: 'get_hs',
            name: 'HS TikTok Live',
            description: 'Get 1 HS TikTok Live!',
            unlocked: false,
            notified: false,
            condition: () => upgrades && upgrades.hslives && upgrades.hslives >= 1
        },
        get_hs100: {
            id: 'get_hs100',
            name: 'Get 100 HS TikTok Lives',
            description: 'Get 100 HS TikTok Lives!',
            unlocked: false,
            notified: false,
            condition: () => upgrades && upgrades.hslives && upgrades.hslives >= 100
        },
        get_drdisrespect: {
            id: 'get_drdisrespect',
            name: 'Get Dr. Disrespect',
            description: 'Get 1 Dr. Disrespect Twitch Stream!',
            unlocked: false,
            notified: false,
            condition: () => upgrades && upgrades.drdisrespect && upgrades.drdisrespect >= 1
        },
        get_drdisrespect100: {
            id: 'get_drdisrespect100',
            name: 'Get 100 Dr. Disrespect Twitch Streams',
            description: 'Get 100 Dr. Disrespect Twitch Streams!',
            unlocked: false,
            notified: false,
            condition: () => upgrades && upgrades.drdisrespect && upgrades.drdisrespect >= 100
        },
        get_edpwatch: {
            id: 'get_edpwatch',
            name: 'Get EDPWatch.com',
            description: 'Get 1 EDPWatch.com Membership!',
            unlocked: false,
            notified: false,
            condition: () => upgrades && upgrades.EDPWatch && upgrades.EDPWatch >= 1
        },
        get_edpwatch100: {
            id: 'get_edpwatch100',
            name: 'Get 100 EDPWatch.com Memberships',
            description: 'Get 100 EDPWatch.com Memberships!',
            unlocked: false,
            notified: false,
            condition: () => upgrades && upgrades.EDPWatch && upgrades.EDPWatch >= 100
        },
        get_informants: {
            id: 'get_informants',
            name: 'Get Informants',
            description: 'Get 1 Police Informant!',
            unlocked: false,
            notified: false,
            condition: () => upgrades && upgrades.informants && upgrades.informants >= 1
        },
        get_informants100: {
            id: 'get_informants100',
            name: 'Get 100 Police Informants',
            description: 'Get 100 Police Informants!',
            unlocked: false,
            notified: false,
            condition: () => upgrades && upgrades.informants && upgrades.informants >= 100
        },
        get_mom: {
            id: 'get_mom',
            name: 'Get Mom',
            description: 'Get 1 Mom involved!',
            unlocked: false,
            notified: false,
            condition: () => upgrades && upgrades.getmom && upgrades.getmom >= 1
        },
        get_mom100: {
            id: 'get_mom100',
            name: 'Get 100 Moms',
            description: 'Get 100 Moms involved!',
            unlocked: false,
            notified: false,
            condition: () => upgrades && upgrades.getmom && upgrades.getmom >= 100
        },
        get_beenhacked: {
            id: 'get_beenhacked',
            name: 'I\'ve Been Hacked!',
            description: 'Get 1 "I\'ve Been Hacked!"',
            unlocked: false,
            notified: false,
            condition: () => upgrades && upgrades.beenhacked && upgrades.beenhacked >= 1
        },
        get_beenhacked100: {
            id: 'get_beenhacked100',
            name: 'Get 100 "I\'ve Been Hacked!"',
            description: 'Get 100 "I\'ve Been Hacked!"',
            unlocked: false,
            notified: false,
            condition: () => upgrades && upgrades.beenhacked && upgrades.beenhacked >= 100
        }
    };

    let jimmyglassupgrades = 50;
    let hslivesupgrades = 100;
    let drdisrespectupgrades = 250;
    let edpwatchupgrades = 500;
    let informantsupgrades = 1000;
    let getmomupgrades = 5000;
    let beenhackedupgrades = 15000;

    // Track upgrades
    let upgrades = {
        jimmyglass: 0,
        hslives: 0,
        drdisrespect: 0,
        EDPWatch: 0,
        informants: 0,
        getmom: 0,
        beenhacked: 0,
        totalSpent: 0
    };

    // track click timestamps (ms)
    const clickTimes = [];

    // Anti-autoclick: minimum delay between accepted clicks (ms)
    const clickCooldown = 90; // adjust as needed
    let lastClickTime = 0;

    // Cached DOM elements
    const stingsSpan = document.querySelector(".section-1 h3 span");
    const spsSpan = document.querySelector(".section-1 h4 span");
    const nameStrong = document.querySelector(".section-1 h1 strong");
    const upgradecost = document.getElementsByClassName("upgrade-cost");
    const statsvalue = document.getElementsByClassName("stats-value");
    const achievementsSpan = document.getElementById("achievements");
    const timerDisplay = document.getElementById("timer-display");


    // select an image element (define this in your HTML)
    const clickImg = document.getElementById('pedos');

    // images list defined in JS (update these paths to match your files)
    const images = [
        "images/Pedos/MichaelMaydew.webp",
        "images/Pedos/CarlLabon.webp",
        "images/Pedos/RyanHolmes.webp",
        "images/Pedos/GeorgePieNonce.webp",
        "images/Pedos/StuartTheNonce.webp",
        "images/Pedos/ClownNonce.webp",
        "images/Pedos/DrDisrespect.webp",
        "images/Pedos/HStikkytokky.webp",
        "images/Pedos/JeffreyEpstein.webp",
        "images/Pedos/JimmySavile.webp",
        "images/Pedos/PrinceAndrew.webp",
        "images/Pedos/Balthazar&Lucifer.webp",
        "images/Pedos/Stan.webp",
        "images/Pedos/NoMoreChicken.webp",
        "images/Pedos/PhillipSchofield.webp",
        "images/Pedos/RyanWindridge.webp",
        "images/Pedos/DwarfNonce.webp",
        "images/Pedos/EDP445.webp",
        "images/Pedos/WavingNonce.webp",
        "images/Pedos/4MonthUKNonce.webp",
        "images/Pedos/OverweightPedo.webp",
        "images/Pedos/SpeckyNonce.webp",
        "images/Pedos/DrewSoule.webp",
        "images/Pedos/FatPedo.webp",
        "images/Pedos/PiePedo.webp",
        "images/Pedos/SlapPred.webp",
        "images/Pedos/AnotherFatPred.webp",
        "images/Pedos/PinkJumperPred.webp",
        "images/Pedos/IknewPred.webp"
    ];

    function randomizeImage() {
        if (images && images.length) {
            const idx = Math.floor(Math.random() * images.length);
            clickImg.src = images[idx];
            return;
        }
    }

    // Format time as "Xd Xh Xm Xs"
    function formatTime(totalSeconds) {
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);

        let result = "";
        if (days > 0) result += days + "d ";
        if (hours > 0 || days > 0) result += hours + "h ";
        if (minutes > 0 || hours > 0 || days > 0) result += minutes + "m ";
        result += seconds + "s";
        return result;
    }

    // Update the timer display
    function updateTimer() {
        const currentTime = Date.now();
        const elapsedTimeInSeconds = Math.floor((currentTime - startTime) / 1000);

        // Update totalPlaytime for statistics
        totalPlaytime = elapsedTimeInSeconds;

        // Update the timer displays
        if (timerDisplay) {
            timerDisplay.textContent = formatTime(totalPlaytime);
        }

        // Update the stats value for playtime without triggering a full UI update
        if (statsvalue && statsvalue[3]) {
            statsvalue[3].textContent = formatTime(totalPlaytime);
        }
    }

    // Helper to update UI
    function updateDisplay() {
        if (stingsSpan) stingsSpan.textContent = Math.floor(stings);
        if (spsSpan) spsSpan.textContent = Math.floor(sps);
        if (statsvalue) statsvalue[0].textContent = Math.floor(totalClicks);
        if (statsvalue) statsvalue[1].textContent = Math.floor(totalStings);
        if (statsvalue) statsvalue[2].textContent = Math.floor(upgradesps);
        if (statsvalue && statsvalue[3]) statsvalue[3].textContent = formatTime(totalPlaytime);
        if (statsvalue && statsvalue[4]) statsvalue[4].textContent = totalPlaytime; // Raw seconds value
        if (upgradecost) upgradecost[0].textContent = Math.floor(jimmyglassupgrades) + " stings";
        if (upgradecost) upgradecost[1].textContent = Math.floor(hslivesupgrades) + " stings";
        if (upgradecost) upgradecost[2].textContent = Math.floor(drdisrespectupgrades) + " stings";
        if (upgradecost) upgradecost[3].textContent = Math.floor(edpwatchupgrades) + " stings";
        if (upgradecost) upgradecost[4].textContent = Math.floor(informantsupgrades) + " stings";
        if (upgradecost) upgradecost[5].textContent = Math.floor(getmomupgrades) + " stings";
        if (upgradecost) upgradecost[6].textContent = Math.floor(beenhackedupgrades) + " stings";
        if (achievementsSpan) achievementsSpan.textContent = `${Object.values(achievements).filter(a => a.unlocked).length}/${Object.keys(achievements).length}`;

        // Check achievements
        checkAchievements();
    }

    // Add a property to track active notifications
    const activeNotifications = {};

    // Check for newly unlocked achievements
    function checkAchievements() {
        // Check each achievement
        for (const key in achievements) {
            const achievement = achievements[key];

            // Check if achievement should be unlocked
            if (!achievement.unlocked && achievement.condition()) {
                // Mark as unlocked
                achievement.unlocked = true;

                // Add unlocked class to achievement item
                const achievementElement = document.querySelector(`.achievement-item[data-achievement="${key}"]`);
                if (achievementElement) {
                    achievementElement.classList.add('unlocked');
                    achievementElement.classList.remove('locked');
                }

                // Only show notification if not already shown and not currently active
                if (!achievement.notified && !activeNotifications[key]) {
                    achievement.notified = true;
                    showAchievementNotification(key);
                }
            }
        }
    }

    // Function to display achievement notification
    function showAchievementNotification(achievementId) {
        const achievement = achievements[achievementId];
        if (!achievement || activeNotifications[achievementId]) return;

        // Mark notification as active
        activeNotifications[achievementId] = true;

        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.id = `achievement-notification-${achievementId}`;

        playSound(achievementSound);

        // Get correct image path based on achievement ID
        let imagePath;
        switch (achievementId) {
            case 'first_click':
                imagePath = 'ClickAch.webp';
                break;
            case 'clicks100':
                imagePath = 'ClickAch2.webp';
                break;
            case 'clicks1000':
                imagePath = 'ClickAch3.webp';
                break;
            case 'clicks1000':
                imagePath = 'ClickAch3.webp';
                break;
            case 'clicks10k':
                imagePath = 'ClickAch4.webp';
                break;
            case 'clicks100k':
                imagePath = 'ClickAch5.webp';
                break;
            case 'sting_operation':
                imagePath = 'StingAch.webp';
                break;
            case 'sting_operation1k':
                imagePath = 'StingAch2.webp';
                break;
            case 'sting_operation10k':
                imagePath = 'StingAch3.webp';
                break;
            case 'sting_operation100k':
                imagePath = 'StingAch4.webp';
                break;
            case 'sting_operation1M':
                imagePath = 'StingAch5.webp';
                break;
            case 'get_jim':
                imagePath = 'GetJim.webp';
                break;
            case 'get_jim100':
                imagePath = 'GetJim.webp';
                break;
            case 'get_hs':
                imagePath = 'GetHSAch.webp';
                break;
            case 'get_hs100':
                imagePath = 'GetHSAch.webp';
                break;
            case 'get_drdisrespect':
                imagePath = 'GetDrDisrespect.webp';
                break;
            case 'get_drdisrespect100':
                imagePath = 'GetDrDisrespect.webp';
                break;
            case 'get_edpwatch':
                imagePath = 'GetEDPWatch.webp';
                break;
            case 'get_edpwatch100':
                imagePath = 'GetEDPWatch.webp';
                break;
            case 'get_informants':
                imagePath = 'GetInformants.webp';
                break;
            case 'get_informants100':
                imagePath = 'GetInformants.webp';
                break;
            case 'get_mom':
                imagePath = 'GetMomAch.webp';
                break;
            case 'get_mom100':
                imagePath = 'GetMomAch.webp';
                break;
            case 'get_beenhacked':
                imagePath = 'GetBeenHacked.webp';
                break;
            case 'get_beenhacked100':
                imagePath = 'GetBeenHacked.webp';
                break;
            default:
                imagePath = '';
                break;
        }

        // Set notification content
        notification.innerHTML = `
            <img src="images/AchIcons/${imagePath}" alt="${achievement.name}">
            <div class="notification-content">
                <div class="notification-title">Achievement Unlocked!</div>
                <div class="notification-name">${achievement.name}</div>
                <div>${achievement.description}</div>
            </div>
        `;

        // Check if notification already exists and remove it if so
        const existingNotification = document.getElementById(`achievement-notification-${achievementId}`);
        if (existingNotification) {
            existingNotification.remove();
        }

        // Add to body
        document.body.appendChild(notification);

        // Remove after animation completes
        setTimeout(() => {
            notification.style.opacity = '0';
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            activeNotifications[achievementId] = false;
        }, 3000);
    }



    // Make functions global so inline onclick handlers work
    window.changeName = function () {
        if (!nameStrong) return;
        const newName = prompt("Enter your name:");
        if (newName) {
            operationName = newName;
            nameStrong.textContent = newName;
            saveGame(); // optional immediate save
        }
    };

    // Audio elements for sounds
    const clickSound = new Audio('sounds/click.wav');
    const upgradeSound = new Audio('sounds/upgrade.wav');
    const achievementSound = new Audio('sounds/notification.wav');

    // Function to play sounds
    function playSound(sound) {
        // Create a clone to allow overlapping sounds
        const soundClone = sound.cloneNode();
        soundClone.volume = 0.1; // Adjust volume as needed
        soundClone.play().catch(e => console.log("Audio playback error:", e));
    }

    window.countimg = function () {
        const now = Date.now();

        // throttle too-fast clicks
        if (now - lastClickTime < clickCooldown) {
            // Small visual feedback for throttled clicks
            if (clickImg) {
                clickImg.style.transform = "scale(0.98)";
                setTimeout(() => {
                    clickImg.style.transform = "";
                }, 80);
            }
            return;
        }
        lastClickTime = now;

        // Play click sound
        playSound(clickSound);

        stings++;
        totalClicks++;
        totalStings++;
        clickTimes.push(now);

        // remove timestamps older than 1 second
        const cutoff = now - 1000;
        while (clickTimes.length && clickTimes[0] < cutoff) {
            clickTimes.shift();
        }

        // sps = number of clicks in the last 1 second
        sps = upgradesps + clickTimes.length;

        // randomize picture on each click
        randomizeImage();

        updateDisplay();
    };

    window.buyUpgrade = function (upgrade) {
        switch (upgrade) {
            case "jimmyglass":
                if (stings >= jimmyglassupgrades) {
                    // Play upgrade sound
                    playSound(upgradeSound);

                    stings -= jimmyglassupgrades;
                    jimmyglassupgrades = Math.floor(jimmyglassupgrades * 1.1);
                    upgradesps += 1;
                    if (!upgrades.jimmyglass) upgrades.jimmyglass = 0;
                    upgrades.jimmyglass++;
                    upgrades.totalSpent += jimmyglassupgrades;
                    updateDisplay();
                } else {
                    alert("Not enough stings!");
                }
                break;
            case "hslives":
                if (stings >= hslivesupgrades) {
                    // Play upgrade sound
                    playSound(upgradeSound);

                    stings -= hslivesupgrades;
                    hslivesupgrades = Math.floor(hslivesupgrades * 1.2);
                    upgradesps += 3;
                    if (!upgrades.hslives) upgrades.hslives = 0;
                    upgrades.hslives++;
                    upgrades.totalSpent += hslivesupgrades;
                    updateDisplay();
                } else {
                    alert("Not enough stings!");
                }
                break;
            case "drdisrespect":
                if (stings >= drdisrespectupgrades) {
                    // Play upgrade sound
                    playSound(upgradeSound);

                    stings -= drdisrespectupgrades;
                    drdisrespectupgrades = Math.floor(drdisrespectupgrades * 1.2);
                    upgradesps += 5;
                    if (!upgrades.drdisrespect) upgrades.drdisrespect = 0;
                    upgrades.drdisrespect++;
                    upgrades.totalSpent += drdisrespectupgrades;
                    updateDisplay();
                } else {
                    alert("Not enough stings!");
                }
                break;
            case "EDPWatch":
                if (stings >= edpwatchupgrades) {
                    // Play upgrade sound
                    playSound(upgradeSound);

                    stings -= edpwatchupgrades;
                    edpwatchupgrades = Math.floor(edpwatchupgrades * 1.2);
                    upgradesps += 10;
                    if (!upgrades.EDPWatch) upgrades.EDPWatch = 0;
                    upgrades.EDPWatch++;
                    upgrades.totalSpent += edpwatchupgrades;
                    updateDisplay();
                } else {
                    alert("Not enough stings!");
                }
                break;
            case "informants":
                if (stings >= informantsupgrades) {
                    // Play upgrade sound
                    playSound(upgradeSound);

                    stings -= informantsupgrades;
                    informantsupgrades = Math.floor(informantsupgrades * 1.2);
                    upgradesps += 25;
                    if (!upgrades.informants) upgrades.informants = 0;
                    upgrades.informants++;
                    upgrades.totalSpent += informantsupgrades;
                    updateDisplay();
                } else {
                    alert("Not enough stings!");
                }
                break;
            case "getmom":
                if (stings >= getmomupgrades) {
                    // Play upgrade sound
                    playSound(upgradeSound);

                    stings -= getmomupgrades;
                    getmomupgrades = Math.floor(getmomupgrades * 1.2);
                    upgradesps += 50;
                    if (!upgrades.getmom) upgrades.getmom = 0;
                    upgrades.getmom++;
                    upgrades.totalSpent += getmomupgrades;
                    updateDisplay();
                } else {
                    alert("Not enough stings!");
                }
                break;
            case "beenhacked":
                if (stings >= beenhackedupgrades) {
                    // Play upgrade sound
                    playSound(upgradeSound);

                    stings -= beenhackedupgrades;
                    beenhackedupgrades = Math.floor(beenhackedupgrades * 1.2);
                    upgradesps += 100;
                    if (!upgrades.beenhacked) upgrades.beenhacked = 0;
                    upgrades.beenhacked++;
                    upgrades.totalSpent += beenhackedupgrades;
                    updateDisplay();
                } else {
                    alert("Not enough stings!");
                }
                break;
        }
    };

    // Start the timer - make sure we clear any existing interval first
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    timerInterval = setInterval(updateTimer, 1000);

    // Call once immediately to initialize
    updateTimer();

    // periodic decay/update so sps drops when no new clicks arrive
    setInterval(function () {
        const now = Date.now();
        const cutoff = now - 1000;
        while (clickTimes.length && clickTimes[0] < cutoff) {
            clickTimes.shift();
        }
        sps = upgradesps + clickTimes.length;
        updateDisplay();
    }, 200);

    setInterval(function () {
        if (upgradesps > 0) {
            if (!stingsSpan || !spsSpan) return;
            stings += upgradesps;
            totalStings += upgradesps;
            stings = Math.floor(stings);
            setTimeout(function () {
                randomizeImage();
            }, 200);
        }
    }, 1000);


    // Initialize all achievements with locked class
    function initializeAchievements() {
        for (const key in achievements) {
            const achievementElement = document.querySelector(`.achievement-item[data-achievement="${key}"]`);
            if (achievementElement) {
                // remove both classes first to ensure deterministic state
                achievementElement.classList.remove('locked', 'unlocked');
                if (achievements[key] && achievements[key].unlocked) {
                    achievementElement.classList.add('unlocked');
                } else {
                    achievementElement.classList.add('locked');
                }
            }
        }
    }

    // Save / Load support
    const SAVE_KEY = "pedoclicker_savefile_v1.0.1";

    function saveGame() {
        try {
            const save = {
                operationName,
                stings,
                sps,
                totalClicks,
                totalStings,
                upgradesps,
                // store playtime so we can resume startTime
                totalPlaytime,
                upgrades,
                jimmyglassupgrades,
                hslivesupgrades,
                drdisrespectupgrades,
                edpwatchupgrades,
                informantsupgrades,
                getmomupgrades,
                beenhackedupgrades,
                // achievements minimal state
                achievements: Object.fromEntries(Object.keys(achievements).map(k => [k, {
                    unlocked: achievements[k].unlocked,
                    notified: achievements[k].notified
                }])),
                // save timestamp so we can reconstruct startTime
                savedAt: Date.now()
            };
            localStorage.setItem(SAVE_KEY, JSON.stringify(save));
        } catch (e) {
            console.log("Save error:", e);
        }
    }

    function loadGame() {
        try {
            const raw = localStorage.getItem(SAVE_KEY);
            if (!raw) return;
            const data = JSON.parse(raw);

            if (typeof data.operationName === 'string') {
                operationName = data.operationName;
                if (nameStrong) nameStrong.textContent = operationName;
            }
            if (typeof data.stings === 'number') stings = data.stings;
            if (typeof data.sps === 'number') sps = data.sps;
            if (typeof data.totalClicks === 'number') totalClicks = data.totalClicks;
            if (typeof data.totalStings === 'number') totalStings = data.totalStings;
            if (typeof data.upgradesps === 'number') upgradesps = data.upgradesps;
            if (typeof data.totalPlaytime === 'number') totalPlaytime = data.totalPlaytime;

            // restore upgrades object (merge to be safe)
            if (data.upgrades && typeof data.upgrades === 'object') {
                upgrades = Object.assign(upgrades, data.upgrades);
            }

            // restore upgrade costs if present
            if (typeof data.jimmyglassupgrades === 'number') jimmyglassupgrades = data.jimmyglassupgrades;
            if (typeof data.hslivesupgrades === 'number') hslivesupgrades = data.hslivesupgrades;
            if (typeof data.drdisrespectupgrades === 'number') drdisrespectupgrades = data.drdisrespectupgrades;
            if (typeof data.edpwatchupgrades === 'number') edpwatchupgrades = data.edpwatchupgrades;
            if (typeof data.informantsupgrades === 'number') informantsupgrades = data.informantsupgrades;
            if (typeof data.getmomupgrades === 'number') getmomupgrades = data.getmomupgrades;
            if (typeof data.beenhackedupgrades === 'number') beenhackedupgrades = data.beenhackedupgrades;

            // restore achievements
            if (data.achievements && typeof data.achievements === 'object') {
                for (const k in data.achievements) {
                    if (achievements[k]) {
                        achievements[k].unlocked = !!data.achievements[k].unlocked;
                        achievements[k].notified = !!data.achievements[k].notified;
                    }
                }
            }

            // reconstruct startTime so totalPlaytime continues counting from saved value
            if (typeof data.savedAt === 'number' && typeof totalPlaytime === 'number') {
                startTime = Date.now() - (totalPlaytime * 1000);
            } else {
                startTime = Date.now() - (totalPlaytime * 1000 || 0);
            }

        } catch (e) {
            console.log("Load error:", e);
        }
    }

    // Auto-save every 5 seconds and on unload
    setInterval(saveGame, 5000);
    window.addEventListener('beforeunload', saveGame);

    // Load saved state before initializing UI
    loadGame();

    // Initialize display and image
    randomizeImage();
    initializeAchievements();
    updateDisplay();
});