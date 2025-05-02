import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // ✅ Correct import
import { format } from 'date-fns';

const ExportPdfButton = ({ transactions, month, year }) => {
  const handleDownload = () => {
    const doc = new jsPDF();
    const title = `Finance Report - ${month}/${year}`;
    doc.setFontSize(18);
    doc.text(title, 14, 20);

    const tableData = transactions.map(tx => [
      format(new Date(tx.date), 'dd-MM-yyyy'),
      tx.reference,
      tx.description || '-',
      tx.type === 'income' ? `+ ₹${tx.amount}` : `- ₹${tx.amount}`
    ]);

    autoTable(doc, {
      head: [['Date', 'Reference', 'Description', 'Amount']],
      body: tableData,
      startY: 30,
    });

    const totalIncome = transactions.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((a, b) => a + b.amount, 0);
    const net = totalIncome - totalExpense;

    const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY : 40;

    doc.text(`Total Income: ₹${totalIncome}`, 14, finalY + 10);
    doc.text(`Total Expense: ₹${totalExpense}`, 14, finalY + 20);
    doc.text(`Net: ₹${net}`, 14, finalY + 30);

    doc.save(`finance-${month}-${year}.pdf`);
  };

  return (
    <button onClick={handleDownload} className="bg-green-600 text-white px-4 py-2 rounded">
      Export as PDF
    </button>
  );
};

export default ExportPdfButton;
