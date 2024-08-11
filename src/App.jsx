import React, {useState} from 'react';
import {RouterProvider,useRoutes} from "react-router-dom";
import Routers from './route/Index.jsx';
import HeadNav from "./layout/Header/Index.jsx"
import { Row, Col } from 'antd';
import { Flex, Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const App = () => {
    const routes = useRoutes(Routers);
    const [bg , setBg] = useState(false)
    const handleData = (e)=>{
        setBg(e)
    }
    return (
            <Layout>

                <HeadNav sendDataToParent={handleData} />
                <Content  className={bg ? 'bg-gray-900': ''}>
                    {routes}
                </Content>
            </Layout>
    )
};

export default App;
