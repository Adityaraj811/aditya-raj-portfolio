import test from 'node:test';
import assert from 'node:assert/strict';
import {
  VELOURA_MENU_ITEMS,
  ALCHEMY_NOTES,
  updateTrayQuantity,
  calculateTrayTotals,
  filterVelouraMenuItems,
  stepAlchemyIndex,
} from './velouraShowcaseLogic';
import { velouraSoundEngine } from './velouraSoundEngine';

test('velouraSoundEngine defaults to muted until visitor explicitly enables sound', () => {
  assert.equal(velouraSoundEngine.isEnabled(), false);
  velouraSoundEngine.setEnabled(true);
  assert.equal(velouraSoundEngine.isEnabled(), true);
  velouraSoundEngine.setEnabled(false);
  assert.equal(velouraSoundEngine.isEnabled(), false);
});

test('filterVelouraMenuItems filters All, Alchemy Brews, Slow Kitchen, and Bakes accurately', () => {
  assert.equal(filterVelouraMenuItems('all').length, 5);
  assert.equal(filterVelouraMenuItems('brews').length, 3);
  assert.equal(filterVelouraMenuItems('kitchen').length, 1);
  assert.equal(filterVelouraMenuItems('bakes').length, 1);
});

test('updateTrayQuantity and calculateTrayTotals calculate INR totals and prevent negative quantities', () => {
  let tray: Record<string, number> = { 'saffron-latte': 1 };
  assert.deepEqual(calculateTrayTotals(tray, VELOURA_MENU_ITEMS), {
    totalCount: 1,
    totalPriceInr: 340,
  });

  // Add Burnt Basque Cheesecake (₹360)
  tray = updateTrayQuantity(tray, 'basque-cheesecake', 1);
  assert.deepEqual(calculateTrayTotals(tray, VELOURA_MENU_ITEMS), {
    totalCount: 2,
    totalPriceInr: 700,
  });

  // Remove Saffron Latte (₹340) twice — should clamp at 0 and never go negative
  tray = updateTrayQuantity(tray, 'saffron-latte', -1);
  tray = updateTrayQuantity(tray, 'saffron-latte', -1);
  assert.equal(tray['saffron-latte'], undefined);
  assert.deepEqual(calculateTrayTotals(tray, VELOURA_MENU_ITEMS), {
    totalCount: 1,
    totalPriceInr: 360,
  });
});

test('stepAlchemyIndex wraps around accurately for Previous and Next navigation', () => {
  assert.equal(ALCHEMY_NOTES.length, 4);
  assert.equal(stepAlchemyIndex(0, 'next', 4), 1);
  assert.equal(stepAlchemyIndex(3, 'next', 4), 0);
  assert.equal(stepAlchemyIndex(0, 'prev', 4), 3);
  assert.equal(stepAlchemyIndex(2, 'prev', 4), 1);
});
