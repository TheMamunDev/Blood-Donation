import connectDB from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { User } from '@/models/User';

export const POST = async request => {
  const { name, email, password, location, bloodGroup, photo } =
    await request.json();

  console.log(name, email, password, location, bloodGroup, photo);
  await connectDB();
  const exitsUser = await User.findOne({ email });
  if (exitsUser) {
    return NextResponse.json(
      { message: 'User already registerd' },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 6);
  const newUser = {
    name,
    password: hashedPassword,
    email,
    location,
    bloodGroup,
    photo,
    createdAt: new Date(),
  };

  try {
    const res = await User.create(newUser);
    return NextResponse.json(
      { message: 'User Created Successfull', user: res },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      { message: err.mesage },
      {
        status: 500,
      }
    );
  }
};
