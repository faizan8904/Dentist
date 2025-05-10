
'use client'

import { useActionState, useState } from 'react'
import { updateProfile } from '@/actions/profile'
import Image from 'next/image'

export default function ProfileForm({ user }: { user: any }) {
  const [state, formAction] = useActionState<
    { message: string | null; error: string | null },
    FormData
  >(updateProfile, { message: null, error: null })
  
  const [isEditing, setIsEditing] = useState(false)
  const [imagePreview, setImagePreview] = useState(user.img || '/default-avatar.png')
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
  
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include', // Important for cookies
        headers: {
          // Forward the same headers your middleware sets
          'x-user-id': user.id,
          'x-user-role': user.role,
        },
      });
  
      if (!response.ok) throw new Error('Upload failed');
      
      const { imagePath } = await response.json();
      setImagePreview(imagePath);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="avatar">
              <div className="w-32 rounded-full">
                <Image
                  src={imagePreview}
                  alt="Profile picture"
                  width={128}
                  height={128}
                />
              </div>
            </div>
            {isEditing && (
              <div className="mt-4">
                <label className="btn btn-sm btn-outline w-full">
                  {isUploading ? 'Uploading...' : 'Change Photo'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={isUploading}
                  />
                </label>
              </div>
            )}
          </div>

          <div className="flex-grow">
            {!isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input
                      type="text"
                      value={user.name}
                      className="input input-bordered w-full"
                      disabled
                    />
                  </div>
                  
                  <div>
                    <label className="label">
                      <span className="label-text">Father's Name</span>
                    </label>
                    <input
                      type="text"
                      value={user.fatherName || ''}
                      className="input input-bordered w-full"
                      disabled
                    />
                  </div>
                  
                  <div>
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      className="input input-bordered w-full"
                      disabled
                    />
                  </div>
                  
                  <div>
                    <label className="label">
                      <span className="label-text">Phone</span>
                    </label>
                    <input
                      type="tel"
                      value={user.phone}
                      className="input input-bordered w-full"
                      disabled
                    />
                  </div>
                  
                  <div>
                    <label className="label">
                      <span className="label-text">Age</span>
                    </label>
                    <input
                      type="number"
                      value={user.age || ''}
                      className="input input-bordered w-full"
                      disabled
                    />
                  </div>
                  
                  <div>
                    <label className="label">
                      <span className="label-text">Address</span>
                    </label>
                    <textarea
                      value={user.address || ''}
                      className="textarea textarea-bordered w-full"
                      rows={3}
                      disabled
                    />
                  </div>
                </div>
                
                <div className="card-actions justify-end">
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            ) : (
              <form action={formAction} className="space-y-4">
                <input type="hidden" name="userId" value={user.id} />
                <input type="hidden" name="img" value={imagePreview} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={user.name}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="label">
                      <span className="label-text">Father's Name</span>
                    </label>
                    <input
                      type="text"
                      name="fatherName"
                      defaultValue={user.fatherName || ''}
                      className="input input-bordered w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="input input-bordered w-full"
                      disabled
                    />
                  </div>
                  
                  <div>
                    <label className="label">
                      <span className="label-text">Phone</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      defaultValue={user.phone}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="label">
                      <span className="label-text">Age</span>
                    </label>
                    <input
                      type="number"
                      name="age"
                      defaultValue={user.age || ''}
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="label">
                    <span className="label-text">Address</span>
                  </label>
                  <textarea
                    name="address"
                    defaultValue={user.address || ''}
                    className="textarea textarea-bordered w-full"
                    rows={3}
                  />
                </div>
                
                {state.error && (
                  <div className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{state.error}</span>
                  </div>
                )}
                
                {state.message && (
                  <div className="alert alert-success">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{state.message}</span>
                  </div>
                )}
                
                <div className="card-actions justify-end gap-2">
                  <button 
                    type="button" 
                    className="btn btn-ghost"
                    onClick={() => {
                      setIsEditing(false)
                      setImagePreview(user.img || '/default-avatar.png')
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isUploading}
                  >
                    Update Profile
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}