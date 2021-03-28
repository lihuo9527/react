import environmentDev from './environment-develop.js';
import environmentPro from './environment-production.js';
import environmentTest from './environment-test.js';
let environment = {}
if (process.env.REACT_APP_MODE === 'development') {
    console.log('开发环境');
    environment = environmentDev
} else if (process.env.REACT_APP_MODE === 'production') {
    console.log('生产环境')
    environment = environmentPro
} else if (process.env.REACT_APP_MODE === 'test'){
    console.log('测试环境')
    environment = environmentTest
}
export default environment