export const calculateMonthlyPayment = (principal, annualRate, termYears) => {
	const monthlyRate = annualRate / 12 / 100;
	const n = termYears * 12;
	return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
};

export const generateMonthlyAmortizationSchedule = (principal, annualRate, termYears) => {
	const schedules = [];
	const monthlyRate = annualRate / 12 / 100;
	const monthlyPayment = calculateMonthlyPayment(principal, annualRate, termYears);

	let balance = principal;

	for (let period = 1; period <= termYears * 12; period++) {
		const interestPayment = balance * monthlyRate;
		const principalPayment = monthlyPayment - interestPayment;
		balance -= principalPayment;

		if (balance < 0) balance = 0;

		schedules.push({
			period,
			payment: monthlyPayment.toFixed(2),
			principalPayment: principalPayment.toFixed(2),
			interestPayment: interestPayment.toFixed(2),
			balance: balance.toFixed(2),
		});
	}

	return schedules;
};

export const generateAnnualAmortizationSchedule = (monthlySchedule) => {
	const schedules = [];

	for (let year = 1; year <= monthlySchedule.length / 12; year++) {
		const annualData = monthlySchedule.slice((year - 1) * 12, year * 12).reduce(
			(acc, month) => {
				acc.payment += parseFloat(month.payment);
				acc.principalPayment += parseFloat(month.principalPayment);
				acc.interestPayment += parseFloat(month.interestPayment);
				acc.balance = parseFloat(month.balance);
				return acc;
			},
			{ payment: 0, principalPayment: 0, interestPayment: 0, balance: 0 }
		);

		schedules.push({
			period: year,
			payment: annualData.payment.toFixed(2),
			principalPayment: annualData.principalPayment.toFixed(2),
			interestPayment: annualData.interestPayment.toFixed(2),
			balance: annualData.balance.toFixed(2),
		});
	}

	return schedules;
};

export const printSchedule = (schedule, frequency) => {
	console.log(`\n${frequency.charAt(0).toUpperCase() + frequency.slice(1)} Amortization Schedule:`);
	console.log(
		`Period (${
			frequency === "annual" ? "Years" : "Months"
		})\tPayment\t\tPrincipal\tInterest\tBalance`
	);

	if (frequency === "annual") {
		schedule.forEach((row) => {
			console.log(
				`${row.period}\t\t${row.payment}\t${row.principalPayment}\t${row.interestPayment}\t${
					row.interestPayment.length <= 7 ? "\t" : ""
				}${row.balance}`
			);
		});
	} else {
		schedule.forEach((row) => {
			console.log(
				`${row.period}\t\t${row.payment}\t\t${row.principalPayment}\t\t${row.interestPayment}\t\t${row.balance}`
			);
		});
	}
};

export const calculateTotals = (schedule, period) => {
	const totals = schedule.slice(0, period).reduce(
		(acc, row) => {
			acc.totalPrincipalPaid += parseFloat(row.principalPayment);
			acc.totalInterestPaid += parseFloat(row.interestPayment);
			acc.remainingBalance = parseFloat(row.balance);
			return acc;
		},
		{ totalPrincipalPaid: 0, totalInterestPaid: 0, remainingBalance: 0 }
	);

	return {
		totalPrincipalPaid: totals.totalPrincipalPaid.toFixed(2),
		totalInterestPaid: totals.totalInterestPaid.toFixed(2),
		remainingBalance: totals.remainingBalance.toFixed(2),
	};
};
