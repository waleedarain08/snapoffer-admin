
import React from 'react';

import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@mui/material';
import PropTypes from "prop-types";

import { SortableContainer, SortableHandle, SortableElement, arrayMove } from 'react-sortable-hoc'

//  Component which uses drag-n-drop activation when clicking inside the component
const DragHandle = SortableHandle(({ style }) => (
  <span style={{ ...style, ...{ cursor: 'move' } }}> {'::::'} </span>)
)

// Universal component for turning a TableBody into a sortable container
const TableBodySortable = SortableContainer(({ children, displayRowCheckbox }) => (
  <TableBody displayRowCheckbox={displayRowCheckbox} >
    {children}
  </TableBody >
))

// The string is necessary for our custom body to be perceived as a TableBody and in this case there will be no error
TableBodySortable.muiName = 'TableBody'

// Component of a row of a table wrapped in a sortable element
const DragableRow = SortableElement(({ data, columns, ...other }) => {
  return (
    <TableRow {...other}>
      <TableCell style={{ width: '5%' }} >
        <DragHandle />
      </TableCell>
      {
        columns?.map(column => <TableCell>{data[column?.name] ?? "-"}</TableCell>)
      }
    </TableRow >
  )
})

function DragableTable({ columns, rows, onOrderChange }) {


  // Handler for traversing completion, helper arrayMove is used
  const onSortEnd = ({ oldIndex, newIndex }) => {
    const oldItem = rows[oldIndex];
    const newItem = rows[newIndex];
    const data = arrayMove(rows, oldIndex, newIndex);
    if (onOrderChange && typeof onOrderChange === 'function') onOrderChange({ oldItem, newItem, oldIndex, newIndex, data });
  };

  return (
    <Table>
      <TableRow>
        <TableCell style={{ width: '5%' }}>&nbsp; </TableCell>
        {
          columns.map(column => <TableCell style={{ textTransform: 'uppercase', fontWeight: 'bold', opacity: 0.5, fontSize: '.6em' }}>{column?.name ?? 'Column Name'}</TableCell>)
        }
      </TableRow>
      <TableBodySortable onSortEnd={onSortEnd} useDragHandle displayRowCheckbox={false}>
        {rows.map((row, index) => {
          return (
            <DragableRow
              index={index}
              key={row.id}
              data={row}
              columns={columns}
            />
          )
        })}
      </TableBodySortable>
    </Table>
  )
  
}

DragableTable.defaultProps = {
  columns: [],
  rows: [{}],
};

DragableTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  rows: PropTypes.arrayOf(PropTypes.object),
};

export default DragableTable;

