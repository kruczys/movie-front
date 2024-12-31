import { useCallback } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuthActions } from '@/hooks/useAuthActions';
import { useRouter } from 'next/router';

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required')
});

export default function LoginForm() {
    const { loginUser } = useAuthActions();
    const router = useRouter();

    const handleSubmit = useCallback(async (values: { email: string; password: string }) => {
        try {
            await loginUser(values.email, values.password);
            router.push('/');
        } catch (error) {
            console.error('Login failed:', error);
        }
    }, [loginUser, router]);

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="space-y-4">
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

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-500 text-white p-2 rounded"
                    >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                </Form>
            )}
        </Formik>
    );
}