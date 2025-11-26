// ============================================
// GREEN CONNECT - JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidades
    initializeAnimations();
    initializeFormValidation();
    initializeScrollEffects();
    initializeNavigation();
    initializeModalToggles();
});

// ============================================
// ANIMAÇÕES
// ============================================

function initializeAnimations() {
    // Animar elementos ao fazer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar cards e elementos
    document.querySelectorAll('.card, .hover-card').forEach(el => {
        observer.observe(el);
    });

    // Animar títulos
    const titleObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                titleObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-title').forEach(el => {
        titleObserver.observe(el);
    });

    // Adicionar animação ao hover nos cards
    document.querySelectorAll('.hover-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ============================================
// VALIDAÇÃO DE FORMULÁRIO
// ============================================

function initializeFormValidation() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            fetch('php/login.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = 'assets/View/dashboard.html';
                } else {
                    mostrarAlerta(data.message || 'Erro no login.', 'danger');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                mostrarAlerta('Ocorreu um erro. Tente novamente.', 'danger');
            });
        });
    }

    const registerUserForm = document.getElementById('registerUserForm');
    if(registerUserForm) {
        registerUserForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nome = document.getElementById('registerName').value;
            const username = document.getElementById('registerUserName').value;
            const email = document.getElementById('registerUserEmail').value;
            const password = document.getElementById('registerUserPassword').value;
            const tipo = 'fisica';

            const formData = new FormData();
            formData.append('nome', nome);
            formData.append('username', username);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('tipo', tipo);

            fetch('php/register.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    if (data.redirect) {
                        window.location.href = data.redirect;
                    } else {
                        mostrarAlerta('Cadastro realizado com sucesso! Você será redirecionado para o login.', 'success');
                        setTimeout(() => {
                            const switchToLogin = document.getElementById('switchToLogin');
                            if(switchToLogin) {
                                switchToLogin.click();
                            }
                        }, 2000);
                    }
                } else {
                    mostrarAlerta(data.message || 'Erro no cadastro.', 'danger');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                mostrarAlerta('Ocorreu um erro. Tente novamente.', 'danger');
            });
        });
    }

    const registerCompanyForm = document.getElementById('registerCompanyForm');
    if(registerCompanyForm) {
        registerCompanyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const razaoSocial = document.getElementById('companyName').value;
            const cnpj = document.getElementById('registerCNPJ').value;
            const email = document.getElementById('registerCompanyEmail').value;
            const password = document.getElementById('registerCompanyPassword').value;
            const tipo = 'juridica';

            const formData = new FormData();
            formData.append('razao_social', razaoSocial);
            formData.append('cnpj', cnpj);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('tipo', tipo);

            fetch('php/register.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    if (data.redirect) {
                        window.location.href = data.redirect;
                    } else {
                        mostrarAlerta('Cadastro realizado com sucesso! Você será redirecionado para o login.', 'success');
                        setTimeout(() => {
                            const switchToLogin = document.getElementById('switchToLogin');
                            if(switchToLogin) {
                                switchToLogin.click();
                            }
                        }, 2000);
                    }
                } else {
                    mostrarAlerta(data.message || 'Erro no cadastro.', 'danger');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                mostrarAlerta('Ocorreu um erro. Tente novamente.', 'danger');
            });
        });
    }
}

// Validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Submeter formulário (exemplo, precisa ser adaptado para os novos forms)
function submeterFormulario(nome, email, perfil) {
    // Simular envio (em produção, seria uma chamada AJAX)
    const botao = document.querySelector('#cadastroForm button[type="submit"]');
    const textoBotao = botao.innerHTML;
    
    // Desabilitar botão e mostrar loading
    botao.disabled = true;
    botao.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Cadastrando...';
    
    // Simular delay de 2 segundos
    setTimeout(() => {
        // Restaurar botão
        botao.disabled = false;
        botao.innerHTML = textoBotao;
        
        // Mostrar mensagem de sucesso
        mostrarAlerta(`Bem-vindo, ${nome}! Você será redirecionado em breve.`, 'success');
        
        // Limpar formulário
        // document.getElementById('cadastroForm').reset();
        
        // Fechar modal após 2 segundos
        setTimeout(() => {
            const modal = bootstrap.Modal.getInstance(document.getElementById('cadastroModal'));
            if (modal) {
                modal.hide();
            }
        }, 2000);
    }, 2000);
}

// ============================================
// ALERTAS
// ============================================

function mostrarAlerta(mensagem, tipo = 'info') {
    // Criar elemento de alerta
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} alert-dismissible fade show`;
    alerta.setAttribute('role', 'alert');
    alerta.innerHTML = `
        ${mensagem}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Adicionar ao topo da página
    const container = document.body;
    container.insertBefore(alerta, container.firstChild);
    
    // Remover após 5 segundos
    setTimeout(() => {
        alerta.remove();
    }, 5000);
}

