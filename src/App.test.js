import React from "react";
import { shallow, mount } from "enzyme";
import App from "./App";

it("renders using enzyme shallow", () => {
  const wrapper = shallow(<App />);
});

it("renders using enzyme mount", () => {
  const wrapper = mount(<App />);
});
