import { useState } from 'react'

import { ExpenseDataType, TokenResponseType, TokenType, UserType } from 'src/utils/shared-types'

const useStateContext = () => {
  const storedToken = localStorage.getItem('userToken');
  const [userToken, setUserToken] = useState<TokenType>(storedToken || undefined);
  const [user, setUser] = useState<UserType | null>(null);
  const [expenses, setExpenses] = useState<ExpenseDataType[]>([]);

  const gotoHome = () => {
    window.location.replace('/');
  }

  const signout = () => {
    localStorage.removeItem('userToken');
    setUserToken(undefined);
    gotoHome();
  }

	const saveToken = ({userTokenResponse}: {userTokenResponse: TokenResponseType}) => {
		setUserToken(userTokenResponse.userToken);
		localStorage.setItem('userToken', userTokenResponse.userToken as string);
	}
	
	const saveUser = ({user}: {user: UserType}) => {
		setUser(user);
	}

	const appState = {
		userToken,
		saveToken,
		user,
		saveUser,
		signout,
		expenses,
		setExpenses
	};

  return {appState};
}

export default useStateContext