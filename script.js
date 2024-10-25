let coinCount = parseInt(localStorage.getItem('coinCount')) || 0; // Recupera do localStorage ou começa em 0
let energy = 100;
let gainPerHour = parseInt(localStorage.getItem('gainPerHour')) || 100; // Recupera do localStorage ou começa em 100
let xp = parseInt(localStorage.getItem('xp')) || 0; // Recupera do localStorage ou começa em 0
let level = parseInt(localStorage.getItem('level')) || 1; // Recupera do localStorage ou começa em 1

const xpToLevelUpBase = 1000; // XP base para o primeiro nível
let xpToLevelUp = xpToLevelUpBase + (level - 1) * 200; // XP aumenta a cada nível

// Lista de patentes e suas respectivas imagens
const ranks = [
    { title: "Private", image: "img/private.jpg" },
    { title: "Corporal", image: "img/corporal.jpg" },
    { title: "Sergeant", image: "img/sergeant.jpg" },
    { title: "Staff Sergeant", image: "img/staff_sergeant.jpg" },
    { title: "Sergeant Major", image: "img/sergeant_major.jpg" },
    { title: "Warrant Officer", image: "img/warrant_officer.jpg" },
    { title: "Second Lieutenant", image: "img/second_lieutenant.jpg" },
    { title: "First Lieutenant", image: "img/first_lieutenant.jpg" },
    { title: "Captain", image: "img/captain.jpg" },
    { title: "Major", image: "img/major.jpg" },
    { title: "Lieutenant Colonel", image: "img/lieutenant_colonel.jpg" },
    { title: "Colonel", image: "img/colonel.jpg" },
    { title: "Brigadier General", image: "img/brigadier_general.jpg" },
    { title: "Major General", image: "img/major_general.jpg" },
    { title: "Lieutenant General", image: "img/lieutenant_general.jpg" },
    { title: "General", image: "img/general.jpg" },
];

function recoverEnergy() {
    if (energy < 100) {
        energy += 0.5;
        document.getElementById("energy-level").style.width = energy + "%";
    }
}

function clickCoin() {
    if (energy > 0) {
        coinCount++;
        xp += 50; // Ganha 50 XP por moeda
        document.getElementById("coinCount").textContent = coinCount;

        // Verifica se o jogador subiu de nível
        if (xp >= xpToLevelUp) {
            level++;
            xpToLevelUp += 200; // Aumenta a dificuldade de subir de nível
            updateLevelDisplay(); // Atualiza a exibição do nível
        }

        // Atualiza a patente e a imagem correspondente
        if (level <= ranks.length) {
            document.getElementById("level").textContent = level;
            document.getElementById("rankTitle").textContent = ranks[level - 1].title; // Atualiza o título da patente
            document.getElementById("coin").src = ranks[level - 1].image; // Troca a imagem
        }

        document.getElementById("xp").textContent = xp;

        // Salvar os dados no localStorage
        saveGameData();

        energy -= 2; // Diminui a energia
        document.getElementById("energy-level").style.width = energy + "%";

        if (energy <= 0) {
            alert("Você ficou sem energia!");
            document.getElementById("energy-level").style.width = "0%"; // Reseta a barra de energia
        }
    }
}

function saveGameData() {
    // Salvar as variáveis principais no localStorage
    localStorage.setItem('coinCount', coinCount);
    localStorage.setItem('xp', xp);
    localStorage.setItem('level', level);
    localStorage.setItem('gainPerHour', gainPerHour);
}

function upgradeCoinsPerHour() {
    gainPerHour += 10;
    document.getElementById("gainPerHour").textContent = gainPerHour;
    saveGameData(); // Salva os dados atualizados
}

window.onload = function() {
    // Restaurar as informações do localStorage
    document.getElementById("coinsPerHour").textContent = gainPerHour;
    document.getElementById("coinCount").textContent = coinCount;
    document.getElementById("xp").textContent = xp;
    document.getElementById("level").textContent = level;
    document.getElementById("rankTitle").textContent = ranks[level - 1].title;
    document.getElementById("coin").src = ranks[level - 1].image;

    // Iniciar a recuperação de energia
    setInterval(recoverEnergy, 5000); // Recupera energia a cada 5 segundos
    document.getElementById("energy-level").style.width = energy + "%"; // Exibir energia atual
};

function resetLevel() {
    level = 1; // Reseta o nível para 1
    xp = 0; // Reseta o XP
    xpToLevelUp = xpToLevelUpBase; // Restaura o XP base necessário para subir de nível
    saveGameData();
    updateLevelDisplay(); // Atualiza a exibição do nível
}

function updateLevelDisplay() {
    // Atualize aqui a parte da interface que mostra o nível do jogador
    document.getElementById("level").textContent = level;
    document.getElementById("xp").textContent = xp;
    document.getElementById("xpToLevelUp").textContent = xpToLevelUp;
}

function showMenu(menuId) {
    // Ocultar todos os menus
    document.querySelectorAll('.menu-content').forEach(menu => menu.style.display = 'none');

    // Mostrar o menu selecionado
    document.getElementById(menuId + '-menu').style.display = 'block';

    // Se o menu selecionado for "upgrades", mostre automaticamente "weapons" 
    if (menuId === 'upgrades') {
        showSubMenu('weapons');
    }
}

function showSubMenu(subMenuId) {
    // Ocultar todos os submenus
    document.querySelectorAll('.menu-content').forEach(submenu => submenu.style.display = 'none');
    
    // Mostrar o submenu selecionado
    document.getElementById(subMenuId + '-menu').style.display = 'block';
}

function goBack() {
    // Função de navegação de voltar
    showMenu('weapons'); // Voltar para o menu de Armas por padrão, ou ajuste conforme necessário
}

function buyWeapon(weaponId) {
    // Lógica para compra de armas
    alert("Você comprou a arma: " + weaponId);
}

function buyEquipment(equipmentId) {
    // Lógica para compra de equipamentos
    alert("Você comprou o equipamento: " + equipmentId);
}

function buyPersonality(personalityId) {
    // Lógica para compra de personalidades
    alert("Você comprou a personalidade: " + personalityId);
}
