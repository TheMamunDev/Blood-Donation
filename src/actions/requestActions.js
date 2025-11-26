'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/db';
import Doners from '@/models/Request';
import { isValidObjectId } from 'mongoose';
import { getServerSession } from 'next-auth/next';
import { revalidatePath } from 'next/cache';

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

  try {
    const newRequest = await Doners.create(data);
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

export async function feturedRequest() {
  try {
    await connectDB();
    const res = await Doners.find().sort({ createdAt: -1 }).limit(6).lean();
    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateRequestStatus(requestId) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return { success: false, message: 'Unauthorized action.' };
  }
  if (!isValidObjectId(requestId)) {
    return { success: false, message: 'Invalid request ID.' };
  }
  try {
    await connectDB();
    const request = await Doners.findById(requestId);

    if (!request) {
      return { success: false, message: 'Request not found.' };
    }
    if (request.userEmail !== session.user.email) {
      return {
        success: false,
        message: 'You do not have permission to close this request.',
      };
    }

    request.status = 'Closed';
    request.updatedAt = new Date();
    await request.save();
    revalidatePath('/dashboard/my-request');
    return {
      success: true,
      message: 'Request successfully closed and fulfilled!',
    };
  } catch (error) {
    console.error('Database error during update:', error);
    return {
      success: false,
      message: 'Server failed to update request status.',
      error,
    };
  }
}

export async function deleteRequest(id) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return { success: false, message: 'Unauthorized action.' };
  }
  if (!isValidObjectId(id)) {
    return { success: false, message: 'Invalid request ID.' };
  }

  try {
    await connectDB();
    const request = await Doners.findById(id);

    if (!request) {
      return { success: false, message: 'Request not found.' };
    }
    if (request.userEmail !== session.user.email) {
      return {
        success: false,
        message: 'You do not have permission to Delete this request.',
      };
    }

    await Doners.deleteOne({ _id: id });
    revalidatePath('/dashboard/my-request');
    return {
      success: true,
      message: 'Request Deleted Successfull!',
    };
  } catch (error) {
    console.error('Database error during update:', error);
    return {
      success: false,
      message: 'Server failed to delere request .',
      error,
    };
  }
}
