import React from "react";

import {Button, Select, Input, Checkbox} from 'antd';

const { Option } = Select;

const Form3 = () => {
  return (
    <div>
      <h1>Site Support</h1>

      <label for="cars">What do you need help with? </label>

      <Select name="category" id="category" style={{width: 200}}>
        <Option value="1">Catbook sucks</Option>
        <Option value="2">Where's the log in button ????</Option>
        <Option value="3">I want a different propic</Option>
        <Option value="4">Oink</Option>
      </Select>

      <div />

      <label for="text">Describe your issue in more detail: </label>
      <Input type="text" id="text" name="text" />
      <div />

      <label for="contact">Can we contact you about your feedback? </label>

      <Checkbox id="contact" name="contact" value="Contact" />

      <div />

      <Button onClick={() => {}} type="dashed">Submit</Button>
    </div>
  );
};

export default Form3;
