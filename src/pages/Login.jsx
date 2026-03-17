// 3. 登入
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link,useNavigate,useLocation } from 'react-router';
import axios from 'axios';
import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react';
import Swal from 'sweetalert2';

export default function Login(){
    const [showPassword, setShowPassword] = useState(false);

    //設定登入後跳轉：轉到會員中心，或是先前/指定的頁面
    const navigate = useNavigate();
    const location = useLocation();
    const destination = location.state?.from?.pathname || "/member";
    // 初始化 react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onTouched' // 離開輸入框時即觸發驗證
    });
    const apiUrl =import.meta.env.VITE_API_URL;
    const onSubmit = async(data) => {
        try {
            const res = await axios.post(`${apiUrl}/login`,data)
            //-- cookie與存入token & useId
            const { accessToken, user } = res.data;
            const cookieSettings = "max-age=604800; path=/; SameSite=Lax";
            document.cookie = `token=${accessToken};${cookieSettings}`;
            document.cookie= `userId=${user.id};${cookieSettings}`;
            axios.defaults.headers.common["Authorization"]=`Bearer ${accessToken}`;
            
            await Swal.fire({
                icon: 'success',
                title: '登入成功',
                timer: 1500,
                showConfirmButton: false
            });
            //-- 跳轉頁面
            navigate(destination, { replace: true });
        } catch (error) {
            let errMessage ='系統繁忙中，請稍後再試。';
            const errData=error.response?.data;
            if (errData === "Incorrect password") {
                errMessage='密碼錯誤！'
            }else if (errData === "Cannot find user") {
                errMessage='此電子信箱尚未註冊會員！'
            }
            Swal.fire({
                icon: 'error',
                title: '登入失敗',
                text: errMessage,
                confirmButtonColor: '#f2783c'
            });
        }
    };

    return (<>
    <div className="bg-primary-100" style={{
        paddingTop:'140px',paddingBottom:'140px'
    }}>
        <div className="container">
            <div className="row">
                <div className="col-md-6 login-bg rounded-start">
                    <div className=""></div>
                </div>
                <div className="col-md-6 bg-neutral rounded-end ">
                    <div className="py-10 px-4">
                        <h1 className='h3 text-center'>登入</h1>
                        <div className="">
                            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            {/* 帳號欄位 */}
                            <div className="form-floating mb-4">
                                <input
                                id='email'
                                type="email"
                                className={`custom-input-border form-control py-3 ${errors.email ? 'is-invalid' : ''}`}
                                placeholder="Email"
                                {...register("email", {
                                    required: "請輸入 Email",
                                    pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "格式錯誤"
                                    }
                                })}
                                />
                                <label htmlFor="email">電子信箱</label>
                                {errors.email && <div className="invalid-feedback d-block">{errors.email.message}</div>}
                            </div>

                            {/* 密碼欄位 */}
                            <div className=" mb-5">
                                <div className="form-floating  position-relative">
                                <input
                                    id='password'
                                    type={showPassword ? "text" : "password"}
                                    className={`custom-input-border form-control py-3 pe-10 ${errors.password ? 'is-invalid' : ''}`}
                                    placeholder="Password"
                                    {...register("password", { 
                                    required: "請輸入密碼",
                                    minLength: { value: 8, message: "最少 8 碼" }
                                    })}
                                />
                                <label htmlFor="password">密碼（最少 8 碼）</label>
                                {/* 密碼切換按鈕：定位在 input 內部右側 */}
                                <button
                                    type="button"
                                    className="position-absolute end-0 top-50 translate-middle-y border-0 bg-transparent pe-3 text-neutral-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                    tabIndex="-1" // 避免 Tab 鍵切換到此按鈕影響輸入流
                                >
                                    {showPassword ? <EyeIcon size={20} className='footer-link me-8' /> : <EyeSlashIcon size={20} className='footer-link me-8' />}
                                </button>
                                </div>
                                {errors.password && <div className="invalid-feedback d-block">{errors.password.message}</div>}
                            </div>
                            <div className="text-end mb-10">
                                <Link to="/resetpassword" className='footer-link '>
                                    忘記密碼
                                </Link>
                            </div>
                            {/* 提交按鈕 */}
                            <div className="row gy-3 flex-md-row-reverse">
                                <div className="col-md-8">
                                    <button type="submit" 
                                        className="btn btn-primary-filled w-100 py-3 
                                            fs-6 fs-md-5 fw-bold">
                                        登入
                                    </button>
                                </div>
                                <div className="col-md-4">
                                    <Link to="/register" 
                                        className="btn btn-secondary-filled w-100 py-3 
                                            fs-6 fs-md-5 fw-bold">
                                        註冊
                                    </Link>
                                </div>
                            </div>
                            
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
);}