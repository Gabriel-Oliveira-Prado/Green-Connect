document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o dashboard após um pequeno delay para simular o carregamento e mostrar o skeleton
    setTimeout(initializeDashboard, 500); 
    initializeNavigation();
    initializeInteractions();
    initializeTooltips();
});

function initializeDashboard() {
    // Remove os skeletons (se houver)
    document.querySelectorAll('.skeleton-card').forEach(skeleton => skeleton.remove());
    
    // Mostra o conteúdo real (se estiver escondido)
    document.querySelectorAll('.chart-card, .suggestions-card').forEach(card => card.style.opacity = 1);
    
    updateGreeting();
    loadUserData();
    initializeAnimations();
    updateRealTimeData();
}

function updateGreeting() {
    const hora = new Date().getHours();
    const greetingElement = document.querySelector('.profile-greeting');
    
    if (greetingElement) {
        let saudacao = 'Olá';
        
        if (hora >= 5 && hora < 12) {
            saudacao = 'Bom Dia';
        } else if (hora >= 12 && hora < 18) {
            saudacao = 'Boa Tarde';
        } else if (hora >= 18 || hora < 5) {
            saudacao = 'Boa Noite';
        }
        
        // Atualiza o texto do elemento de saudação no profile-card
        greetingElement.textContent = `${saudacao}, Gabriel`; 
    }
}

function loadUserData() {
    // Simular carregamento de dados
    const userData = {
        nome: 'Gabriel Oliveira',
        handle: '@gabriel_oliveira',
        avatar: 'https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/person-fill.svg',
        arvoresPlantadas: 2,
        arvoresFotografadas: 2,
        mudasPlantadas: 2,
        pontos: 450,
        nivel: 3,
        pontosProximoNivel: 600 // Exemplo
    };
    
    // Atualizar dados no profile-card
    const profileCard = document.querySelector('.profile-card');
    if (profileCard) {
        const pontos = userData.pontos;
        const proximoNivel = userData.pontosProximoNivel;
        const progresso = Math.round((pontos / proximoNivel) * 100);
        const restante = proximoNivel - pontos;

        // Atualiza o nome e handle
        profileCard.querySelector('.profile-name').textContent = userData.nome;
        profileCard.querySelector('.profile-handle').textContent = userData.handle;
        
        // Atualiza o progresso
        const progressTextElement = profileCard.querySelector('.profile-progress-wrapper small:last-child');
        if (progressTextElement) {
            progressTextElement.textContent = `${restante} pts para o próximo nível`;
        }
        
        const progressBar = profileCard.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.width = `${progresso}%`;
            progressBar.setAttribute('aria-valuenow', progresso);
            progressBar.textContent = `${progresso}%`;
        }
        
        // Atualiza o avatar na sidebar direita e na navbar mobile
        const profileAvatars = document.querySelectorAll('.profile-avatar, .profile-avatar-sm');
        profileAvatars.forEach(img => {
            img.src = userData.avatar;
            img.setAttribute('loading', 'lazy'); // Garante lazy loading
        });
    }
}

function initializeTooltips() {
    // Inicializa tooltips do Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Se for um link de navegação real, permite a ação padrão
            if (this.getAttribute('href') && this.getAttribute('href') !== '#' && !this.classList.contains('logout')) {
                return;
            }
            
            e.preventDefault();
            
            // Remove 'active' de todos os links e adiciona ao clicado
            navLinks.forEach(l => {
                l.classList.remove('active');
                l.removeAttribute('aria-current');
            });
            this.classList.add('active');
            this.setAttribute('aria-current', 'page');
            
            const linkText = this.textContent.trim();
            console.log('Navegando para:', linkText);
            
            // Fecha o offcanvas após o clique em mobile
            const offcanvasElement = document.getElementById('sidebarMenu');
            const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
            if (offcanvas) {
                offcanvas.hide();
            }
        });
    });
    
    const logoutLink = document.querySelector('.nav-link.logout');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Tem certeza que deseja sair?')) {
                mostrarNotificacao('Sessão encerrada com sucesso!', 'success');
                // window.location.href = 'index.html'; // Descomentar para navegação real
            }
        });
    }
}

function initializeAnimations() {
    // Inicializa o Intersection Observer para animações de fade-in
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observa os elementos que devem ter animação de scroll
    document.querySelectorAll('.stat-card, .progress-item, .suggestion-item, .chart-card').forEach(el => {
        observer.observe(el);
    });
    
    animateChart();
}

function animateChart() {
    const bars = document.querySelectorAll('.bar');
    
    bars.forEach((bar, index) => {
        const height = bar.getAttribute('data-value') + '%';
        bar.style.height = '0';
        
        setTimeout(() => {
            bar.style.transition = 'height 0.6s ease-out';
            bar.style.height = height;
        }, index * 100);
    });
}

