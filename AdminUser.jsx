import { useEffect, useState } from "react";
import { httpGet } from "./httpConfig";


function AdminUser(){
    const [users, setUsers] = useState([]);


    useEffect(() => {
        fetchListUser();
    },[]);


const fetchListUser = async () => {
    try{
        const response = await httpGet('listUser');
        setUsers(response.data);
    }
    catch(error){
        console.error("There was an error fetching the list user!", error);
    }
}
    return(
        <table className="table table-bordered border-primary">
            <thead>
                <tr>
                    <th scope="col">Stt</th>
                    <th scope="col">Tên</th>
                    <th scope="col">Email</th>
                    <th scope="col">Sđt</th>
                    <th scope="col">Ngày Tạo Tài Khoản</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr key={user.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.mobile}</td>
                        <td>{user.created_at}</td> 
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
export default AdminUser;