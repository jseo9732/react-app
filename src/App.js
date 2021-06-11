import React, { Component } from 'react';
import Subject from "./components/Subject";
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Control from './components/Control';
import './App.css';



class App extends Component {
  constructor(props){ //Component가 실행될 때 constructor라는 함수가 있다면 constructor가 가장 먼저 실행돼서 초기화를 담당한다.
    super(props);
    this.max_content_id = 3;
    this.state={ //state 값을 초기화시킴.
      mode:'welcome',
      selected_content_id: 2,
      subject:{title:'WEB', sub:'world wide web!'},
      welcome:{title:'welcome', desc:'Hello, React!!'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }
  getContents(){
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'read'){
      var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
        this.max_content_id = this.max_content_id + 1;
        var _contents = this.state.contents.concat(
          {id: this.max_content_id, title: _title, desc: _desc}
        );
        this.setState({
          contents: _contents
        });
      }.bind(this)}></CreateContent>
    } else if(this.state.mode === 'update'){
      _article = <UpdateContent onSubmit={function(_title, _desc){
        this.max_content_id = this.max_content_id + 1;
        var _contents = this.state.contents.concat(
          {id: this.max_content_id, title: _title, desc: _desc}
        );
        this.setState({
          contents: _contents
        });
      }.bind(this)}></UpdateContent>
    }
    return _article;
  }
  
  render() {
    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function(){
            this.setState({mode:'welcome'});
          }.bind(this)}
        >
        </Subject> 
        <TOC 
          onChangePage={function(id){
            this.setState({
              mode:'read',
              selected_content_id: Number(id)
            });
          }.bind(this)} 
          data={this.state.contents}>
        </TOC>
        <Control 
          onChangeMode = {function(_mode){
            this.setState({
              mode:_mode
            })
          }.bind(this)}></Control>
        {this.getContents()}
      </div>
    );
  }
}

export default App;