function calculate(){
	const age = +input.get('current_age').val();
	let userSalary = +input.get('annual_salary').gt(0).val();
	const userBalance = +input.get('balance').val();
	let contribution = +input.get('contribution').val();
	let employerMatch = +input.get('employer_match').val();
	let matchLimit = +input.get('match_limit').val();
	const retirement = +input.get('retirement').val();
	const lifeExpectancy = +input.get('life_expectancy').val();
	let annualReturn = +input.get('annual_return').val();
	let inflationRate = +input.get('inflation_rate').val();
	let salaryIncrease = +input.get('salary_increase').val();
	if(!input.valid()) return;
	let balance = userBalance;
	let salary = userSalary;
	matchLimit = matchLimit / 100;
	employerMatch = employerMatch / 100;
	contribution = contribution / 100;
	salaryIncrease = salaryIncrease / 100;
	annualReturn = annualReturn / 100;
	inflationRate = inflationRate / 100;

	const workyears = retirement - age;
	let result = [];
	for(let i = 0; i < workyears; i++) {
		let yearInvestReturn = balance * annualReturn;
		let yearEmployerMatch = salary * matchLimit * employerMatch;
		let yearContribution = salary * contribution;

		balance = balance + yearInvestReturn + yearContribution + yearEmployerMatch;
		salary = salary * (1 + salaryIncrease);

		result.push({
			yearInvestReturn,
			yearEmployerMatch,
			yearContribution
		})
	}

	const totalInvestReturn = result.reduce((acc, item) => acc + item.yearInvestReturn, 0);
	const totalEmployerMatch = result.reduce((acc, item) => acc + item.yearEmployerMatch, 0);
	const totalContribution = result.reduce((acc, item) => acc + item.yearContribution, 0);
	const balanceWithoutInflation = calculatePurchasingPower(balance, inflationRate, workyears);
	output.val('At the retirement age of {65}, the 401(k) balance will be <b>$1,537,963</b>, which is equivalent to <b>$546,566</b> in purchasing power today.').replace('{65}', retirement).replace('$1,537,963', currencyFormat(balance)).replace('$546,566', currencyFormat(balanceWithoutInflation)).set('result');
	output.val(currencyFormat(totalContribution + userBalance + totalEmployerMatch)).set('total-contributions');
	output.val(currencyFormat(totalContribution + userBalance)).set('employee-contributions');
	output.val(currencyFormat(totalEmployerMatch)).set('employer-match');
	output.val(currencyFormat(totalInvestReturn)).set('total-interest');

	const interestPercent = totalInvestReturn * 100 / balance;
	const employerMatchPercent = totalEmployerMatch * 100 / balance;
	const selfContributionsPercent = (totalContribution + userBalance) * 100 / balance;
	changeChartData([roundTo(selfContributionsPercent, 0), roundTo(employerMatchPercent, 0), roundTo(interestPercent, 0)]);

	const payOutYear = lifeExpectancy - retirement;
	const payOutMonth = payOutYear * 12;
	const rateMonthWithInflation = (annualReturn - inflationRate)/12
	const withInflation = balance * (rateMonthWithInflation * Math.pow(1 + rateMonthWithInflation, payOutMonth)) / (Math.pow(1 + rateMonthWithInflation, payOutMonth) - 1)
	output.val(currencyFormat(withInflation * (lifeExpectancy - retirement) * 12)).set('total-payout')
	const monthlyRate = annualReturn / 12;
	const payoutMonthly = balance * (monthlyRate * Math.pow(1 + monthlyRate, payOutMonth)) / (Math.pow(1 + monthlyRate, payOutMonth) - 1);
	const payoutYear = balance * (annualReturn * Math.pow(1 + annualReturn, payOutYear)) / (Math.pow(1 + annualReturn, payOutYear) - 1);
	output.val('<b>$11,018</b> per month can be withdrawn in retirement until {85}. At {65}, this is equivalent to <b>$3,916</b> in purchasing power today, and at 85, is equivalent to <b>$2,168</b>.').replace('{65}', retirement).replace('{85}', lifeExpectancy).replace('$11,018', currencyFormat(payoutMonthly)).replace('$3,916', currencyFormat(calculatePurchasingPower(payoutMonthly, inflationRate, workyears))).replace('$2,168', currencyFormat(calculatePurchasingPower(payoutMonthly, inflationRate, lifeExpectancy - age))).set('payout')
	output.val('<b>$134,087</b> per year can be withdrawn in retirement until {85}. At {65}, this is equivalent to <b>$47,652</b> in purchasing power today, and at 85, is equivalent to <b>$26,384</b>.').replace('{65}', retirement).replace('{85}', lifeExpectancy).replace('$134,087', currencyFormat(payoutYear)).replace('$47,652', currencyFormat(calculatePurchasingPower(payoutYear, inflationRate, workyears))).replace('$26,384', currencyFormat(calculatePurchasingPower(payoutYear, inflationRate, lifeExpectancy - age))).set('payout-annual')
}

function currencyFormat(number){
	return '$' + number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function calculatePurchasingPower(presentValue, inflationRate, years) {
	return presentValue / Math.pow(1 + inflationRate, years);
}
