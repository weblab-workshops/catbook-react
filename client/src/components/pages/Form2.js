import React from "react";

const Form2 = () => {
    return (
        <div>
          <h1 class="text-3xl">Site Support</h1>
    
          <label for="cars">What do you need help with? </label>
    
          <select name="category" id="category" class="border border-solid">
            <option value="1">Catbook sucks</option>
            <option value="2">Where's the log in button ????</option>
            <option value="3">I want a different propic</option>
            <option value="4">Oink</option>
          </select>
    
          <div class="py-5" />
    
          <label for="text">Describe your issue in more detail: </label>
          <input type="text" id="text" name="text" class="border border-solid"/>
          <div />
        
          <label for="contact">Can we contact you about your feedback? </label>

          <input type="checkbox" id="contact" name="contact" value="Contact" class=""/>

          <div />
    
          <button onClick={() => {}} class="border border-solid rounded shadow-lg px-2">Submit</button>
        </div>
      );
};

export default Form2;
