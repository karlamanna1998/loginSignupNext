"use client"
import { useEffect, useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/dist/js/bootstrap.min.js"
import Link from "next/link";
import axios from "axios";
import Loader from "@/components/loader/Loader";
export default function LoginPage() {
  const [loginData, setLoginData] = useState({
    password : "",
    email : ""
  })
  const [loading, setLoading] = useState(false)
    const [buttonDisable, setButtonDisable] = useState(true)
    const login = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", loginData);
            setLoginData({
                password : "",
                email : ""
            })
        } catch (e: any) {
            console.log("login error", e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
     if(loginData.email && loginData.password){
        setButtonDisable(false)
     }else{
        setButtonDisable(true)
     }
    },[loginData])
    return (
        <>
        {
            loading && <Loader/>
        }
        {!loading && <div className="container w-50">
            <h3 className="text-center my-4">LOGIN</h3>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">EMAIL</label>
                    <input type="email" className="form-control" id="email"  value={loginData.email} onChange={(e)=>{setLoginData({...loginData , email : e.target.value})}}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">PASSWORD</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"  value={loginData.password} onChange={(e)=>{setLoginData({...loginData , password : e.target.value})}}/>
                </div>
                <div className="mb-1"><Link className="text-decoration-none" href={"/signup"}>GO TO SIGNUP PAGE</Link></div>
                <button type="submit" className="btn btn-primary" onClick={login}>LOGIN</button>
        </div>}
        </>
    )
}