import { ChangeEvent, useEffect, useState } from "react"
import { Button } from "@mui/material"

import { CenteredLoader, CenteredText } from "src/components/shared-components"
import { StyledContainer, CenterContainer, Spacer, RowWrapContainer } from "src/components/styled-components"
import { amountValidator } from "src/utils/input-validators"
import { useChangeLimit, useSetCategories } from "src/api/apis"
import { CategoryDataType } from "src/utils/shared-types"
import { theme } from "src/app/theme"
import useCategories from 'src/shared-hooks/useCategories'
import useExpenseLimit from 'src/shared-hooks/useExpenseLimit'
import SingleFieldValue from "src/pages/goals/SingleFieldValue"
import { FloatingButtonContainer } from "./goals-style"

const Goals = () => {
	const [limit, setLimit] = useState<string | number>('');
	const [cats, setCats] = useState<CategoryDataType[]>([]);
	const { expenseLimit, expensesLimitLoading } = useExpenseLimit();
	const {categories, isLoading: catsLoading} = useCategories();
	const limitChangeAPI = useChangeLimit();
	const categoryChangeAPI = useSetCategories();
	const loading = expensesLimitLoading || catsLoading || limitChangeAPI.isPending || categoryChangeAPI.isPending;

	useEffect(() => {
		if (categories) {
			setCats(categories);
		}
	}, [categories]);
	
	useEffect(() => {
		if (expenseLimit) {
			setLimit(expenseLimit);
		}
	}, [expenseLimit]);

	const setMonthlyLimit = (e: ChangeEvent<HTMLInputElement>) => {
		setLimit(e.target.value);
	};

	const saveSettings = () => {
		limitChangeAPI.mutate({limit: limit});
		categoryChangeAPI.mutate({categories: cats})
	};

	const onCatChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newCat = {title: e.target.name, limit: parseFloat(e.target.value)};
		setCats(prev => [...prev.map(cat => cat.title === e.target.name ? newCat : cat)]);
	};

	return (
		<StyledContainer>
			{loading && <CenteredLoader />}
			<CenteredText variant='h2' color="primary"> Goals </CenteredText>
			<CenterContainer>
				<SingleFieldValue
					title="Total Monthly Expense Limit"
					name="monthlyLimit"
					label="Monthly expense limit"
					value={limit}
					onChange={setMonthlyLimit}
					validator={amountValidator}
				/>
				<Spacer margin={`${theme.spacing(2)} 0`} />
				<CenteredText variant='h4' color="primary"> Individual category limits </CenteredText>
				<Spacer margin={`${theme.spacing(2)} 0`} />
				<RowWrapContainer>
					{cats.map(cat => (
						<SingleFieldValue
							key={cat.title}
							title={cat.title}
							name={cat.title}
							label={`${cat.title} expense limit`}
							value={cat.limit}
							onChange={onCatChange}
							validator={amountValidator}
						/>
					))}
				</RowWrapContainer>
				<FloatingButtonContainer>
					<Button variant="contained" onClick={saveSettings} disabled={loading}>
						Save Settings
					</Button>
				</FloatingButtonContainer>
			</CenterContainer>
		</StyledContainer>
	)
}

export default Goals