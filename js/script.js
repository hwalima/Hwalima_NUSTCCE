document.addEventListener('DOMContentLoaded', function() {
    // Initialize WOW.js for animations
    new WOW().init();

    // Stage Modal functionality
    const modalContainer = document.querySelector('.stage-modal-container');
    const stageCards = document.querySelectorAll('.stage-card');
    const stages = ['planning', 'development', 'quality', 'deployment'];
    let currentStageIndex = 0;
    let currentModal = null;

    // Excellence Modal functionality
    const excellenceModalContainer = document.querySelector('.excellence-modal-container');
    const excellenceCards = document.querySelectorAll('.excellence-card');
    const excellenceTypes = ['academic', 'industry', 'market'];
    let currentExcellenceIndex = 0;
    let currentExcellenceModal = null;

    // Function to show specific stage
    function showStage(stageIndex) {
        if (currentModal) {
            currentModal.classList.remove('active');
            currentModal.style.display = 'none';
        }

        const stageName = stages[stageIndex];
        const modal = document.getElementById(`modal-${stageName}`);
        
        if (modal) {
            modal.style.display = 'block';
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            currentModal = modal;
            currentStageIndex = stageIndex;
        }
    }

    // Function to show specific excellence
    function showExcellence(excellenceIndex) {
        if (currentExcellenceModal) {
            currentExcellenceModal.classList.remove('active');
            currentExcellenceModal.style.display = 'none';
        }

        const excellenceName = excellenceTypes[excellenceIndex];
        const modal = document.getElementById(`modal-${excellenceName}`);
        
        if (modal) {
            modal.style.display = 'block';
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            currentExcellenceModal = modal;
            currentExcellenceIndex = excellenceIndex;
        }
    }

    // Handle stage navigation clicks
    document.querySelectorAll('.prev-stage').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            let newIndex = currentStageIndex - 1;
            if (newIndex < 0) newIndex = stages.length - 1;
            showStage(newIndex);
        });
    });

    document.querySelectorAll('.next-stage').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            let newIndex = currentStageIndex + 1;
            if (newIndex >= stages.length) newIndex = 0;
            showStage(newIndex);
        });
    });

    // Handle excellence navigation clicks
    document.querySelectorAll('.prev-excellence').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            let newIndex = currentExcellenceIndex - 1;
            if (newIndex < 0) newIndex = excellenceTypes.length - 1;
            showExcellence(newIndex);
        });
    });

    document.querySelectorAll('.next-excellence').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            let newIndex = currentExcellenceIndex + 1;
            if (newIndex >= excellenceTypes.length) newIndex = 0;
            showExcellence(newIndex);
        });
    });

    // Add keyboard navigation for both modals
    document.addEventListener('keydown', function(e) {
        if (currentModal) {
            if (e.key === 'ArrowLeft') {
                let newIndex = currentStageIndex - 1;
                if (newIndex < 0) newIndex = stages.length - 1;
                showStage(newIndex);
            } else if (e.key === 'ArrowRight') {
                let newIndex = currentStageIndex + 1;
                if (newIndex >= stages.length) newIndex = 0;
                showStage(newIndex);
            }
        } else if (currentExcellenceModal) {
            if (e.key === 'ArrowLeft') {
                let newIndex = currentExcellenceIndex - 1;
                if (newIndex < 0) newIndex = excellenceTypes.length - 1;
                showExcellence(newIndex);
            } else if (e.key === 'ArrowRight') {
                let newIndex = currentExcellenceIndex + 1;
                if (newIndex >= excellenceTypes.length) newIndex = 0;
                showExcellence(newIndex);
            }
        }
    });

    // Handle stage card clicks
    stageCards.forEach(card => {
        card.addEventListener('click', function() {
            const stage = this.dataset.stage;
            const stageIndex = stages.indexOf(stage);
            
            if (stageIndex !== -1) {
                document.body.style.overflow = 'hidden';
                modalContainer.style.display = 'block';
                setTimeout(() => {
                    modalContainer.classList.add('active');
                }, 10);
                showStage(stageIndex);
            }
        });
    });

    // Handle excellence card clicks
    excellenceCards.forEach(card => {
        card.addEventListener('click', function() {
            const excellence = this.dataset.excellence;
            const excellenceIndex = excellenceTypes.indexOf(excellence);
            
            if (excellenceIndex !== -1) {
                document.body.style.overflow = 'hidden';
                excellenceModalContainer.style.display = 'block';
                setTimeout(() => {
                    excellenceModalContainer.classList.add('active');
                }, 10);
                showExcellence(excellenceIndex);
            }
        });
    });

    // Close modal function for stages
    function closeStageModal() {
        if (currentModal) {
            currentModal.classList.remove('active');
            modalContainer.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                currentModal.style.display = 'none';
                modalContainer.style.display = 'none';
                currentModal = null;
            }, 300);
        }
    }

    // Close modal function for excellence
    function closeExcellenceModal() {
        if (currentExcellenceModal) {
            currentExcellenceModal.classList.remove('active');
            excellenceModalContainer.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                currentExcellenceModal.style.display = 'none';
                excellenceModalContainer.style.display = 'none';
                currentExcellenceModal = null;
            }, 300);
        }
    }

    // Close button click handlers
    document.querySelectorAll('.modal-close').forEach(button => {
        button.addEventListener('click', function() {
            if (this.closest('.stage-modal')) {
                closeStageModal();
            } else if (this.closest('.excellence-modal')) {
                closeExcellenceModal();
            }
        });
    });

    // Close on background click
    modalContainer?.addEventListener('click', function(e) {
        if (e.target === modalContainer) {
            closeStageModal();
        }
    });

    excellenceModalContainer?.addEventListener('click', function(e) {
        if (e.target === excellenceModalContainer) {
            closeExcellenceModal();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (currentModal) closeStageModal();
            if (currentExcellenceModal) closeExcellenceModal();
        }
    });

    // Add hover effects for skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1.2) rotate(5deg)';
        });

        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});
