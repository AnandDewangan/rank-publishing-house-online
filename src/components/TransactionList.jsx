import React from 'react';
import { format } from 'date-fns';

const TransactionList = ({ transactions }) => {
  return (
    <div className="mt-4">
      {transactions.map(tx => (
        <div key={tx._id} className="flex justify-between items-center border-b p-2">
          <div>
            <p>{format(new Date(tx.date), 'dd MMM yyyy')}</p>
            <p className="text-sm text-gray-500">{tx.reference} - {tx.description}</p>
          </div>
          <span className={tx.type === 'income' ? 'text-green-600' : 'text-red-600'}>
            {tx.type === 'income' ? '+' : '-'} ₹{tx.amount}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
