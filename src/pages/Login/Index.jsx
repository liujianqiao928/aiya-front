import React, { useState } from 'react';
import {Input, Button, Space, message} from 'antd';
import SliderCaptcha from '../../compoent/SliderCaptcha';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWeixin, faGithub } from '@fortawesome/free-brands-svg-icons';
import {useNavigate} from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate()
     const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [loginMode, setLoginMode] = useState('captcha'); // 'captcha' or 'password'
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const toggleRig =()=>{
        navigate('/rigister')
    }
    const sendCode = () => {
        if (phone && captchaVerified && timeLeft === 0) {
            message.success("验证码发送成功")
            setTimeLeft(60);
            const timer = setInterval(() => {
                setTimeLeft(currentTime => {
                    if (currentTime <= 1) clearInterval(timer);
                    return currentTime - 1;
                });
            }, 1000);
        }else {
            message.error("请正确填写手机号码和验证码")
        }
    };

    const toggleLoginMode = () => {
        setLoginMode(loginMode === 'captcha' ? 'password' : 'captcha');
        setCaptchaVerified(false); // Reset captcha verification on mode switch
    };

    return (
        <div className="flex justify-center items-center h-screen ">
            <div className="p-10 bg-white rounded-lg shadow-md space-y-8 max-w-lg w-full relative">
                <h1 className="text-center text-3xl font-semibold">登录</h1>
                <Space direction="vertical" size={32} style={{ display: 'block', width: '100%' }}>
                    <Input placeholder="手机号" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    {loginMode === 'captcha' ? (
                        <>
                            <SliderCaptcha onVerify={setCaptchaVerified} />
                            <div className="flex justify-between items-center">
                                <Input rootClassName="mt-4"
                                    className="flex-grow mr-2"
                                    placeholder="验证码"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    disabled={!captchaVerified}
                                />
                                <Button
                                    onClick={sendCode}
                                    rootClassName="mt-4"
                                    disabled={!captchaVerified || timeLeft > 0}
                                >
                                    {timeLeft > 0 ? `${timeLeft}秒后重新发送` : '发送验证码'}
                                </Button>
                            </div>
                        </>
                    ) : (
                        <Input type="password" rootClassName="mt-4" placeholder="密码" value={password} onChange={(e) => setPassword(e.target.value)} />
                    )}
                    <Button type="primary" rootClassName="mt-4" block disabled={loginMode === 'captcha' && !captchaVerified}>登录</Button>
                </Space>
                <a onClick={toggleLoginMode} className="text-blue-500 cursor-pointer hover:underline absolute bottom-2 left-2">
                    {loginMode === 'captcha' ? '使用账号密码登录' : '使用验证码登录'}
                </a>
                <a onClick={toggleRig} className="text-blue-500 cursor-pointer hover:underline absolute bottom-2 right-2">
                   注册
                </a>
                <div className="flex justify-center space-x-4 mt-4">
                    <FontAwesomeIcon icon={faWeixin} size="2x" className="text-green-500 cursor-pointer hover:scale-110 transition-transform" />
                    <FontAwesomeIcon icon={faGithub} size="2x" className="text-black cursor-pointer hover:scale-110 transition-transform" />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