// ============================================
// EFEITOS DE SCROLL
// ============================================

function initializeScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-sm');
        } else {
            navbar.classList.remove('shadow-sm');
        }
    });
    
    // Contador de números animados
    animarContadores();
}

// Animar contadores
function animarContadores() {
    const contadores = document.querySelectorAll('h3.text-success.fw-bold');
    let animacaoFeita = false;
    
    const observerOpcoes = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animacaoFeita) {
                animacaoFeita = true;
                contadores.forEach(contador => {
                    const valor = contador.textContent;
                    const numero = parseInt(valor);
                    
                    if (!isNaN(numero)) {
                        animarNumero(contador, numero);
                    }
                });
            }
        });
    }, observerOpcoes);
    
    if (contadores.length > 0) {
        observer.observe(contadores[0]);
    }
}

// Animar número
function animarNumero(elemento, numeroFinal) {
    let numeroAtual = 0;
    const incremento = Math.ceil(numeroFinal / 50);
    const intervalo = setInterval(() => {
        numeroAtual += incremento;
        if (numeroAtual >= numeroFinal) {
            numeroAtual = numeroFinal;
            clearInterval(intervalo);
        }
        elemento.textContent = numeroAtual + (elemento.textContent.includes('+') ? '+' : '%');
    }, 30);
}

// ============================================
// NAVEGAÇÃO
// ============================================

function initializeNavigation() {
    // Fechar menu mobile ao clicar em um link
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                const toggler = document.querySelector('.navbar-toggler');
                toggler.click();
            }
        });
    });
    
    // Smooth scroll para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// MODAL TOGGLE (LOGIN/REGISTER)
// ============================================

function initializeModalToggles() {
    const loginView = document.getElementById('loginView');
    const registerView = document.getElementById('registerView');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');
    const modalTitle = document.getElementById('modalTitle');
    const modalTitleSpan = modalTitle.querySelector('span');
    const userTab = document.getElementById('user-tab');
    const companyTab = document.getElementById('company-tab');
    const registerSubmitButton = document.getElementById('registerSubmitButton');

    if (switchToRegister) {
        switchToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            loginView.classList.add('d-none');
            registerView.classList.remove('d-none');
            modalTitle.querySelector('img').style.display = 'none';
            modalTitleSpan.innerHTML = '<i class="fas fa-user-plus me-2"></i>Criar Nova Conta';
        });
    }

    if (switchToLogin) {
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            registerView.classList.add('d-none');
            loginView.classList.remove('d-none');
            modalTitle.querySelector('img').style.display = 'inline-block';
            modalTitleSpan.textContent = 'Acessar Plataforma';
        });
    }

    if (userTab) {
        userTab.addEventListener('click', () => {
            registerSubmitButton.setAttribute('form', 'registerUserForm');
            registerSubmitButton.innerHTML = '<i class="fas fa-user-plus me-2"></i>Criar Conta';
        });
    }

    if (companyTab) {
        companyTab.addEventListener('click', () => {
            registerSubmitButton.setAttribute('form', 'registerCompanyForm');
            registerSubmitButton.innerHTML = '<i class="fas fa-building me-2"></i>Criar Conta';
        });
    }
}
// ============================================
// UTILITÁRIOS
// ============================================

// Função para copiar texto para clipboard
function copiarParaClipboard(texto) {
    navigator.clipboard.writeText(texto).then(() => {
        mostrarAlerta('Copiado para a área de transferência!', 'success');
    }).catch(() => {
        mostrarAlerta('Erro ao copiar texto.', 'danger');
    });
}

// Função para formatar data
function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Função para verificar se elemento está visível
function estaVisivel(elemento) {
    const rect = elemento.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ============================================
// DARK MODE (OPCIONAL)
// ============================================

function inicializarDarkMode() {
    const toggleDarkMode = document.getElementById('toggleDarkMode');
    
    if (toggleDarkMode) {
        // Verificar preferência salva
        const darkModeAtivo = localStorage.getItem('darkMode') === 'true';
        
        if (darkModeAtivo) {
            document.body.classList.add('dark-mode');
            toggleDarkMode.checked = true;
        }
        
        // Alternar dark mode
        toggleDarkMode.addEventListener('change', function() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', this.checked);
        });
    }
}

// ============================================
// CONSOLE LOG
// ============================================

console.log('%cGreen Connect', 'color: #2d8659; font-size: 24px; font-weight: bold;');
console.log('%cPlataforma de Sustentabilidade Urbana', 'color: #3a7d44; font-size: 14px;');
