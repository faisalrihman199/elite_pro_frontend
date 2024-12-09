import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: '20px',
    border: 'none',
    textAlign: 'center',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '16px',
    border: 'none',
    textAlign: 'center',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({}));

export default function CustomizedTables({ rows, headNames, handleDelete, handleEdit }) {

  return (
    <TableContainer component={Paper} className='p-4' style={{ boxShadow: 'none' }}>
      <Table
        sx={{
          minWidth: 700,
          borderSpacing: '10px 0px',
          border: 'none',
        }}
      >
        <TableHead>
          <TableRow>
            {headNames.map((header, index) => (
              <StyledTableCell key={index} align="center">
                <p className="p-3 rounded bg-gray-200 w-full mb-0 font-bold text-sm">{header}</p>
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              {/* Accessing values dynamically based on keys */}
              <StyledTableCell className='font-light'>{index + 1}</StyledTableCell>
              <StyledTableCell className='font-light'>{row[Object.keys(row)[1]]}</StyledTableCell>
              <StyledTableCell className="font-light">
                {new Date(row[Object.keys(row)[2]]).toLocaleDateString()}
              </StyledTableCell>
              <StyledTableCell className='font-light'>
                <FontAwesomeIcon
                  icon={faEdit}
                  className="text-blue-500 cursor-pointer mr-2"
                  onClick={() => handleEdit(row.id)} // Log the ID when edit is clicked
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDelete(row.id)} // Log the ID when delete is clicked
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
}
