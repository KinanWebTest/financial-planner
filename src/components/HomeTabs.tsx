import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Tabs, Tab, Box } from "@mui/material";
import UserAvatar from "src/components/UserAvatar";

const HomeTabs = () => {
	const location = useLocation();
	const navigate = useNavigate();
	
	useEffect(() => {
		if (location.pathname === '/home')
			navigate('dashboard');
	},[location.pathname, navigate]);

  const tabs = [
    { label: 'Dashboard', to: '/home/dashboard' },
    { label: 'Transactions', to: '/home/transactions' },
    { label: 'Goals', to: '/home/goals' },
    { label: '', to: '/home/goals' },
  ];

	const getTabIndex = () => {
    const currentTab = tabs.findIndex((tab) => tab.to === location.pathname);
    return currentTab === -1 ? 0 : currentTab;
  };

	return (
		<Box>
			<Tabs value={getTabIndex()} role="navigation" variant="fullWidth">
				{tabs.map((tab, index) => (
					<Tab
						key={index}
						label={tab.label}
						component={Link}
						to={tab.to}
						disableTouchRipple={index === 3}
						sx={index !== 3 ? undefined : {maxWidth: '50px' }}
						icon={index !== 3 ? undefined : <UserAvatar />}
					/>
				))}
			</Tabs>
			<Outlet />
		</Box>
	)
}

export default HomeTabs