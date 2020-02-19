import React from 'react';
import { HashRouter, Route} from 'react-router-dom';
import App from './App'
import Demo from './pages/demo/Demo';


export default class IRouter extends React.Component{
    render(){
        return(
            <HashRouter>
                {/* 子路由需要使用render放法 */}
                <App>
                    <Route path="/" component={Demo}></Route>
                </App>
            </HashRouter>
        )
    }
}