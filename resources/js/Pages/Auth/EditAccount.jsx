import React, { useEffect } from "react";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import InputError from "@/Components/InputError";
import Label from "@/Components/Label";
import { Head, Link, useForm } from "@inertiajs/inertia-react";

export default function EditAccount(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: props.user.name,
        email: props.user.email,
        role: props.user.role, // adding role to know user or admin
        password: props.user.password,
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();
        post(`update/${$props.id}`, data, {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <form onSubmit={submit}>
                <div>
                    <Label forInput="name" value="Name" />

                    <Input
                        type="text"
                        name="name"
                        value={props.user.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />

                    {/* <InputError message={errors.name} className="mt-2" /> */}
                </div>

                <div className="mt-4">
                    <Label forInput="email" value="Email" />

                    <Input
                        type="email"
                        name="email"
                        value={props.user.email}
                        className="mt-1 block w-full"
                        autoComplete="email"
                        handleChange={onHandleChange}
                        required
                    />

                    {/* <InputError message={errors.email} className="mt-2" /> */}
                </div>

                <div className="mt-4">
                    <Label forInput="password" value="Password" />

                    <Input
                        type="password"
                        name="password"
                        value={props.user.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                        required
                    />

                    {/* <InputError message={errors.password} className="mt-2" /> */}
                </div>

                <div className="mt-4">
                    <Label
                        forInput="password_confirmation"
                        value="Confirm Password"
                    />

                    <Input
                        type="password"
                        name="password_confirmation"
                        value={props.user.password_confirmation}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}
                        required
                    />

                    {/* <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    /> */}
                </div>

                <div className="flex items-center justify-between mt-4">
                    <Button
                        className="ml-4 bg-red-600"
                        // onClick={props.onClose}
                    >
                        Batal
                    </Button>
                    <Button
                        className="ml-4"
                        type="submit"
                        processing={processing}
                    >
                        Edit
                    </Button>
                </div>
            </form>
        </>
    );
}
