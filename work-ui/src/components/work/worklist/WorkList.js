import { message, Typography, Form } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListContainer from "../../common/list-container/ListContainer";
import {
  loadWorksStart,
  deleteWorkStart,
  loadWorkStart,
  addWorkStart,
} from "../../../redux/actions/work/actions";
import WorkDetail from "../workdetail/WorkDetail";
import WorkAdd from "../workadd/WorkAdd";

const { Title } = Typography;

const WorkList = () => {
  const columns = {
    name: "Tên công việc",
    assigneId: "ID người thực hiện",
    creatorId: "ID người tạo",
    dueDate: "Ngày giao việc",
    startDate: "Ngày bắt đầu",
    endDate: "Ngày kết thúc",
    rate: "Đánh giá",
  };

  const sortType = {
    ascend: "asc",
    descend: "desc",
  };

  let formatedData = [];

  const [page, setPage] = useState(1);
  const [pageSize, setPageSIze] = useState(5);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState();
  const [visitbleDetailForm, setVisibleDetailForm] = useState(false);
  const [visitbleAddForm, setVisibleAddForm] = useState(false);
  const [addWorkForm] = Form.useForm();

  const { data, loading, error, work } = useSelector(
    (state) => state.workReducer
  );

  const dispatch = useDispatch();

  const loadWorkData = () => {
    let params = { page, pageSize, sort };
    if (search !== "") {
      params = { ...params, search };
    }
    dispatch(loadWorksStart(params));
  };

  const convertDate = (dateInput) => {
    const date = new Date(dateInput);

    const [day, month, year] = [
      date.getDate(),
      date.getMonth() + 1,
      date.getFullYear(),
    ];
    const dayConvert = day / 10 >= 1 ? day : `0${day}`;
    const monthConvert = month / 10 >= 1 ? month : `0${month}`;

    return `${dayConvert}/${monthConvert}/${year}`;
  };

  const formatData = () => {
    formatedData = data?.items?.map((item, index) => ({
      ...item,
      dueDate: convertDate(item.dueDate),
      startDate: convertDate(item.startDate),
      endDate: convertDate(item.endDate),
    }));

    console.log(formatedData);
  };

  const handleOnChangeTable = (pagination, filters, sorter, extra) => {
    if (sorter.order !== undefined && sorter.order != null) {
      const sort = `${sorter.field}:${sortType[sorter.order]}`;
      setSort(sort);
    } else {
      setSort(null);
    }
    setPage(pagination.current);
  };

  const handleOnDeleteWork = (selectedRowKeys) => {
    if (selectedRowKeys.length === 0) {
      message.error("Chọn phần tử cần xóa");
    } else {
      selectedRowKeys.forEach((key) => {
        dispatch(deleteWorkStart(key));
      });
      setTimeout(() => {
        if (loading !== true) {
          loadWorkData();
        }
      }, selectedRowKeys.length * 500);
      setTimeout(message.success("Xóa thành công"), 2000);
    }
  };

  const handleOnSearchWork = (searchTerm) => {
    console.log(searchTerm);
    setSearch(searchTerm);
  };

  const fetchWork = (workId) => {
    dispatch(loadWorkStart(workId));
  };

  const handleOnOpenDetailForm = (workId) => {
    fetchWork(workId);
    if (!loading) {
      setVisibleDetailForm(true);
    }
  };

  const handleOnCloseDetailForm = () => {
    setVisibleDetailForm(false);
  };

  const handleOnOpenAddForm = () => {
    setVisibleAddForm(true);
  };

  const handleOnCloseAddForm = () => {
    setVisibleAddForm(false);
    addWorkForm.resetFields();
  };

  const handleSubmitAddWork = (work) => {
    if (work.startDate > work.endDate) {
      message.error("Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
      return;
    }
    console.log(work);
    dispatch(addWorkStart(work));
    message.success("Thêm mới thành công");
  };

  useEffect(() => {
    loadWorkData();
  }, [page, search, sort]);

  return (
    <div>
      {formatData()}
      <Title level={3} style={{ marginBottom: "20px" }}>
        Danh sách công việc
      </Title>

      <ListContainer
        loading={loading}
        columns={columns}
        totalCount={data.totalCount}
        pageSize={pageSize}
        data={formatedData}
        rowKey={"id"}
        onChangeTable={handleOnChangeTable}
        onClickHandleDelete={handleOnDeleteWork}
        onChangeHandleSearch={handleOnSearchWork}
        onOpenDetailForm={handleOnOpenDetailForm}
        onOpenAddForm={handleOnOpenAddForm}
      />

      <WorkDetail
        visitbleDetailForm={visitbleDetailForm}
        data={work}
        onCloseDetailForm={handleOnCloseDetailForm}
      />

      <WorkAdd
        visible={visitbleAddForm}
        onClose={handleOnCloseAddForm}
        addWorkForm={addWorkForm}
        onSubmitAddWork={handleSubmitAddWork}
      />
    </div>
  );
};

export default WorkList;
