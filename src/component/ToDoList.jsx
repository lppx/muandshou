import React from 'react'

import { Modal, Button,Card } from 'antd';

const { Meta } = Card;
const todoData  = require('../db/todo.json')


class ToDoList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            msg:'',
            data:todoData,
            date:'',
            visible: false,
            modelTodo:'',
            modelImg:'',
            modelTime:''
        }
    }
showModal = (data) => {
    this.setState({
      visible: true,
      modelTodo:data.toDo,
      modelImg:data.img,
      modelTime:data.time,
    });
    console.log(JSON.stringify(data))
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

    render(){
        return (
            <div style={{"padding":"2em","maxWidth":"800px","margin":"0 auto"}}>
                <h3 style={{"marginBottom":"20px"}}>记录木木&啊兽相恋<span style={{"color":"#f759ab"}}>{this.state.date}</span>天 </h3>
                <ul style={{"listStyle":"none"}}>
                    {   
                        
                        this.state.data.map((v,k)=>{
                            let iconColor ,isPointer = ''
                            let isPointEvents = 'none'

                            if(v.done){
                                iconColor = "#f759ab"
                                isPointer = "pointer"
                                isPointEvents = ''
                            }
                            return (
                                <li key = {k} style={{"pointerEvents":isPointEvents,"cursor":isPointer}} onClick={this.showModal.bind(this,v)}>
                                    <svg style={{"color":iconColor}} className="icon" aria-hidden="true">
                                    <use xlinkHref="#icon-aixin"></use>
                                    </svg>
                                    {v.toDo}
                                </li>
                            )
                        })
                    }
                </ul>
                <Modal
                // title="Basic Modal"
                footer={null}
                visible={this.state.visible}
                bodyStyle={{}}
                closable={false}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                {/* <img style={{"width":"100%"}} src={this.state.modelImg || ''}/>
                <p>{this.state.modelTime}</p> */}
                <Card
                    hoverable
                    style={{ width: "100%" ,border:"none",paddingBottom:0}}
                    cover={<img src={this.state.modelImg || ''} />}
                >
                    <Meta
                    title={this.state.modelTime}
                    description={this.state.modelTodo}
                    />
                </Card>
                </Modal> 
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