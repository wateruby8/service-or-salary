// 3. 登入
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { EnvelopeSimpleIcon, LockKeyIcon, EyeIcon, EyeSlashIcon } from '@phosphor-icons/react';

export default function Login(){
    const [showPassword, setShowPassword] = useState(false);
    
    // 初始化 react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onTouched' // 離開輸入框時即觸發驗證
    });

    const onSubmit = (data) => {
        console.log('表單資料：', data);
        // 這裡之後串接你的登入 API
    };

    return (<>
    <div className="row">
        <div className="col-md-6 login-bg rounded-start">
            <div className=""></div>
        </div>
        <div className="col-md-6 bg-primary-100 rounded-end ">
            <div className="py-6 px-4">
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
                                className="btn btn-primary w-100 py-3 
                                    fs-6 fs-md-5 fw-bold">
                                登入
                            </button>
                        </div>
                        <div className="col-md-4">
                            <Link to="/register" 
                                className="btn btn-primary w-100 py-3 
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
    </>
        
);}