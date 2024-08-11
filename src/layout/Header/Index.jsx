import React, {useEffect, useState} from 'react';
import {Menu, Switch, Avatar, Row, Col} from 'antd';
import Logo from '../../static/logo.png'
import {
    HomeOutlined,
    BulbOutlined,
    MessageOutlined,
    TeamOutlined,
    UserOutlined
} from '@ant-design/icons';
import {useNavigate , useLocation} from "react-router-dom";

const Navbar = ( {sendDataToParent}) => {
    const navigate = useNavigate();
    const navigetion = useLocation()
    const [isLogin,setIsLogin] = useState(true)
    const [isVip , setIsVip] = useState(true)
    const [keys ,setKeys] = React.useState([])
    useEffect(()=>{
        console.log(navigetion.pathname)
        handlerBg(visible)
        const name = navigetion.pathname
        setKeys(
            keys.push(name)
        )

        console.log(keys)
    },[])
    const handleClick =(e)=>{
        navigate(e.key)
        console.log(e.key)
    }
    const [visible, setVisible] = useState(true);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    const handlerBg = (e)=>[
        sendDataToParent(e)
    ]
    const handleLogin = ()=>{
        navigate('/login')

    }
    return (


    <div className="bg-gray-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div  className="flex-shrink-0">
                        <img src={Logo} alt="Logo" className="h-8 w-8 rounded-lg transform transition-transform duration-300 hover:scale-110" />
                    </div>

                    {/* Menu and features */}
                    <div className="flex items-center justify-center flex-grow">
                        <Menu defaultSelectedKeys={keys} onSelect={handleClick} mode="horizontal" theme="dark" className="flex-grow justify-center bg-gray-800 border-none">
                            <Menu.Item key="/" icon={<HomeOutlined />} className="text-white">首页</Menu.Item>
                            <Menu.Item key="/answer" icon={<BulbOutlined />} className="text-white">AI问答</Menu.Item>
                            <Menu.Item key="/question" icon={<MessageOutlined />} className="text-white">AI题库</Menu.Item>
                            <Menu.Item key="/star" icon={<TeamOutlined />} className="text-white">AI星球</Menu.Item>
                            <Menu.Item key="/forum" icon={<UserOutlined />} className="text-white">AI论坛</Menu.Item>
                            <Menu.Item key="/chat" icon={<UserOutlined />} className="text-white">AI聊天室</Menu.Item>
                            <Menu.Item key="/class" icon={<UserOutlined />} className="text-white">AI课程</Menu.Item>
                            <Menu.Item key="/rote" icon={<UserOutlined />} className="text-white">AI学习路线</Menu.Item>
                        </Menu>
                        <input type="text" placeholder="请搜索问题" className="ml-4 text-black px-2 py-1 rounded" />
                        <Switch  checkedChildren="暗" unCheckedChildren="明" onClick={handlerBg} defaultChecked={visible} className="mx-4" />
                        <div className="flex items-center ml-4">
                            {isLogin ?  isVip ? <div className="bg-yellow-400 text-black rounded-full px-2 py-1 text-sm">会员</div> : <div className=" text-white rounded-full px-2 py-1 text-sm">会员</div> : <div></div>}
                        </div>
                    </div>

                    {/* User profile */}
                    <div className="flex items-center  transform transition-transform duration-300 hover:scale-110 " onClick={handleLogin}>
                        <Avatar size="medium" icon={<UserOutlined />} />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Navbar;
