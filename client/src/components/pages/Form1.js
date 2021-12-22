import React from "react";

const Form1 = () => {
  return (
    <div>
      <h1>Site Support</h1>

      <label for="cars">What do you need help with? </label>

      <select name="category" id="category">
        <option value="1">Catbook sucks</option>
        <option value="2">Where's the log in button ????</option>
        <option value="3">I want a different propic</option>
        <option value="4">Oink</option>
      </select>

      <div />

      <label for="text">Describe your issue in more detail: </label>
      <input type="text" id="text" name="text" />
      <div />

      <input type="checkbox" id="contact" name="contact" value="Contact" />

      <label for="contact">Can we contact you about your feedback? </label>

      <div />

      <button onClick={() => {}}>Submit</button>
    </div>
  );
};

export default Form1;
