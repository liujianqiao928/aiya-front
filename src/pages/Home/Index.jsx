import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Statistic, Card, Row, Col, Slider } from 'antd';

function App() {
    const mainChartRef = useRef(null);
    const radarChartRef = useRef(null);

    // 初始化图表
    useEffect(() => {
        const mainChart = echarts.init(mainChartRef.current);
        const radarChart = echarts.init(radarChartRef.current);

        mainChart.setOption({
            title: { text: '访客量', textStyle: { color: '#ccc' } },
            tooltip: { trigger: 'axis' },
            xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
            yAxis: { type: 'value' },
            series: [{ type: 'line', data: [820, 932, 901, 934, 1290, 1330, 1320], areaStyle: {} }]
        });

        radarChart.setOption({
            title: { text: '技能分析', textStyle: { color: '#ccc' } },
            tooltip: {},
            radar: {
                indicator: [
                    { name: '销售', max: 6500 },
                    { name: '管理', max: 16000 },
                    { name: '信息技术', max: 30000 },
                    { name: '客户支持', max: 38000 },
                    { name: '研发', max: 52000 },
                    { name: '市场', max: 25000 }
                ]
            },
            series: [{ name: '预算 vs 开销', type: 'radar', data: [{ value: [4200, 3000, 20000, 35000, 50000, 18000], name: '预算' }] }]
        });

        return () => {
            mainChart.dispose();
            radarChart.dispose();
        };
    }, []);

    return (
        <div className="min-h-screen  from-gray-900 to-black text-white overflow-hidden">
            <Row gutter={24} className="p-10">
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="活跃用户"
                            value={1128}
                            className="text-blue-600"
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="订阅数"
                            value={93}
                            suffix="%"
                            className="text-green-600"
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Card>
                            <Statistic
                                title="订阅数"
                                value={93}
                                suffix="%"
                                className="text-green-600"
                            />
                        </Card>
                    </Card>
                </Col>
            </Row>
            <Row gutter={16} className="p-10">
                <Col span={12}>
                    <Card className="bg-transparent border-none">
                        <div ref={mainChartRef} style={{ height: '400px' }}></div>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card className="bg-transparent border-none">
                        <div ref={radarChartRef} style={{ height: '400px' }}></div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default App;
