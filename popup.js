$(document).ready(function() {
  $('#start').timepicker();
  $('#end').timepicker();
  const store = new Store('give-up-fb');
  store.findAll(function(data){
    console.log(data);
    if(data.startTime && data.endTime) {
      $('#start').val(data.startTime);
      $('#end').val(data.endTime);
    }
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

  $('#save').click(function(){
    const startTime = $('#start').val();
    const endTime = $('#end').val();
    const result = validate(startTime, endTime);
    // store.drop(function(){
    //   store.findAll(function(data){
    //     console.log(data);
    //   });
    // });
    if (result.success) {
      error.hide();
      store.save({ startTime, endTime }, function(data){
        store.findAll(function(data){
          console.log(data);
        });
      });
      window.close();
    } else {
      error.show(result.msg);
    }
  });
})
