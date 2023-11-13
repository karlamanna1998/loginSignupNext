"use client"
import { useEffect, useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/dist/js/bootstrap.min.js"
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader/Loader";
export default function SignupPage() {
    const router = useRouter();
    const [signupData, setSignupData] = useState({
        username: "",
        password: "",
        email: ""
    })
    const [loading, setLoading] = useState(false)
    const [buttonDisable, setButtonDisable] = useState(true)
    const signup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", signupData);
            setSignupData({
                username: "",
                password: "",
                email: ""
            })
            // router.push("/login")
        } catch (e: any) {
            console.log("signup error", e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
     if(signupData.email && signupData.password && signupData.password){
        setButtonDisable(false)
     }else{
        setButtonDisable(true)
     }
    },[signupData])
    return (
        <>
        {
            loading && <Loader/>
        }
        {!loading && <div className="container w-50">
            
            <h3 className="text-center my-4">SIGNUP</h3>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">USERNAME</label>
                    <input type="text" className="form-control" id="username" aria-describedby="emailHelp" value={signupData.username} onChange={(e) => { setSignupData({ ...signupData, username: e.target.value }) }} />
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">PASSWORD</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={signupData.password} onChange={(e) => { setSignupData({ ...signupData, password: e.target.value }) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">EMAIL</label>
                    <input type="email" className="form-control" id="email" value={signupData.email} onChange={(e) => { setSignupData({ ...signupData, email: e.target.value }) }} />
                </div>
                <div className="mb-1"><Link className="text-decor ation-none" href={"/login"}>GO TO LOGIN PAGE</Link></div>
                <button onClick={signup} className="btn btn-primary" disabled = {buttonDisable}>SIGNUP</button>
        </div>}
        </>
    )
}