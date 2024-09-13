import React, { useState } from 'react';
import { NextRouter } from 'next/router';
import { Icons } from '@/components/Icons';
import tableStyles from './Table.module.css';
interface Action<T> {
  icon: React.ReactNode;
  label: string;
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
  router: NextRouter;
  renderRow: (item: T) => Row[];
  getItemId: (item: T) => string;
  isDeleted?: (item: T) => boolean;
  actions: Action<T>[];
}

export function Table<T>({
  data,
  headers,
  loading,
  router,
  renderRow,
  getItemId,
  isDeleted,
  actions,
}: TableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) return <div className="h-[84vh] w-[91.4vw]" />;

  return (
    <div className={tableStyles.tableContainer}>
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 pr-4 py-2 text-md border border-gray-500 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:font-semibold"
        />
        <div className="absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-400">
          {Icons.SEARCH}
        </div>
      </div>
      <table className={tableStyles.blogTable}>
        <thead className={tableStyles.blogTableHeader}>
          <tr>
            {headers.map((header) => (
              <th
                key={`header-${header}`}
                className={tableStyles.tableHeader}
              >
                {header}
              </th>
            ))}
            {actions.length > 0 && (
              <th className={tableStyles.tableHeader}>
                Actions
              </th>
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
                ${isDeleted && isDeleted(item) ? 'line-through text-red-800 bg-red-300' : ''}
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
                  {actions.map((action, index) =>
                    action.showCondition ? (
                      action.showCondition(item) && (
                        <button
                          key={index}
                          onClick={() => action.onClick(item)}
                          className="text-purple-600 hover:text-purple-900 ml-2"
                          title={action.label}
                        >
                          {action.icon}
                        </button>
                      )
                    ) : (
                      <button
                        key={index}
                        onClick={() => action.onClick(item)}
                        className="text-purple-600 hover:text-purple-900 ml-2"
                        title={action.label}
                      >
                        {action.icon}
                      </button>
                    )
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
