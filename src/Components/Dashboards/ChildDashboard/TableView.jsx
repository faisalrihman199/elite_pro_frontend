import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faEdit, faEye, faFile, faFileAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FaDownload } from 'react-icons/fa6';
import { useAPI } from '../../../Context/APIContext';
import { Route } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';

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

  const isModule = headNames.includes('Module Name');
  const {getUser}=useAPI();
  const isAdmin=getUser()?.role==="admin";
  const handleDownload = (path) => {
    const link = document.createElement('a');
    link.href = path;
    link.download = path.split('/').pop();  // Use the file name from the URL
    document.body.appendChild(link);  // Append the link to the body
    link.click();  // Trigger the click event to start the download
    document.body.removeChild(link);  // Clean up the DOM after the download is triggered
  };
  const confirmDelete = (id) => {
    confirmAlert({
        title: 'Confirm Deletion',
        message: 'Are You sure youe want to delete?',
        buttons: [
            {
                label: 'Yes',
                onClick: ()=>{handleDelete(id)}
            },
            {
                label: 'No',
                onClick: () => console.log(" Delete cancelled")
            }
        ]
    });
};
  
  
  
  const {getFilesPath}=useAPI();


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
              {
                row.projectName &&
              <StyledTableCell className='font-light'>{row.projectName}</StyledTableCell>
              }
              <StyledTableCell className="font-light">
                {new Date(row[Object.keys(row)[2]]).toLocaleDateString()}
              </StyledTableCell>
              <StyledTableCell className='font-light'>
                {
                  isAdmin &&
                  <>
                  
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="text-blue-500 cursor-pointer mr-2"
                      onClick={() => handleEdit(row.id)} // Log the ID when edit is clicked
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-red-500 cursor-pointer"
                      onClick={() => confirmDelete(row.id)} 
                    />
                  </>
                }
                {
                  isModule &&
                  <>
                    
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      className="text-gray-500 cursor-pointer ms-2"
                      onClick={() => {
                        const filePath = getFilesPath(row.completionFile || row.requirementFile);
                        handleDownload(filePath)
                      }}
                    />  
                  </>
                }

              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
}
