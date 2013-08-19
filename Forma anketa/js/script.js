window.l = function (str) {
  if (typeof (window['console']) !== 'undefined') {
    console.log(str);
  }
};

$.fn.isAfter = function (sel) {
  return this.prevAll(sel).length !== 0;
}
$.fn.isBefore = function (sel) {
  return this.nextAll(sel).length !== 0;
}

if (typeof String.prototype.endsWith !== 'function') {
  String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
  };
}
if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str) {
    return this.indexOf(str) == 0;
  };
}

var Validation = {};
Validation.variables = {
  //#region шаг 1
  'year': {
    events: [
		'blur',
    'keyup'
    ],
    validators: [
		{
		  validator: 'is_not_empty',
		  errorMessage: 'Требуется указать год рождения'
		},
		{
		  validator: 'is_year',
		  errorMessage: 'Год рождения должен состоять из четырех чисел'
		},
    {
      validator: 'is_year_in_the_past',
      errorMessage: 'Вы действительно из будущего?'
    }
    ]
  },
  'city': {
    events: [
		'blur',
    'keyup'
    ],
    validators: [
		{
		  validator: 'is_not_empty',
		  errorMessage: 'Требуется указать город проживания'
		}]
  },
  'education': {
    events: [
		'blur',
    'keyup'
    ],
    validators: [
		{
		  validator: 'is_not_empty',
		  errorMessage: 'Требуется указать сведения об образовании'
		}
    ]
  },
  'education_last_year': {
    events: [
		'blur',
    'keyup'
    ],
    validators: [
		{
		  validator: 'is_not_empty',
		  errorMessage: 'Требуется указать год окончания вуза, если вы еще не выпустились, то укажите предполагаемый год окончания'
		},
    {
      validator: 'is_year',
      errorMessage: 'Год окончания вуза должен состоять из четырех чисел'
    }
    ]
  },
  //#endregion

  //#region шаг 2
  'school_expectation': {
    events: [
		'blur',
    'keyup'
    ],
    validators: [
		{
		  validator: 'is_not_empty',
		  errorMessage: 'Неужели совсем ничего не ожидаете?'
		}
    ]
  },
  'school_source': {
    events: [
		'blur',
    'keyup'
    ],
    validators: [
		{
		  validator: 'is_not_empty',
		  errorMessage: 'Укажите ваш источник, хотя бы кодовое имя =)'
		}]
  },
  //#endregion

  //#region шаг 3
  'experience': {
    events: [
		'blur',
    'keyup'
    ],
    validators: [
		{
		  validator: 'is_not_empty',
		  errorMessage: 'Ну не скромничайте, напишите нам о своём опыте разработки, даже если вы считаете его не очень серьезным'
		}
    ]
  },
  'software': {
    events: [
		'blur',
    'keyup'
    ],
    validators: [
		{
		  validator: 'is_not_empty',
		  errorMessage: 'Укажите хотя бы парочку программных продуктов, чтобы мы имели представление о вашем рабочем процессе'
		}]
  },
  //#endregion

  //#region шаг 4
  'task1': {
    events: [
		'blur',
    'keyup'
    ],
    validators: [
		{
		  validator: 'is_url',
		  errorMessage: 'Тут должна быть корректная ссылка на http://jsfiddle.net/ или или на ваш репозиторий на https://github.com/'
		}
    ]
  },
  'task2': {
    events: [
		'blur',
    'keyup'
    ],
    validators: [
		{
		  validator: 'is_url',
		  errorMessage: 'Тут должна быть корректная ссылка на http://jsfiddle.net/ или или на ваш репозиторий на https://github.com/'
		}
    ]
  },
  'task3': {
    events: [
		'blur',
    'keyup'
    ],
    validators: [
		{
		  validator: 'is_url_git',
		  errorMessage: 'Тут должна быть корректная ссылка на ваш репозиторий на https://github.com/'
		}
    ]
  },
  //#endregion

  //#region шаг 5
  'name': {
    events: [
		'blur'
    ],
    validators: [
		{
		  validator: 'is_not_empty',
		  errorMessage: 'Представтесь, пожалуйста'
		}
    ]
  },
  'email': {
    events: [
		'blur',
    'keyup'
    ],
    validators: [
		{
		  validator: 'is_not_empty',
		  errorMessage: 'Требуется указать E-mail'
		},
    {
      validator: 'is_email',
      errorMessage: 'Требуется указать корректный E-mail'
    }
    ]
  },
  'ya_source': {
    events: [
		'blur',
    'change'
    ],
    validators: [
		{
		  validator: 'is_selected',
		  errorMessage: 'Укажите, пожалуйста, откуда вы о нас узнали'
		}
    ]
  },
  'personal_data_cb': {
    events: [
    'change'
    ],
    validators: [
		{
		  validator: 'is_checked',
		  errorMessage: 'Для дальнейшей обработки данных нам нужно ваше согласие'
		}
    ]
  },
  //#endregion
};

