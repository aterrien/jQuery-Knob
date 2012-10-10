describe("jquery.knob", function(){
  var $input;

  beforeEach(function(){
    jasmine.Clock.useMock();

    $input = $('input#knob');
    $input.knob({
      min: 5,
      max: 1000,
      validationDelay: 500
    });
  });

  afterEach(function(){
    $input.blur();
  });


  it("should let me type 200 and set the knob to 200", function(){
    $input.val('').focus().
      sendkeys('2').
      trigger(jQuery.Event('keydown', { which: 50, keyCode: 50 })).
      trigger(jQuery.Event('keyup', { which: 50, keyCode: 50 }));

    jasmine.Clock.tick(100);

    $input.sendkeys('0').
      trigger(jQuery.Event('keydown', { which: 48, keyCode: 48 })).
      trigger(jQuery.Event('keyup', { which: 48, keyCode: 48 }));

    jasmine.Clock.tick(100);

    $input.sendkeys('0').
      trigger(jQuery.Event('keydown', { which: 48, keyCode: 48 })).
      trigger(jQuery.Event('keyup', { which: 48, keyCode: 48 }));

    expect($input.val()).toEqual("200");
  });

  it("should validate the input after half a second", function(){
    $input.val('').focus().
      sendkeys('2').
      trigger(jQuery.Event('keydown', { which: 50, keyCode: 50 })).
      trigger(jQuery.Event('keyup', { which: 50, keyCode: 50 }));

    jasmine.Clock.tick(500);

    expect($input.val()).toEqual("5");
  });
});