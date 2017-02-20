import {trimTimeStr, trimMessage, trimTimeToMinScale} from '../../src/js/common/util';
import {expect} from 'chai';

describe('util', () => {
  describe('trimTimeToMinScale()', () => {
    it('should return 1 when duration is 60', () => {
      expect(trimTimeToMinScale(60)).to.equal(1);
    });

    it('should return 0.8 when duration is 48', () => {
      expect(trimTimeToMinScale(48)).to.equal(0.8);
    });

    it('should return 1.5 when duration is 90', () => {
      expect(trimTimeToMinScale(90)).to.equal(1.5);
    });
  });

  describe('trimTimeStr()', () => {
    it('should return 1min28s when para is 88', () => {
      expect(trimTimeStr(88)).to.equal('1min28s');
    });

    it('should return 59s when para is 59', () => {
      expect(trimTimeStr(59)).to.equal('59s');
    });
  });

  describe('trimMessage()', () => {
    it('should return whole message when message length is less than 60', () => {
      const message = 'This is a message that length is less than 60';
      expect(trimMessage(message)).to.equal(message);
    });

    it('should return slice when message length is more than 60', () => {
      const message = 'This is a message that length is more than 60, so it should be longer, sometimes it will be in two lines';
      const expectedMessage = 'This is a message that length is more than 60, so it should ...';
      expect(trimMessage(message)).to.equal(expectedMessage);
    });
  });
});
