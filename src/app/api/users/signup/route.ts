import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/userModel";
import bcryptjs from "bcryptjs"


export  async function POST(request: NextRequest) {
    try {
        connect()
        const req = await request.json();
        const { username, email, password } = req;
        console.log("hitttttttttttttttttt");
        
        //check if user  exists
        const user = await userModel.findOne({ email })

        if (user) {
            return NextResponse.json({
                status: 400,
                error: "user already exists"
            })
        }

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new userModel({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "user saved successfully",
            status: 200,
            savedUser
        })
    } catch (err: any) {
        return NextResponse.json({
            status: 500,
            error: err.message
        })
    }
}