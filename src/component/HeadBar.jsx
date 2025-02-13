import axios from "axios";

const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;

function HeadBar({ onLogout, setShowModal, setTitle, setTempProduct, setIsDelete }){

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
            <div className="flex justify-between my-2 col-span-2">
                <div className="mr-4">
                    <button className="p-2 border rounded hover:bg-blue-500 hover:text-orange-500" type="button" onClick={()=>{
                        setShowModal(true);
                        setTitle("新增產品");
                        setTempProduct({
                            imageUrl: "",
                            title: "",
                            category: "",
                            unit: "",
                            origin_price: "",
                            price: "",
                            description: "",
                            content: "",
                            is_enabled: 0,
                            imagesUrl: [""]});
                        setIsDelete(false);
                    }}>新增產品</button>
                </div>
                <div>
                    <button className="p-2 border rounded hover:bg-blue-500 hover:text-orange-500" type="button" onClick={()=>{logout()}}>登出</button>
                </div>
            </div>
        </>
    )
}



export default HeadBar