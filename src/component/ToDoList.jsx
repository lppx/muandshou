import React from 'react'

import { Modal,Card,Divider } from 'antd';
import axios from 'axios'
import  '../css/todolist.css'
// const { Meta } = Card;

const api = 'https://raw.githubusercontent.com/lppx/muandshou/master/src/db/todo.json'

class ToDoList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            msg:'',
            data:[],
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
  getData=()=>{
    axios.get(api)
    .then((response)=>{
        // handle success
        console.log('lppx:',JSON.stringify(response.data));
        this.setState({
            data:response.data
        })
    })
    .catch((error)=>{
        // handle error
        console.log('error:',error);
        const todoData  = require('../db/todo.json')
        this.setState({
            data:todoData
        })
    })
    .then(function () {
        // always executed
    });
  }

  getLoveDate=()=>{
    let s = new Date('2015/10/22 00:00:00')
    let n = new Date();
    let date = n.getTime()-s.getTime() 
    date = Math.floor(date/(24*3600*1000))
    this.setState({
        date:date
    })
  }
  componentDidMount(){
    this.getData();
    this.getLoveDate();
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
                            }
                            if (v.img !='') {
                                isPointer = "pointer"
                                isPointEvents = ''
                            }
                            return (
                                <li key = {k} style={{"pointerEvents":isPointEvents,"cursor":isPointer}} onClick={this.showModal.bind(this,v)}>
                                    <svg style={{"color":iconColor}} className="icon" aria-hidden="true">
                                    <use xlinkHref="#icon-aixin"></use> 
                                    </svg>
                                    <span> </span>
                                    {v.toDo}
                                </li>
                            )
                        })
                    }
                </ul>
                <Divider dashed />
                <p>你是第<span id="busuanzi_value_site_uv"></span>位祝福者💖谢谢！</p>
                <Modal
                // title="Basic Modal"
                footer={null}
                visible={this.state.visible}
                bodyStyle={{}}
                closable={false}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                // destroyOnClose={true}
                centered={true}
                >
                <img style={{"width":"100%"}} src={this.state.modelImg || ''}/>
                <div className="modeltitle">{this.state.modelTime}</div>
                <div className="modeldesc">{this.state.modelTodo}</div>
                {/* <Card
                    hoverable
                    style={{ width: "100%" ,border:"none",paddingBottom:0}}
                    cover={<img src={this.state.modelImg || ''} />}
                >
                    <Meta
                    title={this.state.modelTime}
                    description={this.state.modelTodo}
                    />
                </Card> */}
                </Modal> 
            </div>
        )
    }
    componentWillMount() {
        
    }
    
}

export default ToDoList