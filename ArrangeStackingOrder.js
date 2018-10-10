/**
 * GitHub  https://github.com/tanaikech/ArrangeStackingOrder<br>
 * @param {Object} slides Instance of a Slides.
 * @return {ArrangeStackingOrder}
 */
function getSlides(slides) {
    this.slides = slides;
    return this
}

/**
 * top method for ArrangeStackingOrder.<br>
 * @return {Object} Return selected page elements
 */
function top() {
    var aso = new ArrangeStackingOrder(this.slides);
    return aso.top();
}

/**
 * bottom method for ArrangeStackingOrder.<br>
 * @return {Object} Return selected page elements
 */
function bottom() {
    var aso = new ArrangeStackingOrder(this.slides);
    return aso.bottom();
}

/**
 * front method for ArrangeStackingOrder.<br>
 * @return {Object} Return selected page elements
 */
function front() {
    var aso = new ArrangeStackingOrder(this.slides);
    return aso.front();
}

/**
 * behind method for ArrangeStackingOrder.<br>
 * @return {Object} Return selected page elements
 */
function behind() {
    var aso = new ArrangeStackingOrder(this.slides);
    return aso.behind();
}

/**
 * inverse method for ArrangeStackingOrder.<br>
 * @return {Object} Return selected page elements
 */
function inverse() {
    var aso = new ArrangeStackingOrder(this.slides);
    return aso.inverse();
}

