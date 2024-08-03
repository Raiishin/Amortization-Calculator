import {
	generateMonthlyAmortizationSchedule,
	generateAnnualAmortizationSchedule,
	printSchedule,
	calculateTotals,
} from "./helpers/index.js";

const start = (loanAmount, annualRate, termYears, totalAtPeriod = 0) => {
	const principal = loanAmount;
	const rate = annualRate;
	const term = termYears;

	const monthlySchedule = generateMonthlyAmortizationSchedule(principal, rate, term);
	const annualSchedule = generateAnnualAmortizationSchedule(monthlySchedule);

	printSchedule(monthlySchedule, "monthly");
	printSchedule(annualSchedule, "annual");

	if (totalAtPeriod !== 0) {
		const totals = calculateTotals(monthlySchedule, totalAtPeriod);

		console.log(`\nTotals at period ${totalAtPeriod}:`);
		console.log(`Total Principal Paid: ${totals.totalPrincipalPaid}`);
		console.log(`Total Interest Paid: ${totals.totalInterestPaid}`);
		console.log(`Remaining Balance: ${totals.remainingBalance}`);
	}
};

const loanAmount = 480000;
const annualRate = 2.6;
const termYears = 25;

start(loanAmount, annualRate, termYears, 60);
