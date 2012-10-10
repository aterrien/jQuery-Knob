describe("jquery.knob", function(){
  var $input;

  beforeEach(function(){
    jasmine.Clock.useMock();

    $input = $('input#knob');
    $input.knob({
      min: 5,
      max: 1000,
      validationDelay: 500,
      step: 5
    });
  });

  afterEach(function(){
    $input.val('5').blur();
  });


  describe("validating that the typed-in value is within the min, max and step parameters", function(){
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

    it("should validate that the input value is a multiple of 'step' by rounding down", function(){
      $input.val('').focus().
        sendkeys('2').
        trigger(jQuery.Event('keydown', { which: 50, keyCode: 50 })).
        trigger(jQuery.Event('keyup', { which: 50, keyCode: 50 })).
        sendkeys('2').
        trigger(jQuery.Event('keydown', { which: 50, keyCode: 50 })).
        trigger(jQuery.Event('keyup', { which: 50, keyCode: 50 }));

      jasmine.Clock.tick(500);

      expect($input.val()).toEqual('20');
    });

    it("should validate that the input value is a multiple of 'step' by rounding down", function(){
      $input.val('').focus().
        sendkeys('2').
        trigger(jQuery.Event('keydown', { which: 50, keyCode: 50 })).
        trigger(jQuery.Event('keyup', { which: 50, keyCode: 50 })).
        sendkeys('3').
        trigger(jQuery.Event('keydown', { which: 51, keyCode: 51 })).
        trigger(jQuery.Event('keyup', { which: 51, keyCode: 51 }));

      jasmine.Clock.tick(500);

      expect($input.val()).toEqual('25');
    });
  });

  describe("configuring steps when scrolling, incrementing and typing values", function(){
    it("pressing the arrows should step by 5", function(){
      expect($input.val()).toEqual('5');

      $input.
        trigger(jQuery.Event('keydown', { which: 38, keyCode: 38})).
        trigger(jQuery.Event('keyup', { which: 38, keyCode: 38}));

      expect($input.val()).toEqual('10');

      $input.
        trigger(jQuery.Event('keydown', { which: 39, keyCode: 39})).
        trigger(jQuery.Event('keyup', { which: 39, keyCode: 39}));

      expect($input.val()).toEqual('15');

      $input.
        trigger(jQuery.Event('keydown', { which: 40, keyCode: 40})).
        trigger(jQuery.Event('keyup', { which: 40, keyCode: 40}));

      expect($input.val()).toEqual('10');

      $input.
        trigger(jQuery.Event('keydown', { which: 37, keyCode: 37})).
        trigger(jQuery.Event('keyup', { which: 37, keyCode: 37}));

      expect($input.val()).toEqual('5');

    });

    it("scrolling mouse wheel up should increment value by 5", function () {
      $input.trigger(jQuery.Event('mousewheel', {originalEvent: { detail: 0, wheelDeltaX : 0, wheelDeltaY: 10 }}));
      expect($input.val()).toEqual('10');
      $input.trigger(jQuery.Event('mousewheel', {originalEvent: { detail: 0, wheelDeltaX : 10, wheelDeltaY: 0 }}));
      expect($input.val()).toEqual('15');
      $input.trigger(jQuery.Event('mousewheel', {originalEvent: { detail: 0, wheelDeltaX : 0, wheelDeltaY: -10 }}));
      expect($input.val()).toEqual('10');
      $input.trigger(jQuery.Event('mousewheel', {originalEvent: { detail: 0, wheelDeltaX : -10, wheelDeltaY: 0 }}));
      expect($input.val()).toEqual('5');
    })
  });
});