document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('nameInput');
    const addButton = document.getElementById('addButton');
    const nameList = document.getElementById('nameList');
    let names = [];

    // Função para adicionar nome
    const addName = async () => {
        const name = nameInput.value.trim();
        if (name) {
            const country = await getCountry();
            names.push({ name: name, country: country });
            updateNameList();
            saveNames();
            nameInput.value = '';
        }
    };

    // Função para obter o país do usuário
    const getCountry = async () => {
        // const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        // if (isLocalhost) {
        //     return 'Zimbabue'; // País simulado para desenvolvimento
        // }
        const apiKey = 'aea4a1e1bd2bfa6135b105c0f4a87becd94df27edefd9e5f51e92858';
        try {
            const response = await fetch(`https://api.ipdata.co/?api-key=${apiKey}`);
            const data = await response.json();
            return data.country_name + data.emoji_flag;  // Ajuste conforme a resposta da API
        } catch (error) {
            console.error('Error fetching country:', error);
            return 'Unknown';
        }
    };

// Função para atualizar a lista de nomes
const updateNameList = () => {
    nameList.innerHTML = '';
    names.forEach(item => {
        const listItem = document.createElement('li');
        
        const nameSpan = document.createElement('span');
        nameSpan.textContent = item.name;
        nameSpan.style.fontWeight = 'bold'; // Estilo para o nome

        const countrySpan = document.createElement('span');
        countrySpan.textContent = ` desde ${item.country}`;
        countrySpan.style.fontWeight = 'normal'; // Estilo para o país

        listItem.appendChild(nameSpan);
        listItem.appendChild(countrySpan);

        nameList.appendChild(listItem);
    });
};

    // Função para salvar nomes no servidor
    const saveNames = async () => {
        try {
            await fetch('/saveNames', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(names)
            });
        } catch (error) {
            console.error('Error saving names:', error);
        }
    };

    // Função para carregar nomes do servidor
    const loadNames = async () => {
        try {
            const response = await fetch('/names.json');
            names = await response.json();
            updateNameList();
        } catch (error) {
            console.error('Error loading names:', error);
        }
    };

    addButton.addEventListener('click', addName);

    // Carregar nomes ao carregar a página
    loadNames();
});
