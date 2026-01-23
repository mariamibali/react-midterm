"use client";
import styles from "./page.module.css";
import Link from "next/link";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export const schema = yup.object().shape({
  username: yup
    .string()
    .required("მომხმარებლის სახელი სავალდებულოა")
    .min(4, "მომხმარებლის სახელი უნდა იყოს მინიმუმ 4 სიმბოლო")
    .max(10, "მაქსიმუმ 10 სიმბოლო"),
  password: yup
    .string()
    .required("პაროლი სავალდებულოა")
    .min(6, "მინიმუმ 6 სიმბოლო")
    .matches(/[A-Z]/, "უნდა შეიცავდეს ერთ დიდ ასოს")
    .matches(/[0-9]/, "უნდა შეიცავდეს ერთ ციფრს"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "პაროლიები უნდა ემთხვეოდეს")
    .required("დაადასტურეთ პაროლი"),
});

const Page = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleRegister = (data) => {
    console.log("Registered user:", data);
    router.push("/login");
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h2 className={styles.title}>Register</h2>
        <form className={styles.form} onSubmit={handleSubmit(handleRegister)}>
          <div className={styles.inputWrapper}>
            <input
              {...register("username")}
              className={styles.input}
              placeholder="Username"
            />
            <p className={styles.error}>{errors.username?.message}</p>
          </div>
          <div className={styles.inputWrapper}>
            <input
              {...register("password")}
              type="password"
              className={styles.input}
              placeholder="Password"
            />
            <p className={styles.error}>{errors.password?.message}</p>
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="password"
              className={styles.input}
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />
            <p className={styles.error}>{errors.confirmPassword?.message}</p>
          </div>
          <button className={styles.button} type="submit">
            Sign Up
          </button>
        </form>
        <Link href="/login" className={styles.notRegistered}>
          Already registered? Sign in
        </Link>
      </div>
    </main>
  );
};

export default Page;
