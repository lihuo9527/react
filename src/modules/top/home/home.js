import React from 'react';
import { Link } from 'react-router-dom';
import * as api from '../../../servces/api-client.js';
import { Table, Tag, Space, Rate } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';


class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                {
                    title: '股票代码',
                    dataIndex: 'name',
                    key: 'name',
                    render: text => <a>{text}</a>,
                },
                {
                    title: '价格',
                    dataIndex: 'price',
                    key: 'price',
                },
                {
                    title: '涨幅',
                    dataIndex: 'up',
                    key: 'up',
                },
                {
                    title: '概念',
                    key: 'concept',
                    dataIndex: 'concept',
                    render: tags => (
                        <>
                            {tags.map(tag => {
                                let color = tag.length > 5 ? 'geekblue' : 'green';
                                if (tag === 'loser') {
                                    color = 'volcano';
                                }
                                return (
                                    <Tag color={color} key={tag}>
                                        {tag.toUpperCase()}
                                    </Tag>
                                );
                            })}
                        </>
                    ),
                },
                {
                    title: '人气排行',
                    key: 'ranking',
                    dataIndex: 'ranking',
                },
                {
                    title: '接力指数',
                    key: 'relay',
                    dataIndex: 'relay',
                    render: rate => (<Rate disabled defaultValue={rate}/>),
                },
            ],

            data: [
            ]
        }
    }
    componentDidMount() {
        this.fetchData()
    }
    async fetchData() {
        try {
            let result = (await api.fetchData()).data;
            console.log(result);
            this.setState({
                data: result[0].data
            })
        } catch (e) {
            console.log(e);
        }
        
        // let market = (await api.fetchMarket('sh601006'));
    }
    render() {
        return (
            <div> <Table columns={this.state.columns} dataSource={this.state.data} /></div>

        )
    }

}
export default Home



