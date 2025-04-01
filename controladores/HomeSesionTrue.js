document.addEventListener('DOMContentLoaded', function() {
    // Datos de ejemplo para propiedades
    const propertiesData = [
        {
            id: 1,
            title: "Villa frente al mar en Tulum",
            location: "Tulum, Quintana Roo",
            price: 3200,
            rating: 4.95,
            beds: 3,
            baths: 2,
            type: "beach",
            features: ["Playa privada", "Alberca", "Vista al mar"],
            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHR1bHVtJTIwYmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            badge: "Superhost",
            favorited: false
        },
        {
            id: 2,
            title: "Loft en Condesa",
            location: "Ciudad de México",
            price: 1500,
            rating: 4.88,
            beds: 1,
            baths: 1,
            type: "city",
            features: ["WiFi rápido", "Cocina equipada", "Ubicación céntrica"],
            image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9kZXJuJTIwYXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
            badge: "",
            favorited: true
        },
        {
            id: 3,
            title: "Cabaña con vista al lago",
            location: "Valle de Bravo",
            price: 1800,
            rating: 4.92,
            beds: 2,
            baths: 1,
            type: "mountain",
            features: ["Chimenea", "Terraza privada", "Acceso al lago"],
            image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FiYSUyMGJvc3F1ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            badge: "Oferta",
            favorited: false
        },
        {
            id: 4,
            title: "Casa colonial con patio",
            location: "San Miguel de Allende",
            price: 2400,
            rating: 4.85,
            beds: 3,
            baths: 2,
            type: "city",
            features: ["Alberca", "Jardín privado", "Estilo colonial"],
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29sb25pYWwlMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            badge: "",
            favorited: false
        },
        {
            id: 5,
            title: "Penthouse con vista al mar",
            location: "Puerto Vallarta",
            price: 4500,
            rating: 4.98,
            beds: 2,
            baths: 2,
            type: "luxury",
            features: ["Jacuzzi", "Terraza panorámica", "Servicio de conserjería"],
            image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bHV4dXJ5JTIwYXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
            badge: "Lujo",
            favorited: false
        },
        {
            id: 6,
            title: "Departamento en Chapultepec",
            location: "Guadalajara, Jalisco",
            price: 1350,
            rating: 4.79,
            beds: 2,
            baths: 1,
            type: "city",
            features: ["Cocina completa", "Balcón", "Área de trabajo"],
            image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9kZXJuJTIwYXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
            badge: "",
            favorited: false
        }
    ];

    // Variables globales
    let currentFilter = "all";
    let currentSort = "recommended";
    let filteredProperties = [...propertiesData];
    const propertiesContainer = document.getElementById('properties-container');
    const resultsCount = document.getElementById('results-count');
    const sortSelect = document.getElementById('sort-select');
    const propertyModal = new bootstrap.Modal(document.getElementById('propertyModal'));
    const propertyModalTitle = document.getElementById('propertyModalTitle');
    const propertyModalBody = document.getElementById('propertyModalBody');

    // Inicializar la página
    function init() {
        renderProperties();
        setupEventListeners();
        updateResultsCount();
        initGuestSelector();
    }

    // Renderizar propiedades en el grid
    function renderProperties() {
        propertiesContainer.innerHTML = '';
        
        filteredProperties.forEach(property => {
            const propertyCard = document.createElement('div');
            propertyCard.className = 'property-card';
            propertyCard.dataset.id = property.id;
            propertyCard.innerHTML = `
                <div class="property-image" style="background-image: url('${property.image}')">
                    <button class="wishlist-button ${property.favorited ? 'favorited' : ''}">
                        <i class="${property.favorited ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                    ${property.badge ? `<div class="property-badge">${property.badge}</div>` : ''}
                </div>
                <div class="property-details">
                    <h3>${property.title}</h3>
                    <p class="location">${property.location}</p>
                    <div class="property-features">
                        <span><i class="fas fa-bed"></i> ${property.beds} ${property.beds === 1 ? 'cama' : 'camas'}</span>
                        <span><i class="fas fa-bath"></i> ${property.baths} ${property.baths === 1 ? 'baño' : 'baños'}</span>
                    </div>
                    <div class="property-price">
                        <span class="price">$${property.price.toLocaleString()}</span>
                        <span class="night">noche</span>
                        <div class="rating">
                            <i class="fas fa-star"></i> ${property.rating}
                        </div>
                    </div>
                </div>
            `;
            
            // Dividir el evento de clic en la tarjeta para evitar conflictos
            const propertyDetails = propertyCard.querySelector('.property-details');
            const propertyImage = propertyCard.querySelector('.property-image');
            
            // Solo configura el evento de clic en detalles y la imagen (excluyendo el botón de favoritos)
            propertyDetails.addEventListener('click', () => showPropertyDetails(property));
            propertyImage.addEventListener('click', (e) => {
                // Evitar que el clic en el botón de favoritos abra el modal
                if (!e.target.closest('.wishlist-button')) {
                    showPropertyDetails(property);
                }
            });
            
            propertiesContainer.appendChild(propertyCard);
        });
    }

    // Mostrar detalles de la propiedad en modal
    function showPropertyDetails(property) {
        propertyModalTitle.textContent = property.title;
        propertyModalBody.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <img src="${property.image}" class="img-fluid rounded mb-3" alt="${property.title}">
                    <div class="d-flex flex-wrap mt-2">
                        ${property.features.map(feature => `
                            <span class="badge bg-light text-dark me-2 mb-2">
                                <i class="fas fa-check-circle text-success me-1"></i>${feature}
                            </span>
                        `).join('')}
                    </div>
                </div>
                <div class="col-md-6">
                    <h4>${property.title}</h4>
                    <p><i class="fas fa-map-marker-alt text-primary"></i> ${property.location}</p>
                    <div class="d-flex mb-3">
                        <div class="me-4">
                            <i class="fas fa-bed text-primary"></i> ${property.beds} ${property.beds === 1 ? 'cama' : 'camas'}
                        </div>
                        <div class="me-4">
                            <i class="fas fa-bath text-primary"></i> ${property.baths} ${property.baths === 1 ? 'baño' : 'baños'}
                        </div>
                        <div>
                            <i class="fas fa-star text-warning"></i> ${property.rating}
                        </div>
                    </div>
                    <p class="lead">$${property.price.toLocaleString()} <small class="text-muted">por noche</small></p>
                    <p>${getPropertyDescription(property.type)}</p>
                    <div class="d-flex mt-4">
                        <button class="btn btn-outline-primary me-2">
                            <i class="fas fa-share-alt"></i> Compartir
                        </button>
                        <button class="btn btn-outline-danger toggle-favorite" data-id="${property.id}">
                            <i class="fas fa-heart"></i> ${property.favorited ? 'Quitar de favoritos' : 'Guardar en favoritos'}
                        </button>
                    </div>
                </div>
            </div>
        `;
        propertyModal.show();
        
        // Configurar evento para el botón de favoritos en el modal
        document.querySelector('.toggle-favorite').addEventListener('click', function(e) {
            e.stopPropagation();
            const propertyId = parseInt(this.dataset.id);
            toggleFavorite(propertyId);
            
            // Actualizar el texto del botón según el nuevo estado de favorito
            const property = propertiesData.find(p => p.id === propertyId);
            if (property) {
                this.innerHTML = `<i class="fas fa-heart"></i> ${property.favorited ? 'Quitar de favoritos' : 'Guardar en favoritos'}`;
            }
            
            // No cerramos el modal
            // propertyModal.hide(); - QUITADO
        });
        
        // Configurar eventos para los demás botones del modal
        const shareButton = document.querySelector('.btn-outline-primary');
        if (shareButton) {
            shareButton.addEventListener('click', function(e) {
                e.stopPropagation();
                showNotification('Enlace copiado al portapapeles');
            });
        }
    }

    // Obtener descripción según el tipo de propiedad
    function getPropertyDescription(type) {
        const descriptions = {
            beach: "Disfruta de unas vacaciones inolvidables frente al mar con todas las comodidades. Esta propiedad ofrece acceso directo a la playa y vistas espectaculares al océano.",
            city: "Ubicación perfecta para explorar la ciudad. Esta propiedad está situada en una zona céntrica con fácil acceso a restaurantes, tiendas y atracciones turísticas.",
            mountain: "Escápate a la naturaleza en esta acogedora cabaña. Rodeada de bosques y con vistas impresionantes, es el lugar perfecto para desconectar y relajarse.",
            luxury: "Experimenta el lujo en su máxima expresión. Esta propiedad premium ofrece servicios exclusivos y comodidades de alta gama para una estancia inigualable."
        };
        return descriptions[type] || "Excelente propiedad con todas las comodidades para hacer de tu estancia una experiencia memorable.";
    }

    // Alternar favorito
    function toggleFavorite(propertyId) {
        const property = propertiesData.find(p => p.id === propertyId);
        if (property) {
            property.favorited = !property.favorited;
            filterProperties(); // Filtramos nuevamente para actualizar la vista
            showNotification(property.favorited ? 
                'Añadido a tus favoritos' : 'Eliminado de tus favoritos');
        }
    }

    // Filtrar propiedades
    function filterProperties() {
        if (currentFilter === "all") {
            filteredProperties = [...propertiesData];
        } else if (currentFilter === "favorites") {
            filteredProperties = propertiesData.filter(property => property.favorited);
        } else {
            filteredProperties = propertiesData.filter(property => property.type === currentFilter);
        }
        sortProperties();
        renderProperties();
        updateResultsCount();
    }

    // Ordenar propiedades
    function sortProperties() {
        switch(currentSort) {
            case "price-asc":
                filteredProperties.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                filteredProperties.sort((a, b) => b.price - a.price);
                break;
            case "rating":
                filteredProperties.sort((a, b) => b.rating - a.rating);
                break;
            default:
                // Recomendados (orden original)
                break;
        }
    }

    // Actualizar contador de resultados
    function updateResultsCount() {
        const count = filteredProperties.length;
        resultsCount.textContent = `+${count} alojamientos en México`;
    }

    // Configurar event listeners
    function setupEventListeners() {
        // Filtros
        document.querySelectorAll('.filter-item').forEach(item => {
            item.addEventListener('click', function() {
                document.querySelectorAll('.filter-item').forEach(i => {
                    i.classList.remove('active');
                });
                this.classList.add('active');
                currentFilter = this.dataset.filter;
                filterProperties();
            });
        });

        // Ordenar
        sortSelect.addEventListener('change', function() {
            currentSort = this.value;
            filterProperties();
        });

        // Favoritos - Delegación de eventos para manejar los botones de favoritos en las tarjetas
        document.addEventListener('click', function(e) {
            if (e.target.closest('.wishlist-button')) {
                e.preventDefault();
                e.stopPropagation();
                const button = e.target.closest('.wishlist-button');
                const propertyId = parseInt(button.closest('.property-card').dataset.id);
                toggleFavorite(propertyId);
            }
        });

        // Controles de navegación para filtros
        const filtersScroll = document.querySelector('.filters-scroll');
        const leftButton = document.querySelector('.filter-nav.left');
        const rightButton = document.querySelector('.filter-nav.right');
        
        if (filtersScroll && leftButton && rightButton) {
            const updateButtonVisibility = () => {
                leftButton.style.visibility = filtersScroll.scrollLeft > 0 ? 'visible' : 'hidden';
                rightButton.style.visibility = 
                    filtersScroll.scrollWidth > filtersScroll.clientWidth + filtersScroll.scrollLeft ? 'visible' : 'hidden';
            };
            
            leftButton.addEventListener('click', () => {
                filtersScroll.scrollBy({
                    left: -200,
                    behavior: 'smooth'
                });
            });
            
            rightButton.addEventListener('click', () => {
                filtersScroll.scrollBy({
                    left: 200,
                    behavior: 'smooth'
                });
            });
            
            filtersScroll.addEventListener('scroll', updateButtonVisibility);
            window.addEventListener('resize', updateButtonVisibility);
            updateButtonVisibility();
        }

        // Paginación
        document.querySelectorAll('.page-button').forEach(button => {
            button.addEventListener('click', function() {
                if (this.classList.contains('active')) return;
                
                document.querySelectorAll('.page-button').forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                // Aquí iría la lógica para cargar más propiedades
            });
        });
        
        // Añadir manejador para cerrar el modal con el botón de cerrar
        const modalCloseButton = document.querySelector('.btn-close');
        if (modalCloseButton) {
            modalCloseButton.addEventListener('click', function() {
                propertyModal.hide();
            });
        }
    }

    // Mostrar notificación
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Inicializar selector de huéspedes
    function initGuestSelector() {
        const guestInput = document.querySelector('.guest-input');
        const guestSelector = document.querySelector('.guest-selector');
        const guestSelectorContainer = document.querySelector('.guest-selector-container');

        if (!guestInput || !guestSelector || !guestSelectorContainer) {
            return; // Si algún elemento no existe, salimos de la función
        }

        // Mostrar/ocultar selector de huéspedes
        guestInput.addEventListener('click', function(e) {
            e.stopPropagation();
            guestSelector.classList.toggle('show');
        });

        // Cerrar selector al hacer clic fuera
        document.addEventListener('click', function(e) {
            // Verificar si el clic fue fuera del selector y no en los botones de control
            if (!guestSelectorContainer.contains(e.target)) {
                guestSelector.classList.remove('show');
            }
        });

        // Actualizar contadores y texto de entrada
        function updateGuestInput() {
            const adults = parseInt(document.querySelector('.guest-count[data-type="adults"]').textContent);
            const children = parseInt(document.querySelector('.guest-count[data-type="children"]').textContent);
            const totalGuests = adults + children;
            
            let guestText = '';
            if (totalGuests === 0) {
                guestText = '¿Cuántos?';
            } else if (totalGuests === 1) {
                guestText = '1 huésped';
            } else {
                guestText = `${totalGuests} huéspedes`;
            }
            
            guestInput.value = guestText;
            updateButtonStates();
        }

        // Actualizar estado de los botones (+/-)
        function updateButtonStates() {
            document.querySelectorAll('.guest-btn').forEach(btn => {
                const type = btn.dataset.type;
                const count = parseInt(document.querySelector(`.guest-count[data-type="${type}"]`).textContent);
                
                if (btn.classList.contains('minus')) {
                    btn.disabled = (type === 'adults' && count <= 1) || 
                                  (type === 'children' && count <= 0);
                }
            });
        }

        // Manejar botones de incremento/decremento
        document.querySelectorAll('.guest-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation(); // Evita que el evento llegue al document
                const type = this.dataset.type;
                const countElement = document.querySelector(`.guest-count[data-type="${type}"]`);
                let count = parseInt(countElement.textContent);
                
                if (this.classList.contains('plus')) {
                    count++;
                } else {
                    count = Math.max(type === 'adults' ? 1 : 0, count - 1);
                }
                
                countElement.textContent = count;
                updateGuestInput();
            });
        });

        // Limpiar selección
        const clearButton = document.querySelector('.clear-guests');
        if (clearButton) {
            clearButton.addEventListener('click', function(e) {
                e.stopPropagation();
                document.querySelector('.guest-count[data-type="adults"]').textContent = '1';
                document.querySelector('.guest-count[data-type="children"]').textContent = '0';
                updateGuestInput();
            });
        }

        // Aplicar selección
        const applyButton = document.querySelector('.apply-guests');
        if (applyButton) {
            applyButton.addEventListener('click', function(e) {
                e.stopPropagation();
                guestSelector.classList.remove('show');
            });
        }

        // Inicializar
        updateGuestInput();
    }

    // Inicializar la aplicación
    init();
});