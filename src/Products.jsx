import { useState } from "react";
import './App.css'
const products = [
    {
      category: "甜甜圈",
      content: "尺寸：14x14cm",
      description:
        "濃郁的草莓風味，中心填入滑順不膩口的卡士達內餡，帶來滿滿幸福感！",
      id: "-L9tH8jxVb2Ka_DYPwng",
      is_enabled: 0,
      origin_price: 150,
      price: 99,
      title: "草莓莓果夾心圈",
      unit: "元",
      num: 10,
      imageUrl: "https://images.unsplash.com/photo-1583182332473-b31ba08929c8",
      imagesUrl: [
        "https://images.unsplash.com/photo-1626094309830-abbb0c99da4a",
        "https://images.unsplash.com/photo-1559656914-a30970c1affd"
      ]
    },
    {
      category: "蛋糕",
      content: "尺寸：6寸",
      description:
        "蜜蜂蜜蛋糕，夾層夾上酸酸甜甜的檸檬餡，清爽可口的滋味讓人口水直流！",
      id: "-McJ-VvcwfN1_Ye_NtVA",
      is_enabled: 1,
      origin_price: 1000,
      price: 900,
      title: "蜂蜜檸檬蛋糕",
      unit: "個",
      num: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80",
      imagesUrl: [
        "https://images.unsplash.com/photo-1618888007540-2bdead974bbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80"
      ]
    },
    {
      category: "蛋糕",
      content: "尺寸：6寸",
      description: "法式煎薄餅加上濃郁可可醬，呈現經典的美味及口感。",
      id: "-McJ-VyqaFlLzUMmpPpm",
      is_enabled: 1,
      origin_price: 700,
      price: 600,
      title: "暗黑千層",
      unit: "個",
      num: 15,
      imageUrl:
        "https://images.unsplash.com/photo-1505253149613-112d21d9f6a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fGNha2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
      imagesUrl: [
        "https://images.unsplash.com/flagged/photo-1557234985-425e10c9d7f1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA5fHxjYWtlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
        "https://images.unsplash.com/photo-1540337706094-da10342c93d8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGNha2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
      ]
    }
  ];


function Products (){
    // const [products, setProducts ] = useState(data);
    const [productDetail, setProductDetail ] = useState(null);
    const [productImage, setProductImage] = useState("");
    const [productImages, setProductImages] = useState([]);

    return(
      <div className="flex justify-center">
        <div className="flex justify-center mt-4 p-4 w-[90rem]">
          <div className="w-6/12 mr-2">
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
                  products.map((product)=>{
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
            <div className="w-6/12 mt-4">
              <h2 className="text-3xl mb-4">單一產品細節</h2>
              { 
                productDetail ? (
                  <div className="flex flex-col border items-center rounded mb-4 rounded">
                    <img src={ productImage } className="w-64" alt="主圖" />
                    <div className="card-body">
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
                    <div className="flex justify-start mt-1">
                      { 
                        productDetail.imagesUrl?.map((url,index, ary)=>{
                          return (<a href={url} key={index} onClick={
                              ()=>{
                                event.preventDefault();
                                const nowImage = productImage;
                                ary.splice(index,1);
                                ary.splice(index,0,nowImage);
                                setProductImage(url);

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
      </div>
    )
}


export default Products