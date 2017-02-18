import {trimTimeStr, trimMessage, trimTimeToMinScale} from '../../src/js/common/util';
import assert from 'assert';

describe('util', () => {
  describe('trimTimeToMinScale()', () => {
    it('should return 1 when duration is 60', () => {
      assert.equal(1, trimTimeToMinScale(60));
    });

    it('should return 0.8 when duration is 48', () => {
      assert.equal(0.8, trimTimeToMinScale(48));
    });

    it('should return 1.5 when duration is 90', () => {
      assert.equal(1.5, trimTimeToMinScale(90));
    });
  });

  describe('trimTimeStr()', () => {
    it('should return 1min28s when para is 88', () => {
      assert.equal('1min28s', trimTimeStr(88));
    });

    it('should return 59s when para is 59', () => {
      assert.equal('59s', trimTimeStr(59));
    });
  });

  describe('trimMessage()', () => {
    it('should return whole message when message length is less than 60', () => {
      const message = 'This is a message that length is less than 60';
      assert.equal(message, trimMessage(message));
    });

    it('should return slice when message length is more than 60', () => {
      const message = 'This is a message that length is more than 60, so it should be longer, sometimes it will be in two lines';
      const expectedMessage = 'This is a message that length is more than 60, so it should ...';
      assert.equal(expectedMessage, trimMessage(message));
    });
  });
});