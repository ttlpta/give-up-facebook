$(document).ready(function() {
  $('#start').timepicker();
  $('#end').timepicker();
  const store = new Store('give-up-fb');
  store.findAll().then(function(timeRange){
    $('#start').val(timeRange.startTime);
    $('#end').val(timeRange.endTime);
  });

  const validate = function(startTime, endTime){
    const checkFormatTime = function(value){
      return /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(value)
    };
    const result = {
      success: true,
      msg: ''
    }
    if(!startTime) {
      return {...result, success: false, msg: 'Start time is required'};
    }
    if(!endTime) {
      return {...result, success: false, msg: 'End time is required'};
    }
    if(!checkFormatTime(startTime)) {
      return {...result, success: false, msg: 'Start time is wrong format'};
    }
    if(!checkFormatTime(endTime)) {
      return {...result, success: false, msg: 'End time is wrong format'};
    }
    if(endTime <= startTime) {
      return {...result, success: false, msg: 'End time can not be more than start time'};
    }

    return result;
  }

  const error = {
    show: function(msg){
      $('#err-msg').text(msg);
      $('#err-msg').show();
    },
    hide : function(){
      $('#err-msg').hide();
    },
  }

  const success = {
    show: function(){
      $('#success-msg').show();
    },
    hide : function(){
      $('#success-msg').hide();
    },
  }

  $('#save').click(function(){
    const startTime = $('#start').val();
    const endTime = $('#end').val();
    const result = validate(startTime, endTime);
    if (result.success) {
      error.hide();
      store.save({ startTime, endTime }, function(data){
        success.show();
      });
    } else {
      error.show(result.msg);
    }
  });
})
