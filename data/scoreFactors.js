export const SCORE_RANGES = {
  collection_removed: { min: 30, exp: 60, max: 100 },
  late_removed: { min: 25, exp: 50, max: 80 },
  pay_off_collection: { min: 0, exp: 5, max: 15 },
  hard_inquiry: { min: -2, exp: -5, max: -10 },
  utilization_to_30: { min: 5, exp: 15, max: 30 },
  utilization_to_10: { min: 15, exp: 30, max: 50 },
  on_time_6mo: { min: 5, exp: 15, max: 30 },
  chargeoff_removed: { min: 40, exp: 75, max: 120 },
  collection_added: { min: -70, exp: -100, max: -150 },
  close_old_card: { min: -10, exp: -20, max: -40 },
  new_credit_card: { min: -10, exp: -5, max: 5 }
};

export const SCORE_ACTIONS = [
  { id: 'late_removed', label: 'Remove late payment', icon: '✅', positive: true },
  { id: 'collection_removed', label: 'Remove collection', icon: '✅', positive: true },
  { id: 'chargeoff_removed', label: 'Remove charge-off', icon: '✅', positive: true },
  { id: 'utilization_to_10', label: 'Lower utilization to 10%', icon: '📉', positive: true },
  { id: 'utilization_to_30', label: 'Lower utilization to 30%', icon: '📉', positive: true },
  { id: 'on_time_6mo', label: '6 months on-time payments', icon: '📅', positive: true },
  { id: 'pay_off_collection', label: 'Pay off collection without deletion', icon: '💰', positive: true },
  { id: 'hard_inquiry', label: 'Hard inquiry', icon: '🔍', positive: false },
  { id: 'collection_added', label: 'New collection added', icon: '❌', positive: false },
  { id: 'close_old_card', label: 'Close oldest credit card', icon: '✂️', positive: false },
  { id: 'new_credit_card', label: 'Open new credit card', icon: '💳', positive: false }
];
