import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
    try {
        connect()
        const req = await request.json();
        const { email, password } = req;

        // check user exist in database
        const user = await userModel.findOne({ email });
        if (!user) {
            return NextResponse.json({
                message: 'User not found',
                status: 404
            })
        }
        console.log(user);
        
        // check password is valid or not
        const passwordValidation = await bcryptjs.compare(password, user.password);
        if (!passwordValidation) {
            return NextResponse.json({
                message: 'password is invalid',
                status: 404
            })
        }

        // token data
        const tokenData = {
            username: user.username,
            email: user.email,
            id: user._id
        }

        // token creation 
        const token = await jwt.sign(tokenData, process.env.jwt_secret!, { expiresIn: "1d" });

        const response = NextResponse.json({
            message: "login successful",
            status: 200
        })

        response.cookies.set("token", token, { httpOnly: true })

        return response;
    } catch (e) {
        console.log("login error", e);
    }
}