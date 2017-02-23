import React from 'react';
import Auth from './Auth';
import Articles from './Articles';

const Page = () => {
	return (
		<div className="main">
			<Auth />
			<Articles />
		</div>
	);
};

export default Page;
