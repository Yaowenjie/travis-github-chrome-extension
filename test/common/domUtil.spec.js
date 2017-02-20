import {isBadgeNonexisted, isChartNonexisted, isNotChartHeader} from '../../src/js/common/domUtil';
import {expect} from 'chai';
import $ from 'jquery';

describe('domUtil', () => {
  describe('isBadgeNonexisted()', () => {
    it('should return true when .travis-ci is nonexisted', () => {
      expect(isBadgeNonexisted()).to.be.true;
    });

    it('should return false when .travis-ci is existed', () => {
      $('body').append('<div class="travis-ci">TEST</div>');
      expect(isBadgeNonexisted()).to.be.false;
    });
  });

  describe('isChartNonexisted()', () => {
    it('should return true when #chartContainer is nonexisted', () => {
      expect(isChartNonexisted()).to.be.true;
    });

    it('should return false when #chartContainer is existed', () => {
      $('body').append('<div id="chartContainer">TEST</div>');
      expect(isChartNonexisted()).to.be.false;
    });
  });
});
