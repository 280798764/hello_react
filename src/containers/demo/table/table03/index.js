
import { divide } from 'lodash'
import Table from '../table'

const Table0 = () => {

    const data = [
        {a: 1, b:2, c: 3, d: 4, key: 1},
        {a: 1, b:2, c: 3, d: 4, key: 2},
        {a: 1, b:2, c: 3, d: 4, key: 2},
        {a: 1, b:2, c: 3, d: 4, key: 2},
        {a: 1, b:2, c: 3, d: 4, key: 2},
        {a: 1, b:2, c: 3, d: 4, key: 2},
       
    ]

    const columns = [
        {
            title: '序号',
            // dataIndex: 'a',
        },
        {
            title: '列1',
            dataIndex: 'a',
        },
        {
            title: '列2',
            dataIndex: 'b',
        },
        {
            title: '列3',
            dataIndex: 'c',
        },
        {
            title: '列4',
            dataIndex: 'd',
        }
    ]
    return (
       <div>
        <Table
        rowKey={(record, index) => record.a}
        dataSource={data}
        columns={columns}
        pagination={true}
        // simplePagination
        />
       </div>
    )
}

export default Table0;