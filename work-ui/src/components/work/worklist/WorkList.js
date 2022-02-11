import { Typography } from 'antd';
import React from 'react';
import ListContainer from '../../common/list-container/ListContainer';

const { Title } = Typography;

const columns = {
    name: 'Tên công việc',
    assigneId: 'ID người thực hiện',
    creatorId: 'ID người tạo',
    dueDate: 'Ngày giao việc',
    startDate: 'Ngày bắt đầu',
    endDate: 'Ngày kết thúc',
    rate: 'Đánh giá'
}

const WorkList = () => {
    return(
        <div>
            <Title level={3} style={{marginBottom: '20px'}}>Danh sách công việc</Title>
            <ListContainer columns={columns}/>
        </div>
    )
}

export default WorkList;