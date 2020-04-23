import React from "react";
import { Table } from "antd";
import PropTypes from "prop-types";
import styles from "./TableList.less";

const TableList = ({
  column,
  dataSource,
  totalCount,
  changePage,
  changePageSize,
  pageSize,
  pageNum,
  loading,
  rowKey,
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>{`共找到${totalCount}条结果`}</div>
      <Table
        loading={loading}
        columns={column}
        rowKey={rowKey}
        dataSource={dataSource}
        pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
          onChange: changePage,
          onShowSizeChange: changePageSize,
          pageSize,
          current: pageNum,
          total: totalCount,
          showTotal: total =>
            `共有 ${total} 条 ， 第 ${pageNum}/${Math.ceil(
              total / pageSize
            )}页`,
        }}
      />
    </div>
  );
};

TableList.propTypes = {
  column: PropTypes.array,
  dataSource: PropTypes.array,
  totalCount: PropTypes.number,
};

TableList.defaultProps = {
  column: [],
  dataSource: [],
  totalCount: 0,
};

export default TableList;
