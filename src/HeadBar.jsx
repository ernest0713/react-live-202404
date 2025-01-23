import axios from "axios";

const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;

function HeadBar({ onLogout }){

    const logout = async ()=>{
        try {
            const res = await axios.post(`${VITE_BASE_URL}/logout`);
            console.log(res.data);
            if(res.data.success) onLogout(res.data);
            alert('已登出');
        } catch (error) {
            alert('登出失敗');
            console.log(error);
        }
    }
    return(
        <>
            <div className="flex justify-start my-2 col-span-2">
                <div className="mr-4">
                    <button className="p-2 border rounded hover:bg-blue-500 hover:text-orange-500" type="button">驗證登入</button>
                </div>
                <div><button className="p-2 border rounded hover:bg-blue-500 hover:text-orange-500" type="button" onClick={()=>{logout();}}>登出</button></div>
            </div>
        </>
    )
}



export default HeadBar