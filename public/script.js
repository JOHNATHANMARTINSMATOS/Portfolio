// Função para exibir a seção selecionada
function showSection(sectionId) {
    // Esconde todas as seções
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
        section.classList.add('hidden');
    });
    // Mostra a seção correspondente ao link clicado
    const activeSection = document.getElementById(sectionId);
    activeSection.classList.remove('hidden');
    activeSection.classList.add('active');
}

// Exibir a seção inicial (Início) por padrão
document.addEventListener('DOMContentLoaded', function() {
    showSection('home');
});

// Capturar o envio do formulário
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir o comportamento padrão do formulário

    const formData = new FormData(this);

    fetch('/send', {
        method: 'POST',
        body: new URLSearchParams(formData)
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Exibe a mensagem de sucesso ou erro
        document.getElementById('contact-form').reset(); // Limpa o formulário
    })
    .catch(error => {
        alert('Erro ao enviar a mensagem. Tente novamente.');
        console.error('Erro:', error);
    });
});