function initializeInteractions() {
    // Efeito Ripple para botões
    const actionButtons = document.querySelectorAll('.btn, .btn-icon, .welcome-card');
    
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            addRippleEffect(e, this);
        });
    });
    
    // Lógica de Seguir/Seguindo
    const followButtons = document.querySelectorAll('.suggestion-item .btn-success');
    
    followButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const nome = this.closest('.suggestion-item').querySelector('h6').textContent;
            
            if (this.textContent.trim() === 'Seguir') {
                this.textContent = 'Seguindo';
                this.classList.remove('btn-success');
                this.classList.add('btn-secondary');
                this.setAttribute('aria-label', `Deixar de seguir ${nome}`);
                mostrarNotificacao(`Você agora está seguindo ${nome}!`, 'success');
            } else {
                this.textContent = 'Seguir';
                this.classList.remove('btn-secondary');
                this.classList.add('btn-success');
                this.setAttribute('aria-label', `Seguir ${nome}`);
                mostrarNotificacao(`Você deixou de seguir ${nome}.`, 'info');
            }
        });
    });
    
    // Lógica de Mostrar Dicas
    const tipsButtons = document.querySelectorAll('.btn-outline-success');
    
    tipsButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            mostrarNotificacao('Dicas carregadas com sucesso!', 'info');
        });
    });
    
    // Lógica de Busca
    const searchBox = document.querySelector('.search-box input');
    if (searchBox) {
        searchBox.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                buscar(this.value);
            }
        });
    }
    
    // Lógica de Botões do Header
    const headerButtons = document.querySelectorAll('.btn-icon');
    
    headerButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const title = this.getAttribute('title');
            
            if (title === 'Notificações') {
                mostrarNotificacao('Você tem 3 notificações novas', 'info');
            } else if (title === 'Filtros') {
                mostrarNotificacao('Filtros abertos', 'info');
            }
        });
    });

    // Lógica de Registro de Plantio
    const plantingForm = document.getElementById('plantingForm');
    if (plantingForm) {
        plantingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const plantTitle = document.getElementById('plant-title').value;
            const fileInput = document.getElementById('fileInput');

            if (plantTitle && fileInput.files.length > 0) {
                mostrarNotificacao(`Plantio "${plantTitle}" registrado com sucesso! Você ganhou +50 Caibora Coins.`, 'success');
                this.reset();
                resetDropZone();
                this.querySelector('button[type="submit"]').disabled = true;
            }
        });
    }

    // Lógica do Drag and Drop
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const previewContainer = document.getElementById('previewContainer');
    const submitBtn = plantingForm ? plantingForm.querySelector('button[type="submit"]') : null;

    if (dropZone && fileInput && previewContainer && submitBtn) {
        dropZone.addEventListener('click', () => fileInput.click());

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });

        dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            const files = e.dataTransfer.files;
            if (files.length) {
                fileInput.files = files;
                handleFile(files[0]);
            }
        });

        fileInput.addEventListener('change', () => {
            if (fileInput.files.length) {
                handleFile(fileInput.files[0]);
            }
        });
    }
    
    function handleFile(file) {
        if (!file) {
            resetDropZone();
            return;
        }

        previewContainer.innerHTML = ''; // Limpa pré-visualizações anteriores

        const filePreviewItem = document.createElement('div');
        filePreviewItem.className = 'preview-item';

        let filePreviewIcon = '';
        if (file.type.startsWith('image/')) {
            filePreviewIcon = `<img src="${URL.createObjectURL(file)}" alt="Pré-visualização" class="preview-image">`;
        } else {
            filePreviewIcon = `<div class="preview-image d-flex align-items-center justify-content-center bg-light"><i class="fas fa-video fa-2x text-secondary"></i></div>`;
        }

        filePreviewItem.innerHTML = `
            ${filePreviewIcon}
            <div class="file-info">
                <p class="file-name mb-0" title="${file.name}">${file.name}</p>
                <p class="file-size mb-0">${(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <button type="button" class="btn btn-sm btn-outline-danger btn-remove-file"><i class="fas fa-times me-1"></i>Remover</button>
        `;

        previewContainer.appendChild(filePreviewItem);

        // Adiciona evento ao botão de remover
        filePreviewItem.querySelector('.btn-remove-file').addEventListener('click', (e) => {
            e.stopPropagation();
            resetDropZone();
        });
        
        dropZone.classList.add('has-file');
        submitBtn.disabled = false;
    }

    function removeFileFromFileList(fileName) {
        const dt = new DataTransfer();
        const files = fileInput.files;

        for (let i = 0; i < files.length; i++) {
            if (files[i].name !== fileName) {
                dt.items.add(files[i]);
            }
        }

        fileInput.files = dt.files; // Atualiza a lista de arquivos
        handleFile(fileInput.files[0]); // Re-renderiza as pré-visualizações
    }

    function resetDropZone() {
        fileInput.value = ''; // Limpa o input de arquivo
        previewContainer.innerHTML = '';
        dropZone.classList.remove('has-file');
        if (submitBtn) {
            submitBtn.disabled = true;
        }
    }
}


