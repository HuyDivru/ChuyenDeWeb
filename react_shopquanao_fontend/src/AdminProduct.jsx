import { useEffect, useState } from "react";
import { httpDelete, httpGet, httpPut } from "./httpConfig";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Modal } from "bootstrap";

function AdminProduct() {

    const [products, setProducts] = useState([]);

    const getCurrentDateTime =  () => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    };

    const [editProduct,setEditProduct] =useState({
        id:'',
        name: '',
        price: '',
        image_url: '',
        added_on:getCurrentDateTime(),
        category_id: '',
    });

    useEffect(() => {
        fetchListProduct();
    }, []);


    const fetchListProduct = async () => {
        try {
            const response = await httpGet('listProduct');
            setProducts(response.data);
        }
        catch (error) {
            console.error("There was an error fetching the list user!", error);
        }

    }
    //xử lý sự kiện khi xóa sản phẩm
    const handleDeleteClick = async (id) =>{
        const shouldDelete= window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?');

        if(shouldDelete){
            try{
                const productId = parseInt(id);
                await httpDelete(`deleteProduct/${productId}`);
                fetchListProduct();
                alert('Sản phẩm đã xóa thành công');
            }
            catch(error){
                console.error("Lỗi không thể xóa sản phẩm",error);
            }
        }
    }
    //xư lý sự kiện khi nhấn nút edit
    const handleEditClick = (product) =>{
        setEditProduct(product);
        const modalElement = document.getElementById('editProductModal');
        const modal = new Modal(modalElement);
        modal.show();
    }

    const handleChange = (e) =>{
        const {id,value} = e.target;
        setEditProduct((prevProduct) => ({
            ...prevProduct,
            [id]:value
        }));
    } 

    const handleSaveChange = async () =>{
        try{
            
            if (!editProduct.image_url) {
                alert('Please provide the image URL.');
                return;
            }

            await httpPut(`editProduct/${editProduct.id}`, editProduct);
            fetchListProduct();
            alert('Sản phẩm đã được cập nhật thành công');
            const modalElement = document.getElementById('editProductModal');
            const modal = Modal.getInstance(modalElement);
            modal.hide();
        }
        catch(error){
            console.error("Lỗi không thể edit sản phẩm!", error);
        }
    }
    return (
        <>
        <table className="table table-bordered border-primary">
            <thead>
                <tr>
                    <th scope="col">Stt</th>
                    <th scope="col">Tên Sản Phẩm</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Ảnh</th>
                    <th scope="col">Ngày Tạo Sản Phẩm</th>
                    <th scope="col">Mã Loại Sản Phẩm</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, index) => (
                    <tr key={product.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td><img src={product.image_url} alt="Product" style={{ width: "60px", height: "60px" }} /> 
                            <p style={{display: "none"}}>{product.image_url}</p>
                        </td>
                        <td>{product.added_on}</td>
                        <td>{product.category_id}</td>
                        <td>
                            <td>
                                <a onClick={()=>handleEditClick(product)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                                    </svg>
                                </a>
                                <a style={{ paddingLeft: "30px" }}  onClick={() => handleDeleteClick(product.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                    </svg>
                                </a>
                            </td>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>


        <div className="modal fade" id="editProductModal" tabIndex="-1" aria-labelledby="editProductModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editProductModalLabel">Chỉnh sửa sản phẩm</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Nhập tên sản phẩm"
                                    value={editProduct.name}
                                    onChange={handleChange}
                                />
                                <label htmlFor="name">Tên sản phẩm</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="price"
                                    placeholder="Giá sản phẩm"
                                    value={editProduct.price}
                                    onChange={handleChange}
                                />
                                <label htmlFor="price">Giá sản phẩm</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="image_url"
                                    placeholder="Đường dẫn ảnh"
                                    value={editProduct.image_url}
                                    onChange={handleChange}
                                />
                                <label htmlFor="image_url">Nhập ảnh</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="category_id"
                                    placeholder="Mã loại sản phẩm"
                                    value={editProduct.category_id}
                                    onChange={handleChange}
                                />
                                <label htmlFor="category_id">Nhập mã loại sản phẩm</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            <button type="button" className="btn btn-primary" onClick={handleSaveChange}>Lưu thay đổi</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );


}
export default AdminProduct;    