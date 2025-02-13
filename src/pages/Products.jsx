import { useState, useEffect } from "react";
import axios from "axios";
import HeadBar from "../component/HeadBar";
import Modal from "../component/Modal";

const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;

const productDefaultData = {
  imageUrl: "",
  title: "",
  category: "",
  unit: "",
  origin_price: "",
  price: "",
  description: "",
  content: "",
  is_enabled: 0,
  imagesUrl: [""]
};


function Products ({onLogout}) {
    const [productList, setProductList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [tempProduct, setTempProduct] = useState(productDefaultData);
    const [title, setTitle] = useState("");
    const [isDelete, setIsDelete] = useState(false);
    const [pageInfo, setPageInfo] = useState({})

    const getProductList = async (page = 1)=>{
      try {
        const res = await axios.get(`${VITE_BASE_URL}/api/${VITE_API_PATH}/admin/products?page=${page}`);
        console.log(res.data);
        setProductList(res.data.products);
        setPageInfo(res.data.pagination);
      } catch (error) {
        console.error(error);
      }
    }
    const handleSaveProduct = async (tempProduct)=>{
      const productData = {
        ...tempProduct, 
        origin_price: Number(tempProduct.origin_price), 
        price: Number(tempProduct.price),
        is_enabled: tempProduct.is_enabled ? 1 : 0
      };

      try {
        if(isDelete){
          await axios.delete(`${VITE_BASE_URL}/api/${VITE_API_PATH}/admin/product/${productData.id}`);
        }else{
          if(productData.id){
            await axios.put(`${VITE_BASE_URL}/api/${VITE_API_PATH}/admin/product/${productData.id}`, { data: productData});
          } else {
            await axios.post(`${VITE_BASE_URL}/api/${VITE_API_PATH}/admin/product`, { data: productData});
          }
        }
        getProductList();
      } catch (error) {
        alert('儲存失敗');
        console.log(error);
      } finally {
        setIsDelete(false);
      }
    };
      
    const handleModalInputChange = e => {
      const { value, name, checked, type } = e.target;
  
      setTempProduct({
        ...tempProduct,
        [name]: type === 'checkbox' ? checked : value
      })
    }

    const handleImageChange = (e, index) => {
      const { value } = e.target;
      const newImages = [...tempProduct.imagesUrl];
  
      newImages[index] = value;
      setTempProduct({
        ...tempProduct,
        imagesUrl: newImages
      })
    }

    const handleAddImage = () => {
      const newImages = [...tempProduct.imagesUrl, ''];
  
      setTempProduct({
        ...tempProduct,
        imagesUrl: newImages
      })
    };
    const handleRemoveImage = () => {
      const newImages = [...tempProduct.imagesUrl];
      newImages.pop();
      setTempProduct({
        ...tempProduct,
        imagesUrl: newImages
      })
    };

    const handlePageChange = (page) => {
      getProductList(page);
    }


    useEffect(()=>{ getProductList() }, []);

    return(
      <>
        <div className="flex flex-col w-[90rem] px-4">
            <HeadBar onLogout={onLogout} setShowModal={setShowModal} setTitle={setTitle} setTempProduct={setTempProduct} setIsDelete={setIsDelete}/>
            <div className="mb-2">
              <h2 className="text-3xl">產品列表</h2>
              <table className="min-w-full mt-2">
                  <thead>
                      <tr>
                          <th className="px-6 py-3 font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                              產品名稱</th>
                          <th className="px-6 py-3 font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                              原價</th>
                          <th className="px-6 py-3 font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                              售價</th>
                          <th className="px-6 py-3 font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                              是否啟用</th>
                          <th className="px-6 py-3 font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                              查看細節</th>
                      </tr>
                  </thead>
                  <tbody className="bg-white">
                  {
                    productList.map((product)=>{
                      return(
                        <tr key={product.id}>
                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <div className="flex items-center">
                                        <div className="ml-1">
                                            <div className="text-sm font-medium leading-5 text-gray-900">{product.title}</div>                               
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div className="text-sm leading-5 text-gray-900">{ product.origin_price }</div>
                                </td>
                                <td className="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap border-b border-gray-200">
                                    {product.price}</td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <span className={`inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full ${product.is_enabled ? "bg-green-100 text-green-800":"bg-red-100 text-red-800"}`}>{
                                      product.is_enabled ? "啟用":"未啟用"
                                    }</span>
                                </td>
                                <td className="px-6 py-4 text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200">
                                    <button className="text-indigo-600 hover:text-indigo-900 hover:bg-sky-200 border px-4 py-2 rounded-full mr-1" type="button"
                                    onClick={()=>{
                                      setTempProduct(product);
                                      setShowModal(true);
                                      setTitle("編輯產品");
                                      setIsDelete(false);
                                    }}>編輯</button>
                                    <button className="bg-white text-red-600 border hover:text-white hover:bg-red-400 hover:border-red-400 px-4 py-2 rounded-full" type="button"
                                    onClick={()=>{
                                      setTempProduct(product);
                                      setShowModal(true);
                                      setTitle("刪除產品");
                                      setIsDelete(true);
                                    }}>刪除</button>
                                </td>
                            </tr>
                      )
                    })
                  }
                  </tbody>
              </table>
            </div>
            {/* pagination */}
            <nav className="flex justify-center mb-2" aria-label="Page navigation">
              <ul className="inline-flex -space-x-px text-sm">
                <li >
                  <a href="#" className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight  bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-blue-800  
                  ${!pageInfo.has_pre ? 'pointer-events-none text-gray-500' : 'text-blue-500'} `} 
                  onClick={() => handlePageChange(pageInfo.current_page - 1)}
                  >上一頁</a>
                </li>
                {
                  Array.from({length: pageInfo.total_pages}).map((_, index) => (
                  <li key={index}>
                    <a href="#" className={`flex items-center justify-center px-3 h-8 leading-tight  border border-gray-300  ${ pageInfo.current_page === index + 1 ? 'bg-blue-500 text-white hover:bg-blue-500 hover:text-white' : 'text-blue-500 bg-white hover:bg-gray-100 hover:text-blue-800' }`}
                    onClick={() => handlePageChange(index+1)}
                    >
                      {index + 1}
                    </a>
                  </li>
                  ))
                }
                <li>
                  <a href="#" className={`flex items-center justify-center px-3 h-8 leading-tight bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-blue-800
                  ${!pageInfo.has_next ? 'pointer-events-none text-gray-500' : 'text-blue-500'}`}
                  onClick={() => handlePageChange(pageInfo.current_page + 1)}
                  >下一頁</a>
                </li>
              </ul>
            </nav>
        </div>
        {/*  Modal */}
        <Modal showModal={showModal} setShowModal={setShowModal} title={title} onSave={handleSaveProduct} tempProduct={tempProduct} isDelete={isDelete}>
          {/* Modal Content */}
          {isDelete ? (
            <div className="flex flex-col w-full">
              <p className="text-red-600 text-lg">
                確定要刪除 <strong className="text-2xl">{ tempProduct.title }</strong> ?
              </p>
            </div>
          ) : (
            <div className="flex flex-col w-full sm:flex-row sm:flex-row-reverse">
              <div className="w-full sm:w-1/2 lg:w-3/4">
                      <div className="mb-3">
                        <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">
                          標題
                        </label>
                        <input
                          value={tempProduct.title}
                          onChange={handleModalInputChange}
                          name="title"
                          id="title"
                          type="text"
                          className="border block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          placeholder="請輸入標題"
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="category" className="block text-sm/6 font-medium text-gray-900">
                          分類
                        </label>
                        <input
                          value={tempProduct.category}
                          onChange={handleModalInputChange}
                          name="category"
                          id="category"
                          type="text"
                          className="border block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          placeholder="請輸入分類"
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="unit" className="block text-sm/6 font-medium text-gray-900">
                          單位
                        </label>
                        <input
                          value={tempProduct.unit}
                          onChange={handleModalInputChange}
                          name="unit"
                          id="unit"
                          type="text"
                          className="border block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          placeholder="請輸入單位"
                        />
                      </div>

                      <div className="flex gap-3 mb-3">
                        <div className="w-1/2">
                          <label htmlFor="origin_price" className="block text-sm/6 font-medium text-gray-900">
                            原價
                          </label>
                          <input
                            value={tempProduct.origin_price}
                            onChange={handleModalInputChange}
                            name="origin_price"
                            id="origin_price"
                            type="number"
                            className="border block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            placeholder="請輸入原價"
                          />
                        </div>
                        <div className="w-1/2">
                          <label htmlFor="price" className="block text-sm/6 font-medium text-gray-900">
                            售價
                          </label>
                          <input
                            value={tempProduct.price}
                            onChange={handleModalInputChange}
                            name="price"
                            id="price"
                            type="number"
                            className="border block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            placeholder="請輸入售價"
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                          產品描述
                        </label>
                        <textarea
                          value={tempProduct.description}
                          onChange={handleModalInputChange}
                          name="description"
                          id="description"
                          className="border block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          rows={4}
                          placeholder="請輸入產品描述"
                        ></textarea>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="content" className="block text-sm/6 font-medium text-gray-900">
                          說明內容
                        </label>
                        <textarea
                          value={tempProduct.content}
                          onChange={handleModalInputChange}
                          name="content"
                          id="content"
                          className="border block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          rows={4}
                          placeholder="請輸入說明內容"
                        ></textarea>
                      </div>

                      <div className="flex items-center mb-3">
                        <input
                          checked={tempProduct.is_enabled}
                          onChange={handleModalInputChange}
                          name="is_enabled"
                          type="checkbox"
                          className="w-4 h-4 mr-2"
                          id="isEnabled"
                        />
                        <label className="" htmlFor="isEnabled">
                          是否啟用
                        </label>
                      </div>
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/4 mr-2">
                      <div className="mb-4">
                        <label htmlFor="primary-image" className="block text-sm/6 font-medium text-gray-900">
                          主圖
                        </label>
                        <div>
                          <input
                            value={tempProduct.imageUrl}
                            onChange={handleModalInputChange}
                            name="imageUrl"
                            type="text"
                            id="primary-image"
                            className="block w-full rounded-md bg-white p-1 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            placeholder="請輸入圖片連結"
                          />
                        </div>
                        <img
                          src={tempProduct.imageUrl}
                          alt="main image"
                          className="max-w-full h-auto rounded-lg mt-2"
                        />
                      </div>

                      <div className="w-full rounded-lg border border-dashed border-gray-900/25 p-3">
                        {tempProduct.imagesUrl?.map((image, index) => (
                          <div key={index} className="mb-2">
                            <label
                              htmlFor={`imagesUrl-${index + 1}`}
                              className="form-label"
                            >
                              副圖 {index + 1}
                            </label>
                            <input
                              value={image}
                              onChange={(e) => handleImageChange(e, index)}
                              id={`imagesUrl-${index + 1}`}
                              type="text"
                              placeholder={`圖片網址 ${index + 1}`}
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 mb-2"
                            />
                            {image && (
                              <img
                                src={image}
                                alt={`副圖 ${index + 1}`}
                                className="max-w-full h-auto rounded-lg mb-2"
                              />
                            )}
                          </div>
                        ))}

                        <div className="inline-flex justify-center shadow-xs w-full">
                          {tempProduct.imagesUrl.length < 5 && tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1] !== '' && (
                            <button className="w-full sm:w-auto px-4 py-2 mr-2 text-sm font-medium text-blue-700 bg-transparent border border-blue-700 rounded hover:bg-blue-700 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-900 focus:text-white" onClick={handleAddImage}>新增圖片</button>
                          )}
                          {tempProduct.imagesUrl.length > 1 && (
                            <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-red-700 bg-transparent border border-red-700 rounded hover:bg-red-700 hover:text-white focus:z-10 focus:ring-2 focus:ring-red-500 focus:bg-red-700 focus:text-white" onClick={(handleRemoveImage)}>取消圖片</button>
                          )}
                        </div>
                      </div>
              </div>
            </div>
          )}
        </Modal>
      </>
    )
}


export default Products