// 短暫使用，未來需刪除

import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-md bg-body-tertiary">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className='nav-link' to='/'>首頁</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to='/login'>登入</Link>
                        </li>                        
                        <li className="nav-item">
                            <Link className='nav-link' to='/buydemo'>外包內容詳細頁</Link>
                        </li>
                       
                        <li className="nav-item">
                            <Link className='nav-link' to='/buylist'>接案者列表</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to='/forgetpassword'>忘記密碼</Link>
                        </li> 
                       
                        <li className="nav-item">
                            <Link className='nav-link' to='/member'>會員中心</Link>
                        </li>
                       
                        <li className="nav-item">
                            <Link className='nav-link' to='/postbuytime'>刊登買時間</Link>
                        </li>   <li className="nav-item">
                            <Link className='nav-link' to='/postselltime'>刊登賣時間</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to='/register'>註冊</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to='/resetpassword'>重設密碼</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to='/selldemo'>接案者的公開資料</Link>
                        </li>                    
                        <li className="nav-item">
                            <Link className='nav-link' to='/selllist'>外包服務列表</Link>
                        </li>
                      
                    </ul>
                </div>
            </div>
        </nav>)
}