Validation.tabVariable = {
  'person': [
    'year',
    'city',
    'education',
    'education_last_year'
  ],
  'school': [
    'school_expectation',
    'school_source'
  ],
  'workflow': [
    'experience',
    'software'
  ],
  'tasks': [
    'task1',
    'task2',
    'task3'
  ],
  'about': [
    'name',
    'email',
    'ya_source',
    'personal_data_cb'
  ],

};

Validation.validators = {
  is_not_empty: function (value) {
    return $.trim(value)
  },
  is_year: function (value) {
    var yearReg = /^\d{4}$/;
    return yearReg.test(value);
  },
  is_year_in_the_past: function (value) {
    var year = new Date().getFullYear();
    return value <= year;
  },
  is_url: function (value) {
    return this.is_url_git(value) || $.trim(value).startsWith('http://jsfiddle.net/');
  },
  is_url_git: function (value) {
    return !this.is_not_empty(value) || $.trim(value).startsWith('https://github.com/');
  },
  is_email: function (value) {
    if (!value) {
      return true;
    }
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
  },
  is_checked: function (value) {
    return value;
  },
  is_selected: function (value) {
    return value !== '-1';
  }
};

Validation.validateTab = function (tabName) {
  var result = true;
  if (!Validation.tabVariable[tabName]) {
    return result;
  }
  for (var i in Validation.tabVariable[tabName]) {
    var $el = $('[name=' + Validation.tabVariable[tabName][i] + ']');
    result = Validation.validate($el);
    if (!result) { break; }
  }
  return result;
};

Validation.validate = function ($el) {
  var name = $el.attr('name');
  var result = true;
  var value = $el.val();
  if ($el.attr('type') === 'checkbox') {
    value = $el.is(':checked');
  }

  for (var k in Validation.variables[name].validators) {
    var validatorObj = Validation.variables[name].validators[k];
    if (!Validation.validators[validatorObj.validator](value)) {
      result = false;
      $el.nextAll('.error').html('<p>' + validatorObj.errorMessage + '</p>');
      break;
    }
  }
  if (result) {
    $el.nextAll('.error').html('');
  }
  return result;
};

Validation.queryServerJson = function (requestData, callbackFunction, url) {
  requestData = requestData || {};
  var request = $.ajax({
    dataType: 'json',
    url: url,
    data: requestData
  });
  request.done(function (response) {

    var isJson = true;
    try {
      var json = $.parseJSON(response);
    }
    catch (err) {
      isJson = false;
    }
    if (isJson) {
      callbackFunction(response);
    }
    else {
      l('Объект не в json формате: ' + response.data);
    }
  });
  request.fail(function (request, textStatus, errorThrown) {
    l("Returnes: " + request.responseText);
    l("Status: " + textStatus);
    l("Error: " + errorThrown);
  });
}

