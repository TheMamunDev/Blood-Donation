'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/db';
import Doners from '@/models/Request';
import { isValidObjectId } from 'mongoose';
import { getServerSession } from 'next-auth/next';

export async function createBloodRequest(formData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      success: false,
      message: 'Authorization failed. Must be logged in.',
    };
  }

  await connectDB();

  const data = {
    userId: session.user.id,
    userEmail: session.user.email,
    bloodGroupNeeded: formData.bloodGroupNeeded,
    unitsNeeded: parseInt(formData.unitsNeeded, 10),
    hospitalName: formData.hospitalName,
    contactNumber: formData.contactNumber,
    priority: formData.priority,
  };
  console.log('data from before add to database', data);
  try {
    const newRequest = await Doners.create(data);

    // revalidatePath('/list');

    return {
      success: true,
      message: 'Blood request submitted successfully!',
      requestId: newRequest._id.toString(),
    };
  } catch (error) {
    console.error('Database error during request creation:', error);

    let errorMessage = 'Failed to submit request.';
    if (error.name === 'ValidationError') {
      errorMessage = Object.values(error.errors)
        .map(val => val.message)
        .join(', ');
    }

    return { success: false, message: errorMessage };
  }
}

export async function getMyBloodRequests() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return [];
  }

  try {
    await connectDB();
    const requests = await Doners.find({ userEmail: session.user.email })
      .sort({ createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(requests));
  } catch (error) {
    console.error('Failed to fetch user requests:', error);
    return [];
  }
}

export async function getBloodRequestById(id) {
  if (!isValidObjectId(id)) {
    return null;
  }

  try {
    await connectDB();
    const request = await Doners.findById(id).lean();
    if (!request) {
      return null;
    }
    return JSON.parse(JSON.stringify(request));
  } catch (error) {
    console.error('Failed to fetch single request:', error);
    return null;
  }
}

export async function getAllOpenBloodRequests() {
  try {
    await connectDB();
    const requests = await Doners.find({ status: 'Open' })
      .sort({ priority: -1, createdAt: -1 })
      .lean();

    return JSON.parse(JSON.stringify(requests));
  } catch (error) {
    console.error('Failed to fetch all blood requests:', error);
    return [];
  }
}
