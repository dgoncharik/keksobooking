
'use strict';

(function() {
  var adFormElement = document.querySelector('.ad-form');
  var addressElement = adFormElement.querySelector('#address');
  var priceElement = adFormElement.querySelector('#price');
  var housTypeElement = adFormElement.querySelector('#type');
  var timeInElement = adFormElement.querySelector('#timein');
  var timeOutElement = adFormElement.querySelector('#timeout');
  var formElements = Array.from(adFormElement.querySelectorAll(['input', 'select', 'textarea', 'button', 'label']));
  var htmlClassDisabled = 'ad-form--disabled';
  var inputAvatar = adFormElement.querySelector('#avatar');
  var avatarContainer = adFormElement.querySelector('.ad-form-header__preview');
  var previewAvatar = avatarContainer.querySelector('img');
  var inputHouseImages = adFormElement.querySelector('#images');
  var housingPreviewContainer = adFormElement.querySelector('.ad-form__photo-container');
  var housingPhotos = [];
  var onAdFormElementSubmit = null;
  var onAdFormElementReset = null;

  var housingTypeToPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  function setSubmitCallback(fn) {
    onAdFormElementSubmit = fn;
  }

  function setResetCallback(fn) {
    onAdFormElementReset = fn;
  }

  function resetForm() {
    adFormElement.reset();
  }

  function enableForm() {
    formElements.forEach(element => {
      element.style.cursor = '';
      element.removeAttribute('disabled');
    });
    adFormElement.classList.remove(htmlClassDisabled);
  }

  function disableForm() {
    formElements.forEach(element => {
      element.style.cursor = 'default';
      element.disabled = true;
    });
    adFormElement.classList.add(htmlClassDisabled);
  }

  function isFormEnable() {
    return !adFormElement.classList.contains(htmlClassDisabled);
  }

  function setAddress(coord) { /* coord = {x: value, y: value} */
    addressElement.value = coord.x + ', ' + coord.y;
  }

  function setMinPrice(value) {
    priceElement.min = value;
    priceElement.placeholder = value;
  }

  function setValueField(field, value) {
    field.value = value;
  }

  function getFormData() {
    var formData = new FormData(adFormElement);
    housingPhotos.forEach(photo => {
      formData.append('images', photo);
    })
    return formData;
  }

  function typeUploadFileIsImage(uploadedFile) {
    return uploadedFile.type.toLowerCase().startsWith('image/');
  }

  function setDataUrl(imgElement, uploadedFile) {
    var reader = new FileReader();
    reader.addEventListener('load', function() {
      imgElement.src = reader.result;
    })
    reader.readAsDataURL(uploadedFile);
  }

  function onAvatarContainerMouseEnter() {
    avatarContainer.classList.add('ad-form-header__preview--delete');
  }

  function onAvatarContainerMouseLeave() {
    avatarContainer.classList.remove('ad-form-header__preview--delete');
  }

  function onAvatarContainerClick() {
    onAvatarContainerMouseLeave();
    setDefaultAvatar();
  }

  function avatarContainerRemoveEventListeners() {
    avatarContainer.removeEventListener('mouseenter', onAvatarContainerMouseEnter);
    avatarContainer.removeEventListener('mouseleave', onAvatarContainerMouseLeave);
    avatarContainer.removeEventListener('click', onAvatarContainerClick);
  }

  function setAvatar(file) {
    if (typeUploadFileIsImage(file)) {
      setDataUrl(previewAvatar, file);
      avatarContainerRemoveEventListeners();
      avatarContainer.addEventListener('mouseenter', onAvatarContainerMouseEnter);
      avatarContainer.addEventListener('mouseleave', onAvatarContainerMouseLeave);
      avatarContainer.addEventListener('click', onAvatarContainerClick);
    } else {
      setDefaultAvatar();
    }
  }

  function setDefaultAvatar() {
    avatarContainerRemoveEventListeners();
    previewAvatar.src = 'img/muffin-grey.svg';
    inputAvatar.value = '';
  }

  function removeEmptyPreviews() {
    var photos = housingPreviewContainer.querySelectorAll('.ad-form__photo');
    photos.forEach(photo => {
      if (!photo.querySelector('img')) {
        photo.remove();
      }
    })
  }

  function restoreEmptyPreview() {
    var btnUpload = housingPreviewContainer.querySelector('.ad-form__upload');
    if (housingPreviewContainer.lastElementChild === btnUpload) {
      var emtyPreview = renderHousingPreview(false);
      housingPreviewContainer.appendChild(emtyPreview);
    }
  }

  function clearHousingPhotos() {
    var photos = Array.from(housingPreviewContainer.querySelectorAll('.ad-form__photo'));
    housingPhotos = [];
    photos.forEach(photo => {
      photo.remove();
    })
    restoreEmptyPreview();
  }

  function renderHousingPreview(file) {
    var preview = document.createElement('div');
    preview.classList.add('ad-form__photo');
    if (file) {
      preview.file = file;
      var img = document.createElement('img');
      img.width = 70;
      img.height = 70;
      img.style.borderRadius = '5px';
      img.alt = 'Фотография жилья';
      setDataUrl(img, file);
      preview.addEventListener('click', function() {
        var indexFile = housingPhotos.indexOf(preview.file);
        if (indexFile != -1) {
          housingPhotos.splice(indexFile, 1);
          preview.remove();
          restoreEmptyPreview();
        }
      })
      preview.addEventListener('mouseenter', function() {
        preview.classList.add('ad-form__photo--delete')
      })
      preview.addEventListener('mouseleave', function() {
        preview.classList.remove('ad-form__photo--delete')
      })
      preview.appendChild(img);
    }
    return preview;
  }

  function addHousingPhotos(arrFiles) {
    var fragment = document.createDocumentFragment();
    removeEmptyPreviews();
    arrFiles.forEach(file => {
      if (typeUploadFileIsImage(file)) {
        housingPhotos.push(file);
        fragment.appendChild(renderHousingPreview(file));
      }
    })
    housingPreviewContainer.appendChild(fragment);
    restoreEmptyPreview();
    inputHouseImages.value = '';
  }

  function onHousTypeElementClick(evt) {
    setMinPrice(housingTypeToPrice[evt.target.value]);
  }

  function onTimeInElementChange() {
    setValueField(timeOutElement, timeInElement.value);
  }

  function onTimeOutElementChange() {
    setValueField(timeInElement, timeOutElement.value);
  }

  housTypeElement.addEventListener('change', onHousTypeElementClick);

  timeInElement.addEventListener('change', onTimeInElementChange);

  timeOutElement.addEventListener('change', onTimeOutElementChange);

  inputAvatar.addEventListener('change', function(evt) {
    evt.preventDefault();
    var uploadedFile = inputAvatar.files[0];
    setAvatar(uploadedFile);
  })

  inputHouseImages.addEventListener('change', function(evt) {
    evt.preventDefault();
    var files = Array.from(inputHouseImages.files);
    addHousingPhotos(files);
  })

  adFormElement.addEventListener('reset', function() {
    setDefaultAvatar();
    clearHousingPhotos();
    if (onAdFormElementReset) {
      setTimeout(onAdFormElementReset, 0);
    }
  })

  adFormElement.addEventListener('submit', function(evt) {
    if (onAdFormElementSubmit) {
      onAdFormElementSubmit(evt);
    }
  })

  function initialization() {
    setMinPrice(housingTypeToPrice[housTypeElement.value]);
  }

  initialization();

  window.form = {
    reset: resetForm,
    enable: enableForm,
    disable: disableForm,
    isEnable: isFormEnable,
    setAddress: setAddress,
    getFormData: getFormData,
    setResetCallback: setResetCallback,
    setSubmitCallback: setSubmitCallback
  };
}())
