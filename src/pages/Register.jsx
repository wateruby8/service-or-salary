// 3. 註冊
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react';
import axios from 'axios';
import Swal from 'sweetalert2';
//--- input元件: 文字 & 有type轉變的password
function InputText({ id,type,labelText,rule,errors,register }) {
    //---當key為巢狀結構時，無法直接取用
    const errorField = id.split('.').reduce((obj, key) => obj?.[key], errors);
    return (
    <div className="form-floating mb-4">
        <input
        id={id}
        type={type}
        placeholder={labelText}
        className={`custom-input-border form-control py-3 ${errorField ? 'is-invalid' : ''}`}
        {...register(id, rule)}
        />
        <label htmlFor={id}>{labelText}</label>
        {errorField && <div className="invalid-feedback d-block">{errorField.message}</div>}
    </div>    )
}
function InputPassword({ id, labelText, register, rule, errors }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-5">
      <div className="form-floating position-relative">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          className={`custom-input-border form-control py-3 pe-10 ${errors?.[id] ? 'is-invalid' : ''}`}
          placeholder="Password"
          {...register(id, rule)}
        />
        <label htmlFor={id}>{labelText}</label>
        
        {/* 密碼切換按鈕 */}
        <button
          type="button"
          className="position-absolute end-0 top-50 translate-middle-y border-0 bg-transparent pe-3 text-neutral-500 d-flex align-items-center"
          onClick={() => setShowPassword(!showPassword)}
          tabIndex="-1"
        >
          {showPassword ? (
            <EyeIcon size={20} className='footer-link me-8' />
          ) : (
            <EyeSlashIcon size={20} className='footer-link me-8' />
          )}
        </button>
      </div>
      
      {/* 錯誤訊息 */}
      {errors?.[id] && (
        <div className="invalid-feedback d-block text-start ps-1">
          {errors[id].message}
        </div>
      )}
    </div>
  );
}
//-- 流程：表單送出後，跳轉到登入頁面
export default function Register(){
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onTouched'
    });
    const apiUrl =import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    console.log(apiUrl);

    
    const onSubmit = (data) => {
        console.log('表單資料：', data);
        // 串接 API
        (async()=>{
            try {
                const res = await axios.post(`${apiUrl}/register`,data);
                console.log("成功",res);
                await Swal.fire({
                    icon: 'success',
                    title: '註冊成功！',
                    text: '即將為您跳轉至登入頁面',
                    timer: 3000,
                    showConfirmButton: false
                });
                navigate('/login');
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: '註冊失敗',
                    text: error.response?.data?.message || '請稍後再試',
                    confirmButtonColor: '#f2783c'
                });
            }
        })()
    };
    return(
        <div className='bg-primary-100 p-8 rounded-1'>
            <h1 className='h3 text-center'>
                加入時務所
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputText 
                    id="client.name"
                    type="text"
                    labelText="請輸入暱稱，作為委託案件時的名稱（ 2 ~ 10 字元）"
                    errors={errors}
                    register={register}
                    rule={{
                        required: "請輸入暱稱",
                        minLength:{
                            value:2,
                            message: "暱稱需 2 個字以上"
                        },
                        maxLength:{
                            value:10,
                            message: "暱稱限 10 個字以內"
                        }
                    }}
                />
                <InputText 
                    id="email"
                    type="email"
                    labelText="請輸入電子信箱"
                    errors={errors}
                    register={register}
                    rule={{
                        required: "請輸入 電子信箱",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "電子信箱格式錯誤"
                        }
                    }}
                />
                <InputPassword
                    id="password"
                    labelText="請輸入密碼（8 ~ 20 碼）"
                    register={register}
                    errors={errors}
                    rule={{ 
                        required: "請輸入密碼", 
                        minLength: { value: 8, message: "密碼需至少 8 碼" } ,
                        maxLength: { value: 20, message: "密碼限 20 碼以內" }
                    }}
                />
                <button type="submit" 
                    className="btn btn-primary-filled w-100 py-3 
                        fs-6 fs-md-5 fw-bold">
                    註冊會員
                </button>
            </form>
        </div>
    )
}