function addRippleEffect(e, element) {
    // Adiciona a classe 'position-relative' e 'overflow-hidden' se não tiver
    if (window.getComputedStyle(element).position === 'static') {
        element.style.position = 'relative';
    }
    element.style.overflow = 'hidden';

    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    // Calcula a posição do clique dentro do elemento
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    // Remove ripples antigos para evitar acúmulo
    const oldRipple = element.querySelector('.ripple');
    if (oldRipple) {
        oldRipple.remove();
    }
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function buscar(termo) {
    if (termo.trim() === '') {
        mostrarNotificacao('Digite algo para buscar', 'warning');
        return;
    }
    
    console.log('Buscando por:', termo);
    mostrarNotificacao(`Buscando por "${termo}"...`, 'info');
}

function mostrarNotificacao(mensagem, tipo = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${tipo} alert-dismissible fade show fixed-top-alert`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${mensagem}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar notificação"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Remover após 5 segundos
    setTimeout(() => {
        alertDiv.classList.remove('show');
        alertDiv.classList.add('fade');
        setTimeout(() => alertDiv.remove(), 150);
    }, 5000);
}

function updateRealTimeData() {
    setInterval(() => {
        console.log('Atualizando dados em tempo real...');
    }, 30000);
}
            const fileName = file.name;
            const fileSize = (file.size / 1024 / 1024).toFixed(2) + ' MB';
            let filePreviewIcon = '';

            if (file.type.startsWith('image/')) {
                filePreviewIcon = `<img src="${URL.createObjectURL(file)}" alt="Pré-visualização" class="preview-image">`;
            } else {
                filePreviewIcon = `<div class="preview-image d-flex align-items-center justify-content-center bg-light"><i class="fas fa-video fa-2x text-secondary"></i></div>`;
            }

            filePreviewItem.innerHTML = `
                ${filePreviewIcon}
                <div class="file-info">
                    <p class="file-name mb-0" title="${fileName}">${fileName}</p>
                    <p class="file-size mb-0">${fileSize}</p>
                </div>
                <button type="button" class="btn btn-sm btn-danger btn-remove-file" title="Remover arquivo"><i class="fas fa-times"></i></button>
            `;

            previewContainer.appendChild(filePreviewItem);

            // Adiciona evento ao botão de remover
            filePreviewItem.querySelector('.btn-remove-file').addEventListener('click', (e) => {
                e.stopPropagation();
                removeFileFromFileList(fileName);
            });
        ;
        
        dropZone.classList.add('has-file');
        submitBtn.disabled = false;
    

    function removeFileFromFileList(fileName) {
        const dt = new DataTransfer();
        const files = fileInput.files;

        for (let i = 0; i < files.length; i++) {
            if (files[i].name !== fileName) {
                dt.items.add(files[i]);
            }
        }

        fileInput.files = dt.files; // Atualiza a lista de arquivos
        handleFiles(fileInput.files); // Re-renderiza as pré-visualizações
    }

    function resetDropZone() {
        fileInput.value = ''; // Limpa o input de arquivo
        previewContainer.innerHTML = '';
        dropZone.classList.remove('has-file');
        if (submitBtn) {
            submitBtn.disabled = true;
        }
    }



function addRippleEffect(e, element) {
    // Adiciona a classe 'position-relative' e 'overflow-hidden' se não tiver
    if (window.getComputedStyle(element).position === 'static') {
        element.style.position = 'relative';
    }
    element.style.overflow = 'hidden';

    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    // Calcula a posição do clique dentro do elemento
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    // Remove ripples antigos para evitar acúmulo
    const oldRipple = element.querySelector('.ripple');
    if (oldRipple) {
        oldRipple.remove();
    }
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function buscar(termo) {
    if (termo.trim() === '') {
        mostrarNotificacao('Digite algo para buscar', 'warning');
        return;
    }
    
    console.log('Buscando por:', termo);
    mostrarNotificacao(`Buscando por "${termo}"...`, 'info');
}

function mostrarNotificacao(mensagem, tipo = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${tipo} alert-dismissible fade show fixed-top-alert`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${mensagem}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar notificação"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Remover após 5 segundos
    setTimeout(() => {
        alertDiv.classList.remove('show');
        alertDiv.classList.add('fade');
        setTimeout(() => alertDiv.remove(), 150);
    }, 5000);
}

function updateRealTimeData() {
    setInterval(() => {
        console.log('Atualizando dados em tempo real...');
    }, 30000);
}
