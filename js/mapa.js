let mapFloor = 'all';

const categoryColors = {
    moda: '#D4AF37',
    tecnologia: '#D4AF37',
    decoracion: '#D4AF37',
    deportes: '#D4AF37',
    belleza: '#D4AF37',
    joyeria: '#D4AF37',
    comida: '#D4AF37',
};

// Cargar HTML del componente
document.addEventListener('DOMContentLoaded', () => {
    const cont = document.getElementById('mapa-container');
    if (!cont) return;

    fetch('/componentes/mapa.html')
        .then(res => res.text())
        .then(html => {
            cont.innerHTML = html;
            initMapa();
        });
});

// Inicializar
function initMapa() {
    setupFloorFilters();
    renderMap();
}

// Filtros
function setupFloorFilters() {
    document.querySelectorAll('#map-floor-filters .floor-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('#map-floor-filters .floor-btn')
                .forEach(b => b.classList.remove('active'));

            this.classList.add('active');
            mapFloor = this.dataset.floor;
            renderMap();
        });
    });
}

// Filtro por piso
function filterMapStores() {
    return stores.filter(store =>
        mapFloor === 'all' || store.floor === mapFloor
    );
}

// Render EXACTO
function renderMap() {
    const container = document.getElementById('mall-map-container');
    const tooltip = document.getElementById('map-tooltip');
    const tooltipContent = document.getElementById('tooltip-content');
    const filtered = filterMapStores();

    if (!container) return;

    const topStores = filtered.slice(0, 2);
    const sideStores = filtered.slice(2, 10);
    const leftStores = sideStores.slice(0, 4);
    const rightStores = sideStores.slice(4, 8);

    container.innerHTML = `
        <div class="bg-[#0F0F0F] border-4 border-[#1A1A1A] rounded-2xl p-8" style="max-width:900px;margin:auto;">
            
            <!-- Arriba -->
            <div class="flex gap-6 justify-center mb-8">
                ${topStores.map(store => mapBox(store)).join('')}
            </div>

            <!-- Centro -->
            <div class="flex gap-6 justify-center" style="min-height:500px;">

                <!-- Izquierda -->
                <div class="flex flex-col gap-6" style="width:160px;">
                    ${leftStores.map(store => mapBox(store, true)).join('')}
                </div>

                <!-- Pasillo -->
                <div class="relative" style="width:200px;border:3px dashed #D4AF37;border-radius:8px;background:rgba(212,175,55,0.05);display:flex;align-items:center;justify-content:center;">
                    <div class="text-[#D4AF37] font-bold text-lg" style="writing-mode: vertical-rl; transform: rotate(180deg);">PASILLO CENTRAL</div>
                </div>

                <!-- Derecha -->
                <div class="flex flex-col gap-6" style="width:160px;">
                    ${rightStores.map(store => mapBox(store, true)).join('')}
                </div>

            </div>
        </div>
    `;

    // Tooltips
    container.querySelectorAll('.map-hotspot').forEach(hotspot => {
        hotspot.addEventListener('mouseenter', function () {
            const store = stores.find(s => s.id == this.dataset.storeId);

            tooltipContent.innerHTML = `
                <h4 class="text-lg font-bold text-[#D4AF37] mb-2">${store.name}</h4>
                <p class="text-sm text-gray-300">${store.description}</p>
                <span class="text-xs text-gray-400">Piso ${store.floor}</span>
            `;
            tooltip.classList.remove('hidden');
        });

        hotspot.addEventListener('mousemove', e => {
            tooltip.style.left = (e.clientX + 15) + 'px';
            tooltip.style.top = (e.clientY + 15) + 'px';
        });

        hotspot.addEventListener('mouseleave', () => {
            tooltip.classList.add('hidden');
        });
    });
}

// Template de cada local
function mapBox(store, vertical = false) {
    return `
        <div class="map-hotspot bg-[#1A1A1A] border-3 rounded-lg p-4 text-center cursor-pointer hover:scale-105 transition-all"
            style="border-color:${categoryColors[store.category]}; height:${vertical ? '110px' : '100px'};display:flex;flex-direction:column;justify-content:center;"
            data-store-id="${store.id}">
            <div class="font-bold text-sm mb-1">${store.name}</div>
            <div class="text-xs text-gray-400">${store.category}</div>
            <div class="text-xs text-[#D4AF37] mt-1">Piso ${store.floor}</div>
        </div>
    `;
}
