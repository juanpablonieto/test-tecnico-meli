import React from 'react';
import './Breadcrumb.scss';

export const Breadcrumb = ({breadcrumbs}) => {
    return (
        <div className="breadcrumbs">
            {breadcrumbs.map((breadcrumb, index) => {
                const isLastBreadcrumb = index === (breadcrumbs.length - 1);
                const text = isLastBreadcrumb ? breadcrumb: `${breadcrumb} > `;
                return (
                    <span key={index} className={isLastBreadcrumb ? "last-breadcrumb" : "breadcrumb"}>
                        {text}
                    </span>
                )
            })}
        </div>
    )
}