export function calculateMonthlyPayment(
  loanAmount: number,
  annualInterestRate: number,
  loanTermYears: number
): number {
  if (loanAmount <= 0 || loanTermYears <= 0) return 0;

  if (annualInterestRate === 0) {
    return loanAmount / (loanTermYears * 12);
  }

  const r = annualInterestRate / 12 / 100;
  const n = loanTermYears * 12;
  const factor = Math.pow(1 + r, n);

  return (loanAmount * r * factor) / (factor - 1);
}

export function defaultLoanAmount(reservePrice: number): number {
  return Math.round(reservePrice * 0.9);
}
