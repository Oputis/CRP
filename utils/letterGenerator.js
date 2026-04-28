function todayLong() {
  return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function header(f) {
  return `${f.fullName || '[YOUR NAME]'}\n${f.address || '[YOUR ADDRESS]'}\n${f.city || '[CITY]'}, ${f.state || '[STATE]'} ${f.zip || '[ZIP]'}\n\n${todayLong()}`;
}

export function generateLetter(templateId, fields = {}) {
  switch (templateId) {
    case 'bureau_dispute': return bureauDispute(fields);
    case 'mov_request': return movRequest(fields);
    case 'debt_validation': return debtValidation(fields);
    case 'goodwill': return goodwill(fields);
    case 'file_disclosure': return fileDisclosure(fields);
    case 'pay_for_delete': return payForDelete(fields);
    default: throw new Error(`Unknown template: ${templateId}`);
  }
}

function bureauDispute(f) {
  return `${header(f)}\n\n${f.bureau || '[BUREAU NAME]'} Consumer Disputes\n[BUREAU ADDRESS]\n\nRe: Dispute of Inaccurate Information — ${f.accountName || '[ACCOUNT NAME]'} #${f.accountNumber || '[ACCOUNT NUMBER]'}\n\nTo Whom It May Concern,\n\nI am writing to dispute inaccurate information appearing on my credit report.\n\nDisputed Item:\nAccount Name: ${f.accountName || '[CREDITOR]'}\nAccount Number: ${f.accountNumber || '[NUMBER]'}\n\nReason for Dispute:\n${f.issueDescription || '[DESCRIBE THE ERROR]'}\n\nPlease conduct a reasonable investigation and correct or delete information that cannot be verified as accurate.\n\nSincerely,\n\n${f.fullName || '[YOUR NAME]'}\n\nEnclosures: ID, proof of address, supporting documents`;
}

function movRequest(f) {
  return `${header(f)}\n\n${f.bureau || '[BUREAU NAME]'} Consumer Disputes\n[BUREAU ADDRESS]\n\nRe: Method of Verification Request — ${f.accountName || '[ACCOUNT NAME]'} #${f.accountNumber || '[ACCOUNT NUMBER]'}\n\nTo Whom It May Concern,\n\nI recently disputed the item listed above and received a response stating the information was verified. I am requesting a description of the procedure used to verify this item, including the source contacted and the information reviewed.\n\nIssue originally disputed:\n${f.issueDescription || '[DESCRIBE THE ERROR]'}\n\nPlease provide the method of verification and any relevant contact information for the furnisher.\n\nSincerely,\n\n${f.fullName || '[YOUR NAME]'}`;
}

function debtValidation(f) {
  return `${header(f)}\n\n${f.collectorName || '[COLLECTION AGENCY]'}\n${f.collectorAddress || '[AGENCY ADDRESS]'}\n\nRe: Debt Validation Request — ${f.accountName || '[ACCOUNT]'} #${f.accountNumber || '[NUMBER]'}\n\nTo Whom It May Concern,\n\nI am requesting validation of the alleged debt of $${f.claimedAmount || '[AMOUNT]'}. Please provide the original creditor, balance calculation, account-level documentation, and proof of authority to collect.\n\nThis is not a refusal to pay. It is a request for validation.\n\nSincerely,\n\n${f.fullName || '[YOUR NAME]'}`;
}

function goodwill(f) {
  return `${header(f)}\n\n${f.creditorName || '[CREDITOR]'}\nCustomer Relations Department\n\nRe: Goodwill Adjustment Request — Account #${f.accountNumber || '[NUMBER]'}\n\nDear Customer Relations Team,\n\nI am requesting a goodwill adjustment regarding a late payment reported on ${f.latePaymentDate || '[DATE]'}.\n\n${f.reason || 'The late payment was due to unusual circumstances and does not reflect my overall payment history.'}\n\nI respectfully ask that you consider removing the late payment as a goodwill courtesy.\n\nSincerely,\n\n${f.fullName || '[YOUR NAME]'}`;
}

function fileDisclosure(f) {
  return `${header(f)}\n\n${f.bureau || '[BUREAU NAME]'} Consumer Disclosures\n[BUREAU ADDRESS]\n\nRe: Request for Consumer File Disclosure Information\n\nTo Whom It May Concern,\n\nI am requesting disclosure of information contained in my consumer file, including sources of information being reported.\n\nPlease provide the information required under applicable consumer reporting laws.\n\nSincerely,\n\n${f.fullName || '[YOUR NAME]'}`;
}

function payForDelete(f) {
  return `${header(f)}\n\n${f.collectorName || '[COLLECTION AGENCY]'}\n\nRe: Settlement Offer — Account #${f.accountNumber || '[NUMBER]'}\nClaimed Balance: $${f.claimedAmount || '[BALANCE]'}\n\nWithout admitting liability, I am willing to offer $${f.offerAmount || '[OFFER]'} as settlement of the alleged account, provided the terms are confirmed in writing before payment.\n\nRequested Terms:\n1. Deletion of the account from credit reporting agencies, if your company agrees and is able to do so\n2. Written confirmation before payment\n3. Settlement constitutes full satisfaction of the alleged debt\n4. No further collection activity after payment\n\nSincerely,\n\n${f.fullName || '[YOUR NAME]'}`;
}
