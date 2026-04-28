export const LETTER_TEMPLATES = [
  { id: 'bureau_dispute', title: 'Bureau Dispute Letter', icon: '🏛️', desc: 'Dispute an error directly with a credit bureau.', fields: ['fullName','address','city','state','zip','accountName','accountNumber','bureau','issueDescription'] },
  { id: 'mov_request', title: 'Method of Verification Request', icon: '🔎', desc: 'Ask how a verified item was investigated.', fields: ['fullName','address','city','state','zip','bureau','accountName','accountNumber','issueDescription'] },
  { id: 'debt_validation', title: 'Debt Validation Letter', icon: '📜', desc: 'Request validation from a debt collector.', fields: ['fullName','address','city','state','zip','collectorName','collectorAddress','accountName','accountNumber','claimedAmount'] },
  { id: 'goodwill', title: 'Goodwill Letter', icon: '🤝', desc: 'Ask a creditor to consider a courtesy adjustment.', fields: ['fullName','address','city','state','zip','creditorName','accountName','accountNumber','latePaymentDate','reason'] },
  { id: 'file_disclosure', title: 'File Disclosure Request', icon: '🗂️', desc: 'Request consumer file disclosures and source information.', fields: ['fullName','address','city','state','zip','bureau'] },
  { id: 'pay_for_delete', title: 'Pay-for-Delete Letter', icon: '💸', desc: 'Negotiate deletion terms before payment.', fields: ['fullName','address','city','state','zip','collectorName','accountName','accountNumber','claimedAmount','offerAmount'] }
];
