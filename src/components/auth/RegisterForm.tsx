import { useCallback } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuthActions } from '@/hooks/useAuthActions';
import { useRouter } from 'next/navigation';

const validationSchema = Yup.object({
    username: Yup.string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required')
});

export default function RegisterForm() {
    const { registerUser } = useAuthActions();
    const router = useRouter();

    const handleSubmit = useCallback(async (values: {
        username: string;
        email: string;
        password: string;
    }) => {
        try {
            await registerUser(values.username, values.email, values.password);
            router.push('/login');
        } catch (error) {
            console.error('Registration failed:', error);
        }
    }, [registerUser, router]);

    return (
        <Formik
            initialValues={{
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="space-y-4">
                    <div>
                        <Field
                            name="username"
                            type="text"
                            placeholder="Username"
                            className="w-full p-2 border rounded"
                        />
                        <ErrorMessage name="username" component="div" className="text-red-500" />
                    </div>

                    <div>
                        <Field
                            name="email"
                            type="email"
                            placeholder="Email"
                            className="w-full p-2 border rounded"
                        />
                        <ErrorMessage name="email" component="div" className="text-red-500" />
                    </div>

                    <div>
                        <Field
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="w-full p-2 border rounded"
                        />
                        <ErrorMessage name="password" component="div" className="text-red-500" />
                    </div>

                    <div>
                        <Field
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full p-2 border rounded"
                        />
                        <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Registering...' : 'Register'}
                    </button>
                </Form>
            )}
        </Formik>
    );
}