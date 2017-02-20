import {isBadgeNonexisted, isChartNonexisted, detectPageChanged, isOverallDivExisted} from '../../src/js/common/domUtil';
import {CHART_CONTAINER} from '../../src/js/common/constants';
import sinon from 'sinon';
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
      $('body').append(`<div id="${CHART_CONTAINER}">TEST</div>`);
      expect(isChartNonexisted()).to.be.false;
    });
  });

  describe('isOverallDivExisted()', () => {
    it('should return false when div.file-navigation.in-mid-page is nonexisted', () => {
      expect(isOverallDivExisted()).to.be.false;
    });

    it('should return true when div.file-navigation.in-mid-page is existed', () => {
      $('body').append('<div class="file-navigation in-mid-page">TEST</div>');
      expect(isOverallDivExisted()).to.be.true;
    });
  });



  describe('detectPageChanged()', () => {
    let clock = undefined;
    let mockedCallback = undefined;

    beforeEach(() => {
      clock = sinon.useFakeTimers();
      mockedCallback = sinon.spy();
    });

    it('should run callback when window location pathname changed', () => {
      setInitialPathnameAndSearch();
      detectPageChanged(mockedCallback);
      changeLocationPathname();
      clock.tick(200);

      expect(mockedCallback.called).to.be.true;
    });

    it('should run callback when window location search changed', () => {
      setInitialPathnameAndSearch();
      detectPageChanged(mockedCallback);
      changeLocationSearch();
      clock.tick(200);

      expect(mockedCallback.called).to.be.true;
    });

    it('should not run callback when window location & pathname not changed', () => {
      setInitialPathnameAndSearch();
      detectPageChanged(mockedCallback);
      clock.tick(200);

      expect(mockedCallback.called).to.be.false;
    });

    afterEach(() => {
      clock.restore();
    });

    const setInitialPathnameAndSearch = () => {
      global.window = {
        location: {
          pathname: '/Yaowenjie/yaowenjie.github.io',
          search: ''
        }
      };
    };

    const changeLocationPathname = () => {
      global.window = {
        location: {
          pathname: '/Yaowenjie/yaowenjie.github.io/projects',
          search: ''
        }
      };
    };

    const changeLocationSearch = () => {
      global.window = {
        location: {
          pathname: '/Yaowenjie/yaowenjie.github.io',
          search: '?tab=stars'
        }
      };
    };
  });
});
