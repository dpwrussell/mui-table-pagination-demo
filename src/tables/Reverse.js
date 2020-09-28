import React, { useState, useMemo } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

const calculateRowRange = ({ page, rowsPerPage, count }) => {
    const r = count % rowsPerPage;

    // If r is zero then the paging is normal
    if (r === 0) {
        return {
            from: page * rowsPerPage,
            to: page * rowsPerPage + rowsPerPage - 1
        }
    // Else create a short first page range and offset the rest
    } else {
        // First page has r items
        if (page === 0) {
            return {
                from: 0,
                to: r - 1
            };
        // Rest are full, but offset by r
        } else {
            const offset = ((page - 1) * rowsPerPage) + r;
            return {
                from: offset,
                to: offset + rowsPerPage - 1
            };
        }
    }
};

const getLastPage = (count, rowsPerPage) => Math.max(
    0,
    Math.ceil(count / rowsPerPage) - 1
);

export default function ({ transactions }) {
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const [page, setPage] = useState(getLastPage(transactions.length, rowsPerPage));
    const lastPage = useMemo(
        () => getLastPage(transactions.length, rowsPerPage),
        [transactions, rowsPerPage]);

    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        // console.log("Recalculated lastPage", {len: transactions.length, rowsPerPage, lastPage: getLastPage(transactions.length, rowsPerPage)})
        setPage(getLastPage(transactions.length, newRowsPerPage));
    };
    const handleChangePage = (event, newPage) => setPage(newPage);

    const labelDisplayedRows = ({ from, to, count, page }) => {
        const range = calculateRowRange({ page, rowsPerPage, count });
        return `Row ${range.from + 1} - ${range.to + 1} of ${count}`;
    };

    const range = calculateRowRange({ page, rowsPerPage, count: transactions.length });

    const rows = transactions
        .slice(range.from, range.to + 1)
        .map(transaction => (
            <TableRow key={transaction.id}>
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