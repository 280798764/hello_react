
import React, { useState } from "react";
import Table from '../table'
import './style.module.less'

const TablePage = function(){

    const [selectName, setSelectName] = useState('a1')

    const column = [
        {
            title: '第一列',
            dataIndex: 'a'
        },
        {
            title: '第二列',
            dataIndex: 'b'
        },
        {
            title: '第三列',
            dataIndex: 'c'
        }
    ]

    const arr = [
        {a: 'a1', b: 'bbb', c: 'ccc'},
        {a: 'a2', b: 'bbb', c: 'ccc'},
        {a: 'a3', b: 'bbb', c: 'ccc'},
        {a: 'a4', b: 'bbb', c: 'ccc'},
        {a: 'a5', b: 'bbb', c: 'ccc'}
    ]

    const onRow = (obj) => {
        console.log(obj)
        setSelectName(obj.a)
    }

    const setRowClassName = (record, index) => {
        const selectedRowStyle = record.a === selectName ? 'selectedRow' : ''
        console.log(selectedRowStyle, '000')
        let className = 'evenRowStyle';
        if(index % 2 === 1){
            className = 'oddRowStyle'
        }
        return `${className} ${selectedRowStyle}`
    }

    return(
        <div className='box'>
            <Table
                columns={column}
                dataSource={arr}
                onRow={(record) => ({
                    onClick: () => {onRow(record)}
                })}
                rowClassName={setRowClassName}
                
           />
        </div>
    )
}

export default TablePage;