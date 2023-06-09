import React from 'react';
import { Spin } from 'antd';

const RouteLoading = (children: JSX.Element) => {
    return (
        <React.Suspense fallback={
            <div style={{ width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Spin tip="Loading" size="large"></Spin>
            </div>

        }>
            {children}
        </React.Suspense>
    )
}

export default RouteLoading