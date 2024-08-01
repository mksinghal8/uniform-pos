'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { signUp } from './actions';
import { useFormState, useFormStatus } from 'react-dom';

function LoginButton() {
    const { pending } = useFormStatus();
    //@ts-ignore
    const handleClick = (event) => {
        console.log('You clicked me');
        if (pending) {
            event.preventDefault();
        }
    };

    return (
        <Button aria-disabled={pending} onClick={handleClick} type="submit">
            SignUp
        </Button>
    );
}

export function SignUpForm() {
    const [state, dispatch] = useFormState(signUp, undefined);
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Register yourself in Uniforms POS</CardDescription>
            </CardHeader>
            <form action={dispatch}>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">User Name</Label>
                            <Input
                                id="username"
                                placeholder="A unique username"
                                name="username"
                            />
                            {state?.errors?.username && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                {state.errors.username}
                            </span>}

                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" placeholder="password" name="password" />
                            {state?.errors?.password && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                {state.errors.password}
                            </span>}
                        </div>
                    </div>
                    <div>{state?.message}</div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <LoginButton />
                </CardFooter>
            </form>
        </Card>
    );
}
