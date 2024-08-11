import React, { useState } from 'react';
import { Layout, Menu, Tabs } from 'antd';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import './Index.Moudle.css';

const { Header, Content, Sider } = Layout;
const { TabPane } = Tabs;

const App = () => {
    const [activeKey, setActiveKey] = useState('1');

    const handleMenuClick = e => {
        setActiveKey(e.key);
    };

    return (
        <Layout className="min-h-screen">
            <Sider width={256} className="bg-gray-800 text-white">
                <div className="p-2 text-center font-bold text-lg">LOGO</div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={handleMenuClick}>
                    <Menu.Item key="1">首页</Menu.Item>
                    <Menu.SubMenu key="sub1" title="文章">
                        <Menu.Item key="2">技术文章</Menu.Item>
                        <Menu.Item key="3">用户故事</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu key="sub2" title="资源">
                        <Menu.Item key="4">教程</Menu.Item>
                        <Menu.Item key="5">工具</Menu.Item>
                        <Menu.SubMenu key="sub3" title="更多资源">
                            <Menu.Item key="6">模板</Menu.Item>
                            <Menu.Item key="7">案例研究</Menu.Item>
                        </Menu.SubMenu>
                    </Menu.SubMenu>
                </Menu>
            </Sider>
            <Layout className="bg-white">
                <Header className="bg-blue-500 text-white text-xl p-4">知识星球</Header>
                <Content className="p-4">
                    <SwitchTransition>
                        <CSSTransition
                            key={activeKey}
                            addEndListener={(node, done) => {
                                node.addEventListener("transitionend", done, false);
                            }}
                            classNames="content-animation">
                            <div className="bg-gray-100 p-4 rounded shadow">
                                {activeKey === '1' && <div>这是首页内容。</div>}
                                {activeKey === '2' && <div>这是技术文章内容。</div>}
                                {activeKey === '3' && <div>这是用户故事内容。</div>}
                            </div>
                        </CSSTransition>
                    </SwitchTransition>
                </Content>
                <footer className="text-center p-4 text-gray-600">© 2024 知识星球</footer>
            </Layout>
        </Layout>
    );
};

export default App;
