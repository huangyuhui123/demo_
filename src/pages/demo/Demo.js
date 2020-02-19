import React, { Component } from 'react'
import * as moment from 'moment';
import { Table, Card,  Row, Col,Button } from 'antd'
import axios from '../../axios/index'
import utils from '../../utils/utils';


export default class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            update_time: moment(new Date()).format("HH:mm:ss"),
        }
    }
    params = {
        page: 1
    }
    componentDidMount() {
        this.request();
        this.setTimeResh();
    }

    //请求数据
    request = () => {
        axios.ajax({
            url: '/interview/frontend',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then((res) => {
            let list = res.allSchoolInfos.map((item, index) => {
                item.key = index + 1;
                item.timeStamp = item.timeStamp ? moment(item.timeStamp).format("YYYY-MM-DD HH:mm:ss"):'';
                return item;
            })
            this.setState({
                dataSource: list,
                totalInfo: res.totalInfo
            })

        })
    }
    //合并footer,根据ui图修改样式，这里未作深入的样式修改
    handlefooter = () => {
        let totallist = this.state.totalInfo;
        let collist = []
        for (let key in totallist) {
            if (key !== "totalTargetAttendNum"&& key!=='totalAttendNum') {
                collist.push(<Col span={2} key={key} >{totallist[key]}</Col>)
            }

        }
        let footer = <Row>
            <Col span={3}>合计</Col>
            <Col span={17}></Col>
            {collist}
        </Row>
        return footer
    }

    //自动刷新
    setTimeResh = () =>{
        const  update_time = utils.formatDate(new Date(),'hh:mm:ss')
        console.log(update_time)
        let _this = this;
        const setTime = 1000*60*10;
        this.clearTimer()
        this.timer = setInterval(()=>{
            _this.setState({
                update_time: update_time
            })
            _this.request();
        },setTime)
    }
    //清除定时器
    clearTimer = () =>{
        if(this.timer){
            clearInterval(this.timer)
        }
    }
    //手动刷新
    hanldResh = () =>{
       const update_time = utils.formatDate(new Date(),'hh:mm:ss')
       this.clearTimer();
       this.request();
       this.setState({
           update_time: update_time
       })
    }   


    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'key',
                width: 80,
            },
            {
                title: "机构",
                dataIndex: 'schoolName',
                width: 100,
                sorter: utils.sorter('schoolName')

            },
            {
                title: "更新时间",
                dataIndex: "timeStamp",
                sorter: utils.sorter('timeStamp')
            },
            {
                title: "排课数",
                dataIndex: "totalClassNum",
                width: 120,
                sorter: utils.sorter('totalClassNum')
            },
            {
                title: "正在上课数",
                width: 120,
                dataIndex: "totalAttendNum",
                sorter: utils.sorter('totalAttendNum')
            }
        ]
        return (
            <Card >
                <Row>
                    上次更新时间{this.state.update_time||''},每隔十分钟自动刷新一次
                </Row>
                <Row>
                    <Button type="primary"  onClick={this.hanldResh}>手动刷新</Button>
                </Row>
                <Table
                    bordered
                    columns={columns}
                    dataSource={this.state.dataSource}
                    pagination={false}
                    footer={this.handlefooter}
                ></Table>
            </Card>
        )
    }
}
