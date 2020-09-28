import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

const calculateRowRange = ({ from, to, count, context }) => {

    // from and to are indexed from 1
    const iFrom = from -1;
    const iTo = to - 1;

    // Available before
    const availableBefore = Math.max(0, iFrom);
    const availableAfter = count - iTo - 1;

    const before = Math.min(availableBefore, context);
    const after = Math.min(availableAfter, context);

    console.log({
        from,
        to,
        iFrom,
        iTo,
        count,
        context,
        availableBefore,
        availableAfter,
        before,
        after
    });

    const contextFrom = from - before;
    const contextTo = to + after;

    const colours = [];
    for (let i=0; i < before; i++) {
        colours.push("lightyellow");
    }
    for (let i=0; i < iTo - iFrom + 1; i++) {
        colours.push(null);
    }
    for (let i=0; i < after; i++) {
        colours.push("lightyellow");
    }

    return {
        from: contextFrom,
        to: contextTo,
        colours
    };
};

export default function ({ transactions }) {
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const [page, setPage] = useState(0);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
    const handleChangePage = (event, newPage) => setPage(newPage);

    const from = page * rowsPerPage + 1;
    const to = page * rowsPerPage + rowsPerPage;
    const range = calculateRowRange({from, to, count: transactions.length, context: rowsPerPage});

    const labelDisplayedRows = ({from, to, count, page}) => {
        return `Row ${range.from} - ${range.to} of ${count}`;
    };

    const rows = transactions
        .slice(range.from - 1, range.to)
        .map((transaction, transactionIndex) => (
        <TableRow
            key={transaction.id}
            style={{
                backgroundColor: range.colours[transactionIndex],
                opacity: range.colours[transactionIndex] ? "30%" : "100%"
            }}
        >
            <TableCell>{transaction.date.format('YYYY-MM-DD')}</TableCell>
            <TableCell>{transaction.description}</TableCell>
            <TableCell align="right">{transaction.amount}</TableCell>
            <TableCell align="right">{transaction.balance}</TableCell>
        </TableRow>
        ));
    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Balance</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TablePagination
                        colSpan={4}
                        count={transactions.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                            inputProps: { 'aria-label': 'rows per page' },
                            native: true,
                        }}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        labelDisplayedRows={labelDisplayedRows}
                        rowsPerPageOptions={[3, 4, 5]}
                    />
                </TableRow>
            </TableFooter>
        </Table>
    );
}