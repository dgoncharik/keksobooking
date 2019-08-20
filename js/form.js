
'use strict';

(function() {
  var adFormElement = document.querySelector('.ad-form');
  var addressElement = adFormElement.querySelector('#address');
  var priceElement = adFormElement.querySelector('#price');
  var housTypeElement = adFormElement.querySelector('#type');
  var timeInElement = adFormElement.querySelector('#timein');
  var timeOutElement = adFormElement.querySelector('#timeout');
  var formElements = Array.from(adFormElement.querySelectorAll(['input', 'select', 'textarea', 'button', 'label']));
  var roomNumberElement = adFormElement.querySelector('#room_number');
  var capacityElement = adFormElement.querySelector('#capacity');
  var htmlClassDisabled = 'ad-form--disabled';
  var inputAvatar = adFormElement.querySelector('#avatar');
  var avatarContainer = adFormElement.querySelector('.ad-form-header__preview');
  var previewAvatar = avatarContainer.querySelector('img');
  var inputHouseImages = adFormElement.querySelector('#images');
  var housingPreviewContainer = adFormElement.querySelector('.ad-form__photo-container');
  var avatarFile = null; /* null - стандартный аватар */
  var srcDefaultAvatar = 'img/muffin-grey.svg';
  var housingPhotos = [];
  var onAdFormElementSubmit = null;
  var onAdFormElementReset = null;
  var MIN_NUMBER_ROOMS_NOT_FOR_GUESTS = 100;
  var roomsToGuests = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

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

  function setMinPrice() {
    var minPrice = housingTypeToPrice[housTypeElement.value];
    priceElement.min = minPrice;
    priceElement.placeholder = minPrice;
  }

  function setValueField(field, value) {
    field.value = value;
  }

  function disableBadGuestOptions() {
    [].forEach.call(capacityElement.options, capacityOption => {
       var badOption = roomsToGuests[roomNumberElement.value].indexOf(capacityOption.value) == -1;
       badOption ? capacityOption.disabled = true : capacityOption.disabled = false;
     })
   }

   function validateCapacity() {
    var message;
    var rooms = roomNumberElement.value;
    var guests = capacityElement.value;
    switch (true) {
      case (rooms >= MIN_NUMBER_ROOMS_NOT_FOR_GUESTS && guests > 0):
        message = 'Слишком много комнат для выбранного количества гостей ;)';
        break;
      case (rooms < MIN_NUMBER_ROOMS_NOT_FOR_GUESTS && guests < 1):
        message = 'Нужно выбрать количество гостей.'
        break;
      case (rooms < guests):
        message = 'Все гости не вместятся в выбранное количество комнат ;)'
        break;
      default:
        message = '';
        break;
    }
    capacityElement.setCustomValidity(message);
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

  function isDefaultAvatar() {
    return !avatarFile;
  }

  function getFormData() {
    var formData = new FormData(adFormElement);
    if (avatarFile){
      formData.append('avatar', avatarFile);
    }
    housingPhotos.forEach(photo => {
      formData.append('images', photo);
    })
    return formData;
  }

  function onAvatarContainerMouseEnter(evt) {
    evt.preventDefault();
    if (!isDefaultAvatar() && isFormEnable()) {
      avatarContainer.classList.add('ad-form-header__preview--delete');
    }
  }

  function onAvatarContainerMouseLeave(evt) {
    evt.preventDefault();
    if (isFormEnable()) {
      avatarContainer.classList.remove('ad-form-header__preview--delete');
    }
  }

  function onAvatarContainerClick(evt) {
    evt.preventDefault();
    if (isFormEnable()) {
      setDefaultAvatar();
    }
  }

  function setAvatar(file) {
    if (typeUploadFileIsImage(file)) {
      avatarFile = file;
      setDataUrl(previewAvatar, avatarFile);
    }
  }

  function setDefaultAvatar() {
    avatarFile = null;
    avatarContainer.classList.remove('ad-form-header__preview--delete');
    previewAvatar.src = srcDefaultAvatar;
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
        if (isFormEnable() && indexFile != -1) {
          housingPhotos.splice(indexFile, 1);
          preview.remove();
          restoreEmptyPreview();
        }
      })
      preview.addEventListener('mouseenter', function(evt) {
        evt.preventDefault();
        if (isFormEnable()) {
          preview.classList.add('ad-form__photo--delete');
        }
        
      })
      preview.addEventListener('mouseleave', function(evt) {
        evt.preventDefault();
        if (isFormEnable()) {
          preview.classList.remove('ad-form__photo--delete');
        }
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

  function onTimeInElementChange(evt) {
    evt.preventDefault();
    setValueField(timeOutElement, timeInElement.value);
  }

  function onTimeOutElementChange(evt) {
    evt.preventDefault();
    setValueField(timeInElement, timeOutElement.value);
  }

  housTypeElement.addEventListener('change', function(evt) {
    evt.preventDefault();
    setMinPrice();
  });

  timeInElement.addEventListener('change', onTimeInElementChange);

  timeOutElement.addEventListener('change', onTimeOutElementChange);

  roomNumberElement.addEventListener('change', function(evt) {
    evt.preventDefault();
    disableBadGuestOptions()
    validateCapacity();
  })

  capacityElement.addEventListener('change', function(evt) {
    evt.preventDefault();
    disableBadGuestOptions()
    validateCapacity();
  })

  inputAvatar.addEventListener('change', function(evt) {
    evt.preventDefault();
    var uploadedFile = inputAvatar.files[0];
    if (uploadedFile) {
      setAvatar(uploadedFile);
    }
    inputAvatar.value = '';
  })

  avatarContainer.addEventListener('mouseenter', onAvatarContainerMouseEnter);
  avatarContainer.addEventListener('mouseleave', onAvatarContainerMouseLeave);
  avatarContainer.addEventListener('click', onAvatarContainerClick);

  inputHouseImages.addEventListener('change', function(evt) {
    evt.preventDefault();
    var files = Array.from(inputHouseImages.files);
    addHousingPhotos(files);
  })

  adFormElement.addEventListener('reset', function() {
    setDefaultAvatar();
    clearHousingPhotos();
    setTimeout(setMinPrice, 0);
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
    disableBadGuestOptions();
    validateCapacity();
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
