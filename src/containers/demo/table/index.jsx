import logo from './logo.svg';
import { Table } from 'antd';
import './App.css';

function App() {

const data = [
  {a: 'a', b: 'b', c: 'c' },
  {a: 'a', b: 'b', c: 'c' },
  {a: 'a', b: 'b', c: 'c' },
  {a: 'a', b: 'b', c: 'c' },
  {a: 'a', b: 'b', c: 'c' }
]

const column = [
  {
    title: 'a',
    dataIndex: 'a'
  },
  {
    title: 'a',
    dataIndex: 'a'
  },
  {
    title: 'a',
    dataIndex: 'a'
  },
  {
    title: 'a',
    dataIndex: 'a'
  },
  {
    title: 'a',
    dataIndex: 'a'
  },
  {
    title: 'a',
    dataIndex: 'a'
  }
]

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Table
      dataSource={data}
      columns={column}
      scroll={{y: 200}}
      summary={() => (
        <Table.Summary fixed>
          <Table.Summary.Row >
            <Table.Summary.Cell index={1}>汇总1</Table.Summary.Cell>
            <Table.Summary.Cell index={2}>2</Table.Summary.Cell>
            <Table.Summary.Cell index={3}>3</Table.Summary.Cell>
            <Table.Summary.Cell index={4}>4</Table.Summary.Cell>
            <Table.Summary.Cell index={5}>5</Table.Summary.Cell>
            <Table.Summary.Cell index={6}>6</Table.Summary.Cell>
          </Table.Summary.Row>
        </Table.Summary>
      )}
       />
    </div>
  );
}

export default App;