$(document).ready(function () {

  //#region валидация
  for (var name in Validation.variables) {
    var $el = $('[name=' + name + ']');
    if ($el.attr('type') === 'checkbox') {
      var $next = $el.next('label');
      $next.andSelf().wrapAll('<div class="container"/>');
      $next.after('<div class="error" />');
    }
    else {
      $el.wrap('<div class="container" />').after('<div class="error" />');
    }
    for (var i in Validation.variables[name]['events']) {
      var event = Validation.variables[name]['events'][i];
      $el.off(event + '.validationEvent').on(event + '.validationEvent', function (e) {
        Validation.validate($(this));
      });
    }
  }
  //#endregion

  //#region шаги
  $('.tab:not(:first):not(:last)').append('<button class="prev">Назад</button>');
  $('<button class="prev">Назад</button>').insertBefore('.submit');
  $('.tab:not(:last)').append('<button class="next">Далее</button>');
  $('.tab:first').addClass('current');
  $('.section-tabs li:not(:first)').addClass('disabled_li');
  $('.section-tabs li:first').addClass('current_li');
  $('.tab:not(:first)').addClass('hidden');

  $('.next').on('click', function () {
    var $parent = $(this).parent();
    var curTabName = $.trim($parent.attr('class').replace('tab', '').replace('current', ''));
    if (Validation.validateTab(curTabName)) {
      $('li.' + curTabName).toggleClass('current_li');
      $parent.toggleClass('current').toggleClass('hidden');

      $parent.next().toggleClass('current').toggleClass('hidden');
      var nextTabName = $.trim($parent.next().attr('class').replace('tab', '').replace('current', ''));
      $('li.' + nextTabName).toggleClass('current_li').removeClass('disabled_li');

      $(window).scrollTop(0);
    }
  });
  $('.submit').on('click', function () {
    var $parent = $(this).parent();
    var curTabName = $.trim($parent.attr('class').replace('tab', '').replace('current', ''));
    if (Validation.validateTab(curTabName)) {

      var toServer = {};
      $.each($('[name]'), function () {
        var name = $(this).attr('name');

        if ($(this).attr('type') === 'checkbox') {
          var value = $(this).is(':checked');
          toServer[name] = value;
        }
        else if ($(this).attr('type') === 'radio') {
          if ($(this).is(':checked')) {
            toServer[name] = $(this).val();
          }
        }
        else {
          var value = $(this).val();
          toServer[name] = value;
        }

      });

      //отправка на сервер
      /*Validation.queryServerJson(toServer, function (response) {
        alert('Анкета принята');
      }, 'http://example.com');*/
      alert('Анкета принята!');
      l(toServer);
    }
  });

  $('.prev').on('click', function () {
    var $parent = $(this).parent();
    var curTabName = $.trim($parent.attr('class').replace('tab', '').replace('current', ''));
    $('li.' + curTabName).toggleClass('current_li');
    $parent.toggleClass('current').toggleClass('hidden');

    $parent.prev().toggleClass('current').toggleClass('hidden');
    var prevTabName = $.trim($parent.prev().attr('class').replace('tab', '').replace('current', ''));
    $('li.' + prevTabName).toggleClass('current_li');

    $(window).scrollTop(0);
  });

  $('.section-tabs li').on('click', function () {
    if (!$(this).hasClass('disabled_li')) {
      var $curLi = $('li.current_li');
      var clickedLi = $(this).attr('class');

      if ($(this).isAfter('li.current_li')) {
        var curTabName = $.trim($('.tab.current').attr('class').replace('tab', '').replace('current', ''));
        if (Validation.validateTab(curTabName)) {
          $('.tab.current').toggleClass('current').toggleClass('hidden');
          $curLi.toggleClass('current_li');
          $('li.' + clickedLi).toggleClass('current_li');
          $('.tab.' + clickedLi).toggleClass('current').toggleClass('hidden');
        }
        else {
          $curLi.nextAll('li:not(.disabled_li)').addClass('disabled_li');
        }
      }
      else {
        $('.tab.current').toggleClass('current').toggleClass('hidden');
        $curLi.toggleClass('current_li');
        $('li.' + clickedLi).toggleClass('current_li');
        $('.tab.' + clickedLi).toggleClass('current').toggleClass('hidden');
      }
    }
  });
  //#endregion

  $('select[name=ya_source]').on('change', function () {
    if ($(this).children('option:selected').val() === 'other') {
      $('<input type="text" name="other_opt" />').insertAfter($(this));
    }
    else {
      $('input[name=other_opt]').remove();
    }
  });
  $('input[name=name]').on('blur', function () {
    var name = $(this).val();
    var toInsert = name ? ', ' + name + ',' : '';
    $('.name_label').html('Я'+toInsert+' даю свое согласие на передачу в ООО «ЯНДЕКС» резюме и/или анкеты, содержащих мои персональные данные, и согласен с тем, что они будут храниться в ООО «ЯНДЕКС» в течение 5 лет и будут обрабатываться исключительно для целей предложения мне вакансий группы компаний «ЯНДЕКС», в соответствии с Федеральным законом «О персональных данных».');
  });
});