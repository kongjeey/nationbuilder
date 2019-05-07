import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import LongMenu from './longMenu';

export class DataTable extends Component {
  constructor(props){
    super(props);

    this.handleActionSelected = this.handleActionSelected.bind(this);
    this.state = {
      open: false
    }
  }

  handleActionSelected(optionName, row) {
    this.props.onSelectOption(row)
  }

  render() {
    const dropDownOption = ['Delete'];

    return (
      <Table>
        <TableHead>
          <TableRow>
            {this.props.title && this.props.title.map(eachTitle => {
              return (
                <TableCell style={{color: 'gray'}}>{eachTitle}</TableCell>
              )})
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.data && this.props.data.map((row, index) => {
            const entries = Object.entries(row);
            return (
              <TableRow key={index}>
                {
                  entries.map(entry => {
                    return (
                      <TableCell component="th" scope="row">
                        {entry[1]}
                      </TableCell>
                    )
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