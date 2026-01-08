
// 'use client';
// import { useEffect } from 'react';
// import { useUser } from '@clerk/nextjs';
// import axios from 'axios';

// export default function SyncUserWithDB() {
//   const { user, isLoaded } = useUser();

//   useEffect(() => {
//     const syncUser = async () => {
//            const alreadySynced = localStorage.getItem('userSynced');

//       if (alreadySynced || !user) return;
   

//       try {
//         await axios.post('/api/users/create', {
//           clerkId: user.id,
//         });
//       } catch (error) {
//         console.error('Error syncing user with DB:', error);
//       }
//     };

//     if (isLoaded) {
//       syncUser();
//     }
//   }, [user, isLoaded]);

//   return null;
// }
import React from 'react'

const SyncUserWithDB = () => {
  return (
    <div>SyncUserWithDB</div>
  )
}

export default SyncUserWithDB