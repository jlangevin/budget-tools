// module.exports = {
//   setupTestFrameworkScriptFile: require.resolve('./jest.setup.js')
// }
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter(), disableLifecycleMethods: true });