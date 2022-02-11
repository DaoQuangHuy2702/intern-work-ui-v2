import React from 'react';
import { Table} from 'antd';

const ListContainer = (props) => {
    const data = [];

    let columns = Object.keys(props.columns).map((column) => ({
        title: props.columns[column],
        dataIndex: column,
        key: column,
        sorter: true
    }))

    return(
        <div className="list-container">
            <Table columns={columns} dataSource={data} pagination={{total:100, pageSize:5}}/>
        </div>
    )
}

export default ListContainer;