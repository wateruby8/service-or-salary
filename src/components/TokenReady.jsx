//放置在路由檔案 - router -> index.jsx -> Login & Register
//用來檢查有無token，有的話轉至首頁。
//防止已登入的使用者重複跑去登入/註冊頁面

import { useState,useEffect } from "react";
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import GetCookie from './GetCookie';

export default function TokenReady({ children }) {
    const token = GetCookie('token');
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        if (token) {
            // 如果有 token，先跳彈窗
            Swal.fire({
                icon: 'info',
                title: '您已登入',
                text: '系統將為您導向至首頁',
                timer: 1500,
                showConfirmButton: false,
            }).then(() => {
                // 彈窗消失後，觸發跳轉狀態
                setShouldRedirect(true);
            });
        }
    }, [token]);

    // 1. 如果有 token 且還沒跑完彈窗流程，暫時回傳空內容（或讀取中）
    if (token && !shouldRedirect) {
        return null; // 或者回傳一個 Loading 效果
    }

    // 2. 如果彈窗跑完了，就跳轉
    if (shouldRedirect) {
        return <Navigate to="/" replace />;
    }

    // 3. 如果根本沒 token，就正常顯示登入/註冊頁面 (children)
    return children;
}