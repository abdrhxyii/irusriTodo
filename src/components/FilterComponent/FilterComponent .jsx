import React from 'react'
import { Radio } from 'antd';

const FilterComponent = ({ filter, setFilter }) => (
    <Radio.Group
      className="ml-4"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    >
      <Radio.Button value="all">All</Radio.Button>
      <Radio.Button value="completed">Completed</Radio.Button>
      <Radio.Button value="incomplete">Incomplete</Radio.Button>
    </Radio.Group>
);

export default FilterComponent 