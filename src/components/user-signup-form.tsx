'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { HTMLAttributes } from 'react';
import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import {
  UserAuthFormData,
  userAuthFormSchema,
} from '../app/actions/auth-form-schema';
import signUpWithEmail from '../app/actions/signup-with-email';

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

const UserSignUpForm = ({ className, ...props }: UserAuthFormProps) => {
  const { pending } = useFormStatus();

  const form = useForm<UserAuthFormData>({
    resolver: zodResolver(userAuthFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: UserAuthFormData) => {
    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('name', values.name);
    await signUpWithEmail(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-2">
          <div className="grid gap-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">
            {pending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Sign Up with Email
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserSignUpForm;
