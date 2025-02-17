import { useState, useEffect } from "react";
import axios from "axios";

const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;
let user = {
    username: 'test@gmail.com',
    password: '1234'
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function deleteCookie(name){
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

function Login({setIsAuth}){
    const [loginData, setLoginData] = useState(user);
    const [loginFail, setLoginFail] = useState(false);
    const getUserData = (e) => {
        let { value, name } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        })
    }
    const userLogin = async (e)=>{
        e.preventDefault();
        try {
            const res = await axios.post(`${VITE_BASE_URL}/admin/signin`, loginData);
            const { token, expired, success } = res.data;
            if(success){
                document.cookie = `token=${token}; expires=${new Date(expired)}; path=/`;
                axios.defaults.headers.common['Authorization'] = token;
                setIsAuth(true);
                alert('登入成功');
            }
        } catch (error) {
            setLoginFail(true);
            console.error(error);
        }
    }

    const checkAuth = async ()=>{
        try {
            const token = getCookie('token'); //get token
            if(token){
                axios.defaults.headers.common['Authorization'] = token; // set token to axios header
                const res = await axios.post(`${VITE_BASE_URL}/api/user/check`); // check login status
                const { success } = res.data;
                if(success) setIsAuth(true);
            }
        } catch (error) {
            console.error(error);
            alert(error.response.data.message);
            // deleteCookie('token');
        }
    }

    useEffect( ()=>{ checkAuth() }, []);

    return(
        <div className="h-screen w-screen bg-gray-200 py-20 p-4 md:p-20 lg:p-32">
            <div className="max-w-sm bg-white rounded-lg overflow-hidden shadow-lg mx-auto">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">歡迎</h2>
                    <p className="text-gray-700 mb-6">請輸入您的帳號密碼</p>
                    <form onSubmit={userLogin}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                                帳號：
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" name="username" type="text" placeholder="Email" onChange={e => getUserData(e)}/>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                                密碼：
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password" placeholder="Password" onChange={e => getUserData(e)}/>
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                登入
                            </button>
                            {
                                loginFail ? <span className="text-red-900">登入失敗</span> : ''
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login