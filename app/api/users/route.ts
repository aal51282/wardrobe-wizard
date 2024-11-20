import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "../../libs/mongodb";
import User from "../../models/userModel"; ; 

export async function GET() {
    await connectMongoDB() ;
    const users = await User.find();
    return NextResponse.json({ users});
} 
export async function POST(request: NextRequest) {
    try {
        const { username, email, password, firstName, lastName } = await request.json();
        
        console.log('Received data:', { username, email, firstName, lastName });

        if (!username || !email || !password || !firstName || !lastName) {
            return NextResponse.json({ 
                error: "All fields are required" 
            }, { status: 400 });
        }

        await connectMongoDB();
        
        const user = await User.create({ 
            username,   
            email, 
            password, 
            firstName, 
            lastName
        });

        return NextResponse.json({ 
            message: "User added successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        }, { status: 201 });

    } catch (error: any) {
        console.error('Error in POST handler:', error);
        return NextResponse.json({ 
            error: error.message 
        }, { status: 500 });
    }
}