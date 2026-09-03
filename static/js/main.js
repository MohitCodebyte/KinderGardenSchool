// Client-side Interactivity for Apna Preschool Website

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Main Menu Toggle
    const menuButtons = document.querySelectorAll('[data-menu-toggle]');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuButtons && mobileMenu) {
        menuButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        });
    }

    // Mobile Accordion Menus (Programs & More)
    const accordionTriggers = document.querySelectorAll('[data-accordion-toggle]');
    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = trigger.getAttribute('data-accordion-toggle');
            const targetAccordion = document.getElementById(targetId);
            const arrow = trigger.querySelector('.accordion-arrow');

            if (targetAccordion) {
                targetAccordion.classList.toggle('hidden');
                if (arrow) {
                    arrow.classList.toggle('rotate-180');
                }
            }
        });
    });

    // Desktop Dropdown Timeout Delay (150ms delay on mouseleave for smooth UX)
    const dropdownGroups = document.querySelectorAll('.dropdown-group');
    dropdownGroups.forEach(group => {
        let leaveTimeout = null;

        group.addEventListener('mouseenter', () => {
            if (leaveTimeout) {
                clearTimeout(leaveTimeout);
                leaveTimeout = null;
            }
            group.classList.add('is-open');
        });

        group.addEventListener('mouseleave', () => {
            leaveTimeout = setTimeout(() => {
                group.classList.remove('is-open');
            }, 150);
        });
    });

    // Modal Handlers
    const openModalBtns = document.querySelectorAll('[data-open-modal]');
    const closeModalBtns = document.querySelectorAll('[data-close-modal]');

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = btn.getAttribute('data-open-modal');
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.classList.remove('hidden');
                targetModal.classList.add('flex');
            }
        });
    });

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-overlay');
            if (modal) {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }
        });
    });

    // Tab Switching
    const tabButtons = document.querySelectorAll('[data-tab-target]');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-tab-target');
            const tabGroup = btn.closest('.tab-group') || document;
            
            tabGroup.querySelectorAll('[data-tab-target]').forEach(b => {
                b.classList.remove('active', 'bg-primary-container', 'text-on-primary-container');
                b.classList.add('bg-surface-container', 'text-on-surface-variant');
            });

            btn.classList.add('active', 'bg-primary-container', 'text-on-primary-container');
            btn.classList.remove('bg-surface-container', 'text-on-surface-variant');

            tabGroup.querySelectorAll('.tab-content').forEach(content => {
                if (content.id === targetId) {
                    content.classList.remove('hidden');
                } else {
                    content.classList.add('hidden');
                }
            });
        });
    });

    // Gallery Tab Filter Handler
    const galleryTabBtns = document.querySelectorAll('[data-gallery-filter], .gallery-tab-btn');
    const galleryItemCards = document.querySelectorAll('[data-gallery-category], .gallery-item');

    if (galleryTabBtns.length > 0) {
        galleryTabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetFilter = (btn.getAttribute('data-gallery-filter') || btn.textContent.trim().toLowerCase()).trim().toLowerCase();
                const parentGroup = btn.closest('.flex') || btn.parentElement;

                // Visually update active state immediately
                if (parentGroup) {
                    parentGroup.querySelectorAll('button, a').forEach(b => {
                        b.classList.remove('active', 'bg-primary', 'text-white', 'text-on-primary', 'border-primary', 'shadow-sm');
                        b.classList.add('bg-surface-container-highest', 'text-on-surface-variant', 'border-transparent');
                    });
                }

                btn.classList.add('active', 'bg-primary', 'text-white', 'border-primary', 'shadow-sm');
                btn.classList.remove('bg-surface-container-highest', 'text-on-surface-variant', 'border-transparent');

                // Smooth fade transition when switching image sets
                galleryItemCards.forEach(item => {
                    const category = (item.getAttribute('data-gallery-category') || '').trim().toLowerCase();
                    if (targetFilter === 'all' || category === targetFilter || category.includes(targetFilter)) {
                        item.classList.remove('hidden');
                        item.style.transition = 'opacity 250ms ease, transform 250ms ease';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 20);
                    } else {
                        item.style.transition = 'opacity 200ms ease, transform 200ms ease';
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            item.classList.add('hidden');
                        }, 200);
                    }
                });
            });
        });
    }
});

