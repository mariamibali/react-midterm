"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import styles from "./page.module.css";
import { updateUser } from "@/lib/slices/userSlice";
import { useAppDispatch } from "@/lib/hook";

const schema = yup.object({
  username: yup
    .string()
    .required("მომხმარებლის სახელი სავალდებულოა")
    .min(4, "მომხმარებლის სახელი უნდა იყოს მინიმუმ 4 სიმბოლო")
    .max(10, "მომხმარებლის სახელი უნდა იყოს მაქსიმუმ 10 სიმბოლო"),
  password: yup
    .string()
    .required("პაროლი სავალდებულოა")
    .min(6, "პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს")
    .matches(/[A-Z]/, "პაროლი უნდა შეიცავდეს მინიმუმ ერთ დიდ ასოს")
    .matches(/[0-9]/, "პაროლი უნდა შეიცავდეს მინიმუმ ერთ ციფრს"),
  remember: yup.boolean(),
});

export default function LoginPage() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.push("/product");
  }, [router]);

  const onSubmit = async (data) => {
    try {
      const res = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      if (!res.ok) throw new Error();

      const result = await res.json();

      const userdata = await fetch("https://fakestoreapi.com/users/1");
      const parsedUserdata = await userdata.json();
      dispatch(updateUser(parsedUserdata));
      if (data.remember) {
        localStorage.setItem("token", result.token);
      }
      router.push("/product");
    } catch {
      alert("არასწორი username ან password");
    }
  };

  return (
    <main className={styles.main}>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={styles.signin}>Login</h3>
        <p className={styles.desc}>Please sign in to access the shop</p>
        <input
          placeholder="username"
          className={styles.input}
          {...register("username")}
        />
        <p className={styles.error}>{errors.username?.message}</p>
        <div className={styles.passwordWrapper}>
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="password"
            className={styles.input}
            {...register("password")}
          />
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />{" "}
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        </div>
        <p className={styles.error}>{errors.password?.message}</p>
        <label className={styles.remember}>
          <input
            className={styles.box}
            type="checkbox"
            {...register("remember")}
          />
          Remember me
        </label>
        <button className={styles.button} type="submit">
          Login
        </button>
        <Link className={styles.notRegistered} href="/register">
          don`t have an account? Register
        </Link>
      </form>
    </main>
  );
}
