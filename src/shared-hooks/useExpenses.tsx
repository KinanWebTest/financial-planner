import { useContext, useEffect, useState } from 'react'

import { useGetExpenses } from 'src/api/apis'
import { StateContext } from 'src/app/app'
import { ExpenseDataType } from 'src/utils/shared-types'

const useExpenses = () => {
	const { appState } = useContext(StateContext) || {};
  const { user } = appState || {};
	
	const [expenses, setExpenses] = useState<ExpenseDataType[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	
	const {
		data,
		isLoading: expensesLoading,
		error: expensesError
	} = useGetExpenses({ id: user?.id || '' });

	useEffect(() => {
		data && setExpenses(data?.expenses)
		expensesError && setError(expensesError)
		setIsLoading(expensesLoading)
	}, [data, expensesError, expensesLoading])
	
	return {
		expenses, expensesError: error, expensesLoading: isLoading
	}
}

export default useExpenses