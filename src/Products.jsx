import { useState, useEffect } from "react";
import axios from "axios";
import HeadBar from "./HeadBar";

const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;

function Products ({onLogout}) {
    // const [products, setProducts ] = useState(data);
    const [productDetail, setProductDetail ] = useState(null);
    const [productImage, setProductImage] = useState("");
    const [productImages, setProductImages] = useState([]);
    const [productList, setProductList] = useState([]);

    const getProductList = async ()=>{
      try {
        const res = await axios.get(`${VITE_BASE_URL}/api/${VITE_API_PATH}/products/all`);
        console.log(res.data)
        setProductList(res.data.products);
      } catch (error) {
        console.error(error);
      }
    }

    const toggleImage = (url, index, ary)=>{
        const nowImage = productImage;
        ary.splice(index,1);
        ary.splice(index,0,nowImage);
        setProductImage(url);
    }

    useEffect(()=>{ getProductList() }, []);

    return(
      <>
        <div className="grid grid-cols-2 w-[90rem] px-4">
            <HeadBar onLogout={onLogout}/>
            <div className="mr-2">
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
                                    <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">{
                                      product.is_enabled ? "啟用":"未啟用"
                                    }</span>
                                </td>
                                <td className="px-6 py-4 text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200">
                                    <button className="text-indigo-600 hover:text-indigo-900 hover:bg-sky-200 border p-2 rounded-full" type="button"
                                    onClick={()=>{setProductDetail(product); setProductImage(product.imageUrl); setProductImages(product.imagesUrl);}}>檢視商品</button>
                                </td>
                            </tr>
                      )
                    })
                  }
                  </tbody>
              </table>
            </div>
            <div className="mt-4">
                <h2 className="text-3xl mb-4">單一產品細節</h2>
                { 
                  productDetail ? (
                    <div className="flex flex-col border items-center rounded mb-4">
                      <img src={ productImage } className="w-64 my-2" alt="主圖" />
                      <div className="flex- flex-col w-full">
                        <h5 className="mt-1 ml-1">
                          { productDetail.title }
                          <span className="border bg-blue-500 text-white text-xs font-semibold p-1 px-2 ml-2 rounded-full">{ productDetail.category }</span>
                        </h5>
                      <p className="mt-1 ml-1">商品描述：{ productDetail.description }</p>
                      <p className="mt-1 ml-1">商品內容：{ productDetail.content }</p>
                      <div className="d-flex ml-1">
                        <p className="mt-1 text-gray-900">
                          <del>{ productDetail.origin_price }</del>
                          元 / { productDetail.price } 元
                        </p>
                      </div>
                      <h5 className="mt-1 ml-1">更多圖片：</h5>
                      <div className="flex justify-start flex-wrap mt-1 ">
                        { 
                          productDetail.imagesUrl?.map((url, index, ary)=>{
                            return (
                              url === "" ? "" :
                              <a href="#" className="w-64 mx-4 my-2" key={index} onClick={ 
                                (event)=>{
                                  event.preventDefault();
                                  toggleImage(url, index, ary);
                                }
                              }>
                                <img src={url} className="images w-64 mx-2" alt="附圖" key={index} />
                              </a>)
                          })
                        }
                        </div>
                      </div>
                    </div>

                  ) : ( <p className="text-gray-500">請選擇一個商品查看</p> )
                }
            </div>
        </div>
      </>
    )
}


export default Products