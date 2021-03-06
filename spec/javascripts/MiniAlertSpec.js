
describe("miniAlert", function() {
  beforeEach(function() {
    loadFixtures('fragment.html');
    return this.$element = $('.mini-alert');
  });
  it("should be available on the jQuery object", function() {
    return expect($.fn.miniAlert).toBeDefined();
  });
  it("should be chainable", function() {
    return expect(this.$element.miniAlert()).toBe(this.$element);
  });
  it("should offers default values", function() {
    var plugin;
    plugin = new $.miniAlert(this.$element[0]);
    return expect(plugin.defaults).toBeDefined();
  });
  it("should overwrites the settings", function() {
    var options, plugin;
    options = {
      text: 'y',
      position: 'after'
    };
    plugin = new $.miniAlert(this.$element[0], options);
    expect(plugin.settings.text).toBe(options.text);
    return expect(plugin.settings.position).toBe(options.position);
  });
  describe("button", function() {
    describe("defaults options", function() {
      beforeEach(function() {
        this.plugin = new $.miniAlert(this.$element, this.options);
        return this.$button = this.$element.find('button');
      });
      it("should add a button to the alert", function() {
        return expect(this.$button).toExist();
      });
      it("should prepend the button to the alert if position is default", function() {
        expect(this.$button.next('h1')).toExist();
        return expect(this.$button.prev('p')).not.toExist();
      });
      it("should add a button with 'x' as content", function() {
        return expect(this.$button).toHaveText('x');
      });
      it("should add a button with 'close' class", function() {
        return expect(this.$button).toHaveClass('close');
      });
      it("should prevent default on click event", function() {
        spyOnEvent(this.$button, 'click');
        this.$button.click();
        return expect('click').toHaveBeenPreventedOn(this.$button);
      });
      return it("should fade out the element for 100 milliseconds when button clicked", function() {
        spyOn(this.plugin.$element, 'remove');
        this.$button.click();
        return expect(this.plugin.$element.remove).toHaveBeenCalled();
      });
    });
    return describe("custom options", function() {
      it("should append the button to the alert if position is 'after", function() {
        var $button;
        this.$element.miniAlert({
          position: 'after'
        });
        $button = this.$element.find('button');
        expect($button.prev('p')).toExist();
        return expect($button.next()).not.toExist();
      });
      it("should add a button with 'close' as content", function() {
        this.$element.miniAlert({
          text: 'close'
        });
        return expect(this.$element.find('button')).toHaveText('close');
      });
      it("should add a button with 'hide' class", function() {
        this.$element.miniAlert({
          cssClass: 'hide'
        });
        return expect(this.$element.find('button')).toHaveClass('hide');
      });
      it("should slide up the element for 200 milliseconds when button clicked", function() {
        var plugin;
        plugin = new $.miniAlert(this.$element, {
          effect: 'slide',
          duration: 200
        });
        spyOn(plugin.$element, 'slideUp');
        this.$element.find('button').click();
        return expect(plugin.$element.slideUp).toHaveBeenCalledWith(200, jasmine.any(Function));
      });
      return it("should fade out the element for 100 milliseconds when button clicked", function() {
        var plugin;
        plugin = new $.miniAlert(this.$element, {
          effect: 'fade'
        });
        spyOn(plugin.$element, 'fadeOut');
        this.$element.find('button').click();
        return expect(plugin.$element.fadeOut).toHaveBeenCalledWith(100, jasmine.any(Function));
      });
    });
  });
  return describe("callbacks", function() {
    beforeEach(function() {
      return this.foo = jasmine.createSpy('foo');
    });
    it("should call onLoad callback function when the close button is ready", function() {
      var plugin;
      plugin = new $.miniAlert(this.$element, {
        onLoad: this.foo
      });
      expect(this.foo).toHaveBeenCalled();
      expect(this.foo.mostRecentCall.args[0]).toBe(this.$element);
      return expect(this.foo.mostRecentCall.args[1]).toBe(this.$element.find('button'));
    });
    it("should call onHide callback function when close button is clicked", function() {
      var plugin;
      plugin = new $.miniAlert(this.$element, {
        onHide: this.foo
      });
      expect(this.foo).not.toHaveBeenCalled();
      this.$element.find('button').click();
      expect(this.foo).toHaveBeenCalled();
      expect(this.foo.mostRecentCall.args[0]).toBe(this.$element);
      return expect(this.foo.mostRecentCall.args[1]).toBe(this.$element.find('button'));
    });
    return it("should call onHidden callback function when alert message is hidden", function() {
      var plugin;
      plugin = new $.miniAlert(this.$element, {
        onHidden: this.foo
      });
      this.$element.find('button').click();
      expect(this.foo).toHaveBeenCalled();
      return expect(this.foo.mostRecentCall.args.length).toEqual(0);
    });
  });
});
