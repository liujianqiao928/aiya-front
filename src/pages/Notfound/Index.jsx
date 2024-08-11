import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
    let history = useNavigate();

    return (
        <div className="h-screen flex flex-col items-center justify-center text-white">
            <h1 className="text-6xl font-bold">404</h1>
            <p className="text-xl mb-4">页面未找到！</p>
            <Button type="primary" onClick={() => history('/')}>
                返回首页
            </Button>
            <div className="mt-10 text-center">
                <p>你可能访问了错误的地址，或者页面已被删除。</p>
            </div>
        </div>
    );
}

export default NotFoundPage;
