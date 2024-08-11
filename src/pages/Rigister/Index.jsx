import React, { useState } from 'react';
import { Input, Button, Space } from 'antd';
import SliderCaptcha from '../../compoent/SliderCaptcha';
import { message} from "antd";

function RegisterPage() {
    const [phone, setPhone] = useState('');
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [timeLeft, setTimeLeft] = useState(0);

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
        }
        else {
            message.error("请正确填写手机号码和验证码")
        }
    };

    const handleRegister = () => {
        // 在此处添加注册逻辑
        console.log('Register with:', { phone, code, password, confirmPassword });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 sm:p-0">
            <div className="p-6 bg-white rounded-lg shadow-md space-y-6 w-full sm:max-w-lg">
                <h1 className="text-center text-2xl font-semibold">注册</h1>
                <Space direction="vertical" size={24} style={{ display: 'block', width: '100%' }}>
                    <Input placeholder="手机号" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <SliderCaptcha onVerify={setCaptchaVerified} />
                    <div className="mt-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-2">
                        <Input
                            className="flex-grow"
                            placeholder="验证码"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            disabled={!captchaVerified}
                        />
                        <Button
                            className="w-full sm:w-auto"
                            onClick={sendCode}
                            disabled={!captchaVerified || timeLeft > 0}
                        >
                            {timeLeft > 0 ? `${timeLeft}秒后重新发送` : '发送验证码'}
                        </Button>
                    </div>
                    <Input.Password rootClassName="mt-4" placeholder="密码 长度大于等于8位数" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Input.Password rootClassName="mt-4" placeholder="确认密码" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <Button type="primary" rootClassName="mt-4" block disabled={ !captchaVerified} onClick={handleRegister}>注册</Button>
                </Space>
            </div>
        </div>
    );
}

export default RegisterPage;
