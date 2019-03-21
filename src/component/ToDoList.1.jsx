import React from 'react'

import { List, Icon } from 'antd';

const todoData  = require('../db/todo.json')


class ToDoList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            msg:'',
            date:''
        }
    }

    render(){
        return (
            <div style={{"padding":"2em"}}>
                <h3>记录木木&啊兽相恋<span style={{"color":"#f759ab"}}>{this.state.date}</span>天 </h3> 
                <List
                size="small"
                header={<div>我想和你做的事</div>}
                // footer={<div>Footer</div>}
                bordered
                dataSource={todoData}
                renderItem={item => (<List.Item style={{"textAlign":"left"}}> <svg style={{"color":"#f759ab"}} className="icon" aria-hidden="true">
                <use xlinkHref="#icon-aixin"></use>
                </svg> {item.toDo}</List.Item>)}
                />
            </div>
        )
    }
    componentWillMount() {
        
    }
    componentDidMount =()=>{
        let s = new Date('2015/10/22')
        let n = new Date();
        let date = n.getTime()-s.getTime() 
        date = Math.floor(date/(24*3600*1000))
        this.setState({
            date:date
        })
    }
}

export default ToDoList