// SlidesApp.getActivePresentation(); // For scope
;
(function(r) {
  var ArrangeStackingOrder;
  ArrangeStackingOrder = (function() {
    var Behind, Bottom, Front, Inverse, Top;

    ArrangeStackingOrder.name = "ArrangeStackingOrder";

    function ArrangeStackingOrder(slides_) {
      if (!slides_) {
        throw new Error("spreadsheet was not found.");
      }
      if (!slides_ || slides_ === void 0) {
        this.slides = SlidesApp.getActivePresentation();
      } else {
        this.slides = slides_;
      }
      this.selections = this.slides.getSelection();
      if (this.selections.getSelectionType() !== SlidesApp.SelectionType.PAGE_ELEMENT) {
        throw new Error("Select page elements.");
      }
      this.currentPage = this.selections.getCurrentPage();
      this.currentPageElements = this.currentPage.getPageElements();
      this.selectedPageElements = this.selections.getPageElementRange().getPageElements();
    }

    ArrangeStackingOrder.prototype.top = function() {
      return Top.call(this);
    };

    ArrangeStackingOrder.prototype.bottom = function() {
      return Bottom.call(this);
    };

    ArrangeStackingOrder.prototype.front = function() {
      return Front.call(this);
    };

    ArrangeStackingOrder.prototype.behind = function() {
      return Behind.call(this);
    };

    ArrangeStackingOrder.prototype.inverse = function() {
      return Inverse.call(this);
    };

    Top = function() {
      var newPageElements;
      newPageElements = this.selectedPageElements.map((function(_this) {
        return function(e) {
          var npe;
          npe = _this.currentPage.insertPageElement(e);
          npe.select(false);
          return npe;
        };
      })(this));
      this.currentPageElements.forEach((function(_this) {
        return function(f, i) {
          if (_this.selectedPageElements.some(function(g) {
            return f.getObjectId() === g.getObjectId();
          })) {
            _this.currentPageElements[i].remove();
          }
        };
      })(this));
      return newPageElements;
    };

    Bottom = function() {
      var noSelectedPageElements;
      noSelectedPageElements = this.currentPageElements.filter((function(_this) {
        return function(e) {
          return !_this.selectedPageElements.some(function(f) {
            return e.getObjectId() === f.getObjectId();
          });
        };
      })(this));
      noSelectedPageElements.forEach((function(_this) {
        return function(e) {
          _this.currentPage.insertPageElement(e);
          e.remove();
        };
      })(this));
      return this.selectedPageElements;
    };

    Front = function() {
      var i, k, l, lastNewSelect, newPageElements, newSelect, ref, ref1, rr;
      rr = this.selectedPageElements.map((function(_this) {
        return function(e) {
          return _this.currentPageElements.map(function(f, j) {
            if (f.getObjectId() === e.getObjectId()) {
              return j;
            } else {
              return "";
            }
          }).filter(String)[0];
        };
      })(this));
      rr.sort(function(a, b) {
        return a - b;
      });
      newSelect = [];
      lastNewSelect = rr[rr.length - 1] === this.currentPageElements.length - 1 ? rr[rr.length - 1] : rr[rr.length - 1] + 1;
      for (i = k = 0, ref = this.selectedPageElements.length; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
        newSelect.push(lastNewSelect - i);
      }
      this.selectedPageElements = rr.map((function(_this) {
        return function(e) {
          return _this.currentPageElements[e];
        };
      })(this));
      for (i = l = ref1 = this.currentPageElements.length - 1; ref1 <= 0 ? l <= 0 : l >= 0; i = ref1 <= 0 ? ++l : --l) {
        if (this.currentPageElements[i].getObjectId() === this.selectedPageElements[this.selectedPageElements.length - 1].getObjectId()) {
          r = i;
          break;
        }
      }
      Array.prototype.splice.apply(this.currentPageElements, [r + 2, 0].concat(this.selectedPageElements));
      var res = [];
      for (var i = 0; i < this.currentPageElements.length; i++) {
        var f = true;
        for (var j = 0; j < this.selectedPageElements.length; j++) {
          if (this.currentPageElements[i].getObjectId() == this.selectedPageElements[j].getObjectId()) {
            this.selectedPageElements.splice(j, 1);
            f = false;
          }
        }
        if (f) {
          res.push(this.currentPageElements[i]);
        }
      }
      this.currentPageElements = res;
      newPageElements = this.currentPageElements.filter((function(_this) {
        return function(e, i) {
          var npe;
          npe = _this.currentPage.insertPageElement(e);
          e.remove();
          if (newSelect.some(function(e) {
            return e === i;
          })) {
            npe.select(false);
            return npe;
          }
        };
      })(this));
      return newPageElements;
    };

    Behind = function() {
      var i, k, l, lastNewSelect, newPageElements, newSelect, ref, ref1, rr;
      rr = this.selectedPageElements.map((function(_this) {
        return function(e) {
          return _this.currentPageElements.map(function(f, j) {
            if (f.getObjectId() === e.getObjectId()) {
              return j;
            } else {
              return "";
            }
          }).filter(String)[0];
        };
      })(this));
      rr.sort(function(a, b) {
        return a - b;
      });
      newSelect = [];
      lastNewSelect = rr[0] === 0 ? rr[0] : rr[0] - 1;
      for (i = k = 0, ref = this.selectedPageElements.length; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
        newSelect.push(lastNewSelect + i);
      }
      this.selectedPageElements = rr.map((function(_this) {
        return function(e) {
          return _this.currentPageElements[e];
        };
      })(this));
      for (i = l = 0, ref1 = this.currentPageElements.length; 0 <= ref1 ? l < ref1 : l > ref1; i = 0 <= ref1 ? ++l : --l) {
        if (this.currentPageElements[i].getObjectId() === this.selectedPageElements[0].getObjectId()) {
          r = i;
          break;
        }
      }
      if (r === 0) {
        Array.prototype.splice.apply(this.currentPageElements, [r, 0].concat(this.selectedPageElements));
      } else {
        Array.prototype.splice.apply(this.currentPageElements, [r - 1, 0].concat(this.selectedPageElements));
      }
      var res = [];
      for (var i = this.currentPageElements.length - 1; i >= 0; i--) {
        var f = true;
        for (var j = 0; j < this.selectedPageElements.length; j++) {
          if (this.currentPageElements[i].getObjectId() == this.selectedPageElements[j].getObjectId()) {
            this.selectedPageElements.splice(j, 1);
            f = false;
          }
        }
        if (f) {
          res.push(this.currentPageElements[i]);
        }
      }
      this.currentPageElements = res.reverse();
      newPageElements = this.currentPageElements.filter((function(_this) {
        return function(e, i) {
          var npe;
          npe = _this.currentPage.insertPageElement(e);
          e.remove();
          if (newSelect.some(function(e) {
            return e === i;
          })) {
            npe.select(false);
            return npe;
          }
        };
      })(this));
      return newPageElements;
    };

    Inverse = function() {
      var f, i, k, newPageElements, page, pageElements, ref, rr, selectedPageElements;
      page = this.currentPage;
      pageElements = this.currentPageElements;
      selectedPageElements = this.selectedPageElements;
      rr = this.selectedPageElements.map((function(_this) {
        return function(e) {
          return _this.currentPageElements.map(function(f, j) {
            if (f.getObjectId() === e.getObjectId()) {
              return j;
            } else {
              return "";
            }
          }).filter(String)[0];
        };
      })(this));
      rr.sort(function(a, b) {
        return a - b;
      });
      f = true;
      for (i = k = 0, ref = rr.length; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
        if (i > 0) {
          if (rr[i] !== rr[i - 1] + 1) {
            f = false;
            break;
          }
        }
      }
      if (!f) {
        throw new Error("Please select continuous range of objects.");
      }
      this.selectedPageElements = rr.map((function(_this) {
        return function(e) {
          return _this.currentPageElements[e];
        };
      })(this)).reverse();
      rr.forEach((function(_this) {
        return function(e, i) {
          _this.currentPageElements[e] = _this.selectedPageElements[i];
        };
      })(this));
      newPageElements = this.currentPageElements.filter((function(_this) {
        return function(e, i) {
          var npe;
          npe = _this.currentPage.insertPageElement(e);
          e.remove();
          if (rr.some(function(e) {
            return e === i;
          })) {
            npe.select(false);
            return npe;
          }
        };
      })(this));
      return newPageElements;
    };

    return ArrangeStackingOrder;

  })();
  return r.ArrangeStackingOrder = ArrangeStackingOrder;
})(this);
