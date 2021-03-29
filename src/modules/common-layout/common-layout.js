import React from 'react';
import './common-layout.css';
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Button, Modal, Input } from 'antd';
const { Header } = Layout;
export default class CommonLayout extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            isTickerVisible: false,
            value: ''
        }
    }
    onMenuClick = (item) =>{
        if (item.key === '4') {
            this.setState({
                isTickerVisible: true
            })
        } else if (item.key === '1') {
          this.props.history.push('/');
        }
        // console.log(item)
    }
    handleOk = ()=> {
        let code = this.state.value.substr(0,1) === '6' ? 'sh' + this.state.value : 'sz' + this.state.value;
        console.log(this.state.value)
        window.open('/disguise/' + code)
        this.setState({
            isTickerVisible: false
        })
    }
    handleCancel = ()=> {
        this.setState({
            isTickerVisible: false
        })
    }
    inputValueOnChange = (event)=> {
        this.setState({
            value: event.target.value
        })
    }
    render() {
        return (
            <div>
                <Layout>
                    <Header className="header">
                        <div className="logo" />
                        <Menu theme="dark" mode="horizontal" onClick={this.onMenuClick}>
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
                <Modal title="上班盯盘" visible={this.state.isTickerVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                   <Input onChange={this.inputValueOnChange} placeholder="请输入股票代码"/>
                </Modal>
            </div>
        )
    }
}