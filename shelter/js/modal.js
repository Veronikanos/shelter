class Modal {
  constructor(classes) {
    this.classes = classes;
    this.modal = '';
    this.modalContent = '';
    this.modalCloseBtn = '';
  }

  buildModal(content) {
    this.overlay = this.createDomNode(
      this.overlay,
      'div',
      'overlay',
      'overlay_modal'
    );

    this.modal = this.createDomNode(
      this.modal,
      'div',
      'modal',
      this.classes
    );

    this.modalContent = this.createDomNode(
      this.modalContent,
      'div',
      'modal_content'
    );

    this.modalCloseBtn = this.createDomNode(
      this.modalContent,
      'span',
      'modal__content-icon'
    );
    this.modalCloseBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path fill-rule="evenodd" clip-rule="evenodd" d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z" fill="#292929"/>
		</svg>
		`;

    this.setContent(content);
    this.appendModalElements();
    this.openModal();
  }

  createDomNode(node, element, ...classes) {
    node = document.createElement(element);
    node.classList.add(...classes);
    return node;
  }

  setContent(content) {
    if (typeof content === 'string')
      this.modalContent.innerHTML = content;
    else {
      this.modalContent.innerHTML = '';
      this.modalContent.append(content);
    }
  }

  appendModalElements() {
    this.modal.append(this.modalCloseBtn);
    this.modal.append(this.modalContent);
    this.overlay.append(this.modal);
  }

  openModal() {
    document.body.append(this.overlay);
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    document.querySelector('.overlay').remove();
    document.body.style.overflow = 'auto';
  }
}

const petCardElements = document.querySelector('.our-friends-list');

petCardElements.addEventListener('click', (e) => {
  const activeElement = e.target.closest('li');
  if (!activeElement) return;
  generateToolsModal(activeElement);
});

let pets;
getDataFromJson();

async function getDataFromJson() {
  try {
    const res = await fetch('./assets/data.json');
    pets = await res.json();
  } catch (err) {
    console.log(err.message);
  }
}

function generateToolsModal(activeElement) {
  const id = activeElement.dataset.id;
  const el = pets.find((item) => item.id == id);
  renderModal(` <div class="modal-image__wrapper">
		<img class="modal-image" src=${el.img}	alt="${el.name} - ${el.breed}" />
		</div>
				<div class="modal-text">
					<h3 class="modal-text__title">${el.name}</h3>
					<h4 class="modal-text__subtitle">${el.type} - ${el.breed}</h4>
					<p class="modal-text__description">
					${el.description} 
					</p>
					<ul class="modal-text__list">
						<li class="modal-text__list-item">
							<span>Age: </span>${el.age}
						</li>
						<li class="modal-text__list-item">
							<span>Inoculations: </span>
							${el.inoculations}
						</li>
						<li class="modal-text__list-item">
							<span>Diseases: </span>${el.diseases}
						</li>
						<li class="modal-text__list-item">
							<span>Parasites: </span>${el.parasites}
						</li>
					</ul>
				</div>`);
}

function renderModal(content) {
  let modal = new Modal('tools-modal');
  // console.log(modal);
  modal.buildModal(content);

  document
    .querySelector('.overlay')
    .addEventListener('click', (e) => {
      if (
        e.target.classList.contains('overlay') ||
        e.target.closest('span')
      )
        handleModalClose(modal);
      return;
    });
}

function handleModalClose(modal) {
  modal.closeModal();
}
