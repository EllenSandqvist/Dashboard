const addLinkBtn = document.getElementById('add-link-button');
const linkModal = document.getElementById('link-modal');
const closeLinkModal = document.getElementById('link-modal-close');

addLinkBtn.addEventListener('click', function(){
    linkModal.classList.remove('link-modal-hidden');
});

closeLinkModal.addEventListener('click', function(){
    linkModal.classList.add('link-modal-hidden');
})
