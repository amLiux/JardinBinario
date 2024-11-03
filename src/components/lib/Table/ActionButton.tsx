import React from 'react';
import tableStyles from './Table.module.css';

interface ActionButtonProps {
  index: number;
  icon?: React.ReactNode;
  label?: string;
  onClick: () => void;
  showCondition?: () => boolean;
}

export const ActionButton = ({
  index,
  icon,
  label,
  onClick,
  showCondition = () => true,
}: ActionButtonProps) => {
  if (!showCondition()) return null;
  return (
    <>
      <button
        key={index}
        onClick={onClick}
        title={label}
        className={tableStyles.actionButton}
      >
        {icon}
      </button>
    </>
  );
};
