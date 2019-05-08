import React, { Component } from 'react';
import { Button, Card, Dropdown, Form, Nav } from 'react-bootstrap';

import { DataTable } from '../../common/dataTable';

export class Defaults extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSelectOption = this.onSelectOption.bind(this);

    this.state = {
      name: null,
      slug: null,
      fieldType: null,
      dataTableTitle: ['Name', 'Slug', 'Type'],
      dataTableData: [
        {
          name: 'Nation slug',
          slug: 'nationslug',
          type: 'Text'
        },
        {
          name: 'DNS providor',
          slug: 'dns_providor',
          type: 'Text'
        },
        {
          name: 'Web designer',
          slug: 'web_designer',
          type: 'Checkbox'
        },
      ]
    }
  };

  handleChange(event) {
    if (event.target.name === 'name' || event.target.name === 'slug') {
      this.setState({[event.target.name]: event.target.value})
    } else {
      this.setState({fieldType: event.target.name})
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    let prevForm = this.state.dataTableData;
    prevForm.push({
      name: this.state.name,
      slug: this.state.slug,
      type: this.state.fieldType
    });

    this.setState({dataTableData: prevForm});
    this.setState({name: null});
    this.setState({slug: null});
    this.setState({fieldType: null});
  }

  onSelectOption(selectedRow) {
    let currentState = this.state.dataTableData;
    const indexOfDeleteRow = currentState.findIndex(each => each === selectedRow)
    currentState.splice(indexOfDeleteRow, 1)
    this.setState({dataTableData: currentState})
  }

  render() {
    const myTabs = [
      'Basics',
      'Custom fields',
      'Social capital',
      'Finance types',
      'Dashboards',
      'Permission sets',
      'Unsubscribe'
    ];

    return (
      <Card style={{border: 'none'}}>
        <Card.Header style={{backgroundColor: '#F0F0F0'}}>
          <Nav variant="tabs" defaultActiveKey="#first">
            {myTabs && myTabs.map(tab => {
              return (
                <Nav.Item >
                  <Nav.Link href={tab === 'Custom fields' ? "#first" : '#link'}>{tab}</Nav.Link>
                </Nav.Item>
              )
            })}
          </Nav>
        </Card.Header>

        <Card.Body>

          <Card style={{border: 'none'}}>
            <Card.Header style={{backgroundColor: 'white', border: 'none'}}>
              <Nav variant="tabs" defaultActiveKey="#first">
                <Nav.Item style={{display: 'flex'}}>
                  <Nav.Link href="#first" style={{border: 'none'}}>People</Nav.Link>
                  <Nav.Link href="#link" style={{border: 'none'}}>Donations</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
          </Card>

          <Card.Body>
            <Card.Title style={{fontWeight: 'bold'}}>Sharing custom field settings</Card.Title>
            <Card.Text>
              You are sharing custom field settings. All custom fields you create will automatically become available to your networked nations.
            </Card.Text>

            <Form onSubmit={this.handleSubmit}>
              <Form.Group id="formName">
                <Form.Label>Name*</Form.Label>
                <Form.Control onChange={this.handleChange} type="text" name="name" value={this.state.name} required/>
              </Form.Group>

              <Form.Group id="formSlug">
                  <Form.Label>Slug*</Form.Label>
                <span>
                  <Form.Control onChange={this.handleChange} type="text" name="slug" value={this.state.slug} style={{display: 'flex'}} required/>
                  <Form.Text className="text-muted">
                    Choose carefully, for data integrity reasons, this cannot be changed later.
                  </Form.Text>
                </span>
              </Form.Group>

              <Form.Group controlId="formFieldType">
                <Form.Label>Field type*</Form.Label>

                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor: 'transparent', border: '1px solid #ced4da', color: '#495057'}}>
                    {this.state.fieldType || 'Select option'}
                  </Dropdown.Toggle>

                  <Dropdown.Menu required>
                    <Dropdown.Item onClick={this.handleChange} name="Text"  style={{borderRadius: 0}}>Text</Dropdown.Item>
                    <Dropdown.Item onClick={this.handleChange} name="Checkbox"  style={{borderRadius: 0}}>Checkbox</Dropdown.Item>
                    <Dropdown.Item onClick={this.handleChange} name="Multiple Choice"   style={{borderRadius: 0}}>Multiple choice</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>

              <Button variant="primary" type="submit" style={{backgroundColor: '#60BAD5', borderColor: '#60BAD5', borderRadius: 2}}>
                Create field
              </Button>
            </Form>

            {this.state.dataTableData &&
              <DataTable
                title={this.state.dataTableTitle}
                data={this.state.dataTableData}
                onSelectOption={(selectedRow) => this.onSelectOption(selectedRow)}/>
            }
          </Card.Body>
        </Card.Body>
      </Card>
    )
  }
}
