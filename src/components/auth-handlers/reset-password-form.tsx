import React, { useState } from 'react'
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { auth } from '@/firebase'

const ResetPasswordForm = ({ actionCode }: any) => {


    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    
    function handleResetPassword() {
        confirmPasswordReset(auth, actionCode, newPassword).then((resp) => {

        }).catch((error) => {

        });

        verifyPasswordResetCode(auth, actionCode).then((email) => {
            const accountEmail = email;

            // TODO: Show the reset screen with the user's email and ask the user for
            // the new password.
            const newPassword = "...";

            // Save the new password.

        }).catch((error) => {
            // Invalid or expired action code. Ask user to try to reset the password
            // again.
        });
    }

    return (
        <div>ResetPasswordForm</div>
    )
}

export default ResetPasswordForm