import React from 'react';
import './common-layout.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
const { Header } = Layout;
export default class CommonLayout extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Layout>
                    <Header className="header">
                        <div className="logo" />
                        <Menu theme="dark" mode="horizontal">
                            <Menu.Item key="1">短线行情</Menu.Item>
                            <Menu.Item key="2">连板个股</Menu.Item>
                            <Menu.Item key="3">热点资讯</Menu.Item>
                            <Menu.Item key="4">上班盯盘模式</Menu.Item>
                        </Menu>
                        <Button className="signup-btn">注册</Button>
                        <Button className="login-btn">登录</Button>
                    </Header>
                </Layout>
                {
                    this.props.routes.map((route, key) => {
                        return <Route
                            key={key}
                            path={route.path}
                            component={route.component}
                        />
                    })
                }
            </div>
        )
    }
}