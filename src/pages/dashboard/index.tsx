import { Gauge } from "@ant-design/charts";
import { getMonth } from "date-fns";
import { useContext } from "react";
import { useGetExpenses, useGetLimit } from "src/api/apis";
import { StateContext } from "src/app/app";
import { CenteredLoader, CenteredText } from "src/components/shared-components"
import { StyledPaper } from "src/components/styled-components"
import { getMonthExpenses, guageConfigMaker, percentMaker, sumOfDebitEntries } from "src/utils/helper-functions";

const Dashboard = () => {
	const {appState} = useContext(StateContext) || {};
	const {user} = appState || {};
	const { data, isLoading, error } = useGetExpenses({id: user?.id || ''});
	const {data: limit} = useGetLimit();
	const monthExpenses = getMonthExpenses(data?.expenses || [], getMonth(new Date()));
	console.log('current month', monthExpenses);
	const totalExpense = sumOfDebitEntries(monthExpenses);
	const expenseLimit = parseFloat(limit?.limit || '0') as number;
	const percent = percentMaker(totalExpense, expenseLimit);
	const config = guageConfigMaker(percent);
	return (
		<StyledPaper>
			<CenteredText variant='h2'> Dashboard </CenteredText>
			<CenteredText variant='h2'> Total Expense: {totalExpense} </CenteredText>
			<CenteredText variant='h2'> Limit: {expenseLimit} </CenteredText>
			{error && <CenteredText variant='h6'> Unable to get expenses </CenteredText>}
			{isLoading && <CenteredLoader />}
			{data && <Gauge {...config} />}
		</StyledPaper>
	)
}

export default Dashboard