import React from 'react';

export default function FirebaseError(code)
{
    switch(code)
    {
        case 'auth/invalid-email':
            return '유효하지 않은 이메일입니다.'
        case 'auth/user-disabled':
            return '이용이 제한된 회원입니다.'
        case 'auth/user-not-found':
            return '존재하지 않는 회원입니다.'
        case 'auth/wrong-password':
            return '유효하지 않은 비밀번호입니다.'
    }
}
