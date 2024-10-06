import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, styled } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { usePathname, useRouter } from 'next/navigation';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#333',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.secondary.main,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function StickyHeadTable(params: any) {
  const { columns, data, handleEdit, handleDelete, handleBody } = params;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const router = useRouter();
  const path = usePathname();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {Object.keys(columns ? columns : data[0]).map((column, index) => (
                <StyledTableCell key={index}>{columns ? columns[column] : column}</StyledTableCell>
              ))}
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: any, index: number) => (
              <StyledTableRow key={row.id}>
                {Object.keys(columns ? columns : row).map((cell, jIndex) => (
                  <StyledTableCell onClick={() => handleBody ? handleBody(row.id) : null} key={jIndex} style={{ cursor: handleBody ? 'pointer' : 'default' }}>
                    {row[cell]}
                  </StyledTableCell>
                ))}
                <StyledTableCell key={index} style={{ minWidth: 60 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-around', cursor: 'pointer' }}>
                    <BorderColorIcon color="primary" onClick={() => handleEdit(row.id)} />
                    <DeleteIcon color="error" onClick={() => handleDelete(row.id)} />
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
}
