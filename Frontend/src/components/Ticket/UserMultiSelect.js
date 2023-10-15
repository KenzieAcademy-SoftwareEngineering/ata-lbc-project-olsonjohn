import React from 'react';

import {
  MultiSelect,
  useMultiSelect,
} from "chakra-multiselect";

const UserMultiSelect = ({
  onChange: _onChange,
  value: _value,
  options: __options,
  ...props
}) => {
  const { value, options, onChange } = useMultiSelect({
    value: _value || (props.single ? "" : []),
    options: __options,
    onChange: _onChange,
  });

  return (
    <MultiSelect
      value={value}
      options={options}
      onChange={onChange}
      {...props}
    />
  );
};

export default UserMultiSelect;
