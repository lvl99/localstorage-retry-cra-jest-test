import "jest-enzyme";
import "jest-localstorage-mock";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

global.APP_BRAND = process.env.REACT_APP_BRAND || "da";

configure({ adapter: new Adapter() });
