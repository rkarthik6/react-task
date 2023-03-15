import Table from 'react-bootstrap/Table';
// import './App.css';

const TableData = (props) => {
  return (
    <div className='details'>
      {props?.dogDetails.length > 0 &&
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Height(Metric)</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
        {props?.dogDetails ? props?.dogDetails?.map((item, index) => { 
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.height?.metric}</td>
                    <td>{item.life_span}</td>
                    <td>{item.life_span}</td>
                  </tr>
                )
            }): []}
        </tbody>
      </Table>
      }
    </div>
  )
}

export default TableData;
