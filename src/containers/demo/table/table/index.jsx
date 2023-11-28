import React, {useState, useEffect, useMemo} from "react";
import {isNil, isFunction} from 'lodash'
import {Table} from 'antd'
import cx from 'classnames'
import{useResize, addSerialWidth, generateWidth, inValidRender} from '../../utils'
// SORT_CONFIG
import './style.module.less'

const defaultPagination = {
    defaultCurrent: 1,
    defaultPageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100', '200'],
    showQuickJumper: true
}

const CustomTable = props => {
    const {
        columns = [], dataSource, simplePagination, rowSelection,
        className: tableClassName = '',
        pagination: propsPagination = {},
        onChange: propsOnChange,
        ...otherProps
    } = props;
    const pagination = {...defaultPagination, ...propsPagination};
    const {current = 1,pageSize, defaultPageSize} = pagination;

    // 特征标识
    const [fingerId, setFingerId] = useState({
        hasSerial: columns[0] && columns[0].title === '序号',
        columns,
        sorter: '',
        current,
        total: '',
        pageSize: pageSize || defaultPageSize
    })

    // [1] 列特征标识变更
    useMemo(() => {
        setFingerId({
            ...fingerId,
            hasSerial: columns[0] && columns[0].title === '序号',
            columns
        })
    }, [columns])

    // [2] 外部筛选 data 发生变更
    pagination.showTotal = (total, [start]) => {
        if(fingerId.hasSerial && total !== fingerId.total){
            setFingerId({
                ...fingerId,
                current: Math.ceil(start/(pageSize || defaultPageSize)),
                total
            })
        }
        if(propsPagination && propsPagination.showTotal) return propsPagination.showTotal(total)
        return `总共${total}条记录`
    }

    // [3]props 排序、页码、分页大小变更
    useEffect(() => {
        if(fingerId.current !== current || fingerId.pageSize !== (pageSize || defaultPageSize)){
            setFingerId({
                ...fingerId,
                current,
                pageSize: pageSize || defaultPageSize
            })
        }
    }, [current, pageSize])

    // table事件 排序/页码、分页大小变更
    const handleTableChange = (pagin, filters, sorter) => {
        const {field, order} = sorter;
        setFingerId({
            ...fingerId,
            sorter: `${field}-${order}`,
            current: pagin.current || 1,
            pageSize: pagin.pageSize || defaultPageSize
        })
        if(props.onChange) props.onChange(pagin, filters, sorter)
    }

    const [handleResizeColumn, resizeWidth] = useResize();

    // 重新生成 columns 排序/页码/分页大小/序号列变更重新生成
    const memoziedColumns = useMemo(() => {
        const res = [];
        columns.forEach((item, index) => {
            if(index === 0 && fingerId.hasSerial){
                if(inValidRender(columns[1])) return res.push(item)
                return null;
            }
            const {title, render, children, width, sortType, dataIndex, drag = true} = item
            const resize = generateWidth(resizeWidth, index, rowSelection, fingerId.hasSerial)
            const column = {
                ellipsis: true,
                // sorter: sortType === 'custom' ? true: (sortType ? SORT_CONFIG[sortType](dataIndex) : false),
                sorter: sortType === 'custom' ? true: false,
                render: u => ((isNil(u) || u === '') ? '-' : u),
                ...item,
                ...resize,
                title: param => (
                    <>
                    {isFunction(title) ? title(param) : title}
                    {drag && <div className="reSizeBar" onMouseDown={handleResizeColumn}/>}
                    </>
                )
            }
            if(index === 1 && fingerId.hasSerial){
                if(inValidRender({render, children})) return res.push(column)
                return res.push({
                    ...column,
                    width: addSerialWidth(width),
                    ...resize,
                    className: 'specialColumn',
                    title: param => (
                        <>
                            <div className="absoluteNum">序号</div>
                            <span>{isFunction(title) ? title(param) : title}</span>
                            {drag && <div className="reSizeBar" onMouseDown={handleResizeColumn} />}
                        </>
                    ),
                    render: (record, row, rowIndex) => (
                        <>
                            <div className="absoluteNum">{(fingerId.current - 1) * fingerId.pageSize + rowIndex +1}</div>
                            <span>{isFunction(render) ? render(record, row, rowIndex) : record}</span>
                        </>
                    )
                })
            }
            return res.push(column)
        });
        return res;
    }, [fingerId.columns, fingerId.sorter, fingerId.current, fingerId.pageSize, resizeWidth])


    return (
        <div className="commonTableWrapper">
            <Table
                columns={memoziedColumns}
                dataSource={dataSource instanceof Array ? dataSource : []}
                pagination={propsPagination && pagination}
                onChange={handleTableChange}
                align='left'
                bordered
                className={cx('commonTable', simplePagination && 'simplePagination', tableClassName)}
                rowClassName={(record, index) => (index % 2 === 0 ? 'evenRowStyle' : 'oddRowStyle')}
                rowSelection={rowSelection && {
                    ...rowSelection,
                    columnWidth: 42
                }}
                {...otherProps}
            />
        </div>
    )
}

export default CustomTable;