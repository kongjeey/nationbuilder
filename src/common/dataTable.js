import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';

import LongMenu from './longMenu';

export class DataTable extends Component {
  constructor(props){
    super(props);

    this.handleActionSelected = this.handleActionSelected.bind(this);
    this.onMouseEnterTableCell = this.onMouseEnterTableCell.bind(this);
    this.handleEdit = this.handleEdit.bind(this);

    this.state = {
      open: false,
      editRow: null,
      onEdit: false
    }
  }

  handleActionSelected(optionName, row) {
    this.props.onSelectOption(row)
  }

  onMouseEnterTableCell(rowIndex) {
    this.setState({editRow: rowIndex})
  }

  handleEdit(data) {
    this.setState({onEdit: true})
  }

  render() {
    const dropDownOption = ['Delete'];

    return (
      <Table>
        <TableHead>
          <TableRow>
            {this.props.title && this.props.title.map(eachTitle => {
              return (
                <TableCell style={{color: 'gray', border: 'none', minWidth: 'none'}}>{eachTitle}</TableCell>
              )})
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.data && this.props.data.map((row, rowIndex) => {
            const columnKeyValue = Object.entries(row);
            return (
              <TableRow
                key={rowIndex}
                hover={false}
                onMouseEnter={() => this.onMouseEnterTableCell(rowIndex)}
                onMouseLeave={() => this.setState({editRow: null})}
                style={this.state.editRow ? {cursor: 'pointer'} : {}}>
                {
                  columnKeyValue.map((column) => {
                    return this.state.onEdit && this.state.editRow === rowIndex ?
                      (<TableCell key={rowIndex} value={column[1]} component="th" scope="row" style={{border: 'none'}}>
                          {column[0] === 'name' && column[1] === this.props.data[rowIndex].name ?
                            <span>
                              <TextField
                                required
                                id="standard-required"
                                defaultValue={column[1]}
                                margin="normal"
                                style={{marginLeft: '8px', marginRight: '8px', width: 100}}/>
                              <Button color="primary" size="small" style={{margin: '8px'}}>
                              <SaveIcon style={{marginRight: '8px', fontSize: 20}} />Save</Button>
                            </span> : ''
                          }
                        </TableCell>) :

                      (<TableCell key={rowIndex} value={column[1]} component="th" scope="row" style={{border: 'none'}}>
                        {column[0] === 'name' && column[1] === this.props.data[rowIndex].name ?
                          <span>
                            <Button
                              onClick={() => this.handleEdit(this.props.data[rowIndex])}
                              color="primary"
                              style={this.state.editRow === rowIndex ? {
                                marginLeft: '-65px',
                                marginTop: '-3px'
                              } : {display: 'none'}}>Edit</Button>
                          </span> : ''
                        }
                        {column[1]}
                      </TableCell>)
                  })
                }
                <LongMenu
                  options={dropDownOption}
                  selectedOption={(optionName) => this.handleActionSelected(optionName, row)} />
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    )
  }
}
