import React from 'react';
import { Link } from 'react-router-dom';
import * as api from '../../../servces/api-client.js';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
class Home extends React.Component {
    componentDidMount() {
        this.test()
    }
    async test() {
        let result = (await api.test()).data;
        let market = (await api.fetchMarket('sh601006'));
        console.log(market, result);
    }
    render() {
        return (
            <div> 主页home <Link to="/account/login">跳转</Link><Link to="/account/signup">跳转</Link></div>

        )
    }

}
export default Home



