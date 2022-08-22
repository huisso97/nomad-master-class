import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  username: string;
  password: string;
  password1: string;
  extraError: string;
}

function Signup() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  // react hook form이 모든 validation을 통과했을 때, onValid 호출함
  const onValid = (data: IForm) => {
    if (data.password !== data.password1) {
      setError("password1", { message: "Password are not the same" }, { shouldFocus: true });
    }
    // setError("extraError", { message: "server is offline" });
  };

  return (
    <div>
      {/* 유저가 submit했을 때, handleSubmit은 모든 validation을 한 후, 우리의 데이터가 유요할 때만 onValid 호출함 */}
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^[A-Za-z0-9._%+_]+@naver.com$/, message: "Only naver.com is allowed" },
            minLength: {
              value: 10,
              message: "it is too short",
            },
          })}
          placeholder="Email"
        />
        <span>{errors.email?.message}</span>
        <input
          {...register("username", {
            required: "write here",
            // validation 하고싶은 것들 객체 내부에 추가하면 됨
            validate: {
              // nico를 포함하지 않으면 validation 통과, false면 오류 문구 반환
              noNico: (value) => (value.includes("nico") ? "no nicos allowed" : true),
              noNick: (value) => (value.includes("nick") ? "no nick allowed" : true),
            },
            minLength: {
              value: 10,
              message: "it is too short",
            },
          })}
          placeholder="username"
        />
        <span>{errors.username?.message}</span>
        <input
          {...register("password", {
            required: "password is required",
            minLength: {
              value: 5,
              message: "it is too short",
            },
          })}
          placeholder="password"
        />
        <span>{errors.password?.message}</span>
        <input
          {...register("password1", {
            required: "password is required",

            minLength: {
              value: 5,
              message: "it is too short",
            },
          })}
          placeholder="password1"
        />
        <span>{errors.password1?.message}</span>
        <span>{errors.extraError?.message}</span>
        <button>add</button>
      </form>
    </div>
  );
}

export default Signup;
