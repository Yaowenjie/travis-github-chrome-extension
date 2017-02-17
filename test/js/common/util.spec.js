import {trimTime} from '../../../src/js/common/util';
import assert from 'assert';

describe('Util', () => {
  describe('trimTime()', () => {
    it('should return 1min28s when para is 88', () => {
      assert.equal('1min28s', trimTime(88));
    });
  });

  describe('trimTime()', () => {
    it('should return 59s when para is 59', () => {
      assert.equal('59s', trimTime(59));
    });
  });

});