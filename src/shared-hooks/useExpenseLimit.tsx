import { useEffect, useState } from 'react'

import { useGetLimit } from 'src/api/apis'

const useExpenseLimit = () => {
	const [expenseLimit, setExpenseLimit] = useState<number>(0);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	
	const { data, isLoading: expenseLimitLoading, error: expenseLimitError } = useGetLimit();

	useEffect(() => {
		data && setExpenseLimit(parseFloat(data.limit || '0'))
		expenseLimitError && setError(expenseLimitError)
		setIsLoading(expenseLimitLoading)
	}, [data, expenseLimitError, expenseLimitLoading]);
	
	return {
		expenseLimit, expenseLimitError: error, expensesLimitLoading: isLoading
	}
}

export default useExpenseLimit