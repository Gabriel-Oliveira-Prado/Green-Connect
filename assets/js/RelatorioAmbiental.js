document.addEventListener('DOMContentLoaded', function () {

    // Atualiza o valor da temperatura em tempo real
    const tempSlider = document.querySelector('.form-range');
    const tempValue = document.getElementById('tempValue');
    if (tempSlider && tempValue) {
        tempSlider.addEventListener('input', (event) => {
            tempValue.textContent = `${event.target.value}°C`;
        });
    }

    // Gráfico de Produção de Oxigênio
    const ctx = document.getElementById('oxygenProductionChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro'],
                datasets: [{
                    label: 'Produção de O₂ (litros)',
                    data: [65, 59, 80, 81, 56, 85],
                    fill: true,
                    backgroundColor: 'rgba(25, 135, 84, 0.2)',
                    borderColor: 'rgba(25, 135, 84, 1)',
                    tension: 0.4,
                    pointBackgroundColor: 'rgba(25, 135, 84, 1)',
                    pointBorderColor: '#fff',
                    pointHoverRadius: 7,
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(25, 135, 84, 1)',
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Mini-Gráfico de Qualidade do Ar
    const airQualityCtx = document.getElementById('airQualityChart');
    if (airQualityCtx) {
        new Chart(airQualityCtx, {
            type: 'line',
            data: {
                labels: ['-6h', '-5h', '-4h', '-3h', '-2h', '-1h', 'Agora'],
                datasets: [{
                    label: 'AQI',
                    data: [28, 26, 27, 25, 26, 24, 25],
                    borderColor: 'rgba(25, 135, 84, 0.8)', // Verde
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 0,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { display: false }, x: { display: false } },
                plugins: { legend: { display: false }, tooltip: { enabled: false } },
                elements: { line: { backgroundColor: 'transparent' } }
            }
        });
    }

    // Mini-Gráfico de Redução de CO²
    const co2ReductionCtx = document.getElementById('co2ReductionChart');
    if (co2ReductionCtx) {
        new Chart(co2ReductionCtx, {
            type: 'line',
            data: {
                labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
                datasets: [{
                    label: 'kg de CO²',
                    data: [2.5, 3, 4, 2.5], // Totalizando 12kg
                    fill: true,
                    backgroundColor: 'rgba(25, 135, 84, 0.2)',
                    borderColor: 'rgba(25, 135, 84, 1)',
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 0,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { display: false },
                    x: { display: false }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: true
                    }
                }
            }
        });
    }

});