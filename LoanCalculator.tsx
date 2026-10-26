"use client";

import { useEffect, useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import {
  calculateMonthlyPayment,
  defaultLoanAmount,
} from "@/lib/loanCalculator";
import { formatPrice } from "@/lib/data";

interface LoanCalculatorProps {
  reservePrice: number;
}

export default function LoanCalculator({ reservePrice }: LoanCalculatorProps) {
  const [loanAmount, setLoanAmount] = useState(() =>
    defaultLoanAmount(reservePrice)
  );
  const [interestRate, setInterestRate] = useState("4.1");
  const [loanTerm, setLoanTerm] = useState("35");

  useEffect(() => {
    setLoanAmount(defaultLoanAmount(reservePrice));
    setInterestRate("4.1");
    setLoanTerm("35");
  }, [reservePrice]);

  const monthlyPayment = useMemo(() => {
    const amount = loanAmount;
    const rate = parseFloat(interestRate) || 0;
    const term = parseInt(loanTerm, 10) || 0;

    return calculateMonthlyPayment(amount, rate, term);
  }, [loanAmount, interestRate, loanTerm]);

  return (
    <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <Calculator className="h-5 w-5 text-red-700" />
        <h3 className="text-lg font-bold text-zinc-900">Loan Calculator</h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label
            htmlFor="loan-amount"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-500"
          >
            Loan Amount (RM)
          </label>
          <input
            id="loan-amount"
            type="number"
            min={0}
            step={1000}
            value={loanAmount}
            onChange={(e) =>
              setLoanAmount(Math.max(0, Number(e.target.value) || 0))
            }
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-800 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20"
          />
          <p className="mt-1 text-xs text-zinc-500">
            Default: 90% of reserve price
          </p>
        </div>

        <div>
          <label
            htmlFor="interest-rate"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-500"
          >
            Interest Rate (%)
          </label>
          <input
            id="interest-rate"
            type="number"
            min={0}
            step={0.1}
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-800 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20"
          />
        </div>

        <div>
          <label
            htmlFor="loan-term"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-500"
          >
            Loan Term (years)
          </label>
          <input
            id="loan-term"
            type="number"
            min={1}
            max={35}
            step={1}
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-800 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20"
          />
        </div>
      </div>

      <div className="mt-5 rounded-xl bg-red-700 px-5 py-4 text-center text-white shadow-md shadow-red-700/20">
        <p className="text-xs font-semibold uppercase tracking-wide text-red-100">
          Estimated Monthly Payment
        </p>
        <p className="mt-1 text-2xl font-bold sm:text-3xl">
          {formatPrice(Math.round(monthlyPayment))}
          <span className="text-base font-medium text-red-100"> / month</span>
        </p>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-zinc-500">
        Estimates only. Actual rates and instalments depend on your bank,
        credit profile, and loan approval.
      </p>
    </div>
  );
}
