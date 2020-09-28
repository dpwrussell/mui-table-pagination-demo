import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

export default function ({ transactions }) {
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const [page, setPage] = useState(0);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
    const handleChangePage = (event, newPage) => setPage(newPage);
    const rows = transactions
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                        rowsPerPageOptions={[3, 4, 5]}
                    />
                </TableRow>
            </TableFooter>
        </Table>
    );
}