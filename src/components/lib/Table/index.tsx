import React, { useState } from 'react';
import tableStyles from './Table.module.css';
import { Flexbox } from '../Flexbox';
import { ActionButton } from './ActionButton';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
interface Action<T> {
  icon?: React.ReactNode;
  label?: string;
  getLabel?: (item: T) => string;
  getIcon?: (item: T) => React.ReactNode;
  onClick: (item: T) => void;
  showCondition?: (item: T) => boolean;
}

interface Row {
  node: React.ReactNode | React.ReactNode[];
  needsWrap?: boolean;
}

interface TableProps<T> {
  data: T[];
  headers: string[];
  loading: boolean;
  renderRow: (item: T) => Row[];
  getItemId: (item: T) => string;
  isDeleted?: (item: T) => boolean;
  actions: Action<T>[];
  title: string;
}

export function Table<T>({
  data,
  headers,
  loading,
  renderRow,
  getItemId,
  isDeleted,
  actions,
  title,
}: TableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) return <div className="h-[84vh] w-[91.4vw]" />;

  return (
    <div className={tableStyles.tableContainer}>
      <h1 className={tableStyles.tableTitle}>{title}</h1>
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={tableStyles.textInput}
        />
        <div className="absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-400">
          <MagnifyingGlassIcon className='w-6 ml-2' />
        </div>
      </div>
      <table className={tableStyles.blogTable}>
        <thead className={tableStyles.blogTableHeader}>
          <tr>
            {headers.map((header) => (
              <th key={`header-${header}`} className={tableStyles.tableHeader}>
                {header}
              </th>
            ))}
            {actions.length > 0 && (
              <th className={tableStyles.tableHeader}>Acciones</th>
            )}
          </tr>
        </thead>
        <tbody className={tableStyles.tableBody}>
          {data.map((item) => (
            <tr
              key={getItemId(item)}
              // add isCompleted for tickets
              className={`
                transition-all duration-200
                ${isDeleted && isDeleted(item) ? tableStyles.deletedRow : ''}
              `}
            >
              {renderRow(item).map(({ node, needsWrap }, index) => (
                <td
                  key={index}
                  className={
                    needsWrap ? tableStyles.tableRowWrap : tableStyles.tableRow
                  }
                >
                  {node}
                </td>
              ))}
              {actions.length > 0 && (
                <td className={tableStyles.tableRow}>
                  <Flexbox justifyContent="start" alignItems="center">
                    {actions.map((action, index) => (
                      <ActionButton
                        index={index}
                        icon={
                          action.getIcon ? action.getIcon(item) : action.icon
                        }
                        label={
                          action.getLabel ? action.getLabel(item) : action.label
                        }
                        onClick={() => action.onClick(item)}
                        showCondition={
                          action.showCondition
                            ? () => action.showCondition!(item)
                            : () => true
                        }
                      />
                    ))}
                  </Flexbox>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
