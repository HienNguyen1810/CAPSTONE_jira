import React from 'react';
import ActionButton from './ActionButton';
import { BreadcrumbHeader } from './BreadcrumbHeader';

export const Header = () => {
	return (
		<header className="header relative h-full">
			<div className="flex justify-between p-2 h-full items-center">
				<BreadcrumbHeader />
				<ActionButton />
			</div>
		</header>
	);
};
