//放置在路由檔案 - router -> index.jsx -> member
//用來檢查有無token，有的話則放行，反則轉至Login

import { Navigate } from 'react-router-dom';
import GetCookie from './GetCookie';

export default function TokenCheck({ children }) {
    const token = GetCookie('token');
    if (!token) {
    // 沒 Token 就踢回登入頁
    return <Navigate to="/login" replace />;
  }
}