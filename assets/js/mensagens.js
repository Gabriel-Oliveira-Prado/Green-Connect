document.addEventListener('DOMContentLoaded', function() {
    const chatContainer = document.querySelector('.chat-container');
    const chatListItems = document.querySelectorAll('.chat-list-item');
    const backButton = document.getElementById('backToChatListBtn');

    // Adiciona evento de clique para cada item da lista de chat
    if (chatListItems.length > 0 && chatContainer) {
        chatListItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();

                // Remove a classe 'active' de outros itens e adiciona ao clicado
                chatListItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                this.classList.remove('unread'); // Marca como lida ao abrir

                // Ativa a visualização do chat em telas móveis
                chatContainer.classList.add('active-chat');
            });
        });
    }

    // Adiciona evento de clique para o botão de voltar
    if (backButton && chatContainer) {
        backButton.addEventListener('click', function() {
            // Remove a classe para voltar à lista de conversas
            chatContainer.classList.remove('active-chat');
        });
    }
});